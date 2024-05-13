import { Link, useLocation, useNavigate } from "react-router-dom";
import bgImg from "../../assets/images/e5b886c7-6538-480c-ac75-20f2a4004333.jpeg";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Aos from "aos";
import { Bounce } from "react-awesome-reveal";
const Register = () => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const { createUser, updateUserProfile, user, setUser } = useAuth();
  const from = location.state || "/";
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const pass = form.password.value;
    console.log({ email, pass, name, photo });
    try {
      //2. User Registration
      const result = await createUser(email, pass);
      await updateUserProfile(name, photo);
      setUser({
        ...result?.user,
        photoURL: photo,
        displayName: name,
        email: email,
      });
      navigate(from, { replace: true });
      const { data } = await axiosSecure.post(`/jwt`, {
        email: result?.user?.email,
      });
      console.log(data);
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // if (user || loading) return;

  return (
    <div
      data-aos="fade-up"
      className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12"
    >
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-lgreenM rounded-lg shadow-lg  lg:max-w-4xl ">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="mt-3 text-xl text-center text-greenM ">
            <Bounce>Register Account Now!</Bounce>
          </div>

          <form onSubmit={handleSignUp}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-greenM "
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                autoComplete="name"
                name="name"
                placeholder="Enter Your Name"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-greenM "
                htmlFor="photo"
              >
                Photo URL
              </label>
              <input
                id="photo"
                autoComplete="photo"
                name="photo"
                placeholder="Enter A Photo Link"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-greenM "
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                autoComplete="email"
                name="email"
                placeholder="Enter A New Email Address"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-greenM "
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
              </div>

              <input
                id="loggingPassword"
                autoComplete="current-password"
                name="password"
                placeholder="Enter A New Password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="font-bold  w-full rounded-md px-4 py-2 bg-greenM text-whiteM relative overflow-hidden group z-10 hover:text-whiteM duration-1000"
              >
                <span className="absolute bg-whiteM  size-96 rounded-full group-hover:scale-150 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                <span className="absolute bg-[#004650] size-96 -left-2 -top-10 rounded-full group-hover:scale-150 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                Register
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b border-greenM md:w-1/4"></span>

            <Link
              to="/login"
              className="text-xs text-greenM uppercase  hover:underline"
            >
              or Login Here
            </Link>

            <span className="w-1/5 border-b border-greenM md:w-1/4"></span>
          </div>
        </div>
        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{
            backgroundImage: `url(${bgImg})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Register;
