import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto pt-4 md:pt-0">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
