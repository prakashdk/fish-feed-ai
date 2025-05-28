import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isIconRotated, setIconRotated] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setIconRotated((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setIconRotated(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center p-2 bg-transparent text-white rounded-full cursor-pointer"
      >
        <FaUserCircle size={30} />
        <div
          className={`ml-1 transform transition-transform duration-300 ${
            isIconRotated ? "rotate-180" : ""
          }`}
        >
          {isMenuOpen ? <FaCaretUp size={16} /> : <FaCaretDown size={16} />}
        </div>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-12 bg-white text-gray-700 rounded-lg shadow-lg w-48 p-2 transition-all duration-300 z-50">
          <button
            onClick={() => navigate("/account")}
            className="w-full text-left p-2 hover:bg-gray-200 rounded-lg"
          >
            View Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left p-2 hover:bg-gray-200 rounded-lg text-red-600"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
