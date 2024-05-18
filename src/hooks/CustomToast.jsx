import { IoCloseCircleSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

const CustomToast = ({ message, type }) => {
  let IconComponent;
  let iconColor;

  if (type === "error") {
    IconComponent = FaCircleXmark;
    iconColor = "#642F29";
  } else if (type === "success") {
    IconComponent = FaCheckCircle;
    iconColor = "#642F29";
  }

  return (
    <div className="custom-toast custom-toast-error  w-auto h-[60px]">
      <div className=" p-3 text-xl flex justify-center bg-Cream rounded-3xl text-white items-center">
        <span>
          <IconComponent
            size={23}
            color={iconColor}
            className="error-icon mr-2"
          />
        </span>
        <p className="text-text_Color font-Marcellus font-normal text-xl">
          {message}
        </p>
      </div>
    </div>
  );
};

export default CustomToast;
