import { useState } from "react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import loginBG from "../assets/loginImages/loginImage.png";
import { useFormik } from "formik";
// import * as yup from "yup";
import logo from "../assets/HomePage/logo.svg";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/profileSlice";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { LoginObjectSchema } from "../validationSchem/index.js";
import InfiniteScrollImage from "../style/InfiniteScrollImage.jsx";
import FlowerPattern2 from "../assets/loginImages/FlowerPattern2.png";
import RightToLeftanm from "../style/RightToLeftanm";
import { showToast } from "./common/CustomToast.jsx";
import logoCheck from "../assets/loginImages/logocheck.svg";
import { totalCartValueInCart } from "../slices/cartSlice.js";
import CustomToast from "../hooks/CustomToast.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(true);
  const navigate = useNavigate();

  //Toggling for show password or hide password
  const showHandler = () => {
    setShowPassword(!showPassword);
  };

  //Checking the data which your put is valid or not SChema.
  // const objectSchem = yup.object({
  //   currentpassword: yup.string().min(5).required("Enter the current Password"),
  //   newpassword: yup.string().min(5).required("Enter the New Password"),
  //   confirmPWD: yup
  //     .string()
  //     .min(5)
  //     .oneOf([yup.ref("newpassword"), null], "Passwords must match")
  //     .required("Confirm the Password"),
  // });

  //initialValues of Form data After 1st Render State .

  const initialValues = {
    email: "",
    password: "",
    curremtPWD: "",
    newpassword: "",
    confirmPWD: "",
  };

  //Handling the Data.
  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: LoginObjectSchema,
      onSubmit: async (values) => {
        const palyload = {
          Email: values.email,
          password: values.password,
        };

        try {
          let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/login`,
            palyload
          );

          // console.log(response)

          if (response.status === 200) {
            const CustomerData = response.data;
            dispatch(setUser(CustomerData));
            dispatch(totalCartValueInCart(CustomerData.TotalProductInCart));
            localStorage.setItem("token", CustomerData.token);
            if (response?.data?.SkipChangeDefaultPasswordPage == 1) {
              navigate("/home");
            } else {
              setChangePassword(false);
            }
          }
        } catch (error) {
          //Error which Coming From Server.
          if (error.response) {
            const { status, data } = error.response;

            if (
              status === 404 ||
              status === 403 ||
              status === 500 ||
              status === 302 ||
              status === 409 ||
              status === 401 ||
              status === 400
            ) {
              // showToast(data , "error")
              toast.custom(
                (t) => <CustomToast message={data} type={"error"} />,
                {
                  position: "top-center",
                  duration: 2000,
                  className: "",
                }
              );
            }
          }
        }
      },
    });

  return (
    <div className="w-full h-full overflow-hidden object-cover md:flex md:w-full md:h-[100vh]">
      <Toaster />
      {/* Image section with Logo */}
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
              src={logoCheck}
              className="sm:w-[100%] z-10 mobile:h-[80px] mobile:w-[107px] sm:h-[90px] md:w-[200px] md:h-[150px] "
              alt=""
            />
          </Link>
        </div>
      </div>

      {/* Infinite Scroll section */}
      <div className="mobile:w-full mobile:h-[45px] sm:w-full sm:h-[45px] min-h-[5%] md:max-w-[4%] md:h-full md:mt-2 overflow-hidden ">
        <RightToLeftanm image={FlowerPattern2} />

        {/* Show FlowerPattern for md and larger screens */}
        <InfiniteScrollImage className="w-full h-full animate-img hidden mobile:hidden sm:hidden md:inline-block" />
      </div>

      {/* Form div section for Login Details */}
      <div className="sm:w-full  min-h-[65%] flex justify-center items-center m-auto">
        <div className="sm:w-[95%] mobile:w-[95%] md:w-[90%] md:h-[100%] ">
          <h2
            className={`overflow-hidden  ${
              changePassword && "uppercase font-roxboroughnormal md:mb-3"
            } sm:text-2xl sm:text-center mobile:text-center mobile:text-xl  leading-tight text-[#642F29]  font-roxborough md:text-3xl md:text-start font-medium  `}
          >
            {changePassword ? "Log in" : "Set up a new password"}
          </h2>
          {!changePassword ? (
            <p className="md:mb-2 font-Marcellus font-normal text-text_Color text-base">
              Please set up a new password for your account to enhance security.
            </p>
          ) : (
            <p className=""></p>
          )}
          {
            //if changePassword is True Then Render Login Page.
            changePassword ? (
              <form
                action="#"
                method="POST"
                className="mt-2 md:mt-7 overflow-hidden"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col justify-between">
                  <div>
                    <label
                      htmlFor=""
                      className="mobile:text-xl font-Marcellus  text-[#642F29] md:text-xl "
                    >
                      {" "}
                      Email{" "}
                    </label>
                    <div className="mobile:mt-0 ">
                      <input
                        className="flex h-10 w-full font-Marcellus font-normal text-text_Color text-lg border-b-[1px] border-b-[#642F29] bg-transparent placeholder:text-[#642F29] placeholder:font-Marcellus placeholder:opacity-50 focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                        type="email"
                        placeholder="Enter your email here "
                        value={values.email}
                        id="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      ></input>
                      {errors.email && touched.email ? (
                        <p className="font-Marcellus text-red-900">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-2 md:py-4">
                    <div>
                      <label
                        htmlFor=""
                        className="mobile:text-xl font-Marcellus  text-[#642F29]"
                      >
                        {" "}
                        Password{" "}
                      </label>
                      <div className=" flex justify-center items-center border-b-[1px] border-b-[#642F29] ">
                        <input
                          className="flex h-10 w-full font-Marcellus text-text_Color text-lg font-normal bg-transparent md:placeholder:text-lg placeholder:text-[#642F29] placeholder:font-Marcellus placeholder:opacity-50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50  "
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password here"
                          value={values.password}
                          id="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></input>

                        <span className="overflow-hidden">
                          {showPassword ? (
                            <IoMdEye onClick={showHandler} size={20} />
                          ) : (
                            <IoIosEyeOff onClick={showHandler} size={20} />
                          )}
                        </span>
                      </div>
                    </div>
                    {errors.password && touched.password ? (
                      <p className="font-Marcellus text-red-900">
                        {errors.password}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <p className=" text-sm font-Marcellus text-[#642F29] text-center md:text-start md:pb-5 mt-[20px] gap-6">
                      <Link
                        to="/forgotPasswordCheak"
                        className=" font-Marcellus font-normal text-base underline  text-[#642F29]  md:text-xl"
                      >
                        FORGOT PASSWORD
                      </Link>
                    </p>

                    <button
                      type="submit"
                      className="inline-flex sm:w-full md:w-[25%] h-[43px] font-normal mt-1  items-center justify-center hover:bg-hoverBGGreen  rounded-3xl bg-[#60713A]  leading-7 text-white font-Marcellus text-base  leading-17 tracking-normal text-center  transition-all duration-200 hover:text-white"
                    >
                      {/* {clicked ? 'Logging in...' : 'LOG IN'} */} LOG IN
                    </button>
                    <p className=" text-sm md:text-start font-Marcellus font-normal text-[#642F29] text-center mt-[15px] md:pt-4 md:text-lg gap-6">
                      Don&apos;t have an account? {""}
                      <Link
                        to="/companydetails"
                        title=""
                        className=" font-Marcellus  text-base underline  text-[#642F29] transition-all duration-200 hover:underline md:text-xl"
                      >
                        REQUEST AN ACCOUNT
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            ) : (
              <>
                {/* if user First time login we need show him change password component for the 1st time only */}
                <ChangePassword />
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
