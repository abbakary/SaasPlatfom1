import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar role="super_admin" />
      <main className="flex-1 overflow-auto bg-background">{children}</main>
    </div>
  );
}
