import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import bgimg from "../../assets/images/pixlr-image-generator-0913be1d-b5f4-429f-9d38-cb44e9bec89f.png";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Aos from "aos";
import { Bounce } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const MyOrdered = () => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
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
    <div data-aos="fade-up">
      <Helmet>
        <title>My Ordered Food Items</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)),linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${bgimg})`,
        }}
        className="mt-8 rounded-2xl bg-cover flex justify-center items-center lg:h-56"
      >
        <div>
          <h2 className=" text-center pt-2 lg:pt-0 font-bold text-2xl md:text-4xl text-whiteM mb-2">
            <Bounce>My Ordered Food Items</Bounce>
          </h2>
          <p className="text-lgreenM px-4 pb-4 text-center">
            Manage your ordered delicacies with our intuitive food item
            management section, enhancing your tasty journey.
          </p>
        </div>
      </div>
      <section
        data-aos="fade-up"
        className="container px-4 mx-auto pt-2 lg:pt-6"
      >
        <div className="flex flex-col mt-6 mb-10 lg:mb-20">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-greenM  md:rounded-lg">
                <table className="min-w-full divide-y divide-greenM">
                  <thead className="bg-goldenM">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 lg:pl-16 text-sm font-medium text-greenM text-left rtl:text-right"
                      >
                        <div className="flex items-center w-20 gap-x-3">
                          <span>Food Image</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm text-left rtl:text-right font-medium text-greenM "
                      >
                        <span>Food Name</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm  text-left rtl:text-right font-medium text-greenM "
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Added Time</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm  text-left rtl:text-right font-medium text-greenM "
                      >
                        Food Owner
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm  text-left rtl:text-right font-medium text-greenM "
                      >
                        Ordered
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm  text-left rtl:text-right font-medium text-greenM "
                      >
                        Price
                      </th>

                      <th className="px-4 py-3.5 text-sm  text-left rtl:text-right font-medium text-greenM ">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-lgreenM divide-y divide-greenM ">
                    {foods.map((food) => (
                      <tr key={food._id}>
                        <td className="px-4 py-4 lg:pl-16 text-sm text-greenM  whitespace-nowrap">
                          <img
                            className="h-16 rounded-full border-4 border-greenM "
                            src={food.foodImage}
                            alt=""
                          />
                        </td>

                        <td className="px-4 py-4 text-sm text-greenM  whitespace-nowrap">
                          {food.foodName}
                        </td>

                        <td className="px-4 py-4 text-sm text-greenM whitespace-nowrap">
                          {food.buyDate}
                        </td>
                        <td className="px-4 py-4 text-sm text-greenM whitespace-nowrap">
                          {food.sellerName}
                        </td>
                        <td
                          title={food.quantityBought}
                          className="px-4 py-4 text-sm text-greenM  whitespace-nowrap"
                        >
                          {food.quantityBought}
                        </td>
                        <td
                          title={food.price}
                          className="px-4 py-4 text-sm text-greenM  whitespace-nowrap"
                        >
                          ${food.price}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <button
                              onClick={() =>
                                handleDelete(
                                  food._id,
                                  food.foodId,
                                  food.quantityBought
                                )
                              }
                              className="text-greenM animate__animated animate__pulse animate__infinite transition-colors duration-200   hover:text-redM focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {foods.length < 1 && (
        <div className="lg:mt-24 lg:mb-28 mt-8 mb-8">
          <h1 className="text-4xl dark:text-[#f9a06f] text-redM text-center">
            No Ordered Food Items Found!
          </h1>
          <div className="flex justify-center mt-6">
            <Link to="/all-food">
              <button className="font-bold animate__animated animate__pulse animate__infinite rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000">
                <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                Order Food
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdered;
