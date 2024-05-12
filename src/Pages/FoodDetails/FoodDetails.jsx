import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState({});
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/food-details/${id}`,
        { withCredentials: true }
      );
      setFood(data);
    };
    getData();
  }, [id]);
  return (
    <div>
      <h2>This is Food Details Page</h2>
      <p>{food.foodName}</p>
      <p>Quantity: {food.quantity}</p>
      <p>Purchased Time: {food.count}</p>
      <Link to={`/food-purchase/${food._id}`}>
        <button className="btn">Purchase</button>
      </Link>
    </div>
  );
};

export default FoodDetails;
