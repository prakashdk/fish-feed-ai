import React from "react";
import {
  FiActivity,
  FiBarChart2,
  FiCheckSquare,
  FiChevronLeft,
  FiDroplet,
  FiHeart,
  FiHome,
  FiTrendingUp
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import AIBadge from "../components/AiBadge";

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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold select-none">Aqua AI</h2>
        <button
          onClick={toggleSidebar}
          className="cursor-pointer rounded-full hover:bg-blue-800 p-2"
          title="Close Sidebar"
        >
          <FiChevronLeft />
        </button>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-3 text-base font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-800 text-white"
                    : "hover:bg-blue-800 text-blue-100"
                }`
              }
            >
              <FiHome size={18} />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-800 text-white"
                    : "hover:bg-blue-800 text-blue-100"
                }`
              }
            >
              <FiActivity size={18} />
              <span className="flex-1">Feed</span>
              <AIBadge />
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/charts"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-800 text-white"
                    : "hover:bg-blue-800 text-blue-100"
                }`
              }
            >
              <FiBarChart2 size={18} />
              Feed Charts
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/ponds"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-800 text-white"
                    : "hover:bg-blue-800 text-blue-100"
                }`
              }
            >
              <FiDroplet size={18} />
              Ponds
            </NavLink>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-100 opacity-50 cursor-not-allowed">
              <FiTrendingUp size={18} />
              <span className="flex-1">Insights</span>
              <span className="text-xs text-yellow-300">Coming Soon</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-100 opacity-50 cursor-not-allowed">
              <FiHeart size={18} />
              <span className="flex-1">Health</span>
              <span className="text-xs text-yellow-300">Coming Soon</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-100 opacity-50 cursor-not-allowed">
              <FiCheckSquare size={18} />
              <span className="flex-1">Tasks</span>
              <span className="text-xs text-yellow-300">Coming Soon</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
