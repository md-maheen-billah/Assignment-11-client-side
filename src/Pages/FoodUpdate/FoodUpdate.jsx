import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import bgimg from "../../assets/images/pixlr-image-generator-5d429792-ac12-4a1c-a6a2-9d98be079a2a.png";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Aos from "aos";
import { Bounce } from "react-awesome-reveal";

const FoodUpdate = () => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ updateFood }) => {
      const { data } = await axiosSecure.put(`/update-foods/${id}`, updateFood);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      toast.success("Food Updated Successfully");
      navigate("/my-added-food");
      queryClient.invalidateQueries({ queryKey: ["food-details"] });
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodImage.value;
    const foodCategory = form.foodCategory.value;
    const foodOrigin = form.foodOrigin.value;
    const description = form.description.value;
    const quantity = parseFloat(form.quantity.value);
    const price = form.price.value;

    const updateFood = {
      foodName,
      foodImage,
      foodCategory,
      foodOrigin,
      description,
      quantity,
      price,
    };

    await mutateAsync({ updateFood });
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
        <title>Update Food Item</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url(${bgimg})`,
        }}
        className="mt-8 rounded-2xl bg-cover flex justify-center items-center lg:h-56"
      >
        <div>
          <h2 className=" text-center pt-2 lg:pt-0 font-bold text-2xl md:text-4xl text-whiteM mb-2">
            <Bounce>Update Food Item</Bounce>
          </h2>
          <p className="text-lgreenM px-4 pb-4 text-center">
            Easily refine and enhance your culinary offerings with our
            streamlined food item updating section, ensuring every detail.
          </p>
        </div>
      </div>
      <div data-aos="fade-up" className="lg:mt-8 mt-6 mb-10 lg:mb-20">
        <form onSubmit={handleUpdate} className="mt-4 space-y-3">
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="foodName">
                Food Name:
              </label>
              <input
                className="mt-2  p-2 rounded-md w-full bg-whiteM"
                type="text"
                id="foodName"
                name="foodName"
                required
                defaultValue={food.foodName}
                placeholder="Enter Item Name"
              />
            </div>
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="foodImage">
                Image URL:
              </label>
              <input
                className="mt-2  p-2 rounded-md w-full bg-whiteM"
                type="text"
                id="foodImage"
                name="foodImage"
                defaultValue={food.foodImage}
                required
                placeholder="Enter Image URL"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label
                className="text-whiteM  font-semibold"
                htmlFor="foodCategory"
              >
                Food Category:
              </label>
              <select
                className="mt-2   p-2 rounded-md w-full bg-whiteM"
                id="foodCategory"
                name="foodCategory"
                placeholder="Select Subcategory"
                required
              >
                <option value={food.foodCategory}>
                  {food.foodCategory} (Selected)
                </option>
                <option value="Italian">Italian Cuisine</option>
                <option value="Japanese">Japanese Cuisine</option>
                <option value="Mexican">Mexican Cuisine</option>
                <option value="Indian">Indian Cuisine</option>
                <option value="Mediterranean">Mediterranean Cuisine</option>
              </select>
            </div>
            <div className="lg:w-1/2">
              <label className="text-whiteM  font-semibold" htmlFor="quantity">
                Quantity:
              </label>
              <input
                className="mt-2 p-2 rounded-md w-full bg-whiteM"
                id="quantity"
                name="quantity"
                type="number"
                defaultValue={food.quantity}
                required
                placeholder="Enter Quantity"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="price">
                Price:
              </label>
              <input
                className="mt-2  p-2 rounded-md w-full bg-whiteM"
                step=".01"
                type="number"
                id="price"
                name="price"
                defaultValue={food.price}
                required
                placeholder="Enter Price"
              />
            </div>
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="foodOrigin">
                Food Origin:
              </label>
              <input
                className="mt-2  p-2 rounded-md w-full bg-whiteM"
                type="text"
                id="foodOrigin"
                name="foodOrigin"
                defaultValue={food.foodOrigin}
                required
                placeholder="Enter Origin Country"
              />
            </div>
          </div>
          <div className="">
            <label className="text-whiteM font-semibold" htmlFor="description">
              Short Description:
            </label>
            <textarea
              className="mt-2  p-2 rounded-md w-full bg-whiteM"
              type="text"
              id="description"
              name="description"
              defaultValue={food.description}
              required
              placeholder="Write a Short Description"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="sellerName">
                Seller Name:
              </label>
              <input
                className="mt-2  p-2 rounded-md w-full bg-whiteM"
                type="text"
                id="sellerName"
                name="sellerName"
                required
                readOnly
                defaultValue={food.sellerName}
              />
            </div>
            <div className="lg:w-1/2">
              <label
                className="text-whiteM font-semibold"
                htmlFor="sellerEmail"
              >
                Seller Email:
              </label>
              <input
                className="mt-2   p-2 rounded-md w-full bg-whiteM"
                type="email"
                id="sellerEmail"
                name="sellerEmail"
                defaultValue={food.sellerEmail}
                readOnly
                required
                placeholder="Enter Email"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="font-bold mt-8 animate__animated animate__pulse animate__infinite rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000"
            >
              <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              Update Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodUpdate;
