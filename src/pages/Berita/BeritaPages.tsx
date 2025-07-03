import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BeritaTable from "../../components/admin-page/berita/BeritaTable";

export default function BeritaPages() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Berita" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Berita">
          <BeritaTable />
        </ComponentCard>
      </div>
    </>
  );
}
