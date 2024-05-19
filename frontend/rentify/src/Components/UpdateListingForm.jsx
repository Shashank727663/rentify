import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

const UpdateListingForm = () => {
  const { listingId } = useParams(); // Fetch listingId from params
  const [formData, setFormData] = useState({
    place: '',
    area: '',
    numberOfBedRooms: '',
    numberOfBathRooms: '',
    price: '',
    numberOfHospitals: '',
    numberOfColleges: ''
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const user  = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(`http://localhost:5000/sellers/getOne/${listingId}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        const listingData = response.data.listing;
        setFormData({
          place: listingData.place,
          area: listingData.area,
          numberOfBedRooms: listingData.numberOfBedRooms,
          numberOfBathRooms: listingData.numberOfBathRooms,
          price: listingData.price,
          numberOfHospitals: listingData.numberOfHospitals,
          numberOfColleges: listingData.numberOfColleges
        });
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing(); // Always call the fetchListing function when the component mounts
  }, [listingId]); // Add listingId to the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.put(`http://localhost:5000/sellers/update/${listingId}`, formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      window.location.href = '/seller-flow';
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Update Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="place" className="block text-gray-700 text-sm font-bold mb-2">
            Place
          </label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="area" className="block text-gray-700 text-sm font-bold mb-2">
            Area
          </label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
          <div className="mb-4">
              <label htmlFor="numberOfBedRooms" className="block text-gray-700 text-sm font-bold mb-2">
              Number of Bedrooms
              </label>
              <input
              type="number"
              id="numberOfBedRooms"
              name="numberOfBedRooms"
              value={formData.numberOfBedRooms}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              /></div>
              <div className="mb-4">
              <label htmlFor="numberOfBathRooms" className="block text-gray-700 text-sm font-bold mb-2">
              Number of Bathrooms
              </label>
              <input
              type="number"
              id="numberOfBathRooms"
              name="numberOfBathRooms"
              value={formData.numberOfBathRooms}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              /></div>
              <div className="mb-4">

              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
              Price
              </label>
              <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              /></div>
              <div className="mb-4">
              <label htmlFor="numberOfHospitals" className="block text-gray-700 text-sm font-bold mb-2">
              Number of Hospitals
              </label>
              <input
              type="string"
              id="numberOfHospitals"
              name="numberOfHospitals"
              value={formData.numberOfHospitals}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              /></div>
              <div className="mb-4">
              <label htmlFor="numberOfColleges" className="block text-gray-700 text-sm font-bold mb-2">
              Number of Colleges
              </label>
              <input
              type="string"
              id="numberOfColleges"
              name="numberOfColleges"
              value={formData.numberOfColleges}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              /></div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="mt-2 inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Listing
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default UpdateListingForm;
