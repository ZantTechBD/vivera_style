import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const MyProfile = () => {
  const { token, navigate } = useContext(ShopContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      // Simulate fetching user data. Replace with your API call if needed.
      const fetchUserData = async () => {
        // Simulating an API call
        const mockData = {
          name: "John Doe",
          email: "johndoe@example.com",
          phone: "+1234567890",
          address: "123 Main Street, Springfield",
          joinedDate: "2023-01-01",
        };
        setUserData(mockData);
      };

      fetchUserData();
    }
  }, [token, navigate]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h1>
      <div className="space-y-4">
        <div>
          <p className="text-gray-500">Name</p>
          <p className="text-gray-800 font-medium">{userData.name}</p>
        </div>
        <div>
          <p className="text-gray-500">Email</p>
          <p className="text-gray-800 font-medium">{userData.email}</p>
        </div>
        <div>
          <p className="text-gray-500">Phone</p>
          <p className="text-gray-800 font-medium">{userData.phone}</p>
        </div>
        <div>
          <p className="text-gray-500">Address</p>
          <p className="text-gray-800 font-medium">{userData.address}</p>
        </div>
        <div>
          <p className="text-gray-500">Joined Date</p>
          <p className="text-gray-800 font-medium">{userData.joinedDate}</p>
        </div>
      </div>
      <button
        className="mt-6 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default MyProfile;
