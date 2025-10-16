 import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-600 h-[100%]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
