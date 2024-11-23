import React from 'react';
import keycloak from '../../keycloak';

const LoginPage = () => {
  const handleLogin = () => {
    keycloak.login({
      redirectUri: 'http://localhost:5173', // Redirect back to your app after login
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Keycloak</button>
    </div>
  );
};

export default LoginPage;
