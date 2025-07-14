import { FC } from "react";

interface FileInputProps {
  className?: string;
  onChange: (base64: string) => void;
}

const FileInput: FC<FileInputProps> = ({ className = "", onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validasi ukuran file (maksimum 1MB)
    const maxSizeInMB = 1;
    if (file.size > maxSizeInMB * 1024 * 1024) {
      alert("Ukuran gambar maksimal 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 400;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7); // quality 70%
          onChange(resizedBase64);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <input
      type="file"
      accept="image/*"
      className={`focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400 ${className}`}
      onChange={handleChange}
    />
  );
};

export default FileInput;
