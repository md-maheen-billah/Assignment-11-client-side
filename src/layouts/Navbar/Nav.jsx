import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import logoN from "../../assets/logo.png";

const Nav = () => {
  const { user, logOut } = useAuth();

  const handleSignOut = () => {
    logOut();
    toast.success("Logged Out Successfully");
  };
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-greenM border-b-4 border-greenM"
              : "hover:text-greenM"
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
              ? "text-greenM border-b-4 border-greenM"
              : "hover:text-greenM"
          }
        >
          All Food
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/gallery"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-greenM border-b-4 border-greenM"
              : "hover:text-greenM"
          }
        >
          Gallery
        </NavLink>
      </li>
    </>
  );
  const navLinks2 = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-goldenM focus:text-goldenM focus:bg-greenM bg-greenM border-b-4  border-greenM"
              : ""
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
              ? "text-goldenM focus:text-goldenM focus:bg-greenM bg-greenM border-b-4  border-greenM"
              : ""
          }
        >
          All Food
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/gallery"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-goldenM focus:text-goldenM focus:bg-greenM bg-greenM border-b-4  border-greenM"
              : ""
          }
        >
          Gallery
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-goldenM">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
            className="menu menu-sm dropdown-content mt-4 text-greenM font-semibold z-50 p-2 shadow bg-goldenM rounded-box w-52"
          >
            {navLinks2}
          </ul>
        </div>
        <a className="btn btn-ghost pl-0 text-greenM text-2xl font-extrabold">
          Savor Oasis <img className="h-8" src={logoN} alt="" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex text-greenM font-medium gap-6">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user && user.photoURL ? (
          <div className="flex items-center">
            <div className="dropdown ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 rounded-full border-greenM border-2">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-4 text-greenM font-semibold z-[20] p-2 shadow right-1 lg:right-[-80px] bg-goldenM rounded-box w-52"
              >
                <li>
                  <NavLink
                    to="/my-added-food"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-goldenM focus:text-goldenM focus:bg-greenM bg-greenM border-b-4  border-greenM"
                        : ""
                    }
                  >
                    My added food items
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/food-add"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-goldenM focus:text-goldenM focus:bg-greenM bg-greenM border-b-4  border-greenM"
                        : ""
                    }
                  >
                    Add a food item
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-ordered-food"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-goldenM focus:text-goldenM focus:bg-greenM bg-greenM border-b-4  border-greenM"
                        : ""
                    }
                  >
                    My ordered food items
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/favorites"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-goldenM focus:text-goldenM focus:bg-greenM bg-greenM border-b-4  border-greenM"
                        : ""
                    }
                  >
                    Favorites
                  </NavLink>
                </li>

                <li className="lg:hidden px-2 pt-2">
                  <a
                    onClick={handleSignOut}
                    className="btn w-full font-semibold bg-greenM hover:bg-lgreenM text-whiteM border-none hover:text-greenM"
                  >
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
            <button
              onClick={handleSignOut}
              className="font-bold hidden lg:flex ml-2 rounded-md px-4 py-2 bg-greenM text-whiteM relative overflow-hidden group z-10 hover:text-greenM duration-1000"
            >
              <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="font-bold ml-2 rounded-md px-4 py-2 bg-greenM text-whiteM relative overflow-hidden group z-10 hover:text-greenM duration-1000">
              <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
