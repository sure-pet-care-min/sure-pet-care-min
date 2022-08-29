import "./App.css";
import { getLocationDisplay } from "./client/helpers";
import { useAppDispatch, useAppSelector } from "./redux/store";
import {
  clearAuth,
  selectErrorLoggingIn,
  selectIsLoggedIn,
  setAuth,
  setError,
} from "./redux/authSlice";
import { useInfoQuery, useLoginMutation } from "./client/api";

const Avatar = (props: { src: string; alt: string }) => (
  <img {...props} className="avatar" />
);

const App = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const errorLoggingIn = useAppSelector(selectErrorLoggingIn);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const { data: infoData, isLoading: isInfoLoading } = useInfoQuery(undefined, {
    skip: !isLoggedIn,
  });

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

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to my SurePet Care testing platform.</p>
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
        {isLoggedIn && isInfoLoading && <p>Loading data</p>}
        {isLoggedIn && user && userPhoto && (
          <div>
            <Avatar src={userPhoto} alt="user" />
            <p>
              {user.first_name} {user.last_name} : Coding
            </p>
          </div>
        )}
        {isLoggedIn &&
          pets &&
          pets.map((pet) => (
            <div key={pet.id}>
              <Avatar src={pet.photo.location} alt={`${pet.name}`} />
              <p>
                {pet.name} : {getLocationDisplay(pet)}
              </p>
            </div>
          ))}
        {isLoggedIn && <button onClick={handleLogout}>Log out</button>}
      </header>
    </div>
  );
};

export default App;
