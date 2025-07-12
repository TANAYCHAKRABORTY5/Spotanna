import { Navigate, Route, Routes } from "react-router-dom";
import LoginComponent from "./routes/login";
import SignupComponent from "./routes/signup";
import HomeComponent from "./routes/home";
import LoggedInHomeComponent from "./routes/loggedInHome";
// import LogoutComponent from "./routes/logout";
import UploadSongComponent from "./routes/uploadSong";
import Library from "./routes/library";
import MyMusic from "./routes/myMysic";
import { useCookies } from "react-cookie";
import songContext from "./contexts/songContext";
import { useState } from "react";
import SearchPage from "./routes/searchPage";
import SinglePlaylistView from "./routes/singlePlaylistView";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <>
      <songContext.Provider
        value={{
          currentSong,
          setCurrentSong,
          soundPlayed,
          setSoundPlayed,
          isPaused,
          setIsPaused,
        }}
      >
        <div className="w-screen h-screen font-poppins">
          {cookie.token ? (
            // logged in routes
            <Routes>
              <Route path="/" element={<HelloComponent />} />

              <Route path="/home" element={<LoggedInHomeComponent />} />
              <Route path="/uploadsong" element={<UploadSongComponent />} />
              <Route path="/mymusic" element={<MyMusic />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<Library />} />
              <Route
                path="/playlist/:playlistId"
                element={<SinglePlaylistView />}
              />
              <Route path="*" element={<Navigate to="/home" />} />
              {/* <Route
              path="/logout"
              element={<LogoutComponent route="/auth/logout" />}
              /> */}
            </Routes>
          ) : (
            //logged out routes
            <Routes>
              <Route path="/home" element={<HomeComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignupComponent />} />

              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </div>
      </songContext.Provider>
    </>
  );
}

const HelloComponent = () => {
  return <div>This is hello Component</div>;
};

export default App;
