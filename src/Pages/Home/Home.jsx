import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/allfoods`);
      setFoods(data);
    };
    getData();
  }, []);
  return (
    <div>
      <h2>This is home</h2>
      {foods
        .sort((a, b) => {
          return b.count - a.count;
        })
        .slice(0, 6)
        .map((food) => (
          <div className="border-2 border-red-400" key={food._id}>
            <p>{food.foodName}</p>
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

export default Home;
