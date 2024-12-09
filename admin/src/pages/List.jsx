import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const searchProduct = (e) => {
    let productsCopy = list.slice();

    if (e.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(e.toLowerCase())
      );

      setList(productsCopy);
    } else {
      fetchList();
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <input
          className="w-1/3 p-1"
          placeholder="search by name"
          onChange={(e) => searchProduct(e.target.value)}
        ></input>
        {/* ------- List Table Title ---------- */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------ Product List ------ */}

        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <div className="flex justify-end md:justify-center gap-2">
              <span
                onClick={() => navigate(`/edit/${item._id}`)} // Navigate to the edit page
                className="cursor-pointer text-lg text-blue-600"
              >
                ✏️
              </span>
              <span
                onClick={() => removeProduct(item._id)}
                className="cursor-pointer text-lg text-red-600"
              >
                X
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
