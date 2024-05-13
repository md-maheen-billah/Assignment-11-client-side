import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const sliders = [
    {
      img: "https://i.ibb.co/L0HCPZR/9bc48fea-7577-4823-a60e-0fb49614006b.jpg",
      title: "Savor Delights",
      des: "Discover culinary marvels. Indulge in a world of flavor.",
    },
    {
      img: "https://i.ibb.co/2vdn13m/9fd16e3b-34bb-4d2b-bc7c-de9251ab25d6.jpg",
      title: "Gourmet Feasts",
      des: "Experience epicurean delights. Elevate your dining experience.",
    },
    {
      img: "https://i.ibb.co/Bgq8yZT/4b4a8e4d-1911-49a2-8c86-6dca93db3b51.jpg",
      title: "Taste Temptations",
      des: "Explore gastronomic wonders. Satisfy your cravings.",
    },
    {
      img: "https://i.ibb.co/qsrDy4h/24bdd697-b8cc-4c1d-9826-607a2ffd53d7.jpg",
      title: "Culinary Creations",
      des: "Unleash epicurean adventures. Embark on a flavor journey.",
    },
    {
      img: "https://i.ibb.co/N2JVbhQ/b1956b67-99d2-4712-9aca-3822e87939a5.jpg",
      title: "Flavorful Finds",
      des: "Find culinary treasures. Delightful feelings in every bite.",
    },
  ];
  const nextSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === sliders.length - 1 ? 0 : currentSlider + 1
    );
  const isSmallScreen = window.innerWidth <= 768;

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setCurrentSlider(
          currentSlider === sliders.length - 1 ? 0 : currentSlider + 1
        ),
      5000
    );
    return () => clearInterval(intervalId);
  }, [currentSlider, sliders.length]);

  return (
    <div
      className="w-full mt-6 lg:mt-12 rounded-2xl h-60 sm:h-96 md:h-[400px] flex flex-col xl:flex-row items-center justify-center gap-5 lg:gap-10 relative bg-cover bg-center before:absolute before:bg-black/40 before:inset-0 transform duration-1000 ease-linear overflow-hidden"
      style={{
        backgroundImage: `url(${
          currentSlider === 0
            ? sliders[sliders.length - 1].img
            : sliders[currentSlider - 1].img
        })`,
      }}
    >
      {/* arrow */}
      <button
        onClick={nextSlider}
        className="absolute flex justify-center  items-center right-2 bottom-1/2 rounded-full z-50 w-6 h-6 md:w-8 md:h-8 bgWhite "
      >
        <svg
          viewBox="0 0 1024 1024"
          className="w-4 h-4 md:w-6 md:h-6 icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          transform="rotate(180)"
        >
          <g strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill="#F9BC60"
              d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
            ></path>
          </g>
        </svg>
      </button>

      {/* text container here */}
      <div className="md:w-1/2 w-44 pl-4 lg:px-8 left-0 absolute drop-shadow-lg text-white rounded-lg">
        <h1 className="lg:text-4xl text-lg font-bold text-whiteM mb-3">
          {sliders[currentSlider].title}
        </h1>
        <p className="text-base text-whiteM md:text-base lg:text-lg">
          {sliders[currentSlider].des}
        </p>
        <div className="flex justify-start mt-4">
          <Link to={`/all-food`}>
            <button className="font-bold rounded-md text-sm md:text-base  px-4 py-2  bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000">
              <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              Explore
            </button>
          </Link>
        </div>
      </div>
      {/* slider container */}
      <div className="w-1/2 ml-auto overflow-hidden  absolute -right-5 lg:-right-4 z-10 px-4 py-10">
        <div
          className="ease-linear duration-300 flex gap-4 items-center"
          style={{
            transform: `translateX(-${
              currentSlider * (isSmallScreen ? 98 : 200)
            }px)`,
          }}
        >
          {/* sliders */}
          {sliders.map((slide, inx) => (
            <img
              key={inx}
              src={slide.img}
              className={`h-[180px] sm:h-[200px] lg:h-[320px] min-w-[90px] lg:min-w-[184px] ${
                currentSlider - 1 === inx ? "scale-0" : "scale-100 delay-500"
              } drop-shadow-2xl shadow-lg shadow-black bg-black/50 duration-300 rounded-lg z-50`}
              alt={slide.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
