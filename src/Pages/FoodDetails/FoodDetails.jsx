import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";

const FoodDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: food = {}, isLoading } = useQuery({
    queryFn: () => getData(),
    queryKey: ["food-details", id],
  });

  const getData = async () => {
    const { data } = await axiosSecure(`/food-details/${id}`);
    return data;
  };

  if (isLoading) return <Spinner></Spinner>;
  return (
    <div>
      <section className="pb-12 lg:py-20  text-whiteM dark:text-white relative overflow-hidden">
        <div className="container px-4 mx-auto relative">
          <div className="flex flex-col md:flex-row md:gap-12 items-center justify-between">
            <div className="w-full md:w-1/2   md:text-start my-12">
              <h2 className="text-3xl leading-none md:text-[45px] font-bold mb-6">
                {food.foodName}
              </h2>
              <div className="flex items-center gap-4">
                <img
                  className="h-10 rounded-full"
                  src={food.sellerPhoto}
                  alt=""
                />
                <div>
                  <p className="text-lg text-left truncate max-w-52 lg:max-w-full">
                    {food.sellerName}
                  </p>
                  <p className="truncate max-w-52 lg:max-w-full">
                    {food.sellerEmail}
                  </p>
                </div>
              </div>
              <p className="lg:text-lg text-left mt-4 text-lgreenM leading-normal opacity-80">
                {food.description}
              </p>
              <p className="lg:text-lg text-lgreenM leading-normal mt-4">
                Category: {food.foodCategory} Cuisine
              </p>
              <p className="lg:text-lg text-lgreenM leading-normal mt-2">
                Origin: {food.foodOrigin}
              </p>
              <p className="text-2xl text-whiteM leading-normal mt-2">
                ${food.price}
              </p>
              <div className="mt-8">
                <Link to={`/food-purchase/${food._id}`}>
                  <button className="font-bold rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000">
                    <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                    <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                    Purchase
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <img
                src={food.foodImage}
                alt=""
                className="mx-auto md:h-[450px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoodDetails;
