import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />
        <div className="flex flex-col min-h-[calc(100vh-64px-64px)] overflow-hidden">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
