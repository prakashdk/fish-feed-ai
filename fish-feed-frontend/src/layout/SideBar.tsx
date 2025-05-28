import AIBadge from "../components/AiBadge";
import React from "react";
import { FaHome, FaFish, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-blue-900 text-white z-20 p-6 transition-all duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:w-64`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold select-none">Aqua AI</h2>
        <button
          onClick={toggleSidebar}
          className="cursor-pointer rounded-full hover:bg-gray-700 p-2"
        >
          {isOpen ? <FaChevronLeft /> : "Open Sidebar"}
        </button>
      </div>
      <nav className="mt-8">
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-3 text-lg hover:text-gray-300"
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/feed"
              className="flex items-center space-x-3 text-lg hover:text-gray-300 "
            >
              <FaFish />
              <div>Feed</div>
              <AIBadge />
            </Link>
          </li>
          <li>
            <Link
              to="/ponds"
              className="flex items-center space-x-3 text-lg hover:text-gray-300 "
            >
              <FaFish />
              <div>Ponds</div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
