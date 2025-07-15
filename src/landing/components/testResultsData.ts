export interface TestResultsItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const fetchActiveTestResults = async (): Promise<TestResultsItem[]> => {
  try {
    const res = await fetch("http://localhost:3001/api/getActiveTestResults");
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Gagal mengambil data");
    }

    return result.data;
  } catch (err) {
    console.error("Error fetching active test results:", err);
    return [];
  }
};

export const fetchTestResultsById = async (id: number): Promise<TestResultsItem | null> => {
  try {
    const res = await fetch(`http://localhost:3001/api/getTestResultsById/${id}`);
    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Gagal mengambil detail");

    return result.data;
  } catch (err) {
    console.error("Error fetching detail:", err);
    return null;
  }
};

