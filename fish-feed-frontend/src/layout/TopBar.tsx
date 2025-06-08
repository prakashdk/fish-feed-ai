import React from "react";
import { FaBars } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import UserProfile from "./UserProfile";

interface TopBarProps {
  toggleSidebar: () => void;
  isSideBarOpen: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  toggleSidebar,
  isSideBarOpen,
}) => {
  return (
    <div className="sticky top-0 left-0 w-full bg-blue-900 text-white p-4 z-10 flex justify-between items-center">
      {/* Left side - Sidebar toggle and Title */}
      <div
        className={`flex items-center gap-x-1 ${
          isSideBarOpen ? `invisible` : ""
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="p-3 text-2xl cursor-pointer rounded-full hover:bg-gray-700"
        >
          <FaBars />
        </button>
        <h2
          className={`text-2xl font-bold select-none ${
            isSideBarOpen ? `invisible` : ""
          }`}
        >
          Aqua AI
        </h2>
      </div>

      {/* Right side - User Profile */}
      <div className="flex items-center gap-4">
        <button
          title="Notifications"
          className="relative p-2 rounded-full hover:bg-blue-800 transition"
        >
          <FiBell size={20} />
          {/* Optional: notification dot */}
          {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
        </button>
        <UserProfile />
      </div>
    </div>
  );
};
