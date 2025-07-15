export interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const fetchActiveNews = async (): Promise<NewsItem[]> => {
  try {
    const res = await fetch("http://localhost:3001/api/getActiveNews");
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Gagal mengambil data berita");
    }

    return result.data;
  } catch (err) {
    console.error("Error fetching active news:", err);
    return [];
  }
};

export const fetchNewsById = async (id: number): Promise<NewsItem | null> => {
  try {
    const res = await fetch(`http://localhost:3001/api/getNewsById/${id}`);
    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Gagal mengambil detail berita");

    return result.data;
  } catch (err) {
    console.error("Error fetching detail news:", err);
    return null;
  }
};

