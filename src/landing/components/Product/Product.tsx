import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { fetchActiveItem, ListBarangItem } from '../itemsData';

const Product: React.FC = () => {
  const [itemData, setItemData] = useState<ListBarangItem[]>([]);

  useEffect(() => {
    AOS.init({ duration: 600 });

    const getData = async () => {
      const data = await fetchActiveItem();
      setItemData(data);
    };

    getData();
  }, []);

  function stripHtmlTags(html: string) {
    return html.replace(/<[^>]+>/g, "");
  }

  return (
    <div className='justify-items-center'>
      <div className="container min-h-screen px-4 py-6 text-black dark:bg-black dark:text-white">
        <div className="text-center mb-10 max-w-[800px] mx-auto">
          <h1 data-aos="fade-up" className="text-2xl font-bold mb-6">Produk</h1>
          <p data-aos="fade-up" className="text-sm text-gray-500">
            Dapatkan produk terbaik dari <span className="text-green-600 font-bold">Oilos</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="zoom-in">
          {itemData.map((data) => (
            <div key={data.id} className="cursor-pointer">
              <div className="flex flex-col gap-4 shadow-lg py-8 px-4 rounded-xl dark:bg-gray-800">
                <div className="relative w-full h-[250px] rounded-lg overflow-hidden mb-2">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-full object-cover object-top rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold text-black/80 dark:text-white">{data.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2 mb-2">{stripHtmlTags(data.description).slice(0, 100)}...</p>
                  <h3 className="text-xl font-bold text-black/80 dark:text-white mb-3">Rp.{data.price}</h3>
                  <Link to={`/productland/${data.id}`} className="text-center">
                    <button className="bg-gradient-to-r from-green-600 to-green-400 text-white px-6 py-3 rounded-full hover:scale-105 duration-200">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {itemData.length === 0 && (
          <p className="text-center text-gray-400 mt-10">Memuat berita...</p>
        )}
      </div>
    </div>
  );
};

export default Product;
