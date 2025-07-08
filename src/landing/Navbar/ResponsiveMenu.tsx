import React from "react";
import { HiChevronDown } from "react-icons/hi";
import { NavLinks } from "../Navbar/NavLinks";

interface DecodedUser {
  Name?: string;
  CodeRefferal?: string;
}

interface SubmenuItem {
  name: string;
  link: string;
}

interface NavLinkItem {
  id: number;
  name: string;
  link: string;
  submenu?: SubmenuItem[];
}

interface ResponsiveMenuProps {
  showMenu: boolean;
  openSubmenu: number | null;
  toggleSubmenu: (id: number) => void;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  user: DecodedUser | null;
  handleLogout: () => void;
}

const ResponsiveMenu: React.FC<ResponsiveMenuProps> = ({
  showMenu,
  openSubmenu,
  toggleSubmenu,
  setShowMenu,
  user,
  handleLogout,
}) => {
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-dark dark:text-white px-8 pb-6 pt-16 text-black duration-300 transition-all ease-in-out md:hidden rounded-r-xl shadow-md`}
    >
      <div>
        {/* User Info */}
        {user ? (
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row-reverse relative mb-4">
            <div className="flex items-center justify-center w-14 h-14 text-2xl font-bold text-green-800 bg-green-100 rounded-full cursor-pointer">
              {user?.Name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-1 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user?.Name || "User"}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center xl:text-left">
                {user?.CodeRefferal || "-"}
              </p>
            </div>
          </div>
        ) : null}

        {/* Navigation */}
        <nav className="mt-4">
          <ul>
            {NavLinks.filter((item) => user || item.id !== 4).map(
              ({ id, name, link, submenu }: NavLinkItem) => (
                <li key={id} className="py-2">
                  {!submenu ? (
                    <a
                      href={link}
                      className="block text-lg font-medium text-black dark:text-white"
                      onClick={() => setShowMenu(false)}
                    >
                      {name}
                    </a>
                  ) : (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(id)}
                        className="w-full flex justify-between items-center text-lg font-medium text-black dark:text-white"
                      >
                        {name}
                        <HiChevronDown
                          className={`transform transition-transform duration-300 ${
                            openSubmenu === id ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>
                      {openSubmenu === id && (
                        <ul className="pl-4 mt-2">
                          {submenu.map((item, idx) => (
                            <li key={idx} className="py-2">
                              <a
                                href={item.link}
                                className="block text-base text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white px-3 py-2 rounded transition duration-200"
                                onClick={() => setShowMenu(false)}
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              )
            )}
          </ul>
        </nav>
      </div>

      {/* Footer & Buttons */}
      <div className="mt-auto pt-6 border-t border-gray-300 dark:border-gray-700">
        {user ? (
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 mb-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7"
              />
            </svg>
            Sign out
          </button>
        ) : (
          <div className="flex flex-col gap-3 mb-3">
            <a
              href="/signin"
              className="text-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition duration-200"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="text-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition duration-200"
            >
              Daftar Member
            </a>
          </div>
        )}
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          created by agus
        </p>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
