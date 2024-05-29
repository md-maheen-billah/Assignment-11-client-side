import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import bgimg from "../../assets/images/pixlr-image-generator-506d4a2c-018d-457b-8b62-25cfb6920911.png";
import Spinner from "../../components/Spinner";
import AllFoodCard from "./AllFoodCard";
import { Helmet } from "react-helmet-async";
import Aos from "aos";
import "aos/dist/aos.css";
import { Bounce } from "react-awesome-reveal";
import AllFoodCategory from "./AllFoodCategory";

const AllFood = () => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  const handleReset = () => {
    setSearch("");
    setSearchText("");
    setFilter("");
  };

  const { data: foods = [], isLoading } = useQuery({
    queryFn: () => getData(),
    queryKey: ["allfoods", search, filter],
  });

  const getData = async () => {
    const { data } = await axiosSecure(
      `/allfoods?search=${search}&filter=${filter}`
    );
    return data;
  };

  if (isLoading) return <Spinner></Spinner>;
  return (
    <div data-aos="fade-up">
      <Helmet>
        <title>All Food</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url(${bgimg})`,
        }}
        className="mt-8 rounded-2xl bg-cover flex justify-center items-center lg:h-56"
      >
        <div>
          <h2 className=" text-center pt-2 lg:pt-0 font-bold text-2xl md:text-4xl text-whiteM mb-2">
            <Bounce>All Food</Bounce>
          </h2>
          <p className="text-lgreenM px-4 pb-4 text-center">
            Explore a world of flavors with our diverse selection of
            mouthwatering dishes, each crafted to satisfy your cravings.
          </p>
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-center my-6">
          <div className="flex gap-1 items-center">
            <form onSubmit={handleSearch}>
              <div className="flex p-1 gap-2 overflow-hidden rounded-lg relative">
                <input
                  className="lg:px-6 pl-2 pr-3 w-28 md:w-auto py-2 text-gray-700 rounded-lg  bg-whiteM outline-none focus:placeholder-transparent"
                  type="text"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  name="search"
                  placeholder="Enter Food Name"
                  aria-label="Enter Food Name"
                />
                <button className="font-bold animate__animated animate__pulse animate__infinite rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000">
                  <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                  <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                  Search
                </button>
              </div>
            </form>

            <button
              onClick={handleReset}
              className="font-bold rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000"
            >
              <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              Reset
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <AllFoodCategory
            setFilter={setFilter}
            filter={filter}
          ></AllFoodCategory>
        </div>
        <div className="grid mt-10 mb-10 md:mb-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <AllFoodCard food={food} key={food._id}></AllFoodCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllFood;
