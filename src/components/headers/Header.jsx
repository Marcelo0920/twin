import { LogIn, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./styles/header.css";

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="second-header">
      <div className="second-header-container">
        <a href="/" className="logo">
          TWIN®
        </a>

        <div className="second-header-actions">
          <a href="/login" className="btn btn-primary">
            <LogIn size={18} />
            Login
          </a>
          <button
            className="mobile-menu-btn"
            onClick={() =>
              setMobileMenuOpen && setMobileMenuOpen(!mobileMenuOpen)
            }
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
