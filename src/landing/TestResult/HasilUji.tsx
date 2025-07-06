import React from 'react';;

const HasilUji: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white p-8 justify-items-center">
      <div className="container">
        <div>
          {/* Header section */}
          <div className="max-w-[1200px] mx-auto">
            <h1 data-aos="fade-up" className="text-3xl font-bold dark:text-black mb-5">
              Video Uji Dyno Test
            </h1>
            <p className="text-lg text-gray-400">
              Riset dilakukan di DTRT Magelang workshop. Motor yang digunakan adalah Honda Scoopy standar bawaan dari pabrik. Metode pengetesan dilakukan menggunakan Dyno Test. 
              Cara melakukan tesnya yaitu menggunakan kendaraan yang sama dengan bahan bakar normal di atas mesin Dyno, kemudian menambahkan Oilos pada bahan bakar, dan terakhir mengganti aki standar bawaan pabrik dengan aki Edcobatt.
            </p>
          </div>
          {/* video section */}
          <div data-aos="zoom-in" className="overflow-hidden rounded-lg aspect-ratio py-10">
            <iframe
              src="https://www.oilos.id/wp-content/uploads/2023/12/vid3.mp4"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="max-w-[1200px] h-[500px] w-full mx-auto"
            ></iframe>
          </div>

          <div className="mb-10 max-w-[1200px] mx-auto">
            <h1 data-aos="fade-up" className="text-3xl font-bold dark:text-black mb-5">
              Grafik Uji Dyno Test
            </h1>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
              Dari data grafik yang menggunakan HP (Horse Power/Tenaga Kuda), motor standar menghasilkan <strong>5,95 HP → 6,56 HP</strong>. 
              Setelah ditambah Oilos: <strong>6,89 HP → 6,93 HP</strong> (<em>meningkat sekitar 0.5 HP</em>). 
              Setelah ditambah Oilos dan mengganti aki dengan Edcobatt: <strong>6,78 HP → 6,87 HP</strong> 
              (<em>meningkat 0,4 HP dari standar bawaan</em>, namun <em>turun 0,08 HP</em> dibanding hasil uji dengan aki standar).
            </p>
          </div>

          <div data-aos="zoom-in" className='py-8'>
            <img
              src="/images/brand/test-1.jpg"
              alt="Oilos"
              className="max-w-[1200px] w-full mx-auto"
            />
          </div>
          <div data-aos="zoom-in" className='py-8'>
            <img
              src="/images/brand/test-2.jpg"
              alt="Oilos"
              className="max-w-[1200px] w-full mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HasilUji;
