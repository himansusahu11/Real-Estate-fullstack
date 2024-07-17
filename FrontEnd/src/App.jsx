import "./App.css";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, useState } from "react";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";
import UserDetailsContext from "./context/UserDetailsContext";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider
import Properties from "./pages/Properties/Properties";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favourites/Favourites";

function App() {
  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  return (
    <div>
      <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            {" "}
            {/* Wrap the app with MantineProvider */}
            <BrowserRouter>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/properties">
                      <Route index element={<Properties />} />
                      <Route path=":propertyId" element={<Property />} />
                    </Route>
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/favourites" element={<Favourites />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
            <ToastContainer />
          </MantineProvider>{" "}
          {/* End of MantineProvider */}
        </QueryClientProvider>
      </UserDetailsContext.Provider>
    </div>
  );
}

export default App;
