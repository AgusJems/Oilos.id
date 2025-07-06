import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

const Footer: React.FC = () => {
  return (
    <div className="bg-black text-white justify-items-center">
      <div className="container">
        <div data-aos="zoom-in" className="grid md:grid-cols-3 pb-20 pt-5">
          {/* Company details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img
                src="/images/logo/logo-white.png"
                alt="Logo"
                className="max-w-[150px]"
              />
            </h1>
            <p className='text-gray-200'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum in
              beatae ea recusandae blanditiis veritatis.
            </p>
            <div className="flex items-center gap-3 mt-6">
                <a href="#">
                  <FaInstagram className="text-3xl cursor-pointer hover:text-pink-700 hover:translate-x-1 duration-300 text-gray-200" />
                </a>
                <a href="#">
                  <FaFacebook className="text-3xl cursor-pointer hover:text-blue-600 hover:translate-x-1 duration-300 text-gray-200" />
                </a>
                <a href="#">
                  <FaLinkedin className="text-3xl cursor-pointer hover:text-blue-400 hover:translate-x-1 duration-300 text-gray-200" />
                </a>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p className="cursor-pointer hover:text-yellow-400 hover:translate-x-1 duration-300 text-gray-200">Noida, Uttar Pradesh</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p className="cursor-pointer hover:text-yellow-400 hover:translate-x-1 duration-300 text-gray-200" >+91 123456789</p>
                </div>
              </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Resources
              </h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((link) => (
                  <li
                    className="cursor-pointer hover:text-yellow-400 hover:translate-x-1 duration-300 text-gray-200"
                    key={link.title}
                  >
                    <span>{link.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Link Penting
              </h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((link) => (
                  <li
                    className="cursor-pointer hover:text-yellow-400 hover:translate-x-1 duration-300 text-gray-200"
                    key={link.title + '-2'}
                  >
                    <span>{link.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Perusahaan
              </h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((link) => (
                  <li
                    className="cursor-pointer hover:text-yellow-400 hover:translate-x-1 duration-300 text-gray-200"
                    key={link.title + '-2'}
                  >
                    <span>{link.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center py-10 border-t-2 border-gray-300/50 text-white">
          Copyright @2025, Oilos.id | All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
