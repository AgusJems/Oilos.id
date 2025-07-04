import React from "react";
import Slider from "react-slick";

interface HeroProps {
  handleOrderPopup: () => void;
}

interface ImageItem {
  id: number;
  img: string;
  title: string;
  description: string;
}

const ImageList: ImageItem[] = [
  {
    id: 1,
    img: "/images/cards/slides-1.png",
    title: "Setetes Mengubah Perjalananmu",
    description:
      "Oilos berfungsi meningkatkan akselerasi kendaraan, menurunkan emisi gas buang, serta menghemat BBM.",
  },
  {
    id: 2,
    img: "/images/cards/slides-2.png",
    title: "Setetes Mengubah Perjalananmu",
    description:
      "Oilos berfungsi meningkatkan akselerasi kendaraan, menurunkan emisi gas buang, serta menghemat BBM.",
  },
  {
    id: 3,
    img: "/images/cards/slides-3.png",
    title: "Setetes Mengubah Perjalananmu",
    description:
      "Oilos berfungsi meningkatkan akselerasi kendaraan, menurunkan emisi gas buang, serta menghemat BBM.",
  },
];

const bgStyle: React.CSSProperties = {
  backgroundImage: `url(${'images/cards/card-04.jpg'})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "650px",
  width: "100vw",
};

const Hero: React.FC<HeroProps> = ({ handleOrderPopup }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div style={bgStyle}>
      <div className="dark:bg-dark/60 bg-white/60 backdrop-blur-sm dark:text-white duration-300 h-[650px] flex justify-center items-center">
        <div className="container pb-8 sm:pb-0">
          <Slider {...settings}>
            {ImageList.map((data) => (
              <div key={data.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* Text content */}
                  <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                    <h1
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[Sans-serif]"
                    >
                      {data.title}
                    </h1>
                    <p
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-delay="100"
                      className="text-md"
                    >
                      {data.description}
                    </p>
                    <div
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-delay="300">
                      <button onClick={handleOrderPopup} className="bg-gradient-to-r from-green-500 to-green-400 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                        Read More
                      </button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="order-1 sm:order-2">
                    <div
                      data-aos="zoom-in"
                      data-aos-once="true"
                      className="relative z-10"
                    >
                      <img
                        src={data.img}
                        alt={data.title}
                        className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Hero;
