// src/pages/Home/index.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Heart } from "lucide-react";

const RestaurantCard = ({ restaurant }) => {
  const { id, name, average_rating, review_count, price, categories, distance } = restaurant;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative">
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="text-sm text-gray-600">{price}</span>
        </div>
        
        <div className="flex items-center mb-4">
          {/* Star Rating */}
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${i < Math.floor(average_rating) ? 'text-blue-500 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>

          {/* Average Rating (in numbers) and Review Count */}
          <div className="ml-3 flex items-center">
            <span className="text-lg font-semibold text-white">
              {average_rating.toFixed(1)} / 5
            </span>
            <span className="ml-2 text-sm text-gray-300">
              ({review_count} reviews)
            </span>
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-600">
          {categories.join(", ")} • {distance}
        </div>

        {/* Link to individual restaurant page */}
        <div className="mt-4">
          <Link
            to={`/restaurant/${id}`}
            className="text-blue-500 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch restaurants data from Flask API
    fetch("http://127.0.0.1:5001/restaurants")
      .then(response => response.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      });
  }, []);  // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <img 
          src="/api/placeholder/1920/600?text=Food+Background"
          alt="Food Banner"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Discover Your Next Favorite Meal
              </h1>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-white rounded-lg">
                  <div className="flex items-center h-14 px-4">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search restaurants, cuisines..."
                      className="flex-1 ml-2 focus:outline-none"
                    />
                  </div>
                </div>
                <button className="h-14 px-8 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Popular Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
