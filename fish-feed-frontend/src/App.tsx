import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./layout/Dashboard";
import { Feed } from "./layout/FeedComponent";
import { Sidebar } from "./layout/SideBar";
import { TopBar } from "./layout/TopBar";
import { Account } from "./layout/Account";
import { Ponds } from "./layout/Ponds";
import { useOrganization as useOrganization } from "./hooks/useOrganization";
import { initDeviceSocket } from "./hooks/deviceSocketService";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
  const fetchOrganization = useOrganization((state) => state.fetchOrganization);

  useEffect(() => {
    fetchOrganization();
    initDeviceSocket()
  }, [fetchOrganization]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <div className="flex">
          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          {/* Main Content Area */}
          <div
            className={`flex-1 transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "ml-64" : "ml-0"
            }`}
          >
            <TopBar
              isSideBarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
            <div className="bg-blue-900 pt-1.5">
              <div className="bg-white rounded-tl-2xl rounded-tr-2xl">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/ponds" element={<Ponds />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
