import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

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
        </div>
      ))}
    </div>
  );
};

export default MyAdded;
