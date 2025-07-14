import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { fetchNewsById, NewsItem } from '../data';
import DOMPurify from 'dompurify';

const BeritaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [berita, setBerita] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  const cleanAndSanitize = (html: string) => {
    const cleanedHtml = html.replace(/<span class="ql-ui"[^>]*>.*?<\/span>/g, '');
    return DOMPurify.sanitize(cleanedHtml, {
      ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'br', 'h1', 'h2', 'h3', 'a', 'img'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title'],
    });
  };

  useEffect(() => {
    if (id) {
      fetchNewsById(Number(id)).then((data) => {
        setBerita(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Memuat detail berita...</div>;
  }

  if (!berita) {
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
          <h1 className="text-3xl font-bold text-center mb-6">{berita.title}</h1>
          <div className="relative w-full mb-6 rounded-lg overflow-hidden">
            <img
              src={berita.image}
              alt={berita.title}
              className="object-cover w-full h-[500px] rounded-lg"
            />
          </div>
          <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: cleanAndSanitize(berita.description) }}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaDetail;
