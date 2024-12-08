import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import keycloak from './keycloak'; // Import Keycloak
import Layout from './components/layouts/Layout';
import HomePage from './pages/Home';
import LoginPage from './pages/Auth/Login';
import ProfilePage from './pages/Profile';
import ChatPage from './pages/Chat';
import SignupPage from './pages/Auth/SignUp';
import RestaurantDetailsPage from './pages/RestaurantDetails/RestaurantDetailsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* <Route path="login" element={<LoginPage />} /> */}
        <Route path="restaurant/:business_id" element={<RestaurantDetailsPage />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="Signup"
          element={
            <ProtectedRoute>
              <SignupPage/>
            </ProtectedRoute>
          }
        /> */}
      </Route>
    </Routes>
  );
};

export default App;
