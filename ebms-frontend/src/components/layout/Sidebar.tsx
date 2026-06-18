import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Building2,
  Truck,
  BarChart3,
  FileText,
  LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const role =
  localStorage.getItem("role");

  const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard
  },
  {
    name: "Customers",
    path: "/customers",
    icon: Users
  },
  {
    name: "Products",
    path: "/products",
    icon: Package
  },
  {
    name: "Orders",
    path: "/orders",
    icon: ShoppingCart
  },
  {
    name: "Employees",
    path: "/employees",
    icon: Users
  },
  {
    name: "Suppliers",
    path: "/suppliers",
    icon: Building2
  },
  {
    name: "Procurement",
    path: "/procurement",
    icon: Truck
  },
  {
    name: "Reports",
    path: "/reports",
    icon: BarChart3
  },

  ...(role === "ADMIN"
    ? [{
        name: "Audit Logs",
        path: "/audit-logs",
        icon: FileText
      }]
    : [])
];

  return (
    <aside
      className="
      w-72
      h-screen
      bg-slate-900
      text-white
      fixed
      left-0
      top-0"
    >

      <div className="p-6">

        <h1 className="text-2xl font-bold">
          EBMS
        </h1>

        <p className="text-slate-400 text-sm">
          Enterprise Management
        </p>

      </div>

      <nav className="px-3">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                mb-2
                transition-all
                ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }
              `
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}

      </nav>

      <div
        className="
        absolute
        bottom-5
        left-3
        right-3"
      >

        <button
          className="
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          bg-slate-800
          hover:bg-slate-700"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;