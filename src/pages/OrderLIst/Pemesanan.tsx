import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PemesananTable from "../../components/orderlist/PemesananTable";
import { useState } from "react";
import ModalPemesanan from "../../components/orderlist/ModalPemesanan";


export default function Pemesanan() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = () => {
        console.log("Data disimpan!");
        setIsModalOpen(false);
    };
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Pemesanan" />
      <div className="space-y-6">
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Buka Modal
        </button>

        <ModalPemesanan
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
        />
        <ComponentCard title="Tabel Pemesanan">
            <PemesananTable/>
        </ComponentCard>
      </div>
    </>
  );
}
