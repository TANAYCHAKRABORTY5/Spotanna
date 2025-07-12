import { useParams } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import SingleSongCard from "../components/shared/SingleSongCard";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";

const SinglePlaylistView = () => {
  const [playlistDetails, setPlaylistDetails] = useState();
  const { playlistId } = useParams();
  console.log(playlistDetails, "playlistDetails");

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/playlist/" + playlistId
      );
      console.log(response);

      setPlaylistDetails(response);
      //   console.log(playlistDetails, "maa ki chut website ki");
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currActiveScreen={"library"}>
      {playlistDetails?._id && (
        <div>
          <div className="text-white text-xl pt-8 font-semibold">
            PlayList Name
          </div>
          <div className="pt-10 space-y-3">
            {playlistDetails.songs.map((item) => {
              return (
                <SingleSongCard
                  info={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                />
              );
            })}
          </div>
        </div>
      )}
    </LoggedInContainer>
  );
};

export default SinglePlaylistView;
