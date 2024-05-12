import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MyAdded = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: mutateDelete } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosSecure.delete(`/delete-food/${id}`);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Removed!",
        text: "Your Item has been removed.",
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["allfoods"] });
    },
  });

  const { mutateAsync: mutateDeletePurchase } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosSecure.delete(`/delete-purchases-food/${id}`);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allfoods"] });
    },
  });

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
        mutateDelete({ id });
        mutateDeletePurchase({ id });
      }
    });
  };

  const { data: foods = {}, isLoading } = useQuery({
    queryFn: () => getData(),
    queryKey: ["allfoods"],
  });

  const getData = async () => {
    const { data } = await axiosSecure(`/allfoods/${user?.email}`);
    return data;
  };

  if (isLoading) return <p>Data is still loading....</p>;

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
