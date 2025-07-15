import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useEffect, useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import Badge from "../../ui/badge/Badge";
import Switch from "../../form/switch/Switch";
import Select from "react-select";
import {
  showSuccess,
  showError,
  showConfirmUpdate,
  showLoading,
  closeSwal,
} from "../../../utils/swalFire";


interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  username: string;
  password?: string;
  name: string;
  identity: string;
  phone: string;
  email: string | null;
  code_referral: string | null;
  status: number;
  roles_id?: number;
  cities_id?: number;
  roles_name?: string;
  cities_name?: string;
  provinces_name?: string;
}

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f0fdf4" : "white",
    borderColor: state.isFocused ? "#22c55e" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(34, 197, 94, 0.3)" : undefined,
    "&:hover": {
      borderColor: "#22c55e",
    },
    padding: "2px",
    fontSize: "14px",
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 9999,
    fontSize: "14px",
  }),
};

export default function ListMemberTable() {
  const [ users, setUsers ] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [ selectedUser, setSelectedUser ] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    name: "",
    identity: "",
    phone: "",
    email: "",
    code_referral: "",
    status: true,
    rolesId: 0,
  });

  useEffect(() => {
    fetch("http://localhost:3001/api/getAllUsers")
      .then((res) => res.json())
      .then((data) => {
        const limitedUsers = data.data.slice(0, 100);
        setUsers(limitedUsers);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/getAllRoles")
      .then((res) => res.json())
      .then((data) => setRoles(data.data))
      .catch((err) => console.error("Error fetching roles:", err));
  }, []);

  const handleEdit = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/members/${id}`);
      const json = await res.json();
      setSelectedUser(json.data);
      setFormData({
        name: json.data.name || "",
        identity: json.data.identity || "",
        phone: json.data.phone || "",
        email: json.data.email || "",
        code_referral: json.data.code_referral || "",
        status: json.data.status === 1,
        rolesId: json.data.roles_id || 0,
      });
      openModal();
    } catch (error) {
      console.error("Gagal mengambil data member:", error);
    }
  };

  const handleSave = async () => {
    if (!selectedUser) return;

    const payload = {
      username: selectedUser.name,
      password: "",
      name: formData.name,
      identity: formData.identity,
      phone: formData.phone,
      email: formData.email,
      code_referral: formData.code_referral,
      roles_id: formData.rolesId,
      status: formData.status ? 1 : 0,
    };

    try {
      const confirmed = await showConfirmUpdate(
        "Konfirmasi",
        "Yakin ingin menyimpan perubahan ini?",
        "Simpan",
        "Batal"
      );
      if (!confirmed) return;

      showLoading("Menyimpan perubahan...");

      const res = await fetch(
        `http://localhost:3001/api/members/${selectedUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      closeSwal(); // tutup loading

      if (res.ok) {
        showSuccess("Berhasil", "Data user berhasil diperbarui.");
        closeModal();
        const updatedUsers = users.map((u) =>
          u.id === selectedUser.id ? { ...u, ...formData, status: formData.status ? 1 : 0 } : u
        );
        setUsers(updatedUsers);
      } else {
        showError("Gagal", result.message || "Gagal memperbarui data user.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      closeSwal(); // pastikan loading ditutup
      showError("Error", "Terjadi kesalahan saat mengupdate data.");
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    
    <>
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto p-2">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Nama
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                NIK
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Provinsi
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Kota
              </TableCell>
              <TableCell isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Role
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                No. Handphone
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Email
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Kode Referal
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-4 py-4 sm:px-6 text-start whitespace-nowrap">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {user.name}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 sm:px-6 text-start whitespace-nowrap">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {user.identity}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 sm:px-6 text-start whitespace-nowrap">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {user.provinces_name}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 sm:px-6 text-start whitespace-nowrap">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {user.cities_name}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 sm:px-6 text-start whitespace-nowrap">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {user.roles_name}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 sm:px-6 text-start whitespace-nowrap">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {user.phone}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 sm:px-6 text-start whitespace-nowrap">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {user.email}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 sm:px-6 text-start whitespace-nowrap">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {user.code_referral}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 text-gray-500 text-start whitespace-nowrap text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={user.status === 1 ? "success" : "error"}
                  >
                    {user.status === 1 ? "Active" : "Non Active"}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-4 sm:px-6 text-start">
                  <button onClick={() => handleEdit(user.id)} className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gradient-to-r from-blue-500 to-blue-400 hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center px-5 py-4 flex-wrap gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex flex-wrap items-center gap-1">
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
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Member
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Update your details to keep your member up-to-date.
          </p>
        </div>
        <form className="flex flex-col">
          <div className="px-2 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Nama</Label>
                <Input
                  type="text"
                  placeholder="nama"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled
                />
              </div>
              <div>
                <Label>NIK</Label>
                <Input
                  type="text"
                  placeholder="nik"
                  value={formData.identity}
                  onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                  disabled
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="text"
                  placeholder="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled
                />
              </div>
              <div>
                <Label>No. Handphone</Label>
                <Input
                  type="text"
                  placeholder="no hp"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled
                />
              </div>
              <div>
                <Label>Kode Referal</Label>
                <Input
                  type="text"
                  placeholder="referal"
                  value={formData.code_referral}
                  onChange={(e) => setFormData({ ...formData, code_referral: e.target.value })}
                  disabled
                />
              </div>
              <div>
                <Label>Role</Label>
                <Select
                  styles={customStyles}
                  options={roles.map((role) => ({
                    value: role.id,
                    label: role.name,
                  }))}
                  value={roles
                    .map((role) => ({ value: role.id, label: role.name }))
                    .find((option) => option.value === formData.rolesId)}
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      setFormData({ ...formData, rolesId: selectedOption.value });
                    }
                  }}
                  placeholder="Pilih Role"
                />
              </div>
              <div>
                <Label>Status Member</Label>
                <div className="flex items-center gap-3">
                  <Switch
                    label=""
                    defaultChecked={formData.status}
                    onChange={(checked) =>
                      setFormData({ ...formData, status: checked })
                    }
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {formData.status ? "Active" : "Non Active"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button type="button" size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button type="button" size="sm" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
    </>
  );
}
