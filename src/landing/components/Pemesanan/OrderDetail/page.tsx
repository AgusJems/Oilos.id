import { useParams, useNavigate } from "react-router-dom";
import { OrderData, OrderItem } from "../../dataOrder";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const itemId = parseInt(id || "", 10);
  const item = OrderData.find((data: OrderItem) => data.id === itemId);

  if (!item) {
    return (
      <div className="text-center p-10 text-red-600">Produk tidak ditemukan.</div>
    );
  }

  const handleAddToCart = () => {
    navigate(`/cart/${item.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
        <p className="text-green-600 font-semibold text-lg mb-4">Rp. {item.price}</p>
        <p className="text-gray-700">{item.description}</p>

        <button
          onClick={handleAddToCart}
          className="mt-6 cursor-pointer bg-gradient-to-r from-green-700 to-green-400 text-white px-6 py-2 rounded-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
