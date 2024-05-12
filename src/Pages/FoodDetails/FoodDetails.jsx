import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FoodDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [food, setFood] = useState({});
  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosSecure(`/food-details/${id}`);
      setFood(data);
    };
    getData();
  }, [id, axiosSecure]);
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
