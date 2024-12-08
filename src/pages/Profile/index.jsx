import React, { useState, useEffect } from 'react';
import keycloak from '../../keycloak'; // Your Keycloak instance

// Environment variables:
// VITE_RESERVATION_VIEW_API_URL for fetching reservations
// VITE_RESERVATION_API_URL for sending reservation requests (e.g., reserve/cancel)
const VITE_RESERVATION_VIEW_API_URL = import.meta.env.VITE_RESERVATION_VIEW_API_URL;
const VITE_RESERVATION_API_URL = import.meta.env.VITE_RESERVATION_API_URL;

const Profile = () => {
  const user = keycloak.tokenParsed;
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch reservations once user is available
  useEffect(() => {
    if (user?.sub) {
      fetch(`${VITE_RESERVATION_VIEW_API_URL}/${user.sub}`)
        .then(response => response.json())
        .then(data => {
          setReservations(Array.isArray(data) ? data : []);
        })
        .catch(error => console.error('Error fetching reservations:', error));
    }
  }, [user]);

  // Logout function
  const handleLogout = () => {
    keycloak.logout();
    localStorage.removeItem('token'); // optional if you store the token locally
    window.location.href = keycloak.createLogoutUrl();
  };

  // Cancel a reservation
  const handleCancelReservation = async (reservation) => {
    if (!user?.sub) {
      setMessage("User is not logged in.");
      return;
    }

    const payload = {
      userId: user.sub,
      restaurantId: reservation.restaurantId,
      numOfPeople: reservation.numberOfPeople, // Ensure numberOfPeople matches the backend field
      slot: reservation.slot,
      requestType: "CANCEL"
    };

    try {
      const response = await fetch(VITE_RESERVATION_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization header if required by your backend:
          // Authorization: `Bearer ${keycloak.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to cancel the reservation.");
      }

      // Assuming the response is text-based
      await response.text();
      setMessage("Reservation canceled successfully!");

      // Refresh reservations after cancellation
      const newResponse = await fetch(`${VITE_RESERVATION_VIEW_API_URL}/${user.sub}`);
      const newData = await newResponse.json();
      setReservations(Array.isArray(newData) ? newData : []);

    } catch (error) {
      console.error("Error canceling reservation:", error);
      setMessage(error.message);
    }
  };

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 p-2 rounded mb-4">
          {message}
        </div>
      )}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">User ID:</label>
          <p className="text-gray-900">{user.sub}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <p className="text-gray-900">{user.name || 'N/A'}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <p className="text-gray-900">{user.email || 'N/A'}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Reservations Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Your Booked Reservations</h2>
        {reservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          <ul className="space-y-4">
            {reservations.map((reservation, index) => (
              <li key={index} className="border p-4 rounded-lg">
                <p className="mb-2">
                  <span className="font-bold">Restaurant Name:</span> {reservation.restaurantName || 'N/A'}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Number of People:</span> {reservation.numberOfPeople || 'N/A'}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Slot:</span>{' '}
                  {reservation.slot ? new Date(reservation.slot).toLocaleString() : 'N/A'}
                </p>
                <button
                  onClick={() => handleCancelReservation(reservation)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
