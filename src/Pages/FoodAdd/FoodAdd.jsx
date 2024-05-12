import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FoodAdd = () => {
  const { user } = useAuth();
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
      //   navigate("/my-posted-jobs");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2>This is Food Add</h2>
      <form onSubmit={handleAddFood} className="mt-4 space-y-3">
        <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
          <div className="lg:w-1/2">
            <label
              className="text-[#1e1b4b] dark:text-[#f9a06f] font-semibold"
              htmlFor="foodName"
            >
              Food Name:
            </label>
            <input
              className="mt-2 dark:text-black p-2 rounded-md w-full bg-[#ffede2]"
              type="text"
              id="foodName"
              name="foodName"
              required
              placeholder="Enter Item Name"
            />
          </div>
          <div className="lg:w-1/2">
            <label
              className="text-[#1e1b4b] dark:text-[#f9a06f]  font-semibold"
              htmlFor="foodImage"
            >
              Image URL:
            </label>
            <input
              className="mt-2 dark:text-black p-2 rounded-md w-full bg-[#ffede2]"
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
              className="text-[#1e1b4b] dark:text-[#f9a06f]  font-semibold"
              htmlFor="foodCategory"
            >
              Food Category:
            </label>
            <select
              className="mt-2 dark:text-black  p-2 rounded-md w-full bg-[#ffede2]"
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
            <label
              className="text-[#1e1b4b] dark:text-[#f9a06f]  font-semibold"
              htmlFor="quantity"
            >
              Quantity:
            </label>
            <input
              className="mt-2 dark:text-black p-2 rounded-md w-full bg-[#ffede2]"
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
            <label
              className="text-[#1e1b4b] dark:text-[#f9a06f] font-semibold"
              htmlFor="price"
            >
              Price:
            </label>
            <input
              className="mt-2 dark:text-black p-2 rounded-md w-full bg-[#ffede2]"
              step=".01"
              type="number"
              id="price"
              name="price"
              required
              placeholder="Enter Price"
            />
          </div>
          <div className="lg:w-1/2">
            <label
              className="text-[#1e1b4b] dark:text-[#f9a06f] font-semibold"
              htmlFor="foodOrigin"
            >
              Food Origin:
            </label>
            <input
              className="mt-2 dark:text-black p-2 rounded-md w-full bg-[#ffede2]"
              type="text"
              id="foodOrigin"
              name="foodOrigin"
              required
              placeholder="Enter Origin Country"
            />
          </div>
        </div>
        <div className="">
          <label
            className="text-[#1e1b4b] dark:text-[#f9a06f] font-semibold"
            htmlFor="description"
          >
            Short Description:
          </label>
          <textarea
            className="mt-2 dark:text-black p-2 rounded-md w-full bg-[#ffede2]"
            type="text"
            id="description"
            name="description"
            required
            placeholder="Write a Short Description"
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
          <div className="lg:w-1/2">
            <label
              className="text-[#1e1b4b] dark:text-[#f9a06f] font-semibold"
              htmlFor="sellerName"
            >
              Seller Name:
            </label>
            <input
              className="mt-2 dark:text-black p-2 rounded-md w-full bg-[#ffede2]"
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
              className="text-[#1e1b4b] dark:text-[#f9a06f] font-semibold"
              htmlFor="sellerEmail"
            >
              Seller Email:
            </label>
            <input
              className="mt-2 dark:text-black  p-2 rounded-md w-full bg-[#ffede2]"
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
            className="font-bold mt-4 animate__animated animate__pulse animate__infinite rounded-md px-4 py-2 bg-[#f9a06f] text-[#1e1b4b] relative overflow-hidden group z-10 hover:text-[#1e1b4b] duration-1000"
          >
            <span className="absolute bg-[#ffede2]  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
            <span className="absolute bg-[#fac0a1] size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodAdd;
