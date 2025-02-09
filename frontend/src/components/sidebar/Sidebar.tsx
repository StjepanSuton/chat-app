import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import ProfileBar from "./ProfileBar";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-1 md:p-4 flex flex-col w-44 md:w-1/2">
      <ProfileBar />

      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
