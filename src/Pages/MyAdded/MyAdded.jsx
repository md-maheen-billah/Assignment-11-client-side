import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyAdded = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/allfoods/${user?.email}`
      );
      setFoods(data);
    };
    getData();
  }, [user]);

  const getData = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_API_URL}/allfoods/${user?.email}`
    );
    setFoods(data);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete-purchases-food/${id}`
      );
      console.log(data);

      //refresh ui
      getData();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }

    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete-food/${id}`
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
      <h2>This is my added food item page</h2>
      {foods.map((food) => (
        <div className="border-2 border-red-400" key={food._id}>
          <p>{food.foodName}</p>
          <img src={food.foodImage} width="100" alt="" />
          <img
            className="rounded-full"
            src={food.sellerPhoto}
            width="40"
            alt=""
          />
          <p>Quantity: {food.quantity}</p>
          <p>Purchased Time: {food.count}</p>
          <Link to={`/food-details/${food._id}`}>
            <button className="btn">Details</button>
          </Link>
          <button onClick={() => handleDelete(food._id)} className="btn">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyAdded;
