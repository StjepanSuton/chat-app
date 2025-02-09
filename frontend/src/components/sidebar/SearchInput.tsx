import { useGetUser } from "src/services";

const SearchInput = () => {
  const { data: authUser } = useGetUser();

  return <div>{authUser?.fullName}</div>;
};
export default SearchInput;
