import React, { useEffect, useState } from "react";

const ProgressBar = ({ qunantityData, totalvalue , flag , displayKG }) => {
  const [maxValue, setMaxValue] = useState();
  const [nextSlabe, setNextSlabe] = useState(0);
  const [nextValue, setNextValue] = useState(null);


  //  console.log("displayKG In ProgressBar" , displayKG)
  //  console.log("qunantityData  " , qunantityData )

  useEffect(() => {
    findMaxValue();
  }, [qunantityData, totalvalue]);

  const findMaxValue = () => {
    const maxMinValue = Math?.max(
      ...qunantityData?.SchemeValues?.map((item) => item.min)
    );
    setMaxValue(maxMinValue);
  };


  useEffect(() => {
    const currentIndex = qunantityData.SchemeValues.findIndex((obj) => {
      return (
        obj.min <= totalvalue &&
        (obj.max === undefined || totalvalue <= obj.max)
      );
    });

    const resultPair =
      currentIndex !== -1
        ? {
            current: qunantityData.SchemeValues[currentIndex],
            next: qunantityData.SchemeValues[currentIndex + 1] || null,
          }
        : null;

    // Check if resultPair is not null before accessing its next property
    if (resultPair && resultPair.next) {
      setNextValue(resultPair.next);
    } else {
      setNextValue(null); // or handle it as needed
    }

    const matchingItem = qunantityData.SchemeValues.find(
      (item) => totalvalue >= item.min && totalvalue <= item.max
    );

    console.log("matchingItem" , matchingItem)

    if (matchingItem) {
      setNextSlabe(0);
      setNextSlabe(matchingItem.max + matchingItem.min - totalvalue);
    } else {
      setNextSlabe(0);
    }
  }, [totalvalue, qunantityData?.SchemeValues]);
  
  const calculateWidth = (min, max) => {
    if (totalvalue >= min && totalvalue <= max) {
      return `${(totalvalue / max) * 100}%`;
    } else if (totalvalue >= min && totalvalue >= max) {
      return "100%";
    } else if ((totalvalue >= min && max === undefined && min != 0 ) || null) {
      return "100%";
    } else if ((totalvalue >= min && max === undefined && min == 0) || null) {
      return "0%";
    }  else {
      return "0%";
    }
  };

  return (
    <div>
      <div className="w-[90%] mx-auto flex relative">
        {qunantityData?.SchemeValues?.map((data, index) => (
          <div
            key={data._id}
            className="w-full relative font-roxborough text-text_Color font-semibold text-lg"
          >
            {qunantityData?.SchemeValues?.length - 1 == index ? (
              <>
                <h1>{data.min} {displayKG ? "Kg" : "PCS"} & Above</h1>
                <h1 className="border-r-[1px] border-l-[1px] border-text_Color relative z-10"></h1>
              </>
            ) : (
              <>
                <h1>{data.min} {displayKG ? "Kg" : "PCS"}</h1>
                <h1 className={`border-r-[1px] h-11 ${ (index === 0 )  ? "border-l-[1px]" : ""} border-text_Color relative `}></h1>
              </>
            )}
          </div>
        ))}
      </div>
      <div className=" h-auto flex w-[90%] mx-auto ">
        {qunantityData?.SchemeValues?.map((data, index) => (
          <div
            key={data._id}
            className="w-[90%] h-[30px] bg-[#8FA75B] mx-auto relative mb-2"
          >
            <div
              style={{
                width: calculateWidth(data.min, data.max),
                backgroundColor: "#425711",
                height: "100%",
                transition: "width 0.5s ease-in-out" 
              }}
            >
              <div className="flex w-full h-full justify-evenly items-center absolute">
                <div className="w-full flex h-full font-Marcellus ">
                  {qunantityData?.SchemeValues?.map.length - 1 == index ? (
                    <h1 className="w-full border-text_Color border-r-[1px] border-l-[1px] h-full flex justify-center items-center text-center text-white ">
                      Rs.{data.value} / {displayKG ? "KG" : "PC"}
                    </h1>
                  ) : (
                    <h1 className="w-full border-text_Color border-r-[1px]  h-full flex justify-center items-center text-center text-white ">
                      Rs.{data.value} / {displayKG ? "KG" : "PC"}
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className=" w-[90%] mx-auto ">
        {
          qunantityData?.SchemeValues?.map((data, index, array) => {
            const isLastItem = index === array.length - 1;
            const isInRange = isLastItem
              ? totalvalue >= data.min && totalvalue
              : totalvalue >= data.min && totalvalue <= data.max;

            return isInRange ? (
              <div
                key={data._id}
                className="w-full flex h-full font-Marcellus "
              >
                <h1 className={`w-full flex  text-text_Color2   text-center justify-center items-center  mb-1 text-2xl font-semibold`}>
                  Rs.{data.value} / {displayKG ? "KG" : "PC"}
                </h1>
              </div>
            ) : null;
          }).filter(Boolean)[0]
        }
        <div className={`mt-1 ${flag ?"text-center" : "text-center "} font-Marcellus text-xl`}>
          {nextValue !== null ? (
            <div className="text-text_Color ">
              Buy{" "}
              <span className="font-bold text-text_Color2">{nextSlabe}</span>{" "}
              more {displayKG ? "Kg" : "pcs"} to unlock Rs.{" "}
              <span className="font-bold text-text_Color2">
                {nextValue.value}
              </span>
              /{displayKG ? "KG" : "PC"} rate
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
