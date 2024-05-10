import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Root = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="z-10">
        <Navbar></Navbar>
      </div>
      <div>
        <div className="max-w-[1280px] mx-auto">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
