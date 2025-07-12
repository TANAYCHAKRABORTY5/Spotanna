import spotify_logo from "../assets/spotify_logo_white.png";
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react/dist/iconify.js";
import TextHover from "../components/shared/TextHover";

const focusCardData = [
  {
    title: "tanay Hero",
    description: "gana gaoaoao",
    imgUrl:
      "https://images.unsplash.com/photo-1745872261239-695afa75aa10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "tanay Hero",
    description: "gana gaoaoao",
    imgUrl:
      "https://images.unsplash.com/photo-1745872261239-695afa75aa10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "tanay Hero",
    description: "gana gaoaoao",
    imgUrl:
      "https://images.unsplash.com/photo-1745872261239-695afa75aa10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "tanay Hero",
    description: "gana gaoaoao",
    imgUrl:
      "https://images.unsplash.com/photo-1745872261239-695afa75aa10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "tanay Hero",
    description: "gana gaoaoao",
    imgUrl:
      "https://images.unsplash.com/photo-1745872261239-695afa75aa10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
const spotifyCardsData = [
  {
    title: "laura de lasun",
    description: "gana gaoaoao",
    imgUrl:
      "https://images.unsplash.com/photo-1745872261239-695afa75aa10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "tanay Hero",
    description: "gana gaoaoao",
    imgUrl:
      "https://images.unsplash.com/photo-1745872261239-695afa75aa10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "tanay Hero",
    description: "gana gaoaoao",
    imgUrl:
      "https://images.unsplash.com/photo-1745872261239-695afa75aa10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "tanay Hero",
    description: "gana gaoaoao",
    imgUrl:
      "https://images.unsplash.com/photo-1745872261239-695afa75aa10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "tanay Hero",
    description: "gana gaoaoao",
    imgUrl:
      "https://images.unsplash.com/photo-1745872261239-695afa75aa10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const HomeComponent = () => {
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
              <TextHover displayText={"Sign up"} />
              <div className="bg-white h-2/3 px-6 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                Log in
              </div>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="p-8 pt-0 overflow-auto">
          <PlaylistView titleText={"Focus"} cardsData={focusCardData} />
          <PlaylistView
            titleText={"Spotaana Playlists"}
            cardsData={spotifyCardsData}
          />
          <PlaylistView
            titleText={"Sound of India"}
            cardsData={focusCardData}
          />
        </div>
      </div>
    </div>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4">
        {cardsData.map((item) => {
          return (
            <Card
              title={item.title}
              description={item.description}
              imgUrl={item.imgUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
      <div className="pb-4 pt-2">
        <img
          className="w-full rounded-md max-h-44 object-cover"
          src={imgUrl}
          alt="label"
        />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default HomeComponent;
