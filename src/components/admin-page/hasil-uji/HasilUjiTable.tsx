import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button";
import { Modal } from "../../ui/modal";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import FileInput from "../../form/input/FileInput";
import QuillEditor from "../../form/input/QuillEditor";
import Switch from "../../form/switch/Switch";
import {
  showSuccess,
  showError,
  showConfirmDelete,
  showLoading,
  closeSwal,
} from "../../../utils/swalFire"; // ← sesuaikan path jika perlu


interface TestResultsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  status: number;
  created_by: string;
  created_at: string;
}

export default function HasilUjiTable() {
  const [testResultsData, setTestResultsData] = useState<TestResultsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    status: true,
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setFormData({ title: "", description: "", image: "", status: true });
    setEditingId(null);
  };

  useEffect(() => {
    fetchTestResults();
  }, []);

  const fetchTestResults = () => {
    fetch("http://localhost:3001/api/getAllTestResults")
      .then((res) => res.json())
      .then((data) => setTestResultsData(data.data))
      .catch((err) => console.error("Error fetching testResults:", err));
  };

  const handleAddTestResults = async () => {
    try {
      showLoading("Menyimpan berita...");
      const res = await fetch("http://localhost:3001/api/insertDetailTestResults", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      closeSwal();

      if (res.ok) {
        showSuccess("Berhasil", "Hasil Uji berhasil ditambahkan.");
        setFormData({ title: "", description: "", image: "", status: true });
        setIsOpen(false);
        fetchTestResults();
      } else {
        showError("Gagal", "Gagal menambahkan data.");
      }
    } catch (error) {
      closeSwal();
      showError("Error", "Terjadi kesalahan saat menambahkan data.");
    }
  };

  const handleEditTestResults = (testResults: TestResultsItem) => {
    setFormData({
      title: testResults.title,
      description: testResults.description,
      image: testResults.image,
      status: testResults.status === 1
    });
    setEditingId(testResults.id);
    setIsOpen(true);
  };

  const handleUpdateTestResults = async () => {
    try {
      showLoading("Mengupdate berita...");
      const res = await fetch(`http://localhost:3001/api/updateTestResults/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      closeSwal();

      if (res.ok) {
        showSuccess("Berhasil", "Berita berhasil diperbarui.");
        setFormData({ title: "", description: "", image: "", status: true });
        setIsOpen(false);
        setEditingId(null);
        fetchTestResults();
      } else {
        showError("Gagal", "Gagal mengupdate berita.");
      }
    } catch (error) {
      closeSwal();
      showError("Error", "Terjadi kesalahan saat update berita.");
    }
  };

  const handleSubmitTestResults = () => {
    if (editingId) {
      handleUpdateTestResults();
    } else {
      handleAddTestResults();
    }
  };

  const handleDeleteTestResults = async (id: number) => {
  const confirmDelete = await showConfirmDelete(
    "Yakin ingin menghapus?",
    "Berita yang dihapus tidak bisa dikembalikan!",
    "Hapus",
    "Batal"
  );
    if (!confirmDelete) return;

    try {
      showLoading("Menghapus...");
      const res = await fetch(`http://localhost:3001/api/deleteTestResults/${id}`, {
        method: "DELETE",
      });
      closeSwal();

      if (res.ok) {
        showSuccess("Berhasil", "Berita berhasil dihapus.");
        fetchTestResults();
      } else {
        showError("Gagal", "Gagal menghapus berita.");
      }
    } catch (error) {
      closeSwal();
      showError("Error", "Terjadi kesalahan saat menghapus berita.");
    }
  };


  const totalPages = Math.ceil(testResultsData.length / itemsPerPage);
  const paginatedTestResults = testResultsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="p-4 text-end">
          <Button onClick={openModal} className="mb-4 px-4 py-2 bg-gradient-to-r from-green-500 to-green-400 hover:scale-105 duration-200 text-white">
            + Tambah Hasil Uji
          </Button>
        </div>
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Judul</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Deskripsi</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Tanggal</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Status</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Gambar</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Action</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedTestResults.map((testResults) => (
              <TableRow key={testResults.id}>
                <TableCell className="px-4 py-4 sm:px-6 text-start">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{testResults.title}</span>
                </TableCell>
                <TableCell className="px-4 py-4 sm:px-6 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div
                    className="prose prose-sm max-w-none dark:prose-invert line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: testResults.description }}
                  />
                </TableCell>
                <TableCell className="px-4 py-4 sm:px-6 text-gray-500 text-theme-sm dark:text-gray-400 text-center">
                  {new Date(testResults.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-4 py-4 sm:px-6 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={testResults.status === 1 ? "success" : "error"}
                  >
                    {testResults.status === 1 ? "Active" : "Non Active"}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-4 sm:px-6 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex justify-center items-center h-full">
                    {testResults.image && testResults.image !== "string" ? (
                      <img
                        src={testResults.image}
                        alt={testResults.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 italic">No Image</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4 sm:px-6">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleEditTestResults(testResults)} className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gradient-to-r from-blue-500 to-blue-400 hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                        fill=""
                      />
                    </svg>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTestResults(testResults.id)} className="flex w-full items-center justify-center gap-2 rounded-full border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-theme-xs hover:bg-gradient-to-r from-red-500 to-red-400 hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
                    <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.5 2h5a.5.5 0 01.5.5V4h4a.5.5 0 010 1h-1.086l-.379 9.035a2 2 0 01-1.995 1.965H5.96a2 2 0 01-1.995-1.965L3.586 5H2.5a.5.5 0 010-1h4V2.5a.5.5 0 01.5-.5zm1 .5v1h3v-1h-3zm-3 2l.379 9.035a1 1 0 00.998.965h7.08a1 1 0 00.998-.965L13.5 4.5h-9z"
                          fill="currentColor"
                        />
                      </svg>
                    Delete
                  </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center px-5 py-4 flex-wrap gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 text-sm border rounded ${
                currentPage === page
                  ? "bg-green-500 text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[1000px] m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Tambah Berita
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Masukkan data berita terbaru.
          </p>
        </div>
        <div className="mb-3">
          <Label>Judul</Label>
          <Input
            type="text"
            placeholder="Judul"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <Label>Deskripsi</Label>
          <QuillEditor
            value={formData.description}
            onChange={(content) =>
              setFormData({ ...formData, description: content })
            }
            placeholder="Tulis deskripsi berita di sini..."
          />
        </div>
        <div className="mb-3">
          <Label>Upload Gambar</Label>
          <FileInput
                onChange={(base64) =>
                  setFormData({ ...formData, image: base64 })
                }
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded border"
                />
              )}
        </div>
        {editingId && (
          <div className="mb-3">
            <Label>Status</Label>
            <div className="flex items-center gap-3">
              <Switch
                label=""
                defaultChecked = {formData.status}
                onChange={(checked) =>
                  setFormData({ ...formData, status: checked })
                }
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {formData.status ? "Aktif" : "Non Aktif"}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Batal
          </Button>
          <Button size="sm" onClick={handleSubmitTestResults}>
              {editingId ? "Update" : "Simpan"}
          </Button>
        </div>
      </div>
    </Modal>
    </>
  );
}
