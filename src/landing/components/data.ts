interface NewsItem {
  id: number;
  img: string;
  name: string;
  text: string;
}

const NewsData: NewsItem[] = [
  {
    id: 1,
    img: "/images/cards/card-04.jpg",
    name: "Berita 1",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...",
  },
  {
    id: 2,
    img: "/images/cards/card-04.jpg",
    name: "Berita 2",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...",
  },
  {
    id: 3,
    img: "/images/cards/card-04.jpg",
    name: "Berita 3",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...",
  },
  {
    id: 4,
    img: "/images/cards/card-04.jpg",
    name: "Berita 4",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...",
  },
];

export { NewsData };