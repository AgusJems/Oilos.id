import { Link } from "react-router-dom";
import { IoCheckmark } from "react-icons/io5";

export default function VerifySuccess() {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col justify-between items-center px-4 py-10 relative overflow-hidden">
      {/* Background Grid Corner */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-12 gap-1 w-40 h-40">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-black/5 rounded-sm"
              style={{ opacity: i % 3 === 0 ? 0.2 : 0 }}
            />
          ))}
        </div>
      </div>

      <main className="flex flex-col items-center justify-center text-center flex-1">
        <div className="mb-6">
          <div className="bg-green-500 rounded-full p-4 inline-block shadow-md">
            <IoCheckmark className="text-white" size={48} />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">SUCCESS !</h1>
        <p className="text-gray-600 text-lg sm:text-lg max-w-md mb-6">
          Selamat bergabung dengan kami Oilos.id
        </p>
        <p className="text-gray-600 text-sm sm:text-base max-w-md mb-6">
          Email Anda berhasil diverifikasi. Sekarang Anda dapat login dan menggunakan akun Anda.
        </p>
        <Link
          to="/signin"
          className="inline-block px-5 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600 transition text-sm"
        >
          Ke Halaman Login
        </Link>
      </main>

      <footer className="mt-10 text-sm text-gray-500">
        © 2025 – Oilos.id
      </footer>
    </div>
  );
}
