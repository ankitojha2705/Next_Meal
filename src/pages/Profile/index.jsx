import React, { useState, useEffect } from 'react';
import keycloak from '../../keycloak'; // Your Keycloak instance

const Profile = () => {
  const user = keycloak.tokenParsed;
  const [reservations, setReservations] = useState([]);

  // Fetch reservations on mount if user is available
  useEffect(() => {
    if (user?.sub) {
      fetch(`http://18.144.125.88:8081/api/v1/reservations/view/${user.sub}`)
        .then(response => response.json())
        .then(data => {
          // Ensure data is an array before setting it
          setReservations(Array.isArray(data) ? data : []);
        })
        .catch(error => console.error('Error fetching reservations:', error));
    }
  }, [user]);

  // Logout function
  const handleLogout = () => {
    keycloak.logout();
    localStorage.removeItem('token'); // optional if you store token locally
    window.location.href = keycloak.createLogoutUrl(); // redirect to Keycloak logout URL
  };

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
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
                <p>
                  <span className="font-bold">Slot:</span>{' '}
                  {reservation.slot ? new Date(reservation.slot).toLocaleString() : 'N/A'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
