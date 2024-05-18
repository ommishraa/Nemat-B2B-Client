import { useDispatch, useSelector } from "react-redux";
import NavBars from "./common/NavBars";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { formattedAmount } from "../component/common/FormatAmount";
import Footer from "../component/footer/footer";
import ContinueCheckout from "./products/ContinueCheckout";
import { toast } from "react-hot-toast";
import DeliveredAddAddress from "./DeliveredAddAddress";
import ProductAddModal from "./ProductAddModal";
import getToken from "./auth/GetToken";
import { totalCartValueInCart } from "../slices/cartSlice";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { RiEdit2Line } from "react-icons/ri";
import CartAddress from "./common/CartAddress";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [productDisplay, setProductDisplay] = useState();
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [orderSummarydetails, setOrderSummaryDetails] = useState([]);
  const [grandTotaldata, setGrandTotalData] = useState([]);
  const [discountSlabe, setDiscountSlabe] = useState([]);
  const [categoryTotal, setCategoryTotal] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [nodata, setNoData] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [productId, setProductId] = useState();
  const [loadCartData, setLoadCartData] = useState(true);

  const { user } = useSelector((store) => store.profile);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all([
          getAllCartData(),
          getAllDiscountSlabe(),
        ]);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (loadCartData) {
      fetchData();
    }

    setLoadCartData(false);
  }, [loadCartData]);

  const getAllCartData = async () => {
    try {
      const payload = {
        user_id: user.customer_id,
      };

      const header = getToken();

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/cart/getcartpagedata`,
        payload,
        header
      );

      setProductDisplay(response.data.LeftSideData);
      // setProductDisplay(response.data.);

      dispatch(totalCartValueInCart(response.data.TotalProductInCart));

      setOrderSummaryDetails(response.data.RightSideData[0]);
      setGrandTotalData(response.data.RightSideData[1]);
      setCategoryTotal(response.data.RightSideData[2]);
      setAddress(response.data.ShippingAddress);
      setLoading(false);

      // console.log(response.data.ShippingAddress);
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
          if (status === 403) {
            setNoData(true);
          }
          console.log(error.response);
          // toast.error(data);
          setLoading(false);
        }
      }
    }
  };

  const getAllDiscountSlabe = async () => {
    try {
      const header = getToken();

      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/cartdiscountscheme/getall`,
        header
      );

      setDiscountSlabe(response.data);
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
          console.log(error.response);
          // toast.error(data);
        }
      }
    }
  };

  const seriesPageHandler = async (_id) => {
    navigate(`/series/${_id}`);
  };

  const toggleExpansion = (index) => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  const handlerPopProduct = (productId) => {
    setProductId(productId);
    setProductModal(true);
  };

  let nextDiscountPercent = null;
  return (
    <div>
      <div>
        <NavBars />
      </div>

      {loading ? (
        <p></p>
      ) : (
        <>
          {nodata ? (
            <div className="w-[90%] mx-auto mt-10">
              <h1 className="font-roxborough  mb-6 text-text_Color text-2xl w-full text-start font-semibold">
                Your Cart
              </h1>
              <div className="w-[100%] mt-16 ">
                <h1 className="text-center text-2xl text-text_Color font-roxborough font-bold">
                  YOUR CART IS EMPTY
                </h1>
                <div className="w-full mx-auto flex justify-center mt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/home")}
                    className="px-6 border-[1px] rounded-3xl border-text_Color py-2  text-text_Color font-Marcellus font-normal"
                  >
                    Continue shopping
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-10 w-[100%]">
              <div className="w-[94%] mx-auto ">
                <h1 className="font-roxborough mb-6 text-text_Color text-2xl w-full text-start font-semibold">
                  Your Cart
                </h1>

                {/* Order Products display  */}
                <div className="md:flex md:w-[100%] md:mx-auto">
                  <div className="mt-8 md:w-[58%] mr-[7%] md:mt-0">
                    {productDisplay.map((product, index) => (
                      <div key={product.CartDiscountSchemeId} className="">
                        <div className="mobile:flex mobile:w-full mobile:justify-between sm:flex sm:w-full sm:justify-between">
                          <h1
                            onClick={() =>
                              seriesPageHandler(product.SubCategoryId)
                            }
                            className="text-bg_green text-xl uppercase font-Marcellus font-normal cursor-pointer"
                          >
                            {product.seriesName}
                          </h1>
                          <div onClick={() => toggleExpansion(index)}>
                            {expandedIndices.includes(index) ? (
                              <LuChevronUp size={25} color="#60713A" />
                            ) : (
                              <LuChevronDown size={25} color="#60713A" />
                            )}
                          </div>
                        </div>

                        <div className="mobile:w-full mobile:flex  mobile:justify-between mobile:mt-3 mobile:mb-2 font-Marcellus text-text_Color text-sm mobile:pb-3 border-b-[1px] border-text_Color sm:w-full sm:flex sm:justify-between sm:mt-3 sm:mb-2 sm:pb-3 ">
                          <h1 className="font-Marcellus mobile:text-base md:text-lg font-normal text-text_Color">
                            Total product quantity:{product.totalQuantity}
                          </h1>
                          <h1 className="font-Marcellus mobile:text-base md:text-lg font-normal text-text_Color">
                            Total Amount:{" "}
                            {formattedAmount(product.TotalSeriesPrice)}
                          </h1>
                        </div>
                        {expandedIndices.includes(index) && (
                          <div>
                            <div className="mobile:w-full sm:w-full mt-2 mb-3 md:w-full">
                              {product.data.map((cartProduct, index) => (
                                <div
                                  key={index}
                                  className="mobile:flex mt-4  mobile:h-[180px] sm:flex sm:h-[180px] cursor-pointer md:h-auto"
                                  onClick={() =>
                                    handlerPopProduct(cartProduct.product_id)
                                  }
                                >
                                  <div className="mobile:w-[38%] sm:w-[38%] mr-4 md:w-[90px] md:h-[110px] ">
                                    <img
                                      src={`${
                                        import.meta.env.VITE_REACT_APP_BASE_URL
                                      }/${
                                        cartProduct.product_img[0]
                                          .OtherImagesName
                                      }`}
                                      className="mobile:w-full mobile:h-full mobile:object-contain sm:w-full sm:h-full sm:object-contain  md:w-full md:h-full md:object-cover"
                                    />
                                  </div>
                                  <div className="mobile:w-[60%] md:w-full cursor-pointer font-Marcellus text-lg font-normal text-text_Color  mobile:h-full mobile:flex mobile:flex-col mobile:justify-center sm:w-[60%] sm:h-full sm:flex sm:flex-col sm:justify-center md:justify-start md:items-start md:h-full md:my-auto">
                                    <div className="md:w-full md:h-full ">
                                      <h1 className="font-roxboroughnormal text-xl md:w-[35%] font-bold text-text_Color">
                                        {cartProduct.product_name}
                                      </h1>
                                      <div className="md:flex  md:w-full md:justify-between md:items-center">
                                        <p className="mt-2 font-Marcellus text-lg font-normal text-text_Color">
                                          Price/pc ₹ {product.PricePerPiece}
                                        </p>

                                        <p className="py-2 bg-Cream md:w-[35%] rounded-3xl mt-2 flex justify-between items-center">
                                          <span className="ml-[3%] w-[80%] font-Marcellus text-lg font-normal text-text_Color">
                                            Quantity: {cartProduct.quantity}{" "}
                                          </span>
                                          <span className="-[5%]  w-[20%]">
                                            <RiEdit2Line
                                              size={25}
                                              color="#60713A"
                                            />
                                          </span>
                                        </p>
                                        <p className="mt-2 font-Marcellus text-lg font-normal text-text_Color">
                                          Total:{" "}
                                          {formattedAmount(
                                            cartProduct.totalproductprice
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Product Pop Details */}
                            {productModal && (
                              <ProductAddModal
                                productId={productId}
                                user={user}
                                setProductModal={setProductModal}
                                setLoadCartData={setLoadCartData}
                              />
                            )}

                            {/* Mobile View Slider  */}
                            {product.UpsellString !== null ? (
                              <div className="mobile:w-full sm:w-full mt-6 mb-14 border-t-2 border-text_Color border-b-2 cursor-pointer md:hidden sm:block mobile:block font-Marcellus">
                                <p
                                  onClick={() =>
                                    seriesPageHandler(product.SubCategoryId)
                                  }
                                  className="p-3 uppercase text-text_Color font-Marcellus font-normal"
                                >
                                  {product.UpsellString.split(" ").map(
                                    (word, index) => {
                                      if (
                                        index === 11 ||
                                        index === 12 ||
                                        index === 13
                                      ) {
                                        return (
                                          <span
                                            key={index}
                                            style={{
                                              color: "#C28E5E",
                                            }}
                                          >
                                            {word}{" "}
                                          </span>
                                        );
                                      } else {
                                        return word + " ";
                                      }
                                    }
                                  )}
                                </p>
                              </div>
                            ) : null}
                          </div>
                        )}

                        {/* Desktop View Slider  */}
                        {product.UpsellString !== null ? (
                          <div className="mobile:w-full sm:w-full mt-6 mb-14 cursor-pointer sm:hidden mobile:hidden md:block md:bg-LightCream font-Marcellus">
                            <p
                              onClick={() =>
                                seriesPageHandler(product.SubCategoryId)
                              }
                              className="p-3 uppercase text-text_Color font-Marcellus font-normal"
                            >
                              {product.UpsellString.split(" ").map(
                                (word, index) => {
                                  if (
                                    index === 11 ||
                                    index === 12 ||
                                    index === 13
                                  ) {
                                    return (
                                      <span
                                        key={index}
                                        style={{
                                          color: "#C28E5E",
                                        }}
                                      >
                                        {word}{" "}
                                      </span>
                                    );
                                  } else {
                                    return word + " ";
                                  }
                                }
                              )}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    ))}

                    {/* Add Address  */}
                    <div>
                      {address.length == 0 ? (
                        <CartAddress 
                          address={address}
                          setAddress={setAddress}
                        />
                      ) : (
                        <DeliveredAddAddress
                          address={address}
                          setAddress={setAddress}
                          selectedAddressId={selectedAddressId}
                          setSelectedAddressId={setSelectedAddressId}
                        />
                      )}
                    </div>
                  </div>

                  <div className="mobile:w-[96%] sm:w-[96%] md:h-fit mobile:mx-auto mobile:h-auto sm:mx-auto sm:h-auto bg-CartRightColor mt-10 md:w-[34%] md:mt-0">
                    <h1 className="mobile:text-center sm:text-center mt-6 font-roxborough text-text_Color font-bold text-xl">
                      Order Summary
                    </h1>
                    {/* Left Side Part  */}
                    {orderSummarydetails.map((data, index) => (
                      <div key={index} className="mt-6  text-text_Color">
                        <div className="flex justify-between w-[90%] mx-auto">
                          <h1 className="font-roxborough font-semibold">
                            {data.Name}
                          </h1>
                          <p className="font-Marcellus font-normal">
                            {formattedAmount(data.totalSeriesPrice)}
                          </p>
                        </div>
                        <div className="flex justify-between w-[90%] mx-auto mt-3">
                          <p className="font-roxborough font-semibold">
                            Discount
                          </p>
                          <p className="font-Marcellus font-normal">
                            {data.DiscountPercent}% ( -
                            {formattedAmount(data.DiscountAmount)} )
                          </p>
                        </div>
                        <div className="flex justify-between w-[90%] mx-auto mt-3">
                          <p className="font-roxborough font-semibold">
                            {" "}
                            Sub total after discount:
                          </p>
                          <p className="font-Marcellus font-normal">
                            {formattedAmount(data.AmountAfterDiscount)}
                          </p>
                        </div>
                        <div className="flex justify-between w-[90%] mx-auto mt-3">
                          <p className="font-roxborough font-semibold">GST:</p>
                          <p className="font-Marcellus font-normal">
                            {data.GST}% ( +
                            {formattedAmount(data.GSTAdditionAmount)} )
                          </p>
                        </div>
                        <div className=" w-[100%] mx-auto mt-6 pt-4 border-t-2 border-text_Color mb-8">
                          <div className="flex justify-between w-[90%] mx-auto">
                            <p className="font-roxborough font-semibold">
                              Total :-{" "}
                            </p>
                            <p className="font-Marcellus font-normal">
                              {formattedAmount(data.Total)}
                            </p>
                          </div>
                        </div>

                        {/* Right Side Part  */}
                        {discountSlabe.map((discountItem) => (
                          <div
                            key={discountItem._id}
                            className="bg-Cream border-t-[1px] border-dashed border-text_Color"
                          >
                            {data.CartDiscountSchemeId === discountItem._id && (
                              <div className="flex flex-col w-[100%] justify-between mx-auto">
                                <div className="flex w-[90%] justify-between mx-auto">
                                  {discountItem.DiscountSlabs.map(
                                    (DSPercentage, index) => {
                                      if (
                                        data.DiscountPercent ===
                                        DSPercentage.discountPercent
                                      ) {
                                        // Find the next value without checking the condition
                                        const nextMatch =
                                          discountItem.DiscountSlabs.slice(
                                            index + 1
                                          ).find((nextDSPercentage) => true);

                                        // Store the next value in the variable
                                        if (nextMatch) {
                                          nextDiscountPercent =
                                            nextMatch.discountPercent;
                                        }

                                        return (
                                          <div key={index}>
                                            <div className="px-4 bg-light_Green">
                                              <h1
                                                className={
                                                  nextDiscountPercent
                                                    ? "bg-light_Green p-2 text-white font-roxborough font-semibold"
                                                    : "p-2 "
                                                }
                                              >
                                                {DSPercentage.discountPercent}%
                                              </h1>
                                            </div>
                                          </div>
                                        );
                                      }
                                      return (
                                        <div key={index}>
                                          <div className="px-4">
                                            <h1 className="p-2 font-roxborough font-semibold">
                                              {DSPercentage.discountPercent}%
                                            </h1>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                                <div className="bg-light_Green p-2 text-center">
                                  {discountItem.DiscountSlabs.map(
                                    (total, index) => (
                                      <div
                                        key={index}
                                        className="w-[80%] mx-auto text-white"
                                      >
                                        {data.totalSeriesPrice >= total.from &&
                                        data.totalSeriesPrice <= total.to ? (
                                          <h1 className="font-roxborough font-medium ">
                                            Spend{" "}
                                            <span style={{ margin: "0 5px" }}>
                                              {formattedAmount(
                                                total.to - data.totalSeriesPrice
                                              )}
                                            </span>{" "}
                                            more to get
                                            <span style={{ margin: "0 5px" }}>
                                              {nextDiscountPercent}%
                                            </span>
                                            discount on your order
                                          </h1>
                                        ) : null}
                                      </div>
                                    )
                                  )}
                                  {discountItem.DiscountSlabs.every(
                                    (total) =>
                                      data.totalSeriesPrice >= total.from
                                  ) && (
                                    <div className="w-[80%] mx-auto text-white font-Marcellus font-semibold">
                                      <h1>
                                        Congratulations You Reach Your max Limit
                                      </h1>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}

                    {/* Total of Both Items */}
                    <div className="mt-5 text-text_Color">
                      {grandTotaldata.map((total, index) => (
                        <div key={index} className="">
                          <div className="flex w-[90%] justify-between mx-auto mb-3">
                            <p className="font-roxborough font-semibold">
                              {total.name} Sub Total
                            </p>
                            <p className="font-Marcellus font-normal">
                              {" "}
                              {formattedAmount(total.amountAfterSGSTCGST)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Category Total */}
                    <div className="text-text_Color ">
                      {categoryTotal.map((CGtotal, index) => (
                        <div
                          key={index}
                          className="flex w-[90%] border-t-2 border-text_Color py-3 justify-between mx-auto"
                        >
                          <p className="font-roxborough font-semibold">
                            Grand Total
                          </p>
                          <p className="font-Marcellus font-normal">
                            {formattedAmount(CGtotal.totalAmount)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="z-20">
                      {selectedAddressId && (
                        <ContinueCheckout
                          user={user}
                          selectedAddressId={selectedAddressId}
                          setNoData={setNoData}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-7 -z-20">
                <Footer />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
