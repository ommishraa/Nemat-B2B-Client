import loginBG from "../assets/loginImages/loginImage.png";
import { useFormik } from "formik";
import * as yup from "yup";
// import logo from "../assets/loginImages/nematEnterprisesLogo.png";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import InfiniteScrollImage from "../style/InfiniteScrollImage.jsx";
import FlowerPattern2 from "../assets/loginImages/FlowerPattern2.png";
import RightToLeftanm from "../style/RightToLeftanm";
import logoWhite from "../assets/loginImages/logocheck.svg";
import CustomToast from "../hooks/CustomToast.jsx";

const ForgotPassword = () => {
  // const dispatch = useDispatch();
  // const [showPassword, setShowPassword] = useState(false);
  // const [ConfirmshowPassword, setConfirmShowPassword] = useState(false);
  const navigate = useNavigate();

  // const showHandler = (field) => {
  //     switch (field) {
  //       case 'newpassword':
  //         setShowPassword(!showPassword);
  //         break;
  //       case 'confirmPWD':
  //         setConfirmShowPassword(!ConfirmshowPassword);
  //         break;
  //       default:
  //         break;
  //     }
  // };

  const objectSchem = yup.object({
    email: yup
      .string()
      .min(5)
      .email("Please Enter Valid Email")
      .required("Enter the Email Id"),
    // newpassword: yup.string().min(5).required("Enter the New Password"),
    // confirmPWD: yup
    //   .string()
    //   .min(5)
    //   .oneOf([yup.ref("newpassword"), null], "Passwords must match")
    //   .required("Confirm the Password"),
  });

  const initialValues = {
    email: "",
    // newpassword: "",
    // confirmPWD: "",
  };

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: objectSchem,
      onSubmit: async (values) => {
        const palyload = {
          Email: values.email,
          // password: values.newpassword,
        };
        try {
          let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/forgotpassword`,
            palyload
          );

          // console.log(response)

          if (response.status === 200) {
            toast.custom(
              (t) => <CustomToast message={response.data} type={"success"} />,
              {
                position: "top-center",
                duration: 1000,
                className: "",
              }
            );
            // toast.success(response.data);
            // const Customer_id = response.data;
            // dispatch(setUser(Customer_id));
            handlerWait();
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
              toast.custom(
                (t) => <CustomToast message={data} type={"error"} />,
                {
                  position: "top-center",
                  duration: 1000,
                  className: "",
                }
              );
            }
          }
        }
      },
    });

  const handlerWait = () => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div>
      <div className="w-full h-full overflow-hidden object-cover md:flex md:w-full md:h-[100vh]">
        <Toaster />
        {console.log("Say Hi Forgot")}
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
                src={logoWhite}
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
            <h2 className="overflow-hidden sm:text-2xl sm:text-center mobile:text-center mobile:text-xl  leading-tight text-[#642F29]  font-roxborough md:text-4xl md:text-start md:mb-6  ">
              Forgot Password
            </h2>
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
                    Email Id{" "}
                  </label>
                  <div className="mobile:mt-0 ">
                    <input
                      className="flex h-10 w-full text-xl font-Marcellus font-normal  placeholder:opacity-80 text-text_Color  border-b-[1px] border-b-[#642F29] bg-transparent  placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-lg md:mt-2 disabled:opacity-50"
                      type="email"
                      placeholder="Enter Email"
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
                <div className="flex flex-col mt-5">
                  <button
                    type="submit"
                    className="inline-flex sm:w-full md:w-[25%] h-[43px] uppercase  mt-1  items-center justify-center  rounded-3xl bg-[#60713A]  leading-7 text-white font-Marcellus font-normal   text-base  leading-17 tracking-normal text-center  hover:bg-hoverBGGreen transition-all duration-200 hover:text-white hover:bg-"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
