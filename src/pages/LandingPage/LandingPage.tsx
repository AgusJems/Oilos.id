// src/pages/LandingPage/LandingPage.tsx
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "../../landing/Hero/Hero";
import Banner from "../../landing/Banner/Banner";
import Service from "../../landing/OurService/Service";
import Safety from "../../landing/Safety/Safety";
import Patner from "../../landing/Patner/Patner";
import News from "../../landing/OurNews/Berita";
import Testimonial from "../../landing/Testimoni/Testimoni";

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
