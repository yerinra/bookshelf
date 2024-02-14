import DarkModeBtn from "./DarkModeBtn";
import ScrollTopBtn from "./ScrollTopBtn";
import Footer from "./layout/Footer";
import NavBar from "./layout/Navbar";
import { Outlet } from "react-router-dom";

export default function BasicLayout() {
  return (
    <div className="flex flex-col mx-auto max-w-[976px] justify-center w-full">
      <NavBar />

      <section className="flex justify-center items-center">
        <Outlet />
        <DarkModeBtn />
        <ScrollTopBtn />
      </section>

      <Footer />
    </div>
  );
}
