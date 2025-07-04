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
    name: "Meningkatkan Akselerasi",
    description:
      "Oilos berfungsi untuk meningkatkan akselerasi kendaraan yaitu dengan cara menaikkan kualitas bahan bakar, serta membersihkan ruang bakar. Oilos tidak akan meninggalkan residu atau ampas pada tangki kendaraan walaupun dipakai dalam jangka waktu panjang.",
    link: "/",
    aosDelay: "300",
  },
  {
    id: 2,
    img: "/images/cards/slides-1.png",
    name: "Emisi Gas Buang Rendah",
    description:
      "Dengan menggunakan Oilos, gas buang kendaraan jadi lebih rendah, sehingga kendaraan menghasilkan emisi gas buang yang lebih rendah. Hal ini dikarenakan Oilos memiliki zat senyawa organik yang mampu merubah unsur yang terkandung dalam BBM sehingga membuat kendaraan lebih ramah lingkungan.",
    link: "/",
    aosDelay: "300",
  },
  {
    id: 3,
    img: "/images/cards/slides-1.png",
    name: "Penghemat BBM",
    description:
      "Oilos memiliki unsur kandungan zat aktif dari bahan organik yang dapat meningkatkan kualitas BBM, sehingga terjadi pengehematan minimal 25%.",
    link: "/",
    aosDelay: "300",
  },
];

const Service: React.FC = () => {
  return (
    <div className="py-20 bg-white dark:bg-black text-black dark:text-white justify-items-center">
      <div className="container">
        {/* Header Section */}
        <div data-aos="fade-up" className="max-w-[800px] mx-auto text-center mb-20">
          <h1 className="text-xl sm:text-2xl lg:text-6xl font-[Sans-serif] font-bold mb-5"><span className="font-[Merienda] text-green-600">Oilos</span> telah memberikan manfaat lebih ke ribuan pelanggan di seluruh Indonesia</h1>
          <p className="text-lg text-gray-400">
            Oilos berfungsi untuk meningkatkan akselerasi kendaraan yaitu dengan cara menaikkan kualitas bahan bakar, serta membersihkan ruang bakar. 
            Oilos tidak akan meninggalkan residu atau ampas pada tangki kendaraan walaupun dipakai dalam jangka waktu panjang.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 place-items-center">
          {ServiceData.map(({ id, img, name, description, link, aosDelay }) => (
            <div
              key={id}
              data-aos="fade-up"
              data-aos-delay={aosDelay}
              className="max-w-[400px] group rounded-2xl bg-white dark:bg-gray-800 dark:hover:bg-green-600 hover:bg-green-600 hover:text-white duration-300 shadow-xl">
              <div className="p-4 text-center">
                <img src={img} alt={name} className="max-w-[300px] mx-auto group-hover:scale-110 group-hover:translate-x-4 duration-300 mb-3"/>
                <h1 className="text-xl font-bold text-gray-500 group-hover:text-white duration-300 mb-2">
                  {name}
                </h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-3 mb-3">
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
