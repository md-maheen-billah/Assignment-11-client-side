import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Aos from "aos";
import { Bounce } from "react-awesome-reveal";
import { FaHeart } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const FoodDetails = () => {
  const { user } = useAuth();
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
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

  const { mutateAsync } = useMutation({
    mutationFn: async (fdata) => {
      const { data } = await axiosSecure.post("/favorites", fdata);
      return data;
    },
    onSuccess: () => {
      toast.success("Added to Favorites!");
    },
  });

  const handleAddFavorite = async () => {
    const fdata = {
      name: food.foodName,
      email: user?.email,
      sname: food.sellerName,
      semail: food.sellerEmail,
      price: food.price,
      fid: food._id,
    };
    try {
      //   Post request to server
      await mutateAsync(fdata);
    } catch (err) {
      console.log(err);
      toast.error("Already Added to Favorites");
    }
  };
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  if (isLoading) return <Spinner></Spinner>;
  return (
    <div data-aos="fade-up">
      <Helmet>
        <title>{food.foodName} Details</title>
      </Helmet>
      <section className="pb-12 lg:py-20  text-whiteM dark:text-white relative overflow-hidden">
        <div className="container px-4 mx-auto relative">
          <div className="flex flex-col md:flex-row md:gap-12 items-center justify-between">
            <div className="w-full md:w-1/2   md:text-start my-12">
              <div className=" flex gap-3 leading-none   mb-6">
                <h3 className="text-3xl md:text-[45px] font-bold">
                  <Bounce>{food.foodName}</Bounce>
                </h3>
                <Tooltip className="text-xs font-normal" id="my-tooltip" />
                <button onClick={handleAddFavorite}>
                  <FaHeart
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Add to Favorite!"
                    className="text-xl text-red-500 hover:scale-110"
                  />
                </button>
              </div>
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
                  <button className="font-bold animate__animated animate__pulse animate__infinite rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000">
                    <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                    <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                    Purchase
                  </button>
                </Link>
              </div>
            </div>
            <div data-aos="fade-up" className="w-full md:w-1/2">
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
