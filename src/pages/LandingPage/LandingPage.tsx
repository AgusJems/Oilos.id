// src/pages/LandingPage/LandingPage.tsx
import React from "react";
import Hero from "../../components/landing/Hero/Hero";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Service from "../../components/landing/OurService/Service";
import Banner from "../../components/landing/Banner/Banner";
import Safety from "../../components/landing/Safety/Safety";
import Patner from "../../components/landing/Patner/Patner";
import News from "../../components/landing/OurNews/Berita";
import Testimonial from "../../components/landing/Testimoni/Testimoni";

const LandingPage: React.FC = () => {
  return (
    <div className="dark:bg-black dark:text-white">
      <Hero handleOrderPopup={() => console.log("Popup dibuka")} />
      <Banner/>
      <Service/>
      <Safety/>
      <Patner/>
      <News/>
      <Testimonial/>
    </div>
  );
};

export default LandingPage;
