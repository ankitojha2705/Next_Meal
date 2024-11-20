import React from 'react';
import { Search, Star, Clock, Heart } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{restaurant.name}</h3>
          <span className="text-sm text-gray-600">{restaurant.price}</span>
        </div>
        
        <div className="flex items-center mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(restaurant.rating) ? 'text-red-500 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({restaurant.reviewCount})</span>
        </div>
        
        <div className="mt-2 text-sm text-gray-600">
          {restaurant.cuisine} • {restaurant.distance}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const restaurants = [
    {
      id: 1,
      name: "Giovanni's Italian",
      rating: 4.8,
      reviewCount: 847,
      price: "$$$",
      cuisine: "Italian",
      image: "/api/placeholder/400/300?text=Italian+Restaurant",
      distance: "0.8 miles"
    },
    // Add more restaurants...
  ];

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