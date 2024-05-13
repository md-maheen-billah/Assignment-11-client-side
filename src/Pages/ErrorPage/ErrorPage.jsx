import { Helmet } from "react-helmet-async";
import giff from "../../assets/images/jelly-living-numbers-four-hundred-and-four.gif";
const ErrorPage = () => {
  return (
    <section className="flex items-center h-svh p-16 bg-greenM">
      <Helmet>
        <title>Error Page</title>
      </Helmet>
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center relative">
          {/* <h2 className="mb-8 font-extrabold text-9xl text-goldenM">
            <span className="sr-only">Error</span>404
          </h2> */}
          <img className="w-8/12 mx-auto" src={giff} alt="" />
          <p className="text-2xl md:top-60 md:absolute font-semibold md:text-3xl text-whiteM">
            Sorry, we couldn&#39;t find this page.
          </p>
          <p className="mt-4 md:mt-0 lg:mb-4 text-lgreenM">
            But don&#39;t worry, you can find plenty of other things on our
            homepage.
          </p>
          <a rel="noopener noreferrer" href="/" className="">
            <button className="font-bold mt-6 rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-0 hover:text-greenM duration-1000">
              <span className="absolute bg-whiteM  size-80 rounded-full group-hover:scale-150 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-lgreenM size-80 -left-2 -top-10 rounded-full group-hover:scale-150 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              Home Page
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
