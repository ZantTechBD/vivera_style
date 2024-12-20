import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, submitRating } =
    useContext(ShopContext); // Assuming `submitRating` is available
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [userRating, setUserRating] = useState(0); // User-selected rating

  // Fetch product data by ID
  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  // Submit the user's rating
  const handleRatingSubmit = async () => {
    if (userRating > 0) {
      try {
        // Assuming submitRating updates the product's rating on the server and returns the updated product
        const updatedProduct = await submitRating(productId, userRating);

        // Update product state with the new rating
        setProductData(updatedProduct);

        // Reset user's rating input
        setUserRating(0);
      } catch (error) {
        console.error("Error submitting rating:", error);
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {/* Display average rating */}
            {Array.from({ length: 5 }).map((_, index) => (
              <img
                key={index}
                src={
                  index < Math.round(productData.rating.average)
                    ? assets.star_icon
                    : assets.star_dull_icon
                }
                alt="star"
                className="w-3.5"
              />
            ))}
            <p className="pl-2">({productData.rating.count} reviews)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p
            className="mt-5 text-gray-500 md:w-4/5"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Color</p>
            <div className="flex gap-2">
              {productData.color.map((item, index) => (
                <button
                  onClick={() => setColor(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === color ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Submit Rating Section */}
      <div className="mt-8">
        <h3 className="text-xl font-medium">Submit Your Rating</h3>
        <div className="flex items-center gap-2 mt-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <img
              key={index}
              onClick={() => setUserRating(index + 1)}
              src={
                index < userRating ? assets.star_icon : assets.star_dull_icon
              }
              alt="Rate"
              className="w-6 cursor-pointer"
            />
          ))}
        </div>
        <button
          onClick={handleRatingSubmit}
          className="mt-3 bg-black text-white px-6 py-2 text-sm active:bg-gray-700"
          disabled={userRating === 0}
        >
          Submit Rating
        </button>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
