import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            NextMeal
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search" className="text-gray-600 hover:text-gray-900">
              Search
            </Link>
            {/* <Link to="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link> */}
            <Link 
              to="/signup"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              Sign Up
            </Link>
          </div>

          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;