import { LogIn, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeHeader = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="logo">
          TWIN®
        </a>

        <div className="header-actions">
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

export default HomeHeader;
