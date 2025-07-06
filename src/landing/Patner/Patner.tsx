import React from 'react';

interface PatnerItem {
  id: number;
  img: string;
  aosDelay: string;
}

const PatnerData: PatnerItem[] = [
  {
    id: 1,
    img: "/images/cards/patner-1.png",
    aosDelay: "200",
  },
  {
    id: 2,
    img: "/images/cards/patner-2.png",
    aosDelay: "200",
  },
  {
    id: 3,
    img: "/images/cards/patner-3.png",
    aosDelay: "200",
  },
];

const Patner: React.FC = () => {
  return (
    <div className="bg-gray-100 p-8 mb-12 justify-items-center">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <h1 data-aos="fade-up" className="text-3xl font-bold dark:text-black mb-5">
            Apakah <span className="font-[Merienda] text-green-600">Oilos</span> Pernah Diuji Secara Resmi?
          </h1>
          <p className="text-lg text-gray-400">
            Oilos sudah diuji secara resmi di tiga laboratorium milik lembaga yang mempunyai kredibilitas tinggi, yaitu: LEMIGAS, Telkom-University, dan ITS Surabaya.
          </p>
        </div>

        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 place-items-center gap-5">
          {PatnerData.map(({ id, img, aosDelay }) => (
            <div key={id} data-aos="fade-up" data-aos-delay={aosDelay} className="space-y-3">
              <img src={img} alt={`Partner ${id}`} className="w-full max-w-[140px] object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patner;
