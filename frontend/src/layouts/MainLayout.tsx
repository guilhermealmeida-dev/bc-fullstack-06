import { MainHeader } from "@/components/MainHeader";
import { Outlet } from "react-router";

export function MainLayout() {
  return (
    <div className="flex flex-col gap-14 min-h-screen px-27.5 py-6">
      {/* Header */}
      <MainHeader />
      <Outlet />
    </div>
  );
}
