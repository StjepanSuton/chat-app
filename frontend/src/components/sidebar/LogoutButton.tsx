import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "src/services";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { mutateAsync: logout } = useLogout(navigate);
  return (
    <div className="mt-auto">
      <LogOut
        className="w-6 h-6 text-white cursor-pointer"
        onClick={async () => await logout()}
      />
    </div>
  );
};
export default LogoutButton;
