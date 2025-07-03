import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import TestimoniTable from "../../components/admin-page/testimoni/TestimoniTable";
import PageMeta from "../../components/common/PageMeta";

export default function TestimoniPages() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Testimoni" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Testimoni">
          <TestimoniTable />
        </ComponentCard>
      </div>
    </>
  );
}
