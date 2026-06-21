<<<<<<< HEAD
import { Sun, Moon, User } from "lucide-react";
=======
import { Sun, Moon, Search, User } from "lucide-react";
>>>>>>> e2ca4af96906a9afe0de0079f836683d06e03ddc
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
<<<<<<< HEAD
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

=======
>>>>>>> e2ca4af96906a9afe0de0079f836683d06e03ddc
      <div
        className="
        flex
        items-center
<<<<<<< HEAD
        gap-2
        text-black
        dark:text-white
      "
      >
        <User size={18} />

        <span>Admin</span>
      </div>
=======
        gap-3
        bg-slate-100
        px-4
        py-2
        rounded-xl
        w-80
        bg-white
        dark:bg-slate-700
        text-black
        dark:text-white"
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
    absolute
    top-4
    right-6
    flex
    items-center
    gap-6
  "
      >
        <button
          onClick={() => setDark(!dark)}
          className="
      p-2
      rounded-full
      border
      hover:scale-110
      transition
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
    "
        >
          <User size={18} />

          <span>Admin</span>
        </div>
      </div>
>>>>>>> e2ca4af96906a9afe0de0079f836683d06e03ddc
    </header>
  );
};

export default Navbar;
