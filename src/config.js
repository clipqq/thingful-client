export default {
  API_ENDPOINT: 'http://localhost:8000/api',
  TOKEN_KEY: 'thingful-client-auth-token',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '20s',
}
