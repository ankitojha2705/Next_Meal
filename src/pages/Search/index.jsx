import React, { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';

const SearchPage = () => {
  const [activeFilters, setActiveFilters] = useState({
    price: [],
    cuisine: [],
    rating: null
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            {/* Filter options */}
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search restaurants..."
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Results grid would go here */}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;