import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerFlow = () => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(
    () => {
      const fetchListings = async () => {
        try {
          // setting headers for the request from local storage
          const user = JSON.parse(localStorage.getItem("user"));
          const response = await axios.get(
            `http://localhost:5000/sellers/all`,
            {
              headers: { Authorization: `Bearer ${user.token}` }
            }
          );
          // Update API call with page number
          console.log("Response:", response.data);
          setListings(response.data.listings);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.error("Error fetching seller listings:", error);
        }
      };

      fetchListings();
    },
    [currentPage]
  );

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const onClickRoute = () => {
    window.location.href = "/add-listing";
  };

  const handleDelete = async listingId => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.delete(`http://localhost:5000/sellers/delete/${listingId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
    

    //  const apiResp = await axios.get()
    const response = await axios.get(
        `http://localhost:5000/sellers/all`,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      setListings(response.data.listings);
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleUpdate = listingId => {
     window.location.href = `/update-listing/${listingId}`;
  };

  return (
    <div>
      <h2>Seller Flow</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={onClickRoute}
      >
        Add Listings
      </button>
      <div>
        {listings.map(listing =>
          <div key={listing._id} className="border p-4 mb-4">
            <h3>
              {listing.place}
            </h3>
            <p>
              Area: {listing.area}
            </p>
            <p>
              Number of Bedrooms: {listing.numberOfBedRooms}
            </p>
            <p>
              Number of Bathrooms: {listing.numberOfBathRooms}
            </p>
            <p>
              Price: {listing.price}
            </p>
            <p>
              Number of Hospitals: {listing.numberOfHospitals}
            </p>
            <p>
              Number of Colleges: {listing.numberOfColleges}
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleUpdate(listing._id)} // Pass the listing ID to the update function
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleDelete(listing._id)} // Pass the listing ID to the delete function
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SellerFlow;
