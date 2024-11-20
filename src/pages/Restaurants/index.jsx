import React from 'react';
import { Star, MapPin, Clock, Phone, Share2, Heart } from 'lucide-react';

const RestaurantPage = () => {
  const restaurant = {
    name: "Giovanni's Italian",
    rating: 4.8,
    reviewCount: 847,
    price: "$$$",
    cuisine: "Italian",
    images: [
      "/api/placeholder/800/400?text=Restaurant+Front",
      "/api/placeholder/800/400?text=Interior",
      "/api/placeholder/800/400?text=Food"
    ],
    address: "123 Main St, San Francisco, CA",
    phone: "(415) 555-0123",
    hours: "11:00 AM - 10:00 PM"
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <div className="relative h-96">
        <img
          src={restaurant.images[0]}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Restaurant Info */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">{restaurant.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(restaurant.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {restaurant.rating} ({restaurant.reviewCount} reviews)
              </span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md">
              <Heart className="h-5 w-5 mr-2" />
              Save
            </button>
          </div>
        </div>

        {/* Additional restaurant details would go here */}
      </div>
    </div>
  );
};

export default RestaurantPage;