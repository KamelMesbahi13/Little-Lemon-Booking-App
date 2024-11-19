import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from "react-scroll";

const Up = () => {
  const [up, setUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2050) {
        setUp(true);
      } else {
        setUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={
        up
          ? "fixed bottom-20 w-full z-[999999999] transition-all duration-500 block"
          : "transition-all duration-500 fixed bottom-20 w-full z-[999999999] hidden"
      }
    >
      <div className="container">
        <div className="relative float-right w-12 h-12 duration-500 ease-in rounded-full shadow-xl cursor-pointer hover:bg-thirdColor bg-mainColor">
          <Link smooth={true} offset={0} duration={900} to="nav">
            <IoIosArrowUp className="absolute text-4xl text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Up;
