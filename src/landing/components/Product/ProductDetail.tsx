import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { fetchListBarangById, ListBarangItem } from '../itemsData';
import 'quill/dist/quill.core.css';
import DOMPurify from 'dompurify';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [barang, setBarang] = useState<ListBarangItem | null>(null);
  const [loading, setLoading] = useState(true);

  const cleanAndSanitize = (html: string) => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'br', 'h1', 'h2', 'h3', 'a', 'img', 'span'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'type', 'data-list'],
    });
  };

  useEffect(() => {
    if (id) {
      fetchListBarangById(Number(id)).then((data) => {
        setBarang(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Memuat detail barang...</div>;
  }

  if (!barang) {
    return <div className="text-center py-20 text-red-600">Berita tidak ditemukan.</div>;
  }

  return (
    <div className="justify-items-center py-8">
      <div className="container px-4 py-10 min-h-screen dark:bg-black dark:text-white">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center text-green-600 hover:underline"
        >
          <IoArrowBack className="mr-2" /> Kembali
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">{barang.name}</h1>
          <div className="relative w-full mb-6 rounded-lg overflow-hidden">
            <img
              src={barang.image}
              alt={barang.name}
              className="object-cover w-full h-[500px] rounded-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-center mb-6">Rp.{barang.price}</h1>
          <div
            className="ql-editor font-[Sans-serif] text-gray-500"
            dangerouslySetInnerHTML={{ __html: cleanAndSanitize(barang.description) }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
