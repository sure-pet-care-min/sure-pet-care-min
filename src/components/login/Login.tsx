import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useLoginMutation } from "../../client/api";
import { selectDeviceId, setAuth, setError } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export const Login = () => {
  const dispatch = useAppDispatch();
  const deviceId = useAppSelector(selectDeviceId);
  const [login, { isLoading }] = useLoginMutation();

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = document.forms[0];
    try {
      const response = await login({
        email_address: email.value,
        password: password.value,
        device_id: deviceId,
      }).unwrap();
      dispatch(setAuth(response.data!.token));
    } catch {
      dispatch(setError());
    }
  };

  return (
    <>
      <Avatar
        sx={{ height: 100, width: 100 }}
        src={process.env.PUBLIC_URL + "/icon.png"}
        alt="icon"
      />
      <Typography variant="h5">Sign in</Typography>
      <Typography variant="caption">(Sure PetCare)</Typography>
      <form
        onSubmit={handleLoginSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
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
            {isLoading ? "‎" : "Log in"}
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
    </>
  );
};
