import React from "react";

interface ModalPemesananProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ModalPemesanan: React.FC<ModalPemesananProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Modal Title</h2>
        <p className="mb-4">Isi dari modal kamu bisa masuk di sini.</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 border rounded hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPemesanan;
