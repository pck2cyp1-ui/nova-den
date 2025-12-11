import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  Images,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Pacientes", href: "/patients", icon: Users },
    { label: "Consultas", href: "/consultations", icon: FileText },
    { label: "Galería", href: "/gallery", icon: Images },
    { label: "Configuración", href: "/settings", icon: Settings },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 md:hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-gray-700" />
        ) : (
          <Menu className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-primary-600 text-white transition-transform duration-300 z-40 md:relative md:translate-x-0 md:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-primary-700">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-bold text-sm">DC</span>
            </div>
            DermaClinic
          </h1>
          <p className="text-primary-100 text-xs mt-1">
            Gestión Clínica Dermatológica
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary-700 border-l-4 border-white"
                    : "text-primary-100 hover:bg-primary-700 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-primary-700 text-xs text-primary-100">
          <p>© 2024 DermaClinic</p>
          <p>Sistema de Gestión Clínica</p>
        </div>
      </aside>
    </>
  );
}
