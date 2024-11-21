import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080', // Update this based on your Keycloak URL
  realm: 'nextmeal',                // Your Keycloak realm name
  clientId: 'nextmeal-client',      // Your Keycloak client ID
});

export default keycloak;
