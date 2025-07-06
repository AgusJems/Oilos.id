import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../landing/Navbar/Navbar";
import Footer from "../landing/Footer/Footer";

const LandingLayout: React.FC = () => {
  return (
    <div className="dark:bg-dark dark:text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingLayout;
