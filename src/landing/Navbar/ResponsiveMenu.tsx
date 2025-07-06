import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import { NavLinks } from "../Navbar/NavLinks";

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
}

const ResponsiveMenu: React.FC<ResponsiveMenuProps> = ({
  showMenu,
  openSubmenu,
  toggleSubmenu,
  setShowMenu,
}) => {
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-dark dark:text-white px-8 pb-6 pt-16 text-black duration-300 transition-all ease-in-out md:hidden rounded-r-xl shadow-md`}
    >
      <div>
        {/* User Info */}
        <div className="flex items-center justify-start gap-3">
          <FaUserCircle className="text-6xl" />
          <div>
            <h1>Hello Agus</h1>
            <h1 className="text-sm text-slate-500">Premium user</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-12">
          <ul>
            {NavLinks.map(({ id, name, link, submenu }: NavLinkItem) => (
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
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-gray-300 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">created by agus</p>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
