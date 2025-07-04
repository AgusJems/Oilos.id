import React from "react";

interface ServiceItem {
  id: number;
  img: string; // sekarang pakai string path biasa
  name: string;
  description: string;
  link: string;
  aosDelay: string;
}

const ServiceData: ServiceItem[] = [
  {
    id: 1,
    img: "/images/cards/slides-1.png",
    name: "Fast Performance",
    description:
      "Will give complete account see system expound actual.",
    link: "/",
    aosDelay: "300",
  },
  {
    id: 2,
    img: "/images/cards/slides-1.png",
    name: "Multistep Forms",
    description:
      "The system expound the actual teachings great explorer.",
    link: "/",
    aosDelay: "300",
  },
  {
    id: 3,
    img: "/images/cards/slides-1.png",
    name: "Effective Target",
    description:
      "To take a trivial example which ever undertakes physical.",
    link: "/",
    aosDelay: "300",
  },
  {
    id: 4,
    img: "/images/cards/slides-1.png",
    name: "Easy Customizable",
    description:
      "Exercise except to obtain was advantage from has.",
    link: "/",
    aosDelay: "300",
  },
];

const Service: React.FC = () => {
  return (
    <div className="py-20 bg-white dark:bg-dark text-black dark:text-white justify-items-center">
      <div className="container">
        {/* Header Section */}
        <div data-aos="fade-up" className="max-w-[800px] mx-auto text-center mb-20">
          <h1 className="text-xl sm:text-2xl lg:text-6xl font-[Sans-serif] font-bold mb-5">Oilos telah memberikan manfaat lebih ke ribuan pelanggan di seluruh Indonesia</h1>
          <p className="text-lg text-gray-400">
            Oilos adalah sebuah produk zat aditif organik (berbahan cair), untuk membersihkan Bahan Bakar Minyak (BBM) baik bensin ataupun solar, sehingga kualitas BBM menjadi lebih bersih dan berkualitas. 
            Efek yang dihasilkan: akselerasi kendaraan lebih meningkat, pembakaran lebih sempurna (Irit BBM), dan emisi gas buang rendah (ramah lingkungan).
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 place-items-center">
          {ServiceData.map(({ id, img, name, description, link, aosDelay }) => (
            <div
              key={id}
              data-aos="fade-up"
              data-aos-delay={aosDelay}
              className="max-w-[300px] group rounded-2xl bg-white dark:bg-gray-800 dark:hover:bg-green-600 hover:bg-green-600 hover:text-white duration-300 shadow-xl"
            >
              <div className="p-4 text-center">
                <img
                  src={img}
                  alt={name}
                  className="max-w-[200px] mx-auto group-hover:scale-110 group-hover:translate-x-4 duration-300 mb-3"
                />
                <h1 className="text-xl font-bold text-gray-500 group-hover:text-white duration-300 mb-2">
                  {name}
                </h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm mb-3">
                  {description}
                </p>
                <a href={link}>
                  <button className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-white px-6 py-3 rounded-full hover:scale-105 duration-200">
                    Read More
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
