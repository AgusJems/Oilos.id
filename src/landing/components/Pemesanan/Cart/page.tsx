import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { OrderData } from "../../dataOrder";
import QuantityControl from "../../../../components/order/QuantityControl";
import { IoArrowBackSharp } from "react-icons/io5";

const CartPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const itemId = parseInt(id || "", 10);
  const selectedItem = OrderData.find((item) => item.id === itemId);

  const [quantity, setQuantity] = useState(1);

  const handleQtyChange = (type: "inc" | "dec") => {
    setQuantity((prev) => Math.max(1, Math.min(prev + (type === "inc" ? 1 : -1), 99)));
  };

  const formatPrice = (price: string) =>
    Number(price.replace(/\./g, "")).toLocaleString("id-ID");

  const totalPrice = useMemo(() => {
    if (!selectedItem) return 0;
    return Number(selectedItem.price.replace(/\./g, "")) * quantity;
  }, [selectedItem, quantity]);

  if (!selectedItem) {
    return <div className="p-6 text-center text-red-600">Item tidak ditemukan.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row gap-8">
      {/* Cart Section */}
      <div className="flex-1 rounded-xl shadow border p-6">
        <h2 className="text-xl font-semibold mb-4">Cart</h2>

        <div className="border-t border-b py-4">
          <div className="flex items-center gap-4">
            <img
              src={selectedItem.img}
              alt={selectedItem.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex flex-col flex-1">
              <span className="font-medium">{selectedItem.name}</span>
              <p className="text-sm text-gray-500 truncate">{selectedItem.description}</p>
            </div>

            <div className="text-sm">Rp {formatPrice(selectedItem.price)}</div>

            <QuantityControl
              value={quantity}
              onDecrease={() => handleQtyChange("dec")}
              onIncrease={() => handleQtyChange("inc")}
            />

            <div className="text-sm font-medium">
              Rp {(Number(selectedItem.price.replace(/\./g, "")) * quantity).toLocaleString("id-ID")}
            </div>
          </div>
        </div>

        <button
            onClick={() => navigate(-1)}
            className="mt-4 text-sm font-semibold text-gray-600 hover:underline flex items-center gap-1"
            >
            <IoArrowBackSharp className="text-base" />
            Continue Shopping
        </button>

      </div>

      {/* Summary */}
      <div className="w-full max-w-sm rounded-xl shadow border p-6">
        <h3 className="text-lg font-semibold mb-4">Order summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Gratis</span>
          </div>
        </div>

        <div className="flex justify-between mt-4 font-semibold text-red-600">
          <span>Total</span>
          <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
        </div>

        <button className="mt-6 w-full cursor-pointer bg-gradient-to-r from-green-700 to-green-400 text-white py-3 rounded-full font-medium">
          Check out
        </button>
      </div>
    </div>
  );
};

export default CartPage;
