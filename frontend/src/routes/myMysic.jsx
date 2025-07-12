import { use, useEffect, useState } from "react";

import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import LoggedInContainer from "../containers/LoggedInContainer";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
      console.log(response.data);
      setSongData(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currActiveScreen="myMusic">
      <div className="text-white text-xl pb-4 pl-2 font-semibold">MySongs</div>
      <div className="space-y-3 overflow-auto">
        {songData.map((item) => {
          return (
            <SingleSongCard key={item._id} info={item} playSound={() => {}} />
          );
        })}
      </div>
    </LoggedInContainer>
  );
};

export default MyMusic;
