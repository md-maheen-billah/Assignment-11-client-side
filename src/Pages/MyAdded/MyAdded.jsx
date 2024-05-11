import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/delete-food/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Removed!",
                text: "Your Item has been removed.",
                icon: "success",
              });
              const remaining = foods.filter((item) => item._id !== id);
              setFoods(remaining);
              fetch(
                `${import.meta.env.VITE_API_URL}/delete-purchases-food/${id}`,
                {
                  method: "DELETE",
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                });
            }
          });
      }
    });
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
          <Link to={`/update-food/${food._id}`}>
            <button className="btn">Update</button>
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
