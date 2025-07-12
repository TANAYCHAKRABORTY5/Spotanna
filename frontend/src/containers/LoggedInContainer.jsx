import spotify_logo from "../assets/spotify_logo_white.png";
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react/dist/iconify.js";
import TextHover from "../components/shared/TextHover";
import { logoutUser } from "../routes/logout";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useContext, useEffect, useRef, useState } from "react";
import { Howl, Howler } from "howler";
import songContext from "../contexts/songContext";
import { useLayoutEffect } from "react";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/ServerHelper";
// import { useLocation } from "react-router-dom";

const LoggedInContainer = ({ children, currActiveScreen }) => {
  // const location = useLocation();
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModal, setAddToPlaylistModal] = useState(false);

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) return;
    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong?._id;

    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    // console.log(response.playlist);
    // console.log(response.playlist.songs);
    if (response._id) {
      setAddToPlaylistModal(false);
    }
    // console.log(response);

    // return response;
  };

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) soundPlayed.stop();

    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound(currentSong.track);
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  const handleLogOut = () => {
    logoutUser({ removeCookie, navigate });
  };

  return (
    <div className="h-full w-full bg-app-black">
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModal && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModal(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div className={`${currentSong ? "h-9/10" : "h-full"}   w-full flex`}>
        <div className="h-full w-1/5  bg-black flex flex-col justify-between pb-10">
          <div>
            <div className="p-5 text-white font-sans flex justify-center items-center gap-5  ">
              <img src={spotify_logo} alt="spotifyLogo" width={60} />
              <h1 className="text-xl font-semibold font-poppins">Spotaana</h1>
            </div>
            <div className="py-5">
              <IconText
                iconName={"fluent:home-20-filled"}
                displayText={"Home"}
                targetLink="/home"
                active={currActiveScreen === "home"}
                // active={location.pathname === "/home"}
              />
              <IconText
                iconName={"material-symbols:search"}
                displayText={"Search"}
                targetLink="/search"
                active={currActiveScreen === "search"}
              />
              <IconText
                iconName={"ooui:logo-wikibooks"}
                displayText={"Library"}
                active={currActiveScreen === "library"}
                targetLink="/library"
              />
              <IconText
                iconName={"tdesign:cd"}
                displayText={"My Music"}
                targetLink="/myMusic"
                active={currActiveScreen === "myMusic"}
                // active={location.pathname === "/myMusic"}
              />
            </div>
            <div className="pt-5">
              <IconText
                iconName={"basil:add-solid"}
                displayText={"Create Playlist"}
                onClick={() => {
                  setCreatePlaylistModalOpen(true);
                }}
              />
              <IconText iconName={"fe:heart"} displayText={"Liked Songs"} />
            </div>
          </div>
          <div className="px-5 ">
            <div
              className="py-1 w-1/2  border border-gray-100 rounded-full text-white flex items-center  justify-center cursor-pointer"
              onClick={handleLogOut}
            >
              <Icon icon="eva:person-delete-outline" width="18" height="18" />
              <div className="ml-2 text-sm font-semibold">Log Out</div>
            </div>
            <div className="py-1 px-[7px] mt-2  border border-gray-100 rounded-full text-white w-2/5 flex items-center  justify-center cursor-pointer">
              <Icon icon="iconoir:globe" />
              <div className="ml-2 text-sm font-semibold">English</div>
            </div>
          </div>
        </div>
        <div className="h-full w-4/5 bg-app-black overflow-auto">
          {/* navbar */}
          <div className="w-full h-1/10 flex bg-black bg-opacity-30 items-center justify-end">
            <div className="w-1/2 flex h-full">
              <div className="w-3/5 flex justify-around items-center">
                <TextHover displayText={"Premium"} />
                <TextHover displayText={"Support"} />
                <TextHover displayText={"Download"} />
                <div className="h-1/2 border-r border-white"></div>
              </div>
              <div className="w-2/5 flex justify-around h-full items-center">
                <TextHover displayText={"Upload Songs"} />
                <div className="bg-white w-10 h-10  flex items-center justify-center rounded-full font-semibold cursor-pointer">
                  tc
                </div>
              </div>
            </div>
          </div>
          {/* content */}
          <div className="p-8 pt-0 overflow-auto">{children}</div>
        </div>
      </div>
      {currentSong && (
        <div className="w-full h-1/10 bg-black bg-opacity-30 flex items-center text-white p-4">
          <div className="w-1/4 flex items-center">
            <img
              src={currentSong.thumbnail}
              alt="currentSongThumbbnail"
              className="h-11 w-11 rounded-lg"
            />
            <div className="pl-4">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>

          <div className="w-1/2 h-full flex justify-center flex-col items-center">
            <div className="flex w-1/3 justify-between items-center">
              <Icon
                icon="system-uicons:shuffle"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="ic:round-skip-previous"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon={
                  isPaused
                    ? "solar:play-circle-bold-duotone"
                    : "solar:pause-circle-bold-duotone"
                }
                fontSize={38}
                className="cursor-pointer text-gray-500 hover:text-white"
                onClick={togglePlayPause}
              />
              <Icon
                icon="ic:round-skip-next"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />

              <Icon
                icon="iconoir:repeat"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </div>
            <div></div>
          </div>
          <div className="w-1/4 flex justify-end items-center pr-4 space-x-4">
            <Icon
              icon="solar:playlist-outline"
              width="24"
              height="30"
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => {
                setAddToPlaylistModal(true);
              }}
            />
            <Icon
              icon="icon-park-solid:like"
              width="48"
              height="22"
              className="cursor-pointer text-gray-500 hover:text-red-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
