interface QuantityProps {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const QuantityControl = ({ value, onDecrease, onIncrease }: QuantityProps) => {
  return (
    <div className="flex items-center border rounded-lg overflow-hidden text-sm shadow-sm">
      <button
        onClick={onDecrease}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
        aria-label="Kurangi jumlah"
      >
        −
      </button>
      <span className="px-4 py-1 bg-white text-gray-800">{value}</span>
      <button
        onClick={onIncrease}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
        aria-label="Tambah jumlah"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
