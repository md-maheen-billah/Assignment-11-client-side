import Aos from "aos";
import { useEffect } from "react";
import { Bounce } from "react-awesome-reveal";

const RoadMap = () => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  return (
    <div data-aos="fade-up" className="overflow-x-hidden">
      <div className="my-10 lg:mt-20">
        <h2 className="text-center font-bold text-4xl text-whiteM mb-4">
          <Bounce>Our Roadmap</Bounce>
        </h2>
        <p className="text-lgreenM text-center mx-auto lg:w-8/12">
          Outlines our journey towards innovation, growth, and excellence,
          guiding us as we navigate the path to success with purpose and
          determination.
        </p>
      </div>
      <ul className="timeline timeline-vertical">
        <li>
          <div className="timeline-start text-whiteM my-10">Year 1</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-goldenM"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            data-aos="fade-left"
            className="timeline-end timeline-box bg-whiteM text-greenM"
          >
            Foundation Building
          </div>
          <hr className="bg-goldenM" />
        </li>
        <li>
          <hr />
          <div className="timeline-end text-whiteM my-10">Year 2</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#ABD1C6"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            data-aos="fade-right"
            className="timeline-start timeline-box bg-whiteM text-greenM"
          >
            Market Expansion
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start text-whiteM my-10">Year 3</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#ABD1C6"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            data-aos="fade-left"
            className="timeline-end timeline-box bg-whiteM text-greenM"
          >
            Product Diversification
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-end text-whiteM my-10">Year 4</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#ABD1C6"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            data-aos="fade-right"
            className="timeline-start timeline-box bg-whiteM text-greenM"
          >
            Sustainable Growth
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start text-whiteM my-10">Year 5</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#ABD1C6"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            data-aos="fade-left"
            className="timeline-end timeline-box bg-whiteM text-greenM"
          >
            Global Expansion
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RoadMap;
