// src/pages/Landing/News.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { fetchActiveNews, NewsItem } from "../components/data";

const News: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    const getNews = async () => {
      const data = await fetchActiveNews();
      setNewsData(data);
    };

    getNews();
  }, []);

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
      { breakpoint: 10000, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  function stripHtmlTags(html: string) {
    return html.replace(/<[^>]+>/g, "");
  }

  return (
    <div className="py-10 justify-items-center">
      <div className="container">
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <h1 data-aos="fade-up" className="text-xl sm:text-2xl lg:text-4xl font-[Sans-serif] font-bold mb-5">
            Dapatkan informasi terbaru dari <span className="font-[Merienda] text-green-600">Oilos</span>
          </h1>
        </div>

        <div data-aos="zoom-in">
          {newsData.length === 0 ? (
            <p className="text-center text-gray-500">Memuat berita...</p>
          ) : (
            <Slider {...settings}>
              {newsData.map((item) => (
                <Link to={`/beritaland/${item.id}`}>
                <div key={item.id} className="my-6 cursor-pointer">
                  <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 relative">
                    <div className="relative w-full h-[153px] rounded-lg overflow-hidden mb-2">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover object-top rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <div className="space-y-3">
                        <h1 className="text-xl font-bold text-black/80 dark:text-white">{item.title}</h1>
                        <p className="text-sm text-gray-500 line-clamp-2">{stripHtmlTags(item.description).slice(0, 100)}...</p>
                      </div>
                    </div>
                  </div>
                </div></Link>
                
              ))}
            </Slider>
          )}
        </div>

        <div className="flex justify-center">
          <Link className="text-center" to={`/beritaland`}>
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-white px-6 py-3 rounded-full hover:scale-105 duration-200 mt-10">
              View All News
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default News;
