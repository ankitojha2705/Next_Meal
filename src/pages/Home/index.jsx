import React, { useState, useEffect } from "react";
import { Search, Star, Heart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
const VITE_RESTAURANT_BASE_URL = import.meta.env.VITE_RESTAURANT_BASE_URL;
const S3_BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;
const AWS_REGION = import.meta.env.VITE_AWS_REGION;

const RestaurantCard = ({ restaurant }) => {
  const { business_id, name, average_rating, price, review_count, categories, distance, image } = restaurant;

  // S3 base URL
  const S3_BASE_URL = `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/photos/`;

  // Construct the image URL from S3
  const imageUrl = image ? `${S3_BASE_URL}${image}.jpg` : "/api/placeholder/400/300?text=Restaurant+Image";
  console.log("Constructed Image URL:", imageUrl);

  // Calculate filled and empty stars
  const filledStars = Math.floor(average_rating);
  const emptyStars = 5 - filledStars;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative">
        <Link to={`/restaurant/${business_id}`} className="block">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </Link>
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
          <div className="flex">
            {[...Array(filledStars)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-blue-500 fill-current" />
            ))}
            {[...Array(emptyStars)].map((_, i) => (
              <Star key={i + filledStars} className="h-6 w-6 text-gray-300" />
            ))}
          </div>

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
      </div>
    </div>
  );
};


const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: '',
    city: '',
    state: '',
    min_rating: 0,
    max_rating: 5,
  });

  const [showFilter, setShowFilter] = useState(false);

  // Fetch restaurants data based on filters
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(filters).toString();
      try {
        const response = await fetch(`${VITE_RESTAURANT_BASE_URL}/restaurants?${queryParams}`);
        const data = await response.json();
        setRestaurants(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [filters]);  // Only re-run the effect when filters change

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleFilter = () => setShowFilter(!showFilter);

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
                      name="name"
                      value={filters.name}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>

                {/* Filter Button */}
                <div className="relative">
                  <button
                    onClick={toggleFilter}
                    className="h-14 px-8 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
                  >
                    <span>Filters</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Filter Dropdown */}
                  {showFilter && (
                    <div className="absolute top-full right-0 bg-white shadow-lg rounded-lg mt-2 w-64 p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium">City</label>
                          <input
                            type="text"
                            name="city"
                            value={filters.city}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter city"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">State</label>
                          <input
                            type="text"
                            name="state"
                            value={filters.state}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter state"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Min Rating</label>
                          <select
                            name="min_rating"
                            value={filters.min_rating}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Max Rating</label>
                          <select
                            name="max_rating"
                            value={filters.max_rating}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                            <option value="0">0</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
            <Link to={`/restaurant/${restaurant.business_id}`} key={restaurant.business_id}>
              <RestaurantCard restaurant={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
