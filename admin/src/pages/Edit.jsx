import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";

const Edit = ({ token }) => {
  const { id } = useParams();
  
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/product/single`,
          { productId: id },
          { headers: { token } }
        );
      
        if (response.data.success) {
          const fetchedProduct = response.data.product;

          setName(fetchedProduct.name || "");
          setDescription(fetchedProduct.description || "");
          setPrice(fetchedProduct.price || "");
          setCategory(fetchedProduct.category || "Men");
          setSubCategory(fetchedProduct.subCategory || "Topwear");
          setBestseller(fetchedProduct.bestseller || false);
          setSizes(
            Array.isArray(fetchedProduct.sizes)
              ? fetchedProduct.sizes
              : JSON.parse(fetchedProduct.sizes || "[]")
          );

          const images = fetchedProduct.images || [];
          setImage1(images[0] || null);
          setImage2(images[1] || null);
          setImage3(images[2] || null);
          setImage4(images[3] || null);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Error fetching product details");
      }
    };

    fetchProduct();
  }, [id, token]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
  
      // Append product details to formData
      formData.append("productId", id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
  
      // Append updated images if available
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
  
      // Log formData entries for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
      // Make API call to update the product
      const response = await axios.post(
        `${backendUrl}/api/product/edit`,
        formData,
        { headers: { token } }
      );
  
      // Handle the response
      if (response.data.success) {
        toast.success("Product updated successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product");
    }
  };
  
  

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className="w-20"
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt={`Product Image ${index + 1}`}
              />
              <input
                onChange={(e) =>
                  {
                    const setImageFn = [setImage1, setImage2, setImage3, setImage4][index];
                    setImageFn(e.target.files[0]);
                  }
                }
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Leather">Leather</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                )
              }
            >
              <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label className="cursor-pointer" htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">UPDATE</button>
    </form>
  );
};

export default Edit;
