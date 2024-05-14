import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import bgimg from "../../assets/images/pixlr-image-generator-dabe741d-3a98-4041-98c1-703c5aa92c79.png";
import { Helmet } from "react-helmet-async";
import Aos from "aos";
import { Bounce } from "react-awesome-reveal";

const Gallery = () => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    const { data } = await axiosSecure(`/gallery`);
    return data;
  };

  const { data: gallery = [], isLoading } = useQuery({
    queryFn: () => getData(),
    queryKey: ["gallery"],
  });

  const handleModalOpen = () => {
    // Check if user is logged in
    if (user) {
      setOpenModal(true);
    } else {
      // Redirect user to login page
      navigate("/login");
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: async ({ newFood }) => {
      const { data } = await axiosSecure.post(`/gallery`, newFood);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      toast.success("Posted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });

  const handleAddExperience = async (e) => {
    e.preventDefault();
    const form = e.target;
    const description = form.description.value;
    const image = form.image.value;
    const name = user.displayName;

    const newFood = {
      image,
      description,
      name,
    };

    await mutateAsync({ newFood });
  };

  if (isLoading) return <Spinner></Spinner>;

  return (
    <div data-aos="fade-up">
      <Helmet>
        <title>Gallery</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url(${bgimg})`,
        }}
        className="mt-8 rounded-2xl bg-cover flex justify-center items-center lg:h-56"
      >
        <div>
          <h2 className=" text-center pt-2 lg:pt-0 font-bold text-2xl md:text-4xl text-whiteM mb-2">
            <Bounce>Gallery</Bounce>
          </h2>
          <p className="text-lgreenM px-4 pb-4 text-center">
            Indulge in culinary adventures and share your gastronomic
            experiences in our vibrant food review section, where every bite
            tells a story.
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center my-6">
          <button
            onClick={handleModalOpen}
            className="font-bold rounded-md animate__animated animate__pulse animate__infinite px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000"
          >
            <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
            <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
            Add
          </button>
          <div
            className={`fixed z-[100] flex pt-4  lg:pt-24 items-start justify-center ${
              openModal ? "opacity-1 visible" : "invisible opacity-0"
            } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
          >
            <div
              className={`absolute max-w-md rounded-lg bg-greenM p-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${
                openModal
                  ? "scale-1 opacity-1 duration-300"
                  : "scale-0 opacity-0 duration-150"
              } `}
            >
              <svg
                onClick={() => setOpenModal(false)}
                className="mx-auto mr-0 w-8 cursor-pointer fill-goldenM dark:fill-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                </g>
              </svg>
              <h3 className="font-bold text-whiteM text-lg">
                Post Your Experience
              </h3>
              <form method="dialog" onSubmit={handleAddExperience}>
                <div className="mt-2 text-left">
                  <label className="text-whiteM font-semibold" htmlFor="name">
                    User Name:
                  </label>
                  <input
                    className="mt-2 dark:text-black p-2 rounded-md w-full bg-[#ffede2]"
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={user?.displayName}
                    readOnly
                  />
                </div>
                <div className="mt-3 text-left">
                  <label
                    className="text-whiteM  font-semibold"
                    htmlFor="description"
                  >
                    Experience Description:
                  </label>
                  <textarea
                    className="mt-2 dark:text-black p-2 rounded-md w-full bg-[#ffede2]"
                    type="text"
                    id="description"
                    name="description"
                    required
                    placeholder="Write your Feedback or Experience"
                  />
                </div>
                <div className="text-left mt-1">
                  <label className="text-whiteM  font-semibold" htmlFor="image">
                    Image URL:
                  </label>
                  <input
                    className="mt-2 dark:text-black p-2 rounded-md w-full bg-[#ffede2]"
                    type="text"
                    id="image"
                    name="image"
                    required
                    placeholder="Enter an image URL"
                  />
                </div>
                <button
                  onClick={() => setOpenModal(false)}
                  className="font-bold rounded-md mt-6 px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000"
                >
                  <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                  <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-up"
        className="grid grid-cols-1 md:grid-cols-2 mb-10 md:mb-20 lg:grid-cols-3 mt-8 gap-8"
      >
        {gallery.map((post) => (
          <div
            key={post._id}
            className="relative lg:hover:scale-105 transition group"
          >
            <img
              className="object-cover w-full h-[350px] rounded-lg"
              src={post.image}
              alt=""
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
              <div>
                <p className="text-white text-center px-4">
                  {post.description}
                </p>
                <p className="text-white text-right px-4 mt-4">- {post.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
