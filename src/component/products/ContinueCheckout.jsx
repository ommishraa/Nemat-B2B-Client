import axios from "axios";
import React, { useState } from "react";
import { GoDownload } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";
import getToken from "../auth/GetToken";
import { totalCartValueInCart } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
import CustomToast from "../../hooks/CustomToast";

const ContinueCheckout = ({ user, selectedAddressId, setNoData }) => {
  console.log("selectedAddressId ===> ", selectedAddressId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadSalesOrderPDF, setDownloadSalesOrderPDF] = useState();
  const [loading, setLoading] = useState(null);

  const user_id = user.customer_id;

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNoData(true);
  };

  const token = localStorage.getItem("token");

  const checoutorder = async () => {
    const payload = {
      user_id: user_id,
      shippingAddress_id: selectedAddressId,
      token: token,
    };

    console.log(payload);

    try {
      const header = getToken();

      setLoading(true);

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/order/placeorder`,
        payload,
        {
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        setLoading(false);
        setIsModalOpen(true);
        toast.custom(
          (t) => (
            <CustomToast
              message={"Order Placed Successfully"}
              type={"success"}
            />
          ),
          {
            position: "top-center",
            duration: 1000,
            className: "",
          }
        );
        setDownloadSalesOrderPDF(response.data);
        dispatch(totalCartValueInCart(0));
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        setLoading(false);

        if (
          status === 404 ||
          status === 403 ||
          status === 500 ||
          status === 302 ||
          status === 409 ||
          status === 401 ||
          status === 400
        ) {
          console.log(error.response);
          toast.custom((t) => <CustomToast message={"Access denied. No token provided"} type={"error"} />, {
            position: "top-center",
            duration: 1000,
            className: "",
          });
          setLoading(false);
        }
      }
    }
  };

  const downloadSalesOrder = () => {
    const blob = new Blob([downloadSalesOrderPDF], { type: "application/zip" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "documents.zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setNoData(true);
    setIsModalOpen(false);
  };

  return (
    <div className="z-30">
      <div
        className=" w-[96%] mx-auto text-center cursor-pointer items-center p-2 rounded-3xl bg-text_Color2 font-Marcellus text-lg mb-5 "
        onClick={() => {
          checoutorder();
        }}
      >
        <button className="uppercase text-white ">Continue to checkout</button>
      </div>

      <div className="z-30">
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50 ">
            <Toaster />
            {/* Your modal content goes here */}
            <div className="bg-white p-4 rounded-md w-[600px] h-[230px] z-50">
              <div className="w-[100%] h-[100%] flex flex-col justify-center items-center z-50">
                <div className="w-[80%] text-center mx-auto text-text_Color">
                  <h1 className="text-text_Color font-roxborough font-semibold text-xl z-50">
                    We have received your order
                  </h1>
                  <p className="font-Marcellus  font-normal  mt-4">
                    Please download sales order(s) and complete bank transfer to
                    confirm your order.
                  </p>
                </div>

                <div className="flex w-[90%] mx-auto mt-7 justify-between ">
                  <button
                    onClick={handleCloseModal}
                    className="py-2 w-[40%] uppercase border-text_Color2 text-text_Color2 border-[1px] font-Marcellus font-normal rounded-3xl"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="text-white w-[55%] bg-text_Color2 rounded-3xl font-Marcellus font-normal   flex justify-center py-2 text-center  items-center  uppercase"
                    onClick={() => downloadSalesOrder()}
                  >
                    <GoDownload size={25} className="mr-2" />
                    Sales order(s)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-[600px] h-[230px] flex flex-col justify-center items-center">
            <div className="w-[100%] h-[95%] font-bold text-xl">
              <div className="w-[90%] text-center mt-2 mx-auto text-text_Color">
                <h1 className="mb-2">Generating Sales Order</h1>
                <div className="animate-pulse h-8 bg-gray-300 rounded-md mb-4"></div>
                <div className="animate-pulse h-6 bg-gray-300 rounded-md"></div>
              </div>

              <div className="flex w-[90%] mx-auto mt-7 justify-between ">
                <div className="py-2 w-[40%] bg-gray-300  rounded-3xl animate-pulse"></div>
                <div className="text-white w-[55%] bg-gray-300  rounded-3xl font-medium flex justify-center py-2 text-center items-center uppercase">
                  <div className="flex items-center">
                    <div className="animate-pulse h-5 w-5 bg-gray-300 rounded-full mr-2"></div>
                    <div className="animate-pulse h-5 w-16 bg-gray-300 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContinueCheckout;
