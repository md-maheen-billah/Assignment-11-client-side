import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosSecure(`/allfoods`);
      setFoods(data);
    };
    getData();
  }, [axiosSecure]);
  return (
    <div>
      <h2>This is home</h2>
      <div className="grid grid-cols-3 gap-8">
        {foods
          .sort((a, b) => {
            return b.count - a.count;
          })
          .slice(0, 6)
          .map((food) => (
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
    </div>
  );
};

export default Home;
