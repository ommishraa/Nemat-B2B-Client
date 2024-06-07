import React, { useState } from "react";
import DeliveredOrderDetails from "./DeliveredOrderDetails";
import OpenOrderDetails from "./OpenOrderDetails";
import CancelOrderDetails from "./CancelOrderDetails";

const OrderDetails = () => {
  // const [isChecked, setIsChecked] = useState(false);

  // const toggleSwitch = () => {
  //   setIsChecked(!isChecked);
  // };

  const [selectedOption, setSelectedOption] = useState("open");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="text-text_Color md:border-l-2 border-text_Color  mb-6 md:mt-3.5 ">
      <div className="md:ml-[7%] ">
        <div className="flex justify-between mt-4 border-b-2 pb-5 border-Cream ">
          <h1 className="font-roxborough font-semibold  text-2xl">Orders</h1>
          <select
            id="orderDetailsDropdown"
            value={selectedOption}
            onChange={handleSelectChange}
            className="block md:w-[30%] lg:w-[25%] mobile:w-[50%] mt-1 mobile:my-auto p-2.5 bg-text_Color2 text-white rounded-2xl border border-gray-300  font-Marcellus text-base font-normal shadow-sm focus:outline-none focus:ring-primary focus:border-primary custom-select custom-select-arrow select-dropdown"
          >
            <option className="bg-white rounded-t-2xl  text-black py-3 font-Marcellus font-normal " value="open">Open Order Details</option>
            <option className="bg-white text-black py-3 font-Marcellus font-normal" value="delivered">Delivered Order Details</option>
            <option className="bg-white text-black py-3 font-Marcellus font-normal" value="canceled">Canceled Order Details</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        {selectedOption === "delivered" && <DeliveredOrderDetails />}
        {selectedOption === "open" && <OpenOrderDetails />}
        {selectedOption === "canceled" && <CancelOrderDetails />}
      </div>
    </div>
  );
};

export default OrderDetails;
