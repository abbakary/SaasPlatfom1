import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar role="staff" pharmacyName="Maff" />
      <main className="flex-1 overflow-auto bg-background">{children}</main>
    </div>
  );
}
