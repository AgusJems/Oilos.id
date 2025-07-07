import { Link } from "react-router-dom";
import { OrderItem } from "../../landing/components/dataOrder";

interface Props {
  item: OrderItem;
}

const OrderCard = ({ item }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transform transition">
      <img
        src={item.img}
        alt={item.name}
        className="w-full h-48 object-cover object-top rounded-lg mb-4"
      />
      <h2 className="text-lg font-bold">{item.name}</h2>
      <p className="text-green-600 font-semibold mb-2">Rp. {item.price}</p>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
      <Link to={`/orderland/${item.id}`} className="block">
        <button className="w-full cursor-pointer bg-gradient-to-r from-green-700 to-green-400 text-white py-2 rounded-full">
          Purchase
        </button>
      </Link>
    </div>
  );
};

export default OrderCard;
