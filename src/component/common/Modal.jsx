
import { useEffect, useState } from "react";
import ProductHeader from "./ProductHeader";
// import ProgressBar from "./common/ProgressBar";
import { CiViewTable } from "react-icons/ci";
import { IoClose } from "react-icons/io5";


const Modal = ({ onClose, title, qunantityData }) => {
  useEffect(() => {
    // Disable scrolling when the modal is opened
    document.body.style.overflow = "hidden";
    return () => {
      // Enable scrolling when the modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md mobile:w-[90%] md:w-[60%] z-50">
        <div className="w-[95%] flex justify-end items-end z-50">
          <IoClose
            className="cursor-pointer"
            onClick={onClose}
            size={25}
            color="60713A"
          />
        </div>
        <div className="text-text_Color font-bold text-2xl uppercase z-50">
          <ProductHeader title={title} />
          <p className="md:w-[60%] mobile:w-[85%] text-text_Color mt-3 mx-auto lowercase text-center font-Marcellus font-normal text-base">
            You can select different products in this series to avail the
            schemes below
          </p>
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center mt-4 z-50">
          <div className="w-[90%] flex bg-LightCream border-[1px] border-borderColorBeige font-Marcellus uppercase">
            <p className="w-[50%] text-center border-r-[1px] p-3 font-normal text-lg text-text_Color border-borderColorBeige">
              Order Quantity
            </p>
            <p className="w-[50%] text-center text-text_Color font-normal text-lg p-3">
              Price per PC
            </p>
          </div>
          {qunantityData?.SchemeValues?.map((data, index) => (
            <div
              key={data._id}
              className="w-[90%] border-borderColorBeige border-l-0.5 b border-r-0.5 font-Marcellus font-normal"
            >
              <div className="flex">
                {data.max !== undefined ? (
                  <p className="w-[50%] text-center text-text_Color font-normal border-r-0.5 border-borderColorBeige p-1.5">
                    {`${data.min}-${data.max} pcs`}
                  </p>
                ) : (
                  <p className="w-[50%] text-center text-text_Color font-normal border-r-0.5 border-borderColorBeige p-1.5 border-b">
                    {`${data.min}, Unlimited`}
                  </p>
                )}
                {qunantityData.SchemeValues.length === index + 1 ? (
                  <p className="w-[50%] text-center text-text_Color font-normal p-1.5 border-b-0.5 border-borderColorBeige">
                    ₹ {data.value} PC
                  </p>
                ) : (
                  <p className="w-[50%] text-text_Color font-normal text-center p-1.5">
                    ₹ {data.value} PC
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Modal;