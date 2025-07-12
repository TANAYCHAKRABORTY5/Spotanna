import spotify_logo from "../assets/spotify_logo_white.png";
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react/dist/iconify.js";
import TextHover from "../components/shared/TextHover";
import TextInput from "../components/shared/TextInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/ServerHelper";
import { useNavigate } from "react-router-dom";

const UploadSongComponent = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState(null);
  const navigate = useNavigate();

  const submitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl };
    const response = await makeAuthenticatedPOSTRequest("/song/create", data);
    if (response.err) {
      alert("Could not create song");
      return;
    }
    alert("Success");
    navigate("/home");
  };

  return (
    <div className="h-full w-full flex ">
      <div className="h-full w-1/5  bg-black flex flex-col justify-between pb-10">
        <div>
          <div className="p-5">
            <img src={spotify_logo} alt="spotifyLogo" width={120} />
          </div>
          <div className="py-5">
            <IconText
              iconName={"fluent:home-20-filled"}
              displayText={"Home"}
              active
            />
            <IconText
              iconName={"material-symbols:search"}
              displayText={"Search"}
            />
            <IconText
              iconName={"ooui:logo-wikibooks"}
              displayText={"Library"}
            />
            <IconText iconName={"tdesign:cd"} displayText={"My Music"} />
          </div>
          <div className="pt-5">
            <IconText
              iconName={"basil:add-solid"}
              displayText={"Create Playlist"}
            />
            <IconText iconName={"fe:heart"} displayText={"Liked Songs"} />
          </div>
        </div>
        <div className="px-5 ">
          <div className="py-1 px-[7px]  border border-gray-100 rounded-full text-white w-2/5 flex items-center  justify-center cursor-pointer">
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
        <div className="p-8 pt-0 overflow-auto">
          <div className="text-2xl font-semibold mb-5 text-white mt-8">
            Upload Your Music
          </div>
          <div className="w-2/3 flex space-x-3">
            <div className="w-1/2">
              <TextInput
                label="Name"
                labelClassName={"text-white"}
                placeholder="Name"
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                label="Thumbnail"
                labelClassName={"text-white"}
                placeholder="Thumbnail"
                value={thumbnail}
                setValue={setThumbnail}
              />
            </div>
          </div>
          <div className="py-5">
            {uploadedSongFileName ? (
              <div className="bg-white rounded-full p-3 w-1/3">
                {uploadedSongFileName.substring(0, 35)}...
              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setPlaylistUrl}
                setName={setUploadedSongFileName}
              />
            )}
          </div>
          <div
            className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
            onClick={submitSong}
          >
            Submit Song
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSongComponent;
