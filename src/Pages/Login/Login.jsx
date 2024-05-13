import { Link, useLocation, useNavigate } from "react-router-dom";
import bgImg from "../../assets/images/dcdb34f2-85da-402c-9b2e-a647935d6eb1.jpeg";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Aos from "aos";
import { Bounce } from "react-awesome-reveal";

const Login = () => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signInWithGoogle, user } = useAuth();
  const from = location.state || "/";
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const { data } = await axiosSecure.post(`/jwt`, {
        email: result?.user?.email,
      });
      console.log(data);
      toast.success("Signin Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Email Password Signin
  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.password.value;
    console.log({ email, pass });
    try {
      //User Login
      const result = await signIn(email, pass);
      const { data } = await axiosSecure.post(`/jwt`, {
        email: result?.user?.email,
      });
      console.log(data);
      navigate(from, { replace: true });
      toast.success("Signin Successful");
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
        <title>Login</title>
      </Helmet>
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-lgreenM rounded-lg shadow-lg  lg:max-w-4xl ">
        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{
            backgroundImage: `url(${bgImg})`,
          }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="mt-3 text-xl text-center text-greenM ">
            <Bounce>Welcome!</Bounce>
          </div>

          <div
            onClick={handleGoogleSignIn}
            className="flex cursor-pointer items-center justify-center mt-4 text-greenM transition-colors duration-300 transform border border-greenM rounded-lg   hover:bg-whiteM"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b border-greenM lg:w-1/4"></span>

            <div className="text-xs text-center text-greenM uppercase ">or</div>

            <span className="w-1/5 border-b border-greenM lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSignIn}>
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
                placeholder="Enter Email"
                className="block w-full px-4 py-2 text-gray-700 bg-whiteM border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
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
                placeholder="Enter Password"
                className="block w-full px-4 py-2 text-gray-700 bg-whiteM border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
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
                Login
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b border-greenM md:w-1/4"></span>

            <Link
              to="/register"
              className="text-xs text-greenM uppercase  hover:underline"
            >
              OR Register Here
            </Link>

            <span className="w-1/5 border-b border-greenM md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
