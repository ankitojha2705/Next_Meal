import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import RestaurantDetailsPage from './pages/RestaurantDetails/RestaurantDetailsPage'; // Import the new page
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/SignUp';
import ProfilePage from './pages/Profile';
import ChatPage from './pages/Chat';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        {/* Change this route to RestaurantDetailsPage */}
        <Route path="restaurant/:restaurantId" element={<RestaurantDetailsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
};

export default App;
