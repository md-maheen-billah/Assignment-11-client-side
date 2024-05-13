import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import bgimg from "../../assets/images/pixlr-image-generator-f6eccbee-e8bc-41b6-8ce3-717b86291580.png";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Aos from "aos";
import { Bounce } from "react-awesome-reveal";

const FoodAdd = () => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const handleAddFood = async (e) => {
    e.preventDefault();
    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodImage.value;
    const foodCategory = form.foodCategory.value;
    const foodOrigin = form.foodOrigin.value;
    const description = form.description.value;
    const quantity = parseFloat(form.quantity.value);
    const price = form.price.value;
    const sellerEmail = user.email;
    const sellerName = user.displayName;
    const sellerPhoto = user.photoURL;
    const count = parseFloat(0);

    const newFood = {
      foodName,
      foodImage,
      foodCategory,
      foodOrigin,
      description,
      quantity,
      price,
      sellerEmail,
      sellerName,
      count,
      sellerPhoto,
    };
    try {
      const { data } = await axiosSecure.post(`/allfoods`, newFood);
      console.log(data);
      toast.success("Food Added Successfully!");
      navigate("/my-added-food");
      //   navigate("/my-posted-jobs");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div data-aos="fade-up">
      <Helmet>
        <title>Add A Food Item</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url(${bgimg})`,
        }}
        className="mt-8 rounded-2xl bg-cover flex justify-center items-center lg:h-56"
      >
        <div>
          <h2 className=" text-center pt-2 lg:pt-0 font-bold text-2xl md:text-4xl text-whiteM mb-2">
            <Bounce>Add A Food Item</Bounce>
          </h2>
          <p className="text-lgreenM px-4 pb-4 text-center">
            Share your culinary masterpieces with the world in our dedicated
            food posting section, where every dish becomes a feast for the eyes.
          </p>
        </div>
      </div>
      <div data-aos="fade-up" className="lg:mt-8 mt-6 mb-10 lg:mb-20">
        <form onSubmit={handleAddFood} className="mt-4 space-y-3">
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="foodName">
                Food Name:
              </label>
              <input
                className="mt-2 p-2 rounded-md w-full bg-whiteM"
                type="text"
                id="foodName"
                name="foodName"
                required
                placeholder="Enter Item Name"
              />
            </div>
            <div className="lg:w-1/2">
              <label className="text-whiteM  font-semibold" htmlFor="foodImage">
                Image URL:
              </label>
              <input
                className="mt-2  p-2 rounded-md w-full bg-whiteM"
                type="text"
                id="foodImage"
                name="foodImage"
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
                className="mt-2  p-2 rounded-md w-full bg-whiteM"
                id="quantity"
                name="quantity"
                type="number"
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
                defaultValue={user.displayName}
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
                defaultValue={user.email}
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
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodAdd;
