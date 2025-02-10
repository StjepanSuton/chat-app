import { MessageContainer, Sidebar } from "src/components";

const Home = () => {
  return (
    <div className="flex h-[80vh] border-2 w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
