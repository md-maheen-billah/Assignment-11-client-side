import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav from "../Navbar/Nav";
import { ScrollRestoration } from "react-router-dom";

const Root = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="z-10">
        <Nav></Nav>
      </div>
      <div>
        <div className="max-w-[1280px] mx-auto px-2">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
      <ScrollRestoration />
    </div>
  );
};

export default Root;
