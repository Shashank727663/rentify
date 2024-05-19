// Home.js

import React from "react";
import { useState, useEffect } from "react";

const Home = ({role}) => {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('https://picsum.photos/1200/800')" }}
    >
      <nav className="flex justify-between items-center p-4 bg-white">
        <div>
          <a href="/buyer-flow" className="mr-4">
            Buyer Flow
          </a>
          {/* Display Seller Flow link only if user is a seller */}
            {role === 'seller' && <a href="/seller-flow">Seller Flow</a>}
            
         
        </div>
      </nav>
      <div className="text-white text-center mt-24">
        <h2 className="text-4xl font-bold mb-4">Welcome to Rentify</h2>
        <p className="text-lg">Buy or sell your dream home with ease.</p>
      </div>
    </div>
  );
};

export default Home;
