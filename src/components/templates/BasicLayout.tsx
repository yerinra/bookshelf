import DarkModeBtn from "../molecules/FixedButtons/DarkModeBtn";
import ScrollTopBtn from "../molecules/FixedButtons/ScrollTopBtn";
import Footer from "../organisms/Footer";
import NavBar from "../organisms/Navbar";
import { Outlet } from "react-router-dom";

export default function BasicLayout() {
  return (
    <section className="flex flex-col max-w-[976px] justify-between mx-auto w-screen h-screen p-8 pb-0">
      <NavBar />

      <section className="flex justify-center items-center">
        <Outlet />
        <DarkModeBtn />
        <ScrollTopBtn />
      </section>
      <Footer />
    </section>
  );
}
