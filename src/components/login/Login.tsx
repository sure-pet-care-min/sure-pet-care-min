import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useLoginMutation } from "../../client/api";
import { setAuth, setError } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/store";

export const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

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

  return (
    <form
      onSubmit={handleLoginSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <FormControl sx={{ width: "100%", marginTop: 2 }} disabled={isLoading}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput label="email" id="email" type="text" />
      </FormControl>
      <FormControl sx={{ width: "100%", marginTop: 2 }} disabled={isLoading}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput label="password" id="password" type="password" />
      </FormControl>
      <Box sx={{ width: "100%", marginTop: 2, position: "relative" }}>
        <Button
          fullWidth={true}
          variant="contained"
          type="submit"
          disabled={isLoading}
        >
          Login
        </Button>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: "absolute",
              top: "50%",
              left: "calc(50% - 12px)",
              marginTop: "-12px",
              marginBottom: "-12px",
            }}
          />
        )}
      </Box>
    </form>
  );
};
