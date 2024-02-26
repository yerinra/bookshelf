import DarkModeBtn from "../molecules/FixedButtons/DarkModeBtn";
import ScrollTopBtn from "../molecules/FixedButtons/ScrollTopBtn";
import Footer from "../organisms/Footer";
import NavBar from "../organisms/Navbar";
import { Outlet } from "react-router-dom";

export default function BasicLayout() {
  return (
    <div className="flex flex-col mx-auto max-w-[976px] justify-center w-full h-full">
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
