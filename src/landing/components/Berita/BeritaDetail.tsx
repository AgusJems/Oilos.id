import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NewsData } from '../data'; // path disesuaikan
import { IoArrowBack } from 'react-icons/io5';

const BeritaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const berita = NewsData.find((item) => item.id === Number(id));

  if (!berita) {
    return <div className="text-center py-20 text-red-600">Berita tidak ditemukan.</div>;
  }

  return (
    <div className='justify-items-center py-8'>
        <div className="container px-4 py-10 min-h-screen dark:bg-black dark:text-white">
            <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center text-green-600 hover:underline" >
                <IoArrowBack className="mr-2" /> Kembali
            </button>

            <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{berita.name}</h1>
            <div className="relative w-full mb-6 rounded-lg overflow-hidden">
                <img
                src={berita.img}
                alt={berita.name}
                className="object-cover"
                />
            </div>
            <p className="text-gray-500 leading-relaxed">{berita.text}</p>
            </div>
        </div>
    </div>
    
  );
};

export default BeritaDetail;
