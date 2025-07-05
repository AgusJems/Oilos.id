import React from 'react';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoWalletSharp } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";;
import { GrWorkshop  } from "react-icons/gr";;

const HasilUji: React.FC = () => {
  return (
    <div className="min-h-[550px] bg-white dark:bg-black text-black dark:text-white flex justify-center items-center py-20 sm:py-0">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* image section */}
          <div data-aos="zoom-in">
            <img
              src="/images/cards/slides-1.png"
              alt="Oilos"
              className="max-w-[500px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
            />
          </div>

          {/* text details section */}
          <div className="flex flex-col justify-center gap-6 sm:pt-0">
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold">
              Apa Itu <span className='font-[Merienda] text-green-600'>Oilos ?</span> 
            </h1>
            <p
              data-aos="fade-up"
              className="text-md text-gray-500 tracking-wide leading-7"
            >
              Oilos adalah sebuah produk zat aditif organik (berbahan cair), untuk membersihkan Bahan Bakar Minyak (BBM) baik bensin ataupun solar, sehingga kualitas BBM menjadi lebih bersih dan berkualitas. 
              Efek yang dihasilkan: akselerasi kendaraan lebih meningkat, pembakaran lebih sempurna (Irit BBM), dan emisi gas buang rendah (ramah lingkungan).
            </p>
            <div className="flex flex-col gap-4">
              <div data-aos="fade-up" className="flex items-center gap-4">
                <IoCheckmarkDoneSharp className="text-4xl h-13 w-13 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                <p>Quality Products</p>
              </div>
              <div data-aos="fade-up" className="flex items-center gap-4">
                <GiFoodTruck className="text-4xl h-13 w-13 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                <p>Fast Delivery</p>
              </div>
              <div data-aos="fade-up" className="flex items-center gap-4">
                <IoWalletSharp className="text-4xl h-13 w-13 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                <p>Easy Payment Method</p>
              </div>
              <div data-aos="fade-up" className="flex items-center gap-4">
                <GrWorkshop  className="text-4xl h-13 w-13 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                <p>Get Offers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HasilUji;
