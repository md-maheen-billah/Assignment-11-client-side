import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrdered = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/purchases/${user?.email}`
      );
      setFoods(data);
    };
    getData();
  }, [user]);

  const getData = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_API_URL}/purchases/${user?.email}`
    );
    setFoods(data);
  };

  const handleDelete = async (id, foodId, quantityBought) => {
    fetch(`${import.meta.env.VITE_API_URL}/delete-changes/${foodId}`, {
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

    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete-purchases/${id}`
      );
      console.log(data);
      toast.success("Delete Successful");

      //refresh ui
      getData();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h2>This is my ordered food item page</h2>
      {foods.map((food) => (
        <div className="border-2 border-red-400" key={food._id}>
          <p>{food.foodName}</p>
          <img src={food.foodImage} width="100" alt="" />
          <p>Date: {food.buyDate}</p>
          <p>Email: {food.sellerEmail}</p>
          <p>Food ID: {food.foodId}</p>
          <p>Quantity: {food.quantityBought}</p>
          <button
            onClick={() =>
              handleDelete(food._id, food.foodId, food.quantityBought)
            }
            className="btn"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyOrdered;
