import {
  Bell,
  Search,
  User
} from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {

  const [dark, setDark] =
  useState(false);

  useEffect(() => {

  if (dark) {

    document.documentElement
      .classList.add("dark");

  } else {

    document.documentElement
      .classList.remove("dark");

  }

}, [dark]);

  return (

    <header
      className="
      bg-white
      dark:bg-slate-800
      border-b
      dark:border-slate-700"
    >

      <div
        className="
        flex
        items-center
        gap-3
        bg-slate-100
        px-4
        py-2
        rounded-xl
        w-80"
      >

        <Search size={18} />

        <input
          placeholder="Search..."
          className="
          bg-transparent
          outline-none
          w-full"
        />

      </div>

      <div
        className="
        flex
        items-center
        gap-6"
      >
        <button
          onClick={() =>
            setDark(!dark)
          }
          className="
          border
          px-3
          py-1
          rounded"
        >
          {dark ? "Light" : "Dark"}
        </button>

        <Bell size={20} />

        <div
          className="
          flex
          items-center
          gap-2"
        >

          <User size={18} />

          <span>
            Admin
          </span>

        </div>

      </div>

    </header>
  );
};

export default Navbar;