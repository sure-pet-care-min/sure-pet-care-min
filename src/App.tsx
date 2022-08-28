import "./App.css";
import { useState } from "react";
import { authenticate, getInfo, getTimeline } from "./client/client";
import { Pet, Photo, TimelineEntry, User } from "./client/types";
import { getLocationDisplay } from "./client/helpers";

// Based on - https://github.com/RMHonor/sure-pet-care
// also for more complete reference https://github.com/benleb/surepy/blob/dev/surepy/client.py
const email = "";
const password = "";
const deviceId = "site_test_device_id";

type TestData = {
  photos: Photo[];
  user: User;
  pets: Pet[];
  timeline: TimelineEntry[];
};

const testPetCare = async (
  token: string | undefined,
  setToken: (token: string) => void,
  setData: (data: TestData | undefined) => void
) => {
  let authToken = token;

  if (!token) {
    const { data, error } = await authenticate(email, password, deviceId);

    if (!data || error) {
      console.log("Error authenticating", error);
      setData(undefined);
      return;
    }

    authToken = data.token;
    setToken(authToken);
  }

  if (!authToken) {
    console.log("no idea how this happened");
    setData(undefined);
    return;
  }

  const { data: infoData, error: infoError } = await getInfo(authToken);

  if (!infoData || infoError) {
    console.log("Error getting info", infoError);
    setData(undefined);
    return;
  }

  console.log("GOT INFO", infoData);

  const { data: timelineData, error: timelineError } = await getTimeline(
    authToken
  );

  if (!timelineData || timelineError) {
    console.log("Error getting timeline", timelineError);
    setData(undefined);
    return;
  }

  console.log("GOT TIMELINE", timelineData);

  setData({
    photos: infoData.photos,
    user: infoData.user,
    pets: infoData.pets,
    timeline: timelineData,
  });
};

const getPhoto = (data?: TestData, photoId?: number) =>
  data?.photos.find((p) => p.id === photoId)?.location;

const App = () => {
  const [token, setToken] = useState<string>();
  const [data, setData] = useState<TestData>();

  const userPhoto = getPhoto(data, data?.user.photo_id);

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to the SurePet Care testing platform.</p>
        <button onClick={() => testPetCare(token, setToken, setData)}>
          Click to test fetching data
        </button>
        <button onClick={() => setData(undefined)}>Click to clear</button>
        {userPhoto && <img src={userPhoto} alt="user" />}
        {data &&
          data.pets.map((p) => (
            <div>
              <img src={p.photo.location} alt={`${p.name}`} />
              <p>
                {p.name} : {getLocationDisplay(p)}
              </p>
            </div>
          ))}
      </header>
    </div>
  );
};

export default App;
