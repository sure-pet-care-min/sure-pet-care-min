import "./App.css";
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

const Avatar = (props: { src: string; alt: string }) => (
  <img {...props} className="avatar" />
);

const Divider = () => (
  <hr
    style={{
      width: "calc(100% - 40px)",
      borderTop: "1px solid #bbb",
    }}
  />
);

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
    <div className="App">
      <header className="App-header">
        <p>Welcome to my Sure Petcare minimum website (alpha).</p>
        <Divider />
        {!isLoggedIn && (
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label>Email </label>
              <input type="text" name="email" required />
            </div>
            <div>
              <label>Password </label>
              <input type="password" name="password" required />
            </div>
            <div>
              <input type="submit" />
            </div>
          </form>
        )}
        {!isLoggedIn && isLoginLoading && <p>Logging in...</p>}
        {errorLoggingIn && <p>There was an error logging in, try again...</p>}
        {isLoggedIn && loading && <p>Loading data...</p>}
        {isLoggedIn && !loading && user && userPhoto && (
          <div>
            <Avatar src={userPhoto} alt="user" />
            <p>
              {user.first_name} {user.last_name} : Coding
            </p>
          </div>
        )}
        {isLoggedIn &&
          !loading &&
          pets &&
          pets.map((pet) => (
            <div key={pet.id}>
              <Avatar src={pet.photo.location} alt={`${pet.name}`} />
              <p>
                {pet.name} : {getLocationDisplay(pet)}
              </p>
            </div>
          ))}
        {isLoggedIn && !loading && timeline && (
          <>
            <Divider />
            {timeline.map((t) => (
              <p key={t.id}>
                {t.pets[0].name} {getDirectionDisplay(t.movements[0])} at{" "}
                {new Date(t.created_at).toLocaleTimeString(undefined, {
                  timeStyle: "short",
                })}
              </p>
            ))}
          </>
        )}
        {isLoggedIn && !loading && (
          <>
            <Divider />
            <button onClick={handleLogout}>Log out</button>
          </>
        )}
        <Divider />
        <p>version {process.env.REACT_APP_VERSION}</p>
      </header>
    </div>
  );
};

export default App;
