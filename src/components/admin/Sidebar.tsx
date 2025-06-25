// src/components/admin/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BadgeCheck,
  DollarSign,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Órdenes", href: "/admin/orders", icon: LayoutDashboard },
  { name: "Verificaciones", href: "/admin/verifications", icon: BadgeCheck },
  { name: "Tasas", href: "/admin/rates", icon: DollarSign },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 hidden md:flex flex-col bg-gray-900 border-r border-gray-800 p-4 space-y-6">
      <div className="text-2xl font-bold text-green-400">Panel Admin</div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <button className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-300 text-sm">
        <LogOut size={16} />
        Cerrar sesión
      </button>
    </aside>
  );
}
