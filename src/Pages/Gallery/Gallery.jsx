import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleModalOpen = () => {
    // Check if user is logged in
    if (user) {
      document.getElementById("my_modal_3").showModal();
    } else {
      // Redirect user to login page
      navigate("/login");
    }
  };

  return (
    <div>
      <h2>This is gallery</h2>
      <div>
        <button className="btn" onClick={handleModalOpen}>
          Add
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box h-auto">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Post Your Experience</h3>
            <form>
              <div className="mt-2">
                <label
                  className="text-[#1e1b4b] dark:text-[#f9a06f] font-semibold"
                  htmlFor="name"
                >
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
              <div className="mt-2">
                <label
                  className="text-[#1e1b4b] dark:text-[#f9a06f] font-semibold"
                  htmlFor="description"
                >
                  Experience Description:
                </label>
                <textarea
                  className="mt-2 dark:text-black p-2 rounded-md w-full bg-[#ffede2]"
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Write your Feedback or Experience"
                />
              </div>
              <div>
                <label
                  className="text-[#1e1b4b] dark:text-[#f9a06f] font-semibold"
                  htmlFor="image"
                >
                  Image URL:
                </label>
                <input
                  className="mt-2 dark:text-black p-2 rounded-md w-full bg-[#ffede2]"
                  type="text"
                  id="image"
                  name="image"
                  placeholder="Enter an image URL"
                />
              </div>

              <button className="btn mt-2">Submit</button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Gallery;
