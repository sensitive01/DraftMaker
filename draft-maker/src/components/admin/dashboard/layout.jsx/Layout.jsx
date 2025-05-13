import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();
  const adminInfo = localStorage.getItem("admin")
  console.log("adminInfo",adminInfo)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const SidebarContent = () => {
    const navItems = [
      {
        icon: Home,
        label: "Dashboard",
        path: "/admin/dashboard",
        isActive: location.pathname === "/admin/dashboard",
      },
      {
        icon: BookOpen,
        label: "Document Price",
        path: "/admin/documents-price-table",
        isActive: location.pathname === "/admin/documents-price-table",
      },
    ];

    const bottomNavItems = [
      {
        icon: Settings,
        label: "Settings",
        path: "/settings",
        isActive: location.pathname === "/settings",
      },
      {
        icon: HelpCircle,
        label: "Help",
        path: "/help",
        isActive: location.pathname === "/help",
      },
    ];

    const renderNavItems = (items) =>
      items.map((item) => (
        <li key={item.path} className="mb-2">
          <Link
            to={item.path}
            className={`
            flex items-center p-3 rounded-lg transition-all duration-300 group
            ${
              item.isActive
                ? "bg-red-600 text-white shadow-md"
                : "text-red-900 hover:bg-red-100 hover:text-red-700"
            }
            ${isSidebarOpen && !isMobile ? "justify-start" : "justify-center"}
          `}
          >
            <item.icon
              size={22}
              className={`
                ${isSidebarOpen && !isMobile ? "mr-3" : ""}
                ${item.isActive ? "text-current" : "text-red-600"}
              `}
            />
            <span
              className={`
              font-medium
              ${!isSidebarOpen && !isMobile ? "hidden" : ""}
              ${isMobile && !isSidebarOpen ? "hidden" : ""}
              ${isSidebarOpen ? "ml-3" : ""}
            `}
            >
              {item.label}
            </span>
          </Link>
        </li>
      ));

    return (
      <div className="h-full flex flex-col bg-white shadow-xl border-r border-red-100">
        <div className="flex items-center justify-center p-4 border-b border-red-100 bg-red-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">DM</span>
            </div>
            <span
              className={`
              font-bold text-lg text-red-900 
              ${!isSidebarOpen && !isMobile ? "hidden" : ""}
              ${isMobile && !isSidebarOpen ? "hidden" : ""}
            `}
            >
             Draft Maker
            </span>
          </div>
        </div>

        <nav className="flex-1 p-2 bg-white">
          <ul className="space-y-1">{renderNavItems(navItems)}</ul>
        </nav>

        <div className="p-4 border-t border-red-100 bg-red-50">
          <ul className="space-y-2">{renderNavItems(bottomNavItems)}</ul>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-red-50 overflow-hidden">
      <div
        className={`
        fixed 
        left-0 
        top-0 
        bottom-0 
        bg-white 
        text-red-900 
        transition-all 
        duration-300 
        z-50
        shadow-2xl
        ${
          isMobile
            ? isSidebarOpen
              ? "w-64 shadow-2xl"
              : "w-0 overflow-hidden"
            : isSidebarOpen
            ? "w-64"
            : "w-20"
        }
        ${isMobile && isSidebarOpen ? "backdrop-blur-sm bg-opacity-50" : ""}
      `}
      >
        {(isSidebarOpen || !isMobile) && <SidebarContent />}
      </div>

      <main
        className={`
        flex 
        flex-col 
        flex-1 
        overflow-hidden 
        transition-all 
        duration-300
        ${
          isMobile
            ? isSidebarOpen
              ? "ml-0 opacity-50 pointer-events-none"
              : "ml-0"
            : isSidebarOpen
            ? "ml-64"
            : "ml-20"
        }
      `}
      >
        <div className="bg-white shadow-md p-4 flex justify-between items-center border-b border-red-100">
          <div className="flex items-center">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="mr-4 p-2 hover:bg-red-100 rounded-full"
              >
                {isSidebarOpen ? (
                  <X size={24} className="text-red-600" />
                ) : (
                  <Menu size={24} className="text-red-600" />
                )}
              </button>
            )}

            <div className="relative ml-4 hidden md:block">
              <input
                type="text"
                placeholder="Search menu, orders..."
                className="
                  w-full 
                  pl-10 
                  pr-4 
                  py-2 
                  rounded-full 
                  bg-red-50 
                  text-red-900 
                  border 
                  border-red-200
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-red-500
                "
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-4 relative">
            <button className="relative hover:bg-red-100 p-2 rounded-full group">
              <Bell
                size={20}
                className="text-red-600 group-hover:text-red-800"
              />
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="hover:bg-red-100 p-2 rounded-full flex items-center"
              >
                <div className="w-8 h-8 rounded-full bg-red-200 mr-2 overflow-hidden flex items-center justify-center">
                  <User size={20} className="text-red-700" />
                </div>
                <span className="hidden md:inline text-red-900 font-medium">
                  John Doe
                </span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-red-200 rounded-lg shadow-lg">
                  <div className="p-4 border-b border-red-100 bg-red-50 flex items-center">
                    <div className="w-12 h-12 bg-red-200 rounded-full mr-4 flex items-center justify-center">
                      <User size={24} className="text-red-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-red-900">John Doe</p>
                      <p className="text-sm text-red-600">Restaurant Manager</p>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link
                        to="/profile"
                        className=" px-4 py-3 hover:bg-red-50 flex items-center text-red-800 hover:text-red-900"
                      >
                        <User size={16} className="mr-3" />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center text-red-800 hover:text-red-900"
                      >
                        <LogOut size={16} className="mr-3" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="p-4 flex-1 overflow-y-auto bg-red-50"
          onClick={() => {
            if (isProfileMenuOpen) {
              setIsProfileMenuOpen(false);
            }
            if (isMobile && isSidebarOpen) {
              setIsSidebarOpen(false);
            }
          }}
        >
          {children}
        </div>
      </main>

      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Layout;
