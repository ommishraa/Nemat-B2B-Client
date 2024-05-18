import { useEffect, useState } from "react";
import ProductHeader from "./common/ProductHeader";
import ProgressBar from "./common/ProgressBar";
import { CiViewTable } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const DisplayProgressBarScroll = ({ qunantityData, totalvalue, title , displayKG}) => {
  const [marginTop, setMarginTop] = useState(0);
  const [SchemeModal, setSchemeModal] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollDirection = scrollTop > lastScrollTop ? "down" : "up";
      if (scrollDirection === "down") {
        setMarginTop(0); // Reset margin when scrolling down
      } else {
        setMarginTop(142); // Add margin when scrolling up
      }
      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (SchemeModal) {
      document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling when modal is closed
    }
  }, [SchemeModal]);

  return (
    <div
      className="bg-white z-0 transition-transform duration-500 "
      style={{ marginTop: `${marginTop}px` }}
    >
      <div className="md:w-[70%] mobile:w-[90%] mx-auto">
        <div className="text-start w-[90%] mx-auto text-text_Color font-bold text-2xl uppercase mt-8 flex mobile:flex-col sm:mobile:flex-col md:flex-row md:justify-between  mobile:justify-center mobile:items-center justify-between">
          <h1 className="font-roxboroughnormal mt-[1.5%] text-center mb-2 font-bold">
            {title}
          </h1>
          <button
            onClick={() => setSchemeModal(true)}
            className="uppercase p-1.5 mb-3  px-5 rounded-full mobile:mt-5 text-white font-Marcellus font-normal text-lg bg-[#912E09] flex justify-center items-center"
          >
            <span className="mr-2">
              <CiViewTable size={20} />
            </span>
            Scheme
          </button>
        </div>
        <div className="mt-7">
          <ProgressBar
            qunantityData={qunantityData}
            totalvalue={totalvalue}
            flag={true}
            displayKG={displayKG}
          />
        </div>
        <div className="z-40">
          {SchemeModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-md  mobile:w-[90%] md:w-[60%] z-50 ">
                <div className="text-text_Color font-bold text-2xl uppercase mt-4 z-50">
                  <ProductHeader title={title} />
                  <p className="md:w-[60%] mobile:w-[85%] text-text_Color mt-3 mx-auto lowercase text-center font-Marcellus font-normal text-base">
                    You can select different products in this series to avail
                    the schemes below
                  </p>
                </div>
                <div className="w-[100%] flex flex-col justify-center items-center  mt-4  z-50">
                  <div className="w-[90%] flex bg-LightCream  border-[1px] border-borderColorBeige font-Marcellus  uppercase">
                    <p className="w-[50%] text-center border-r-[1px] p-3 font-normal text-lg text-text_Color border-borderColorBeige ">
                      Order Quantity
                    </p>
                    <p className="w-[50%] text-center text-text_Color font-normal text-lg p-3">
                      Price per {displayKG ? "KG" : "PC"}
                    </p>
                  </div>
                  {qunantityData?.SchemeValues?.map((data, index) => (
                    <div
                      key={data._id}
                      className="w-[90%] border-borderColorBeige border-l-0.5 b border-r-0.5 font-Marcellus font-normal"
                    >
                      <div className="flex">
                        {data.max !== undefined ? (
                          <p className="w-[50%] text-center text-text_Color font-normal border-r-0.5 border-borderColorBeige  p-1.5">{`${data.min} to ${data.max} ${displayKG ? "Kgs" : "pcs"}`}</p>
                        ) : (
                          <p className="w-[50%] text-center text-text_Color font-normal border-r-0.5 border-borderColorBeige p-1.5 border-b">{`${data.min}, Unlimited`}</p>
                        )}
                        {qunantityData.SchemeValues.length === index + 1 ? (
                          <p className="w-[50%] text-center text-text_Color font-normal p-1.5 border-b-0.5 border-borderColorBeige">
                            ₹ {data.value} {displayKG ? "KG" : "PC"}
                          </p>
                        ) : (
                          <p className="w-[50%] text-text_Color font-normal text-center p-1.5  ">
                            ₹ {data.value} {displayKG ? "KG" : "PC"}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  onClick={() => setSchemeModal(false)}
                  className="w-full uppercase underline  mb-2 text-text_Color2 font-Marcellus text-lg text-center mt-4 cursor-pointer"
                >
                  Continue shopping
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayProgressBarScroll;
