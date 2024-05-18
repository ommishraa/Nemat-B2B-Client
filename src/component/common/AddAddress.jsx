import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import getToken from "../auth/GetToken";
import { IoClose } from "react-icons/io5";
import CustomToast from "../../hooks/CustomToast";

const AddAddress = ({ setIsModalOpen, isModalOpen, setAddress }) => {
  // const API_KEY = "Mk5hNW5Tb1lZSEhITDg2eTVhMUxhbm5mYjBEbGRER3U4ZHFENXdRQQ==";

  const { user } = useSelector((store) => store.profile);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const addAddressObject = yup.object({
    location: yup.string().min(3).required("Please Add Address"),
    streetaddress: yup.string().min(3).required("Street Address is required"),
    // country: yup.string().required("Country is required"),
    state: yup.string().min(3).required("State is required"),
    city: yup.string().min(3).required("City is required"),
    zipcode: yup
      .string()
      .required("Zipcode is required")
      .length(6, "Zipcode must be exactly 6 characters")
      .matches(/^\d+$/, "Zipcode must only contain digits"),
  });

  const initialValues = {
    location: "",
    streetaddress: "",
    // country: "",
    state: "",
    city: "",
    zipcode: "",
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: addAddressObject,
    onSubmit: async (values) => {
      const palyload = {
        user_id: user.customer_id,
        LocationName: values.location,
        StreetAddress: values.streetaddress,
        State: values.state,
        City: values.city,
        ZipCode: values.zipcode,
      };

      setIsSubmitting(true);

      try {
        const header = getToken();

        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/addshippingaddress`,
          palyload,
          header
        );

        console.log(response);

        if (response.status === 200) {
          console.log(response.data);
          setAddress(response.data);
          resetForm();
          toast.success("New Shipping address added ");
          setIsModalOpen(!isModalOpen);
          setIsSubmitting(false);
        }
        setIsModalOpen(!isModalOpen);
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
            toast.custom((t) => <CustomToast message={data} type={"error"} />, {
              position: "top-center",
              duration: 1000,
              className: "",
            });
            console.log(error);
            setIsSubmitting(false);
          }
        }
      }
    },
  });

  // let countryiso2 = "";
  // const handlerChangeState = async (event) => {
  //   // console.log("Selected _id:", event);

  //   countryiso2 = event.target.value;
  //   // console.log("iso2", countryiso2);
  //   setCountryISO2(event.target.value);
  //   try {
  //     const config = {
  //       headers: {
  //         "X-CSCAPI-KEY": API_KEY,
  //       },
  //     };

  //     const response = await axios.get(
  //       `https://api.countrystatecity.in/v1/countries/${countryiso2}/states`,
  //       config
  //     );

  //     console.log(response.data);
  //     setState(response.data);
  //   } catch (error) {
  //     console.error("Error:", error);

  //     if (error.response) {
  //       const { status, data } = error.response;
  //       console.error(`Response error - Status: ${status}, Data:`, data);
  //     }
  //   }
  // };

  // let stateiso2 = "";
  // const handlerChangeCity = async (event) => {
  //   // console.log("Selected _id:", event);

  //   stateiso2 = event.target.value;
  //   // console.log("iso2", stateiso2);

  //   try {
  //     const config = {
  //       headers: {
  //         "X-CSCAPI-KEY": API_KEY,
  //       },
  //     };

  //     const response = await axios.get(
  //       `https://api.countrystatecity.in/v1/countries/${countryIso2}/states/${stateiso2}/cities`,
  //       config
  //     );

  //     console.log(response.data);
  //     setCitydata(response.data);
  //   } catch (error) {
  //     console.error("Error:", error);

  //     if (error.response) {
  //       const { status, data } = error.response;
  //       console.error(`Response error - Status: ${status}, Data:`, data);
  //     }
  //   }
  // };

  // console.log("Citys" , citydata)

  // const handlerchangecity = async (event) => {
  //   const selectedIso2 = event.target.value;

  //   const selectedCountry = citydata.find((city) => city.id == selectedIso2);

  //   setCity(selectedCountry ? selectedCountry.name : "", () => {});
  // };

  return (
    <div>
      <Toaster />
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
        {/* Your modal content goes here */}
        <div className="bg-white p-4  rounded-md w-[500px] h-auto">
          <div className="flex w-[90%] my-auto mx-auto mt-3.5">
            <h2 className="w-[100%] mx-auto text-2xl font-normal mb-7 text-text_Color2 font-roxboroughnormal2 ">
              Add Address
            </h2>
            <p onClick={() => setIsModalOpen(false)}>
              <IoClose className=" cursor-pointer" color="#642F29" size={25} />
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <div className="">
              <div className="md:w-[90%] mx-auto z-50">
                <div className="">
                  <input
                    className="flex h-8 w-full text-text_Color font-Marcellus  border-b-[1px] border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus placeholder:opacity-60 focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-sm md:mt-2 disabled:opacity-50  placeholder:px-1"
                    type="text"
                    placeholder="Location Name (Eg: Mumbai Warehouse )"
                    id="location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location}
                    required
                  ></input>
                  {errors.location && touched.location ? (
                    <p className="font-Marcellus text-red-900">
                      {errors.location}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="md:w-[90%] mx-auto mt-8">
                <div className="">
                  <input
                    className="flex h-8 w-full text-text_Color font-Marcellus  border-b-[1px] border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus placeholder:opacity-60 focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-sm md:mt-2 disabled:opacity-50 placeholder:px-1"
                    type="text"
                    placeholder="Street Address *"
                    id="streetaddress"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.streetaddress}
                    required
                  ></input>
                  {errors.streetaddress && touched.streetaddress ? (
                    <p className="font-Marcellus text-red-900">
                      {errors.streetaddress}
                    </p>
                  ) : null}
                  {/* Selection tage for state and city  */}
                </div>
                <div className="w-full flex gap-x-3 mt-8">
                  {/* Country Selection */}

                  {/* <select
                      id="country"
                      name="country"
                      value={values.country}
                      onChange={async (event) => {
                        await handleChange(event);
                        handlerChangeState(event);

                        const selectedIso2 = event.target.value;

                        const selectedCountry = countriesData.find(
                          (country) => country.iso2 === selectedIso2
                        );
                        setCountry(selectedCountry ? selectedCountry.name : "");
                      }}
                      className="flex h-10 w-[30%] text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29]"
                    >
                      <option value="" disabled>
                        Select Country
                      </option>
                      {countriesData?.map((country, id) => (
                        <option key={country.id} value={country.iso2}>
                          {country.name}
                        </option>
                      ))}
                    </select> */}

                  {/* State Selection */}
                  <div className="flex flex-col  w-[32%] ">
                    <div>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        onChange={handleChange}
                        value={values.city}
                        onBlur={handleBlur}
                        className="flex h-10 w-full text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] placeholder:font-Marcellus placeholder:opacity-60 focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-sm  disabled:opacity-50 placeholder:px-1"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      {errors.city && touched.city ? (
                        <p className="font-Marcellus  text-red-900">
                          {errors.city}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  {/* City Selection */}
                  <div className="w-[32%] flex flex-col">
                    <div>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        onChange={handleChange}
                        value={values.state}
                        onBlur={handleBlur}
                        className="flex h-10 w-full  text-text_Color border-b-[1px] border-b-[#642F29] bg-transparent px-3 py-2 text-sm placeholder:text-[#642F29] placeholder:font-Marcellus placeholder:opacity-60 focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-sm  disabled:opacity-50 placeholder:px-1"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      {errors.state && touched.state ? (
                        <p className="font-Marcellus text-red-900 opacity-100">
                          {errors.state}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-[31%] flex flex-col">
                    <div>
                      <input
                        className="flex h-10  text-text_Color font-Marcellus  border-b-[1px] border-b-[#642F29] bg-transparent  text-sm placeholder:text-[#642F29] placeholder:font-Marcellus placeholder:opacity-60 focus:outline-none  disabled:cursor-not-allowed md:placeholder:text-sm disabled:opacity-50 placeholder:px-1"
                        type="text"
                        placeholder="ZipCode"
                        id="zipcode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.zipcode}
                        pattern="[0-9]*"
                        required
                      ></input>
                    </div>
                    <div>
                      {errors.zipcode && touched.zipcode ? (
                        <p className="font-Marcellus  text-red-900 opacity-100">
                          {errors.zipcode}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/* Add your form or any content for adding an address */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-[90%] uppercase text-lg mb-3.5 flex items-center font-Marcellus font-normal justify-center mt-8 mx-auto bg-text_Color2 rounded-3xl   py-2 px-4  text-white "
          >
            {isSubmitting ? "Adding..." : "Add Address"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
