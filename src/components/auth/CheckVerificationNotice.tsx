import { Link } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

export default function CheckVerificationNotice() {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col justify-between items-center px-4 py-10 relative overflow-hidden">
      {/* Background Grid Corner */}
      <div className="absolute top-0 right-0 opacity-10">
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
          <div>
            <IoWarningOutline className="text-warning-400" size={68} />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Verifikasi Email Dikirim !</h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-[500px] mb-6">
          Kami telah mengirimkan link verifikasi ke email Anda. Silakan cek kotak masuk atau folder spam Anda untuk mengaktifkan akun.
        </p>
        <Link
          to="/signin"
          className="inline-block px-5 py-2 rounded-lg text-white bg-green-400 hover:bg-green-500 transition text-sm"
        >
          Back to Sign In
        </Link>
      </main>

      <footer className="mt-10 text-sm text-gray-500">
        © 2025 – Oilos.id
      </footer>
    </div>
  );
}
