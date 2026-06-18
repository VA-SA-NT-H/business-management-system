import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({
  children
}: Props) => {

  return (

    <div
  className="
  min-h-screen
  bg-slate-100
  dark:bg-slate-900
  text-black
  dark:text-white"
>

      <Sidebar />

      <div className="ml-72">

        <Navbar />

        <main className="p-8">

          {children}

        </main>

      </div>

    </div>
  );
};

export default MainLayout;