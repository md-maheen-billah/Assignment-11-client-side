import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
    if (localTheme === "synthwave") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("synthwave");
    } else {
      setTheme("light");
    }
  };

  const handleSignOut = () => {
    logOut();
    toast.success("Logged Out Successfully");
  };
  const navLinks2 = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " border-2 border-[#1e1b4b] text-[#f9a06f] px-4 bg-[#1e1b4b] hover:text-[#f9a06f] focus:bg-[#1e1b4b] focus:text-[#f9a06f] py-2 font-bold"
              : "hover:text-[#f9a06f] py-2 font-bold border-2 px-4 border-[#f9a06f]"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-food"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " border-2 border-[#1e1b4b] text-[#f9a06f] px-4 bg-[#1e1b4b] hover:text-[#f9a06f] focus:bg-[#1e1b4b] focus:text-[#f9a06f] py-2 font-bold"
              : "hover:text-[#f9a06f] py-2 font-bold border-2 px-4 border-[#f9a06f]"
          }
        >
          All Food
        </NavLink>
      </li>
    </>
  );
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-[#f9a06f] border-b-4 border-[#f9a06f]"
              : "hover:text-[#f9a06f]"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-food"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-[#f9a06f] border-b-4 border-[#f9a06f]"
              : "hover:text-[#f9a06f]"
          }
        >
          All Food
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar ">
      <div className="navbar-start">
        <div className="dropdown mr-2 lg:mr-0">
          <div tabIndex={0} role="button" className=" lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#05386B"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2  bg-[#f9a06f] rounded-box w-52"
          >
            {navLinks2}
          </ul>
        </div>
        <button className="btn btn-ghost text-2xl font-extrabold text-[#1e1b4b] dark:text-orange-500 p-0 ">
          Savor <span className="text-[#f9a06f]">Oasis</span>{" "}
        </button>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex font-medium gap-6">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <label className="swap swap-rotate mr-2">
          {/* this hidden checkbox controls the state */}
          <input
            onChange={handleToggle}
            type="checkbox"
            className="theme-controller"
            checked={theme === "light" ? false : true}
          />

          {/* sun icon */}
          <svg
            className="swap-off fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        {user && user.photoURL ? (
          <>
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 rounded-full border-[#f9a06f] border-2">
                  <img
                    alt="User Profile Photo"
                    referrerPolicy="no-referrer"
                    src={user.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[20] p-2 shadow menu menu-sm dropdown-content bg-[#f9a06f] font-semibold  text-[#1e1b4b]  w-52 right-2 lg:right-[-55px] rounded-box "
              >
                <li>
                  <Link to="/food-add" className="justify-between">
                    My added food items
                  </Link>
                </li>
                <li>
                  <Link to="/food-add" className="justify-between">
                    Add a food item
                  </Link>
                </li>
                <li>
                  <Link to="/food-add" className="justify-between">
                    My ordered food items
                  </Link>
                </li>
                <li className="lg:hidden">
                  <div className="flex justify-center">
                    <a
                      onClick={handleSignOut}
                      className="btn font-semibold bg-[#1e1b4b] hover:bg-[#fac0a1] text-[#f9a06f] border-none hover:text-[#EDF5E1]"
                    >
                      Sign Out
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <button
              onClick={handleSignOut}
              className="font-bold ml-2 hidden lg:flex rounded-md px-4 py-2 bg-[#f9a06f] text-[#1e1b4b] relative overflow-hidden group z-10 hover:text-[#1e1b4b] duration-1000"
            >
              <span className="absolute bg-[#ffede2]  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-[#fac0a1] size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="font-bold ml-2 rounded-md px-4 py-2 bg-[#f9a06f] text-[#1e1b4b] relative overflow-hidden group z-10 hover:text-[#1e1b4b] duration-1000">
              <span className="absolute bg-[#ffede2]  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-[#fac0a1] size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
