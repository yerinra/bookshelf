import DarkModeBtn from "./DarkModeBtn";
import ScrollTopBtn from "./ScrollTopBtn";
import Footer from "./layout/Footer";
import NavBar from "./layout/Navbar";
import { Outlet } from "react-router-dom";

const BasicLayout = () => {
  return (
    <div className="flex flex-col justify-between">
      <NavBar />
      <section>
        <Outlet />

        <DarkModeBtn />
        <ScrollTopBtn />
      </section>

      <Footer />
    </div>
  );
};

export default BasicLayout;
