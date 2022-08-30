import { getDirectionDisplay, getLocationDisplay } from "./client/helpers";
import { useAppDispatch, useAppSelector } from "./redux/store";
import {
  clearAuth,
  selectErrorLoggingIn,
  selectIsLoggedIn,
  setAuth,
  setError,
} from "./redux/authSlice";
import { useInfoQuery, useLoginMutation, useTimelineQuery } from "./client/api";
import { isDevelopment } from "./isDevelopment";
import {
  Avatar as AvatarBase,
  Divider as DividerBase,
  Button,
  Typography,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";

const Avatar = (props: { src: string; alt: string }) => (
  <AvatarBase
    {...props}
    sx={{ width: 100, height: 100, alignSelf: "center" }}
    className="avatar"
  />
);

const Divider = () => <DividerBase sx={{ width: "80%", margin: 2 }} />;

const App = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const errorLoggingIn = useAppSelector(selectErrorLoggingIn);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const { data: infoData, isLoading: isInfoLoading } = useInfoQuery(undefined, {
    skip: !isLoggedIn,
  });
  const { data: timelineData, isLoading: isTimelineLoading } = useTimelineQuery(
    undefined,
    {
      skip: !isLoggedIn,
    }
  );
  const loading = isInfoLoading || isTimelineLoading;

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = document.forms[0];
    try {
      const response = await login({
        email_address: email.value,
        password: password.value,
      }).unwrap();
      dispatch(setAuth(response.data!.token));
    } catch {
      dispatch(setError());
    }
  };

  const handleLogout = () => {
    dispatch(clearAuth());
  };

  const user = infoData?.data?.user;
  const photos = infoData?.data?.photos;
  const pets = infoData?.data?.pets;
  const userPhoto = photos?.find((p) => p.id === user?.photo_id)?.location;
  const timeline = timelineData?.data;

  return (
    <>
      <Typography variant="h5">
        Welcome to my (unofficial) Sure Petcare minimum website (alpha).
      </Typography>
      <Divider />
      {!isLoggedIn && (
        <form
          onSubmit={handleLoginSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="text" />
          </FormControl>
          <FormControl sx={{ margin: 2 }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" />
          </FormControl>
          <Button variant="contained" type="submit">
            Log in
          </Button>
        </form>
      )}
      {!isLoggedIn && isLoginLoading && <Typography>Logging in...</Typography>}
      {errorLoggingIn && (
        <Typography>There was an error logging in, try again...</Typography>
      )}
      {isLoggedIn && loading && <Typography>Loading data...</Typography>}
      {isLoggedIn && !loading && user && userPhoto && (
        <>
          <Avatar src={userPhoto} alt="user" />
          <Typography variant="subtitle1">
            {user.first_name} {user.last_name} : Coding
          </Typography>
        </>
      )}
      {isLoggedIn &&
        !loading &&
        pets &&
        pets.map((pet) => (
          <>
            <Avatar src={pet.photo.location} alt={`${pet.name}`} />
            <Typography variant="subtitle1">
              {pet.name} : {getLocationDisplay(pet)}
            </Typography>
          </>
        ))}
      {isLoggedIn && !loading && timeline && (
        <>
          <Divider />
          {timeline.map((t) => (
            <Typography key={t.id} sx={{ padding: 1 }}>
              {t.pets[0].name} {getDirectionDisplay(t.movements[0])} at{" "}
              {new Date(t.created_at).toLocaleTimeString(undefined, {
                timeStyle: "short",
              })}
            </Typography>
          ))}
        </>
      )}
      {isLoggedIn && !loading && (
        <>
          <Divider />
          <Button variant="contained" onClick={handleLogout}>
            Log out
          </Button>
        </>
      )}
      <Divider />
      <Typography variant="caption">
        version {process.env.REACT_APP_VERSION} {isDevelopment() ? "(dev)" : ""}
      </Typography>
    </>
  );
};

export default App;
