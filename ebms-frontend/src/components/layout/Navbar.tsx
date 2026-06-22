import { Sun, Moon, User } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header
      className="
      bg-white
      dark:bg-slate-800
      border-b
      dark:border-slate-700
      h-16
      flex
      items-center
      justify-end
      px-6
      gap-6"
    >
      <button
        onClick={() => setDark(!dark)}
        className="
        p-2
        rounded-full
        border
        hover:scale-110
        transition
        text-black
        dark:text-white
        border-slate-200
        dark:border-slate-600
      "
        aria-label="Toggle theme"
      >
        {dark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div
        className="
        flex
        items-center
        gap-2
        text-black
        dark:text-white
      "
      >
        <User size={18} />

        <span>Admin</span>
      </div>
    </header>
  );
};

export default Navbar;
