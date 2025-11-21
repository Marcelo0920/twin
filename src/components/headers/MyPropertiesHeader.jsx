import { LogIn } from "lucide-react";
import UserDropdown from "./UserDropdown";
import "./styles/myPropertiesHeader.css";

const MyPropertiesHeader = () => {
  // Simulation of logged user - in real app, this would come from context/state management
  const isLogged = true;
  const userData = {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
  };

  return (
    <header className="my-properties-header">
      <div className="my-properties-header-container">
        <a href="/" className="logo">
          TWIN®
        </a>

        <div className="my-properties-header-actions">
          {isLogged ? (
            <UserDropdown userData={userData} />
          ) : (
            <a href="/login" className="btn btn-primary">
              <LogIn size={18} />
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default MyPropertiesHeader;
