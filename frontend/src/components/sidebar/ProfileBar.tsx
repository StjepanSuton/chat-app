import { useGetUserProfile } from "src/services";

const ProfileBar = () => {
  const { data: userProfile } = useGetUserProfile();

  return (
    <div className="flex items-center bg-green-500 rounded p-2 py-1 cursor-pointer">
      <div className="w-8 md:w-12 relative rounded-full">
        <img src={userProfile?.profilePic} alt="user avatar" />
      </div>
      <p className="font-bold text-gray-200 text-sm ml-2 md:text-md">
        {userProfile?.fullName}
      </p>
    </div>
  );
};
export default ProfileBar;
