const { auth } = require("express-oauth2-jwt-bearer");

const jwtCheck = auth({
  audience: "http://localhost:3000",
  issuerBaseURL: "https://dev-1qfrkiz24e8fuzgy.us.auth0.com",
  tokenSigningAlg: "RS256",
});

module.exports = jwtCheck;
