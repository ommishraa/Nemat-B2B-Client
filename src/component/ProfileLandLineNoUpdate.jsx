import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { IoClose } from "react-icons/io5";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import CustomToast from "../hooks/CustomToast";

const ProfileLandLineNoUpdate = ({ profileData, setProfileData ,  setOpenLandLineNumberPop }) => {

   console.log({profileData})

   const { _id } = useParams();

   console.log({_id})

  const UpdateProfileObject = yup.object({
   //  name: yup.string().min(2).required("Please Enter your Name"),
    landlineNumber: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .min(1, "Please enter a valid number")
      .max(9999, "Please enter 10 digit valid number")
      .required("Please enter your Country Code number"),
    CNlandlineNumber: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Please enter a valid number")
      .min(999999999, "Please enter a valid number")
      .max(9999999999, "Please enter 10 digit valid number")
      .required("Please enter your LandLine Number"),
  });

  const initialValues = {
   //  name: profileData.CustomerName,
    landlineNumber: profileData?.Country_LandlineNumber || 0,
    CNlandlineNumber: profileData?.LandlineNumber || 0,
  };

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: UpdateProfileObject,
      onSubmit: async (values, actions) => {
        const payload = {
         user_id: _id ,
          Country_MobileNumber: values.landlineNumber,
          LandlineNumber: values.CNlandlineNumber,
        };

        try {
          const response = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BASE_URL
            }/user/updateCustomerProfileData`,
            payload
          );

          if (response.status === 200) {
            toast.success(response.data);
          }

           setProfileData(prevData => ({
            ...prevData,
            Country_LandlineNumber: values.landlineNumber,
            LandlineNumber: values.CNlandlineNumber,
          }));

           setOpenLandLineNumberPop(false);

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
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md w-[400px] h-auto ">
         <Toaster/>
        <div className="flex justify-between  w-[100%] mx-auto items-center ">
          <h1 className="text-text_Color2 font-roxboroughnormal font-semibold text-lg">
            Update LandLine Number
          </h1>
          <IoClose
            className="cursor-pointer"
            onClick={() => setOpenLandLineNumberPop(false)}
            size={25}
            color="60713A"
          />
        </div>

        <form 
         onSubmit={handleSubmit}
        >
          <div>
            {/* <div className="md:w-[100%] mt-4">
              <label
                htmlFor=""
                className="mobile:text-xl font-Marcellus font-normal  text-[#642F29] md:text-lg"
              >
                Contact Name
              </label>
              <div className="">
                <input
                  className="flex h-10 w-full text-base font-normal md:placeholder:text-base font-Marcellus placeholder:opacity-90 text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent  placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed  md:mt-2 disabled:opacity-50"
                  type="text"
                  placeholder="Enter your full name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                {errors.name && touched.name ? (
                  <p className="font-Marcellus text-base font-normal text-red-900">
                    {errors.name}
                  </p>
                ) : null}
              </div>
            </div> */}

            <div className="mt-4">
              <div className="  mobile:w-full gap-0 md:w-[100%] md:gap-x-2">
                <div className="w-[100%]">
                  <label
                    htmlFor=""
                    className="mobile:text-lg font-Marcellus font-normal text-[#642F29] md:text-lg"
                  >
                    {" "}
                    Area Code{" "}
                  </label>
                  <div className=" mobile:w-[100%] mb-4">
                    <input
                      type="text"
                      className="flex h-10 w-full md:w-[100%] sm::text-base mobile:text-base text-base font-normal md:placeholder:text-base font-Marcellus placeholder:opacity-90 text-text_Color sm:w-[90%] mobile:w-[100%] border-b-[1px] border-b-[#642F29] bg-transparent placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none disabled:cursor-not-allowed  disabled:opacity-50"
                      placeholder="Country Code"
                      id="landlineNumber"
                      value={values.landlineNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="landlineNumber"
                    />
                    {errors.landlineNumber && touched.landlineNumber ? (
                      <p className="font-Marcellus text-base font-normal text-red-900">
                        {errors.landlineNumber}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="md:w-[100%] mobile:w-[100%]">
                  <label
                    htmlFor=""
                    className="mobile:text-xl font-Marcellus font-normal  text-[#642F29] md:text-lg"
                  >
                    {" "}
                    Landline Number{" "}
                  </label>
                  <div className="">
                    <input
                      className="flex h-10 w-full text-base font-normal md:placeholder:text-base font-Marcellus placeholder:opacity-90 text-text_Color sm:w-[100%] mobile:w-[100%]  border-b-[1px] border-b-[#642F29]    placeholder:text-[#642F29] placeholder:font-Marcellus focus:outline-none  disabled:cursor-not-allowed  disabled:opacity-50"
                      type="text"
                      placeholder="Add company Landline"
                      id="CNlandlineNumber"
                      value={values.CNlandlineNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></input>
                    {errors.CNlandlineNumber && touched.CNlandlineNumber ? (
                      <p className="font-Marcellus text-base font-normal text-red-900">
                        {errors.CNlandlineNumber}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex sm:w-full w-[100%] mt-6 h-[43px] font-normal  items-center justify-center hover:bg-hoverBGGreen  rounded-3xl bg-[#60713A]  leading-7 text-white font-Marcellus text-base  leading-17 tracking-normal text-center  transition-all duration-200 hover:text-white"
          >
            Update Number
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileLandLineNoUpdate;
