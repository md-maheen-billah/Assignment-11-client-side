import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import bgimg from "../../assets/images/pixlr-image-generator-e44e4dfc-7d5b-48cf-bf63-d2dfa1aaba1f.png";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Aos from "aos";
import { Bounce } from "react-awesome-reveal";

const MyAdded = () => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
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

  const { data: foods = [], isLoading } = useQuery({
    queryFn: () => getData(),
    queryKey: ["allfoods", user?.email],
  });

  const getData = async () => {
    const { data } = await axiosSecure(`/allfoods/${user?.email}`);
    return data;
  };

  if (isLoading) return <Spinner></Spinner>;

  return (
    <div data-aos="fade-up">
      <Helmet>
        <title>My Added Food Items</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)),linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${bgimg})`,
        }}
        className="mt-8 rounded-2xl bg-cover flex justify-center items-center lg:h-56"
      >
        <div>
          <h2 className=" text-center pt-2 lg:pt-0 font-bold text-2xl md:text-4xl text-whiteM mb-2">
            <Bounce>My Added Food Items</Bounce>
          </h2>
          <p className="text-lgreenM px-4 pb-4 text-center">
            Manage your culinary creations with our intuitive food item
            management section, simplifying your gastronomic journey.
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
                        className="py-3.5 lg:pl-16 px-4 text-sm font-medium text-greenM text-left rtl:text-right"
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
                          <span>Quantity</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm  text-left rtl:text-right font-medium text-greenM "
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm  text-left rtl:text-right font-medium text-greenM "
                      >
                        Price
                      </th>

                      <th className="px-4 py-3.5 text-sm  text-left rtl:text-right font-medium text-greenM ">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-lgreenM divide-y divide-greenM ">
                    {foods.map((food) => (
                      <tr key={food._id}>
                        <td className="px-4 lg:pl-16 py-4 text-sm text-greenM  whitespace-nowrap">
                          <img
                            className="h-16 rounded-full border-4 border-greenM"
                            src={food.foodImage}
                            alt=""
                          />
                        </td>

                        <td className="px-4 py-4 text-sm text-greenM  whitespace-nowrap">
                          {food.foodName}
                        </td>

                        <td className="px-4 py-4 text-sm text-greenM whitespace-nowrap">
                          {food.quantity}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <p
                              className={`px-3 py-1 ${
                                food.foodCategory === "Italian" &&
                                "text-blue-500 bg-blue-100/60"
                              } ${
                                food.foodCategory === "Japanese" &&
                                "text-emerald-500 bg-emerald-100/60"
                              } ${
                                food.foodCategory === "Mexican" &&
                                "text-pink-500 bg-pink-100/60"
                              } ${
                                food.foodCategory === "Indian" &&
                                "text-orange-500 bg-orange-100/60"
                              } ${
                                food.foodCategory === "Mediterranean" &&
                                "text-gray-500 bg-gray-100/60"
                              } text-xs  rounded-full`}
                            >
                              {food.foodCategory}
                            </p>
                          </div>
                        </td>
                        <td
                          title={food.price}
                          className="px-4 py-4 text-sm text-greenM  whitespace-nowrap"
                        >
                          ${food.price}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex  items-center gap-x-6">
                            <button
                              onClick={() => handleDelete(food._id)}
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

                            <Link
                              to={`/update-food/${food._id}`}
                              className="text-greenM animate__animated animate__pulse animate__infinite transition-colors duration-200   hover:text-goldenM focus:outline-none"
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
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </Link>
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
            No Added Food Items Found!
          </h1>
          <div className="flex justify-center mt-6">
            <Link to="/food-add">
              <button className="font-bold animate__animated animate__pulse animate__infinite rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000">
                <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                Add Food
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdded;
