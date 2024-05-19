// AddListingForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddListingForm = ({ onClose, refreshListings }) => {
  const [formData, setFormData] = useState({
    place: '',
    area: '',
    numberOfBedRooms: '',
    numberOfBathRooms: '',
    price: '',
    numberOfHospitals: '',
    numberOfColleges: ''
  });

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
      await axios.post('http://localhost:5000/sellers/add', formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      window.location.href = '/seller-flow';
      refreshListings();
      onClose();
    } catch (error) {
      console.error('Error adding listing:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Add Listing</h2>
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
              Add Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingForm;
