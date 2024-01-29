import Footer from "./layout/Footer";
import NavBar from "./layout/Navbar";
import { Outlet } from "react-router-dom";

const BasicLayout = () => {
  return (
    <>
      <NavBar />
      <section>
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default BasicLayout;
