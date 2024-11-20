// src/pages/Profile/index.jsx

import React from 'react';
import { User, Star, Clock, MapPin } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = React.useState('favorites');

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(123) 456-7890',
    joined: 'January 2024',
    favorites: [],
    reviews: [],
    orders: []
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center">
          <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-gray-400" />
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">Member since {user.joined}</p>
          </div>
          <button className="ml-auto px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['favorites', 'reviews', 'orders', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab 
                  ? 'border-red-500 text-red-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeTab === 'favorites' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Favorite Restaurants</h2>
            {/* Add favorite restaurants list */}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Your Reviews</h2>
            {/* Add reviews list */}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Order History</h2>
            {/* Add orders list */}
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
            {/* Add settings form */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;