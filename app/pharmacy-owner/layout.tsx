import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function PharmacyOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar role="pharmacy_owner" pharmacyName="Florisse" />
      <main className="flex-1 overflow-auto bg-background">{children}</main>
    </div>
  );
}
