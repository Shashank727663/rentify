// BuyerFlow.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const BuyerFlow = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get("http://localhost:5000/buyers/all", {
          headers: { Authorization: `Bearer ${user.token}` }
        }); // Adjust the endpoint as needed
        setProperties(response.data.listings);
        console.log(properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleInterestedClick = propertyId => {
    alert(`You are interested in property with ID: ${propertyId}`);
  };

  const onClickLikes = async id => {
    try {
      await axios.put(
        `http://localhost:5000/buyers/likes/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))
              .token}`
          }
        }
      );
     
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property =>
          <div
            key={property._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                {property.place}
              </h3>
              <p className="text-gray-600">
                Area: {property.area}
              </p>
              <p className="text-gray-600">
                Bedrooms: {property.numberOfBedRooms}
              </p>
              <p className="text-gray-600">
                Bathrooms: {property.numberOfBathRooms}
              </p>
              <p className="text-gray-600">
                Price: ${property.price}
              </p>
              <p className="text-gray-600">
                Hospitals Nearby: {property.numberOfHospitals}
              </p>
              <p className="text-gray-600">
                Colleges Nearby: {property.numberOfColleges}
              </p>
              <div className="mt-4">
                <h4 className="text-lg font-medium">Seller Information</h4>
                <p className="text-gray-600">
                  Name: {property.seller.firstName} {property.seller.lastName}
                </p>
                <p className="text-gray-600">
                  Email: {property.seller.email}
                </p>
                <p className="text-gray-600">
                  Phone: {property.seller.phoneNumber}
                </p>
              </div>
              <button
                className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                onClick={() => onClickLikes(property._id)}
              >
                👍{property.Likes}
              </button>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleInterestedClick(property._id)}
              >
                I'm Interested
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerFlow;
