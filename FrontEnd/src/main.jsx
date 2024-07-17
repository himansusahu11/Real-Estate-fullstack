import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-1qfrkiz24e8fuzgy.us.auth0.com"
      clientId="Tf6Tzcj6eThOEQdRLXea71LINslsE52a"
      authorizationParams={{
        redirect_uri: "http://localhost:5173",
      }}
      audience="http://localhost:3000"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
