import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import HomeCard from "./HomeCard";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Banner from "./Banner";

const Home = () => {
  const axiosSecure = useAxiosSecure();

  const { data: foods = [], isLoading } = useQuery({
    queryFn: () => getData(),
    queryKey: ["allfoods"],
  });

  const getData = async () => {
    const { data } = await axiosSecure(`/allfoods`);
    return data;
  };

  if (isLoading) return <Spinner></Spinner>;
  return (
    <div className="">
      <Banner></Banner>
      <section className="my-6">
        <div className="my-6">
          <h2 className="text-center font-bold text-3xl text-whiteM mb-2">
            Top Foods Section
          </h2>
          <p className="text-lgreenM text-center mx-auto lg:w-8/12">
            A curated selection of culinary delights that have captured the
            hearts and palates of food enthusiasts around the world from
            timeless classics to innovative creations.
          </p>
        </div>
        <div className="grid mb-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods
            .sort((a, b) => {
              return b.count - a.count;
            })
            .slice(0, 6)
            .map((food) => (
              <HomeCard food={food} key={food._id}></HomeCard>
            ))}
        </div>
        <div className="flex justify-center">
          <Link to={`/all-food`}>
            <button className="font-bold rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000">
              <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              See All
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
