import Aos from "aos";
import { useEffect } from "react";
import { Bounce } from "react-awesome-reveal";

const Offer = () => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  return (
    <div data-aos="fade-up" className="">
      <div className="px-4 pt-4 pb-10 lg:pt-4 lg:pb-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="my-8">
          <h2 className="text-center font-bold text-4xl text-whiteM mb-4">
            <Bounce>What We Offer</Bounce>
          </h2>
          <p className="text-lgreenM text-center mx-auto lg:w-8/12">
            An exquisite array of gastronomic delights, crafted with passion and
            precision to tantalize your taste buds and elevate your dining
            experience.
          </p>
        </div>
        <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#E16162"
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 dark:text-default-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <div className="ml-3">
              <dt className="text-lg text-redM font-medium">
                Exquisite Cuisine
              </dt>
              <dd className="mt-2 text-lgreenM">
                Delight in our curated selection of culinary masterpieces, each
                dish meticulously crafted to perfection by our talented chefs.
                From favorites to innovative creations, our menu offers a
                symphony of flavors.
              </dd>
            </div>
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#E16162"
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 dark:text-default-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <div className="ml-3">
              <dt className="text-lg text-redM font-medium">
                Premium Ingredients
              </dt>
              <dd className="mt-2 text-lgreenM">
                We source only the finest ingredients from local farmers and
                trusted suppliers, ensuring that every dish is made with the
                freshest produce and highest quality meats, seafood, and
                produce.
              </dd>
            </div>
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#E16162"
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 dark:text-default-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <div className="ml-3">
              <dt className="text-lg text-redM font-medium">
                Exceptional Service
              </dt>
              <dd className="mt-2 text-lgreenM">
                At our establishment, hospitality is paramount. Our dedicated
                staff is committed to providing you with an exceptional dining
                experience from the moment you walk through our doors whether
                you are celebrating.
              </dd>
            </div>
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#E16162"
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 dark:text-default-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <div className="ml-3">
              <dt className="text-lg text-redM font-medium">
                Customized Dining
              </dt>
              <dd className="mt-2 text-lgreenM">
                Your satisfaction is our priority, which is why we offer
                customizable options to cater to your specific preferences and
                dietary needs. Whether you are vegan, gluten-free or have other
                dietary restrictions.
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Offer;
