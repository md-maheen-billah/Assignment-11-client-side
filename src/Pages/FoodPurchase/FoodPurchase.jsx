import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Aos from "aos";
import { Bounce } from "react-awesome-reveal";

const FoodPurchase = () => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let fullDate = `${day}/${month}/${year}`;

  const { id } = useParams();

  const { mutateAsync: mutatePurchase } = useMutation({
    mutationFn: async ({ purchaseData }) => {
      const { data } = await axiosSecure.post(`/purchases`, purchaseData);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      toast.success("Ordered Successfully");
      queryClient.invalidateQueries({ queryKey: ["food-details"] });
    },
  });

  const { mutateAsync: mutateQuantityBought } = useMutation({
    mutationFn: async ({ quantityBought }) => {
      const { data } = await axiosSecure.patch(`/purchase-changes/${id}`, {
        quantityBought,
      });
      console.log(data);
      return data;
    },
    onSuccess: () => {
      navigate("/my-ordered-food");
      queryClient.invalidateQueries({ queryKey: ["food-details"] });
    },
  });

  const handlePurchase = async (e) => {
    e.preventDefault();
    const form = e.target;
    const foodName = food.foodName;
    const price = food.price;
    const foodImage = food.foodImage;
    const sellerName = food.sellerName;
    const sellerEmail = food.sellerEmail;
    const buyerEmail = user.email;
    const quantity = food.quantity;
    const foodId = food._id;
    const buyerName = user.displayName;
    const buyDate = fullDate;
    const quantityBought = parseFloat(form.quantityBought.value);
    if (user?.email === sellerEmail)
      return toast.error("Cannot Order Your Own Products");
    if (quantityBought > quantity)
      return toast.error("Cannot Order More Than Available Quantity");
    const purchaseData = {
      foodName,
      price,
      foodImage,
      sellerName,
      sellerEmail,
      buyerEmail,
      buyerName,
      buyDate,
      quantityBought,
      foodId,
    };

    await mutatePurchase({ purchaseData });
    await mutateQuantityBought({ quantityBought });
  };

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
    <div data-aos="fade-up">
      <Helmet>
        <title>{food.foodName} Purchase</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url(${food.foodImage})`,
        }}
        className="mt-8 rounded-2xl bg-cover bg-center flex justify-center items-center lg:h-56"
      >
        <div>
          <h2 className=" text-center pt-2 lg:pt-0 font-bold text-2xl md:text-4xl text-whiteM mb-2">
            <Bounce>Purchase Item</Bounce>
          </h2>
          <p className="text-lgreenM px-4 pb-4 text-center">
            Please check the following information carefully before proceeding
            to buy {food.foodName}
          </p>
        </div>
      </div>
      <div data-aos="fade-up" className="lg:mt-8 mt-6 mb-10 lg:mb-20">
        <form onSubmit={handlePurchase} className="mt-4 space-y-3">
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="buyerName">
                Name
              </label>
              <input
                id="buyerName"
                name="buyerName"
                defaultValue={user.displayName}
                readOnly
                type="text"
                className="mt-2 p-2 rounded-md w-full bg-whiteM"
              />
            </div>
            <div className="lg:w-1/2">
              <label
                className="text-whiteM  font-semibold"
                htmlFor="buyerEmail"
              >
                Email Address
              </label>
              <input
                id="buyerEmail"
                name="buyerEmail"
                defaultValue={user.email}
                readOnly
                type="email"
                className="mt-2  p-2 rounded-md w-full bg-whiteM"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label className="text-whiteM  font-semibold" htmlFor="foodName">
                Food Name
              </label>
              <input
                id="foodName"
                name="foodName"
                defaultValue={food.foodName}
                readOnly
                type="text"
                className="mt-2  p-2 rounded-md w-full bg-whiteM"
              />
            </div>
            <div className="lg:w-1/2">
              <label
                className="text-whiteM  font-semibold"
                htmlFor="buyingDate"
              >
                Buying Date
              </label>
              <input
                id="buyingDate"
                name="buyingDate"
                defaultValue={fullDate}
                type="text"
                readOnly
                className="mt-2  p-2 rounded-md w-full bg-whiteM"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label
                className="text-whiteM  font-semibold"
                htmlFor="remainingQuantity"
              >
                Remaining Items
              </label>
              <input
                id="remainingQuantity"
                name="remainingQuantity"
                defaultValue={food.quantity}
                type="number"
                readOnly
                className="mt-2  p-2 rounded-md w-full bg-whiteM"
              />
            </div>
            <div className="lg:w-1/2">
              <label
                className="text-whiteM  font-semibold"
                htmlFor="quantityBought"
              >
                Quantity
              </label>
              <input
                id="quantityBought"
                name="quantityBought"
                type="number"
                min="0"
                placeholder="Enter Buying Quantity"
                required
                className="mt-2  p-2 rounded-md w-full bg-whiteM"
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col">
              {food.quantity === 0 && (
                <p className="text-redM text-2xl font-bold text-left">
                  Item is not available.
                </p>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={food.quantity === 0}
                  className="font-bold animate__animated animate__pulse animate__infinite disabled:cursor-not-allowed mt-8 rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000"
                >
                  <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                  <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodPurchase;
