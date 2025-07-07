export interface OrderItem {
  id: number;
  img: string;
  name: string;
  price: string;
  description: string;
}

const OrderData: OrderItem[] = [
  {
    id: 1,
    img: "/images/cards/card-04.jpg",
    name: "Oilos 1",
    price: "35.000",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...",
  },
  {
    id: 2,
    img: "/images/cards/card-04.jpg",
    name: "Oilos 2",
    price: "35.000",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...",
  },
  {
    id: 3,
    img: "/images/cards/card-04.jpg",
    name: "Oilos 3",
    price: "35.000",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...",
  },
  {
    id: 4,
    img: "/images/cards/card-04.jpg",
    name: "Oilos 4",
    price: "35.000",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...",
  },
];

export { OrderData };