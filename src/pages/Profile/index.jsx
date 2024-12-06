import React from 'react';
import keycloak from '../../keycloak'; // Assuming this is your Keycloak instance

const Profile = () => {
  // Fetch user details directly from Keycloak
  const user = keycloak.tokenParsed;
  // console.log('User:', user);

  // Logout function
  const handleLogout = () => {
    keycloak.logout();
    localStorage.removeItem('token'); // Optional: if you store additional tokens in local storage
    window.location.href = keycloak.createLogoutUrl(); // Redirect to Keycloak logout URL
  };

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
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
    </div>
  );
};

export default Profile;
