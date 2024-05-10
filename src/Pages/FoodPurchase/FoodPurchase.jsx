import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const FoodPurchase = () => {
  const { user } = useContext(AuthContext);
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let fullDate = `${day}/${month}/${year}`;

  const { id } = useParams();
  const [food, setFood] = useState({});
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/food-details/${id}`
      );
      setFood(data);
    };
    getData();
  }, [id]);

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
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/purchases`,
        purchaseData
      );
      if (data?.insertedId) {
        toast.success("Ordered Successfully");
      }
    } catch (err) {
      console.log(err);
      console.log("Hi, i am error", err.message);
    }

    fetch(`${import.meta.env.VITE_API_URL}/purchase-changes/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ quantityBought }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div>
      <h2>This is Food Purchase Page</h2>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Food Purchase
        </h2>

        <form onSubmit={handlePurchase}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="buyerName"
              >
                Name
              </label>
              <input
                id="buyerName"
                name="buyerName"
                defaultValue={user.displayName}
                readOnly
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="foodName"
              >
                Food Name
              </label>
              <input
                id="foodName"
                name="foodName"
                defaultValue={food.foodName}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="buyingDate"
              >
                Buying Date
              </label>
              <input
                id="buyingDate"
                name="buyingDate"
                defaultValue={fullDate}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="quantityBought"
            >
              Quantity
            </label>
            <input
              id="quantityBought"
              name="quantityBought"
              type="number"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

          <div className="flex justify-end mt-6">
            {food.quantity === 0 && (
              <p className="text-red-600 italic">item is not available.</p>
            )}
            <button
              disabled={food.quantity === 0}
              className="px-8 disabled:cursor-not-allowed py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Purchase
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default FoodPurchase;