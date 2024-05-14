// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Parallax, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="mt-4 lg:mt-12 overflow-x-hidden">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Parallax, Autoplay, Pagination, Navigation]}
        className="mySwiper h-[250px] lg:h-[400px]"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3)),url(https://i.ibb.co/qsrDy4h/24bdd697-b8cc-4c1d-9826-607a2ffd53d7.jpg)",
          }}
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide>
          <div className="flex items-center w-3/4 mx-auto text-whiteM justify-center h-full ">
            <div className="flex">
              <div className="">
                <div className="">
                  <div
                    className="title text-center animate__animated animate__headShake  animate__slow animate__infinite font-bold text-2xl md:text-4xl"
                    data-swiper-parallax="-300"
                  >
                    Savor Delights
                  </div>
                  <div
                    className="text-center font-light mt-2 text-sm"
                    data-swiper-parallax="-100"
                  >
                    <p>
                      Discover culinary marvels. Indulge in a world of flavor.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-6">
                  <Link to={`/all-food`}>
                    <button className="font-bold animate__animated animate__pulse animate__infinite rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000">
                      <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                      <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                      Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center w-3/4 mx-auto text-whiteM justify-center h-full ">
            <div>
              <div
                className="title text-center animate__animated animate__headShake  animate__slow animate__infinite font-bold text-2xl md:text-4xl"
                data-swiper-parallax="-300"
              >
                Gourmet Feasts
              </div>
              <div
                className="text-center font-light mt-2 text-sm"
                data-swiper-parallax="-100"
              >
                <p>
                  Experience epicurean delights. Elevate your dining experience.
                </p>
              </div>
              <div className="flex items-center justify-center mt-6">
                <Link to={`/all-food`}>
                  <button className="font-bold animate__animated animate__pulse animate__infinite rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000">
                    <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                    <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center w-3/4 mx-auto text-whiteM justify-center h-full ">
            <div>
              <div
                className="title text-center animate__animated animate__headShake  animate__slow animate__infinite font-bold text-2xl md:text-4xl"
                data-swiper-parallax="-300"
              >
                Taste Temptations
              </div>
              <div
                className="text-center font-light mt-2 text-sm"
                data-swiper-parallax="-100"
              >
                <p>Explore gastronomic wonders. Satisfy your cravings.</p>
              </div>
              <div className="flex items-center justify-center mt-6">
                <Link to={`/all-food`}>
                  <button className="font-bold animate__animated animate__pulse animate__infinite rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000">
                    <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                    <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
