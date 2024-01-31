import DarkModeBtn from "./DarkModeBtn";
import ScrollTopBtn from "./ScrollTopBtn";
import Footer from "./layout/Footer";
import NavBar from "./layout/Navbar";
import { Outlet } from "react-router-dom";

const BasicLayout = () => {
  return (
    <>
      <NavBar />
      <section>
        <Outlet />

        <DarkModeBtn />
        <ScrollTopBtn />
      </section>

      <Footer />
    </>
  );
};

export default BasicLayout;
