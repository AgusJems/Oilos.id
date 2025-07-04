// src/pages/LandingPage/LandingPage.tsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "../../components/landing/Hero/Hero";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../../components/landing/Navbar/Navbar";
import Service from "../../components/landing/OurService/Service";

const LandingPage: React.FC = () => {
  useEffect(() => {
    AOS.init({ offset: 100, duration: 600, easing: "ease-in-sine", delay: 100 });
  }, []);

  return (
    <div className="dark:bg-dark dark:text-white">
      <Navbar/>
      <Hero handleOrderPopup={() => console.log("Popup dibuka")} />
      <Service/>
    </div>
  );
};

export default LandingPage;
