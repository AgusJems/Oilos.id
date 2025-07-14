import React, { useState, useEffect, useRef } from "react";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import DarkMode from "./DarkMode";
import ResponsiveMenu from "./ResponsiveMenu";
import { NavLinks } from "../Navbar/NavLinks";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { showLogoutSuccess } from "../../utils/swalFire";

interface DecodedUser {
  name?: string;
  code_referral?: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleSubmenu = (id: number) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  const [user, setUser] = useState<DecodedUser | null>(null);

  // Pemesanan just after login
  const filteredLinks = NavLinks.filter((item) => {
    if (item.name === "Pemesanan" && !user) return false;
    return true;
  });

  const hasLinks = filteredLinks.length > 0;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedUser = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Token invalid:", err);
        setUser(null);
      }
    } else {
      setUser(null);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    showLogoutSuccess();
    window.location.href = "/landing";
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur bg-white/80 dark:bg-black/80 shadow-md dark:text-white duration-300">
      <div className="max-w-screen-xl mx-auto px-4 py-2 md:py-0">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/landing">
            <img src="/images/logo/logo.png" alt="Logo" width={100} height={70} className="dark:hidden" />
            <img src="/images/logo/logo-white.png" alt="Logo" width={100} height={70} className="hidden dark:block" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            {hasLinks ? (
              <ul className="flex items-center gap-4">
                {filteredLinks.map(({ id, name, link, submenu }) => (
                  <li key={id} className="relative group py-6">
                    {!submenu ? (
                      <Link
                        to={link}
                        className="text-md font-medium text-black dark:text-white py-2 px-4 inline-block hover:text-green-500 duration-300"
                      >
                        {name}
                      </Link>
                    ) : (
                      <div className="group inline-block text-left">
                        <button className="text-sm font-medium text-black dark:text-white py-2 px-4 rounded-full hover:bg-primary hover:text-white duration-300">
                          {name}
                        </button>
                        <ul className="absolute z-20 hidden group-hover:block min-w-[200px] bg-white dark:bg-gray-900 text-black dark:text-white rounded-md shadow-lg mt-2">
                          {submenu.map((item, idx) => (
                            <li key={idx}>
                              <Link
                                to={item.link}
                                className="block px-4 py-2 text-sm hover:bg-primary hover:text-white duration-200"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
                <DarkMode />
              </ul>
            ) : (
              <div className="text-gray-400 italic text-sm">Menu tidak tersedia</div>
            )}
          </div>

          {/* User or Auth Buttons */}
          <div>
            {!user ? (
              <div className="hidden md:flex gap-3">
                <Link
                  to="/signin"
                  className="cursor-pointer bg-gradient-to-r from-green-500 to-green-400 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="cursor-pointer bg-gradient-to-r from-green-500 to-green-400 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                >
                  Daftar Member
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex flex-col items-center w-full gap-6 xl:flex-row-reverse relative" ref={dropdownRef}>
                {/* Avatar */}
                <div
                  onClick={toggleDropdown}
                  className="flex items-center justify-center w-14 h-14 text-2xl font-bold text-green-800 bg-green-100 rounded-full cursor-pointer"
                >
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>

                {/* Dropdown */}
                {isOpen && (
                  <div className="absolute right-0 top-[4.5rem] z-50 w-48 bg-white border border-gray-200 rounded-xl shadow-lg p-2 dark:bg-gray-800 dark:border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg group hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                )}

                {/* Nama dan Kode */}
                <div className="order-3 xl:order-2">
                  <h4 className="mb-1 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                    {user.name || "User"}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center xl:text-left">
                    {user.code_referral || "-"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <DarkMode />
            {hasLinks &&
              (showMenu ? (
                <HiMenuAlt1 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
              ) : (
                <HiMenuAlt3 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
              ))}
          </div>
        </div>
      </div>

      {/* Responsive Menu */}
      {hasLinks && (
        <ResponsiveMenu
          showMenu={showMenu}
          openSubmenu={openSubmenu}
          toggleSubmenu={toggleSubmenu}
          setShowMenu={setShowMenu}
          user={user}
          handleLogout={handleLogout}
        />
      )}
    </nav>
  );
};

export default Navbar;
