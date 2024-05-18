import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Union from "../assets/loginImages/Union.png";
import { CiLock } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import CustomToast from "../hooks/CustomToast";
// import verifyImage from "../../../assets/verified.gif"

const VerifyUser = () => {
  const { _id } = useParams();
  const [displayData, setDisplayData] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/verifyemail/${_id}`
      );

      if (response.status === 200) {
        toast.custom(
          (t) => <CustomToast message={"You are verify"} type={"success"} />,
          {
            position: "top-center",
            duration: 2000,
            className: "",
          }
        );
        // toast.success("You are verify");
        setDisplayData(true);
        setLoading(false);
        //  handlerWait();
      }
    } catch (error) {
      toast.custom(
        (t) => <CustomToast message={"You need to verify"} type={"error"} />,
        {
          position: "top-center",
          duration: 2000,
          className: "",
        }
      );
      // toast.error("You need to verify");
      setLoading(false);
    }
  };

  const handlerWait = () => {
    setTimeout(() => {
      navigate("/");
    }, 10000);
  };

  return (
    <div>
      <Toaster />
      {loading ? (
        <p>Verifing User Please Wait</p>
      ) : displayData ? (
        <div className="w-full h-[100vh] flex justify-center items-center relative ">
          <div className="md:w-[40%] md:h-[40%] mobile:w-[80%] sm:w-[70%] mobile:h-[80%] flex flex-col justify-center items-center my-auto mx-auto relative">
            <div className=" w-full">
              <div
                style={{ backgroundImage: `url(${Union})` }}
                className={` mx-auto relative w-[31px] h-[40px] top-0 left-0  bg-[100%_100%]`}
              >
                <span className="absolute w-[28px] h-[30px] top-[10px] left-[2px]">
                  <IoCheckmarkOutline
                    className="absolute top-[5px] left-[5px]"
                    color="white"
                  />
                </span>
              </div>
            </div>
            <h1 className="mt-4 font-roxboroughnormal2 font-medium text-text_Color text-[20px] leading-31 ">
              Your email has been verified
            </h1>

            <p className="text-center w-[90%] mt-5 font-Marcellus font-normal text-text_Color text-16 leading-22 tracking-tight">
              Your email has been successfully verified. We will send you
              default password for login after verifying your details.
            </p>
            {/* <div className="w-full flex justify-between mt-5">
              <button className="py-2 w-[49%] font-Marcellus font-normal rounded-3xl border-[1px] border-text_Color2 uppercase text-center">
                cancel
              </button>
              <button className="py-2 w-[49%] rounded-3xl border-[1px] bg-text_Color2 text-white border-text_Color2 uppercase text-center">
                login
              </button>
            </div> */}
          </div>
        </div>
      ) : (
        <div className="w-full h-[100vh] flex justify-center items-center relative">
          <div className="md:w-[40%] md:h-[40%] mobile:w-[80%] sm:w-[70%] mobile:h-[80%]  flex flex-col justify-center items-center my-auto mx-auto relative">
            <div className="w-full">
              <div
                style={{ backgroundImage: `url(${Union})` }}
                className={`mx-auto relative w-[31px] h-[40px] top-0 left-0 bg-[100%_100%]`}
              >
                <span className="absolute w-[28px] h-[30px] top-[5px] left-[5px]">
                  <IoMdClose
                    className="absolute top-[8px] left-[1px]"
                    color="white"
                    size={20}
                  />
                </span>
              </div>
            </div>
            <h1 className="mt-4 font-roxboroughnormal2 font-medium text-text_Color text-[20px] leading-31 ">
              Email verification failed
            </h1>
            <p className="text-center w-[90%] mt-5 font-Marcellus font-normal text-text_Color text-16 leading-22 tracking-tight">
              Your email could not be verified. Please try again or contact
              support.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyUser;
