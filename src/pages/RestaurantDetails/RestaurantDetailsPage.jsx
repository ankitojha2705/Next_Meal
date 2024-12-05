import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";
const VITE_RESTAURANT_BASE_URL = import.meta.env.VITE_RESTAURANT_BASE_URL;

const RestaurantDetailsPage = () => {
  const { business_id } = useParams();  // Capture the business_id from the URL
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the restaurant details by business_id
    console.log(business_id)
    fetch(`${VITE_RESTAURANT_BASE_URL}/restaurants/${business_id}`)
      .then(response => response.json())
      .then(data => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching restaurant:", error);
        setLoading(false);
      });
  }, [business_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  const { name, average_rating, review_count, address, city, state, categories, hours, price, image } = restaurant;

  // Number of filled stars based on average rating
  const filledStars = Math.floor(average_rating);
  const emptyStars = 5 - filledStars;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{name}</h1>

      {/* Restaurant Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="flex">
              {/* Fill the stars with blue color for rating */}
              {[...Array(filledStars)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 text-blue-500 fill-current"
                />
              ))}
              {/* Add empty stars for the remaining part */}
              {[...Array(emptyStars)].map((_, i) => (
                <Star
                  key={i + filledStars}
                  className="h-6 w-6 text-gray-300"
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({review_count} reviews)</span>
          </div>
          <span className="text-sm text-gray-600">{price}</span>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          {categories.join(", ")}
        </div>

        <div className="flex items-center mb-4">
          <MapPin className="h-5 w-5 text-gray-600" />
          <span className="ml-2 text-gray-600">{address}, {city}, {state}</span>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <Clock className="h-5 w-5 text-gray-600 inline" />
          <span className="ml-2">Hours:</span>
          <ul className="mt-2">
            {Object.keys(hours).map(day => (
              <li key={day}>
                {day}: {hours[day]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
