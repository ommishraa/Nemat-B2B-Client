import ProductHeader from "../common/ProductHeader";
import { FaWindowClose } from "react-icons/fa";

const Discountslabe = ({ Dssprays, agarbattisDs , isModalOpen , setIsModalOpen}) => {
  
  const closeModal = () => {
    setIsModalOpen(false);
  };


  // console.log(isModalOpen)

  return (
    <div className="flex md:w-[100%]  flex-col justify-center items-center  mt-8 bg-Cream ">
      
      <div className="mt-10 flex font-semibold mobile:text-2xl md:text-3xl uppercase text-text_Color">
        <ProductHeader title={"DISCOUNT SLABS"} className="pt-4 " />
      </div>
      {
          isModalOpen && (
            <button className="w-[90%] flex justify-end -mt-7" onClick={closeModal}><span className><FaWindowClose color="" size={25}/></span></button>
          )
        }

      <div className="mt-9 mb-9 md:w-[80%] sm:w-[70%] mobile:w-[96%]">
        <div className="flex flex-col w-[100%]   border-[1px] border-text_Color font-Marcellus text-text_Color overflow-hidden">
          <div className="flex border-b-[1px] border-text_Color w-full h-[68px] justify-around items-center text-center mobile:text-sm mobile:font-bold sm:font-bold  sm:text-base md:text-xl">
            <h1 className="text-center w-[34%] pl-3 overflow-hidden rounded-3xl flex justify-start items-center">
              ORDER VALUE{" "}
              <p className="ml-2 w-[24px] h-[24px] text-center text-white bg-text_Color  rounded-full">
                i
              </p>
            </h1>
            <h1 className="pl-3 w-[33%] border-text_Color border-l-[1px] border-r-[1px] text-transform: uppercase">
              {Dssprays.Name}{" "}
            </h1>
            <h1 className="pl-3 w-[33%] border-text_Color text-transform: uppercase">
              {agarbattisDs.Name}
            </h1>
          </div>
          <div className="w-full pt-1 font-Marcellus text-text_Color">
            {Dssprays && Dssprays.DiscountSlabs.length > 0 ? (
              Dssprays.DiscountSlabs.map((item, index) => (
                <div
                  key={item._id}
                  className={`w-full mobile:h-[128px] sm:h-[80px] md:h-[50px] flex justify-between items-center text-center border-t-${index === 1 ? '1' : '0'}px border-text_Color ${index === (Dssprays.DiscountSlabs.length - 1) ? '' : 'border-b-[1px]'}`}
                >
                  {index === 0 ? (
                    <p className="w-[34%] pr-4 text-start pl-3">{`Upto Rs. ${item.to.toLocaleString()}`}</p>
                  ) : Dssprays.DiscountSlabs.length === index+1 ? (
                    <p className="w-[34%] pr-4 text-start pl-3">{`From Rs. ${item.from.toLocaleString()} and Above`}</p>
                  ) : (
                    <p className="w-[34%] pr-4 text-start pl-3">{`From Rs. ${item.from.toLocaleString()} to Rs. ${item.to.toLocaleString()}`}</p>
                  )}

                  <p className="w-[33%] border-text_Color border-l-[1px] border-r-[1px]">
                    {item.discountPercent}%
                  </p>

                  {/* Check if agarbattisDs has the corresponding item */}
                  {agarbattisDs.DiscountSlabs[index] && (
                    <p
                      key={agarbattisDs.DiscountSlabs[index]._id}
                      className="w-[33%] border-text_Color"
                    >
                      {agarbattisDs.DiscountSlabs[index].discountPercent}%
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discountslabe;
