import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

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

  const handleDelete = async (id, foodId, quantityBought) => {
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

        fetch(`${import.meta.env.VITE_API_URL}/delete-purchases/${id}`, {
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
            }
          });
      }
    });
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
