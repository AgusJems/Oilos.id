import React from 'react';
import Slider from "react-slick";

interface NewsItem {
  id: number;
  img: string;
  name: string;
  text: string;
}

const NewsData: NewsItem[] = [
  {
    id: 1,
    img: "/images/cards/card-04.jpg",
    name: "Berita 1",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...",
  },
  {
    id: 2,
    img: "/images/cards/card-04.jpg",
    name: "Berita 2",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...",
  },
  {
    id: 3,
    img: "/images/cards/card-04.jpg",
    name: "Berita 3",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...",
  },
  {
    id: 4,
    img: "/images/cards/card-04.jpg",
    name: "Berita 4",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...",
  },
];

const News: React.FC = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-8 justify-items-center">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <h1 data-aos="fade-up" className="text-xl sm:text-2xl lg:text-4xl font-[Sans-serif] font-bold mb-5">Dapatkan informasi terbaru dari <span className="font-[Merienda] text-green-600">Oilos</span></h1>
        </div>

        {/* Slider Section */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {NewsData.map((data) => (
              <div key={data.id} className="my-6 cursor-pointer">
                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 relative">
                  <div className="relative w-full h-[153px] rounded-lg overflow-hidden mb-2">
                    <img
                      src={data.img}
                      alt={data.name}
                      className="w-full h-full object-cover object-top rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <h1 className="text-xl font-bold text-black/80 dark:text-white">{data.name}</h1>
                      <p className="text-sm text-gray-500">{data.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a href="/newspage">
            <button className="bg-gradient-to-r from-gdtwo to-gdone text-white px-6 py-3 rounded-full hover:scale-105 duration-200 mt-10">
              View All News
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default News;
