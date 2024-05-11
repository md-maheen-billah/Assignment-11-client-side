import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllFood = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/allfoods?search=${search}`
      );
      setFoods(data);
    };
    getData();
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  const handleReset = () => {
    setSearch("");
    setSearchText("");
  };
  return (
    <div>
      <h2>This is All food</h2>
      <form onSubmit={handleSearch}>
        <div className="flex p-1 overflow-hidden rounded-lg  focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <input
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            name="search"
            placeholder="Enter Food Name"
            aria-label="Enter Food Name"
          />

          <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
            Search
          </button>
        </div>
      </form>
      <button onClick={handleReset} className="btn">
        Reset
      </button>
      <div className="grid grid-cols-3 gap-8">
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
    </div>
  );
};

export default AllFood;
