import Aos from "aos";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ food }) => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  return (
    <div data-aos="fade-up">
      <div className="max-[350px] lg:hover:scale-105 transition mx-auto space-y-6 rounded-2xl bg-goldenM px-6 py-4 shadow-md dark:bg-[#18181B] md:w-[350px]">
        {/* Card Image */}
        <img
          height={190}
          className="h-[190px] object-cover w-[260px] md:w-[350px] rounded-2xl bg-gray-400"
          src={food.foodImage}
          alt="card navigate ui"
        />
        {/* Card Heading */}
        <div className="space-y-2">
          <h2 className="font-medium text-greenM sm:text-lg md:text-xl dark:text-white/90">
            {food.foodName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-white/60">
            {food.foodCategory} Cuisine
          </p>
        </div>
        {/* Price and action button */}
        <div className="mt-5 flex items-center justify-between">
          <h2 className="font-medium text-greenM md:text-xl dark:text-white/60">
            ${food.price}
          </h2>
          <Link to={`/food-details/${food._id}`}>
            <button className="font-bold rounded-md px-4 py-2 bg-greenM text-whiteM relative overflow-hidden group z-10 hover:text-greenM duration-1000">
              <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
