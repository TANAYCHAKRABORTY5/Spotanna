import { use, useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import SingleSongCard from "../components/shared/SingleSongCard";

const SearchPage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);

  const searchSong = async () => {
    const response = await makeAuthenticatedGETRequest(
      "/song/get/songname/" + searchText
    );
    // console.log(response);
    setSongData(response.data);
  };

  return (
    <LoggedInContainer currActiveScreen="search">
      <div className="w-full py-6">
        <div
          className={`w-1/2 p-3 text-sm rounded-full bg-gray-700 px-5 flex text-white space-x-3 items-center ${
            isInputFocused ? "border border-white" : ""
          }`}
        >
          <div>
            <Icon icon="majesticons:search-line" width="24" height="24" />
          </div>
          <input
            type="text"
            placeholder="What do you want to listen to "
            className="w-full bg-gray-700 focus:outline-none"
            onFocus={() => {
              setIsInputFocused(true);
            }}
            onBlur={() => {
              setIsInputFocused(false);
            }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSong();
              }
            }}
          />
        </div>
        {songData.length > 0 ? (
          <div className="pt-10 space-y-3">
            <div className="text-white">
              Search results for key{" "}
              <span className="font-bold">{searchText}</span> are :
            </div>
            {songData.map((item) => {
              return (
                <SingleSongCard
                  info={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-gray-400 pt-10">
            Nothing to show here. Please try again
          </div>
        )}
      </div>
    </LoggedInContainer>
  );
};

export default SearchPage;
