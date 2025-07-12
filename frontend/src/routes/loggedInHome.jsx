import LoggedInContainer from "../containers/LoggedInContainer";

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

const LoggedInHomeComponent = () => {
  return (
    <LoggedInContainer currActiveScreen="home">
      <PlaylistView titleText={"Focus"} cardsData={focusCardData} />
      <PlaylistView
        titleText={"Spotaana Playlists"}
        cardsData={spotifyCardsData}
      />
      <PlaylistView titleText={"Sound of India"} cardsData={focusCardData} />
    </LoggedInContainer>
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

export default LoggedInHomeComponent;
