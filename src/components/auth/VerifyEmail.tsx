import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"error" | "loading">("loading");
  const [message, setMessage] = useState("");
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      console.log("🔍 Token dari URL:", token);

      if (!token) {
        setStatus("error");
        setMessage("Token tidak ditemukan di URL.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/api/verify-email?token=${token}`);
        const data = await response.json();

        console.log("📩 Response dari server:", response.status, data);

        if (response.status === 200) {
          console.info("✅ Verifikasi email berhasil. Navigating...");
          navigate("/verify-success");
        } else {
          setStatus("error");
          setMessage(data.message || "Verifikasi gagal atau token tidak valid.");
        }
      } catch (err) {
        console.error("🚨 Fetch error:", err);
        setStatus("error");
        setMessage("Terjadi kesalahan saat menghubungi server.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-md w-full">
        {status === "loading" && (
          <p className="text-gray-700 animate-pulse">Memverifikasi email Anda...</p>
        )}

        {status === "error" && (
          <>
            <IoClose className="text-red-500 mx-auto mb-4" size={48} />
            <h1 className="text-xl font-semibold mb-2 text-gray-800">Verifikasi Gagal</h1>
            <p className="text-gray-600 mb-4">{message}</p>
            <a
              href="/"
              className="inline-block px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
            >
              Kembali ke Beranda
            </a>
          </>
        )}
      </div>
    </div>
  );
}
