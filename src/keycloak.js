import Keycloak from 'keycloak-js';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const VITE_APP_KEYCLOAK_URL = import.meta.env.VITE_APP_KEYCLOAK_URL;

const keycloak = new Keycloak({
  url: VITE_APP_KEYCLOAK_URL, // Your Keycloak server URL
  realm: 'nextmeal',           // Your Keycloak realm name
  clientId: 'nextmeal-client', // Your Keycloak client ID
});

// Initialize Keycloak

keycloak
  .init({
    onLoad: 'login-required',
    scope: 'openid profile email',
    checkLoginIframe: false,
    redirectUri: REDIRECT_URI,
  })
  .then((authenticated) => {
    if (authenticated) {
      console.log('Keycloak authenticated successfully');
      const user = {
        user_id: keycloak.tokenParsed.sub, // Keycloak User ID
        name: keycloak.tokenParsed.name || 'Anonymous',
        email: keycloak.tokenParsed.email,
      };

      // Send user data to your backend
      fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${keycloak.token}`,
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => console.log('User saved:', data))
        .catch((err) => console.error('Error saving user:', err));
    } else {
      console.error('Keycloak authentication failed');
    }
  })
  .catch((err) => {
    console.error('Keycloak initialization failed:', err);
  });


export default keycloak;
