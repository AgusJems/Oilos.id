import React from "react";
import Navbar from "../components/landing/Navbar/Navbar";
import Footer from "../components/landing/Footer/Footer";
import { Outlet } from "react-router-dom";

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
