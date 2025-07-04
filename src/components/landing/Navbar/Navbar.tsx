import React, { useState } from "react";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import DarkMode from "./DarkMode";
import ResponsiveMenu from "./ResponsiveMenu";
import { NavLinks } from "../Navbar/NavLinks";

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleSubmenu = (id: number) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  const hasLinks = NavLinks.length > 0;

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur bg-white/80 dark:bg-black/80 shadow-md dark:text-white duration-300">
        <div className="max-w-screen-xl mx-auto px-4 py-2 md:py-0">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <a href="/">
                    <img
                    src="/images/logo/logo.png"
                    alt="Logo"
                    width={100}
                    height={70}
                    className="object-contain"
                    />
                </a>

                {/* Menu Desktop */}
                <div className="hidden md:block">
                    {hasLinks ? (
                    <ul className="flex items-center gap-4">
                        {NavLinks.map(({ id, name, link, submenu }) => (
                        <li key={id} className="relative group py-6">
                            {!submenu ? (
                            <a href={link} className="text-md font-medium text-black dark:text-white py-2 px-4 inline-block hover:text-green-500 cursor-pointer duration-300">
                                {name}
                            </a>
                            ) : (
                            <div className="group inline-block text-left">
                                <button className="text-sm font-medium text-black dark:text-white py-2 px-4 rounded-full hover:bg-primary hover:text-white duration-300">
                                {name}
                                </button>
                                <ul className="absolute z-20 hidden group-hover:block min-w-[200px] bg-white dark:bg-gray-900 text-black dark:text-white rounded-md shadow-lg mt-2">
                                {submenu.map((item, idx) => (
                                    <li key={idx}>
                                    <a
                                        href={item.link}
                                        className="block px-4 py-2 text-sm rounded hover:bg-primary hover:text-white transition duration-200"
                                    >
                                        {item.name}
                                    </a>
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
                
                <div className="hidden md:flex gap-3">
                    <button className="bg-gradient-to-r from-green-500 to-green-400 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                        Sign In
                    </button>
                    <button className="bg-gradient-to-r from-green-500 to-green-400 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                        Daftar Member
                    </button>
                </div>

                {/* Menu Mobile */}
                <div className="md:hidden flex items-center gap-4">
                    <DarkMode />
                    {hasLinks &&
                    (showMenu ? (
                        <HiMenuAlt1
                        onClick={toggleMenu}
                        className="cursor-pointer transition-all"
                        size={30}
                        />
                    ) : (
                        <HiMenuAlt3
                        onClick={toggleMenu}
                        className="cursor-pointer transition-all"
                        size={30}
                        />
                    ))}
                </div>
            </div>
        </div>

    {/* Mobile Responsive Menu */}
    {hasLinks && (
        <ResponsiveMenu
        showMenu={showMenu}
        openSubmenu={openSubmenu}
        toggleSubmenu={toggleSubmenu}
        setShowMenu={setShowMenu}
        />
    )}
    </nav>
  );
};

export default Navbar;
