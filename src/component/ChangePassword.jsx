import { useState } from "react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import getToken from "./auth/GetToken";
import CustomToast from "../hooks/CustomToast";

// console.log(getToken());

const ChangePassword = () => {
  const navigate = useNavigate();
  //Accessing User Data from the Stroage
  const { user } = useSelector((state) => state.profile);

  //Extract User_id or Customer Id from our Store
  const customer_id_Store = user.customer_id;

  //Might be need to change in Feacture.
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //switch case for different Password Field.
  const showHandler = (field) => {
    switch (field) {
      case "currentPassword":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  // Object Schema for Current Password Field Validation
  const objectSchem = yup.object({
    curremtPWD: yup.string().min(5).required("Please Enter current Password"),
    newpassword: yup.string().min(5).required("Please Enter New Password"),
    confirmPWD: yup
      .string()
      .min(5)
      .oneOf([yup.ref("newpassword"), null], "Passwords must match")
      .required("Please Enter Confirm Password"),
  });

  //initialvalues in Input Field
  const initialValues = {
    curremtPWD: "",
    newpassword: "",
    confirmPWD: "",
  };

  //This Function For If User Want to not Change The Password Then This Function will be Work.
  const onClickSubmit = async () => {
    //Here Customer_id From Store.
    const payload = {
      customer_id: customer_id_Store,
    };

    try {
      const header = getToken();

      let response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/user/skipchangedefaultpassword`,
        payload,
        header
      );

      console.log("response ", response);

      if (response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
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
          toast.custom((t) => <CustomToast message={data} type={"error"} />, {
            position: "top-center",
            duration: 2000,
            className: "",
          });
        }
      }
    }
  };

  //If user Want To Change Password And He Click on
  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: objectSchem,
      onSubmit: async (values) => {
        const palyload = {
          customer_id: customer_id_Store,
          OldPassword: values.curremtPWD,
          NewPassword: values.confirmPWD,
        };
        try {
          const header = getToken();
          let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/changepassword`,
            palyload,
            header
          );

          // console.log("chnage password -> " , response)

          if (response.status === 200) {
            navigate("/passwordUpdated");
          }
        } catch (error) {
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
    <div className="">
      <Toaster />
      <div>
        <form onSubmit={handleSubmit} className="mt-2 md:mt-7 overflow-hidden">
          <div className="">
            <div className="my-4 sm:my-0 mobile:my-2 md:">
              <label
                htmlFor=""
                className="font-Marcellus  text-text_Color md:text-lg font-normal "
              >
                {" "}
                Current Password{" "}
              </label>
              <div className=" flex justify-center items-center border-b-[1px] border-b-[#642F29]">
                <input
                  className="flex mobile:pt-1 w-full text-text_Color text-base font-Marcellus font-normal  bg-transparent  mobile:py-1 placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed   md:placeholder:text-base md:mt-2 disabled:opacity-50"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter Current Password"
                  id="curremtPWD"
                  value={values.curremtPWD}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                <span className="cursor-pointer">
                  {showCurrentPassword ? (
                    <IoMdEye
                      onClick={() => showHandler("currentPassword")}
                      size={20}
                    />
                  ) : (
                    <IoIosEyeOff
                      onClick={() => showHandler("currentPassword")}
                      size={20}
                    />
                  )}
                </span>
              </div>
              {errors.curremtPWD && touched.curremtPWD ? (
                <p className="font-Marcellus text-[16px] text-red-900">
                  {errors.curremtPWD}
                </p>
              ) : null}
            </div>
            <div className="my-4 mobile:my-3 md:py-4">
              <label
                htmlFor=""
                className="font-Marcellus  text-text_Color  md:text-lg font-normal"
              >
                {" "}
                New Password{" "}
              </label>
              <div className=" flex justify-center items-center border-b-[1px] border-b-[#642F29]">
                <input
                  className="flex mobile:pt-1 w-full text-text_Color  text-base font-Marcellus font-normal  bg-transparent  mobile:py-1 placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed  md:placeholder:text-base md:mt-2 disabled:opacity-50"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  id="newpassword"
                  value={values.newpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                <span className="cursor-pointer">
                  {showNewPassword ? (
                    <IoMdEye
                      onClick={() => showHandler("newPassword")}
                      size={20}
                    />
                  ) : (
                    <IoIosEyeOff
                      onClick={() => showHandler("newPassword")}
                      size={20}
                    />
                  )}
                </span>
              </div>
              {errors.newpassword && touched.newpassword ? (
                <p className="text-red-800">{errors.newpassword}</p>
              ) : null}
            </div>
            <div className="my-4 mobile:my-3">
              <label
                htmlFor=""
                className="font-Marcellus  text-text_Color md:text-lg font-normal"
              >
                {" "}
                Confirm New Password{" "}
              </label>
              <div className=" flex justify-center items-center border-b-[1px] border-b-[#642F29]">
                <input
                  className="flex mobile:pt-1 w-full text-text_Color text-base font-Marcellus font-normal   bg-transparent  mobile:py-1 placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed  md:placeholder:text-base md:mt-2 disabled:opacity-50"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={values.confirmPWD}
                  id="confirmPWD"
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                <span className="cursor-pointer">
                  {showConfirmPassword ? (
                    <IoMdEye
                      onClick={() => showHandler("confirmPassword")}
                      size={20}
                    />
                  ) : (
                    <IoIosEyeOff
                      onClick={() => showHandler("confirmPassword")}
                      size={20}
                    />
                  )}
                </span>
              </div>
              {errors.confirmPWD && touched.confirmPWD ? (
                <p className="text-red-800">{errors.confirmPWD}</p>
              ) : null}
            </div>
          </div>
          <div className="flex gap-4 mobile:gap-1 mt-4">
            <button
              className="p-2 mobile:w-full uppercase  mobile:text-xl text-center rounded-3xl bg-[#60713A] hover:bg-hoverBGGreen text-white font-Marcellus font-normal text-base  leading-17 md:w-[30%] h-[43px] "
              type="submit"
            >
              Change
            </button>
            <p
              className="p-2 rounded-3xl cursor-pointer mobile:bg-white mobile:w-full md:text-lg font-Marcellus font-normal text-base underline ml-3 uppercase text-[#642F29] bg-green-500"
              onClick={onClickSubmit}
            >
              Do it Later
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChangePassword;
