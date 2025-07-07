import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { OrderData } from "../../dataOrder";
import OrderCard from "../../../../components/order/OrderCard";

const Order = () => {
  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Order</h1>
      <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
        Silakan pilih produk yang ingin Anda pesan.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="zoom-in">
        {OrderData.map((item) => (
          <OrderCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Order;
