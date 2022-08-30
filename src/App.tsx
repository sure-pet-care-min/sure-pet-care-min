import {
  getDirectionDisplay,
  getLocationDisplay,
  getLockedDisplay,
  getNextLockOrUnlockTime,
  isInside,
} from "./client/helpers";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { clearAuth, selectIsLoggedIn } from "./redux/authSlice";
import { useInfoQuery, useTimelineQuery } from "./client/api";
import { isDevelopment } from "./isDevelopment";
import {
  Avatar as AvatarBase,
  Divider as DividerBase,
  Button,
  Typography,
  Badge,
} from "@mui/material";
import { Login } from "./components/login/Login";
import React from "react";
import { CatFlapDevice } from "./client/types";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import ParkOutlined from "@mui/icons-material/ParkOutlined";

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

  const handleLogout = () => {
    dispatch(clearAuth());
  };

  const catFlap = infoData?.data?.devices.find(
    (d) => d.product_id === 6
  ) as CatFlapDevice;
  const pets = infoData?.data?.pets;
  const timeline = timelineData?.data;

  return (
    <>
      {!isLoggedIn && <Login />}
      {isLoggedIn && loading && <Typography>Loading data...</Typography>}
      {isLoggedIn && !loading && catFlap && (
        <>
          <Typography>
            The cat flap is {getLockedDisplay(catFlap)} until{" "}
            {getNextLockOrUnlockTime(catFlap)}
          </Typography>
          <Divider />
        </>
      )}
      {isLoggedIn &&
        !loading &&
        pets &&
        pets.map((pet) => (
          <React.Fragment key={pet.id}>
            <Badge
              overlap="circular"
              badgeContent={
                isInside(pet) ? (
                  <HomeOutlined
                    sx={{
                      color: "white",
                      background: "green",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <ParkOutlined
                    sx={{
                      color: "white",
                      background: "orange",
                      borderRadius: "50%",
                    }}
                  />
                )
              }
            >
              <Avatar src={pet.photo.location} alt={`${pet.name}`} />
            </Badge>
            <Typography variant="subtitle1">
              {pet.name} is {getLocationDisplay(pet)} (since{" "}
              {new Date(pet.position.since).toLocaleTimeString(undefined, {
                timeStyle: "short",
              })}
              )
            </Typography>
          </React.Fragment>
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
