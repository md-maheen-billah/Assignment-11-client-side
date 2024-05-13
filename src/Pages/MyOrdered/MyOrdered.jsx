import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";

const MyOrdered = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: mutateDeleteChanges } = useMutation({
    mutationFn: async ({ foodId, quantityBought }) => {
      const { data } = await axiosSecure.patch(`/delete-changes/${foodId}`, {
        quantityBought,
      });
      console.log(data);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Removed!",
        text: "Your Item has been removed.",
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });

  const { mutateAsync: mutateDelete } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosSecure.delete(`/delete-purchases/${id}`);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });

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
        mutateDelete({ id });
        mutateDeleteChanges({ foodId, quantityBought });
      }
    });
  };

  const { data: foods = [], isLoading } = useQuery({
    queryFn: () => getData(),
    queryKey: ["purchases", user?.email],
  });

  const getData = async () => {
    const { data } = await axiosSecure(`/purchases/${user?.email}`);
    return data;
  };

  if (isLoading) return <Spinner></Spinner>;

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
