import React from "react";
import { FiShield } from "react-icons/fi";
import { BsGear } from "react-icons/bs";

const Safety: React.FC = () => {
  return (
    <div className="min-h-[650px] bg-white dark:bg-black text-black dark:text-white flex justify-center items-center py-20">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          {/* Image Section */}
          <div data-aos="zoom-in" className="relative">
            <img
              src="/images/cards/slides-1.png"
              alt="Oilos Visual"
              className="max-w-[600px] w-full h-auto drop-shadow-xl mx-auto object-cover"
            />
            {/* Optional: Floating cards if needed, can use absolute positioned divs */}
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <h2
              data-aos="fade-up"
              className="text-3xl sm:text-4xl font-bold leading-snug"
            >
              Apakah <span className="font-[Merienda] text-green-600">Oilos</span> aman?
            </h2>
            <p
              data-aos="fade-up"
              className="text-md text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              Bahan baku utama Oilos berasal dari minyak nabati murni yang
              diolah melalui proses bioteknologi mutakhir dan modern, sehingga
              sangat aman digunakan pada semua jenis kendaraan meskipun dipakai
              dengan dosis berlebih.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {/* Item 1 */}
              <div className="flex items-start gap-4" data-aos="fade-up">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FiShield className="text-2xl text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Tidak Berkarat</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Oilos juga tidak mengakibatkan karat pada mesin kendaraan.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4" data-aos="fade-up">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <BsGear className="text-2xl text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Tidak ada residu</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Oilos tidak menghasilkan residu serta pengikisan pada tangki kendaraan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;
