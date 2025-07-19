export interface ListBarangItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price:number;
}

export const fetchActiveItem = async (): Promise<ListBarangItem[]> => {
  try {
    const res = await fetch("http://localhost:3001/api/getActiveItems");
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Gagal mengambil data barang");
    }

    return result.data;
  } catch (err) {
    console.error("Error fetching active news:", err);
    return [];
  }
};

export const fetchListBarangById = async (id: number): Promise<ListBarangItem | null> => {
  try {
    const res = await fetch(`http://localhost:3001/api/getItemsById/${id}`);
    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Gagal mengambil detail barang");

    return result.data;
  } catch (err) {
    console.error("Error fetching detail news:", err);
    return null;
  }
};

