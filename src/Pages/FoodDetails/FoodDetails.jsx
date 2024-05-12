import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const FoodDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: food = {}, isLoading } = useQuery({
    queryFn: () => getData(),
    queryKey: ["food-details"],
  });

  const getData = async () => {
    const { data } = await axiosSecure(`/food-details/${id}`);
    return data;
  };

  if (isLoading) return <p>Data is still loading....</p>;
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
