import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080', // Your Keycloak server URL
  realm: 'nextmeal',           // Your Keycloak realm name
  clientId: 'nextmeal-client', // Your Keycloak client ID
});

// keycloak.init({
//   onLoad: "login-required",    // Login is required immediately
//   checkLoginIframe: false,     // Disable iframe for token refresh (optional)
//   redirectUri: "http://localhost:5173", // Replace with your app's URL
//   flow: "standard",            // OAuth flow (default is standard)
//   pkceMethod: "S256",          // Use PKCE for secure authentication
// });

keycloak
  .init({
    onLoad: 'login-required',
    scope: 'openid profile email',
    checkLoginIframe: false,
    redirectUri: 'http://localhost:5173',
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
      fetch('http://localhost:3001/api/users', {
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
