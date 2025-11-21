import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Bookmark,
  Settings,
  LogOut,
  ChevronDown,
  Home,
  BookOpen,
} from "lucide-react";
import "./styles/userDropdown.css";

const UserDropdown = ({ userData }) => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserMenuAction = (action) => {
    setIsUserMenuOpen(false);

    switch (action) {
      case "properties":
        navigate("/mis-propiedades");
        break;
      case "saved":
        navigate("/classic", { state: { showSavedOnly: true } });
        break;
      case "cuaderno":
        navigate("/cuaderno");
        break;
      case "settings":
        console.log("Navigate to settings");
        // navigate('/settings');
        break;
      case "logout":
        console.log("Logout user");
        // Handle logout logic
        break;
      default:
        break;
    }
  };

  return (
    <div className="user-menu-container" ref={userMenuRef}>
      <button
        className={`user-menu-trigger ${isUserMenuOpen ? "open" : ""}`}
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
      >
        <div className="user-avatar">
          <User size={18} />
        </div>
        <span className="user-name">{userData.name}</span>
        <ChevronDown
          size={16}
          className={`user-menu-chevron ${isUserMenuOpen ? "rotated" : ""}`}
        />
      </button>

      {isUserMenuOpen && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <div className="user-menu-avatar">
              <User size={20} />
            </div>
            <div className="user-menu-info">
              <div className="user-menu-name">{userData.name}</div>
              <div className="user-menu-email">{userData.email}</div>
            </div>
          </div>

          <div className="user-menu-divider"></div>

          <div className="user-menu-options">
            <button
              className="user-menu-option"
              onClick={() => handleUserMenuAction("properties")}
            >
              <Home size={18} />
              <span>Mis propiedades</span>
            </button>

            <button
              className="user-menu-option"
              onClick={() => handleUserMenuAction("saved")}
            >
              <Bookmark size={18} />
              <span>Guardados</span>
            </button>

            <button
              className="user-menu-option"
              onClick={() => handleUserMenuAction("cuaderno")}
            >
              <BookOpen size={18} />
              <span>Cuaderno</span>
            </button>

            <button
              className="user-menu-option"
              onClick={() => handleUserMenuAction("settings")}
            >
              <Settings size={18} />
              <span>Configuración</span>
            </button>

            <div className="user-menu-divider"></div>

            <button
              className="user-menu-option logout"
              onClick={() => handleUserMenuAction("logout")}
            >
              <LogOut size={18} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
