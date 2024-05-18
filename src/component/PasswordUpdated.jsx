import { Link } from "react-router-dom";
import loginBG from "../assets/loginImages/loginImage.png";
import logo from "../assets/loginImages/logocheck.svg";
import { CiLock } from "react-icons/ci";
import InfiniteScrollImage from "../style/InfiniteScrollImage";
import FlowerPattern2 from "../assets/loginImages/FlowerPattern2.png";
import Union from "../assets/loginImages/Union.png";
import RightToLeftanm from "../style/RightToLeftanm";

const PasswordUpdated = () => {
  return (
    <div className="w-full h-full object-cover md:flex md:w-full md:h-[100vh] overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${loginBG})`,
          backgroundRepeat: "no-repeat",
        }}
        className="mobile:w-full sm:w-full  sm:h-[45vh] mobile::bg-center mobile:h-[40vh] mobile:bg-cover sm:bg-center mobile:bg-center sm:bg-cover sm:object-cover  bg-green-700 md:h-[100%]  md:bg-slate-600 md:min-w-[45%] flex-wrap object-cover -z-10 md:max-w-[80%] lg:w-[40%]"
      >
        <div className="flex w-[100%] mt-2 sm:mt-5 sm:  md:h-[20%] justify-center items-center   ">
          <Link to={"/"}>
            <img
              src={logo}
              className="sm:w-[100%] z-10 mobile:h-[80px] mobile:w-[107px] sm:h-[90px] md:w-[200px] md:h-[150px] "
              alt=""
            />
          </Link>
        </div>
      </div>

      <div className="mobile:w-full mobile:h-[45px] sm:w-full sm:h-[45px] min-h-[5%] md:max-w-[4%] md:h-full md:mt-2 ">
        <RightToLeftanm image={FlowerPattern2} />

        {/* Show FlowerPattern for md and larger screens */}
        <InfiniteScrollImage className="w-full h-full animate-img hidden mobile:hidden sm:hidden md:inline-block" />
      </div>
      <div className="w-full h-full relative flex justify-center items-center">
        <div className="h-[60%] w-[90%] relative flex flex-col justify-center items-center">
          <div className="relative w-[31px] h-[40px]">
            <div
              style={{ backgroundImage: `url(${Union})` }}
              className={`relative fixed w-[31px] h-[40px] top-0 left-0  bg-[100%_100%]`}
            >
              <span className="absolute w-[28px] h-[30px] top-[10px] left-[2px]">
                <CiLock
                  className="absolute top-[5px] left-[5px]"
                  color="white"
                />
              </span>
            </div>
          </div>
          <h1 className="sm:mt-[26px] mobile:mt-[26px] font-roxboroughnormal font-normal text-text_Color text-[20px] leading-31 ">
            Password Updated Successfully
          </h1>

          <p className="text-center w-[60%] mt-[30px] font-Marcellus font-normal text-text_Color text-16 leading-22 tracking-tight">
            Password updated successfully
          </p>

          <button className="inline-flex mobile:w-[100%] uppercase   sm:w-full md:w-[25%] h-[43px]  mobile:mt-[7%]  items-center justify-center  rounded-3xl bg-[#60713A]  leading-7 text-white font-Marcellus font-normal text-base  leading-17 tracking-normal text-center  hover:bg-hoverBGGreen transition-all duration-200 hover:text-white hover:bg-">
            <Link to={"/"}>Done</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdated;
