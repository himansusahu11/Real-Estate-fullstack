import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailsContext from "../../context/UserDetailsContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import useFavourites from "../../hooks/useFavourites";
import useBookings from "../../hooks/UseBookings";

const Layout = () => {
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailsContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });
  useFavourites();
  useBookings();
  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        const res = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "http://localhost:3000", // This should match the API Identifier in Auth0
            scope: "openid profile email",
          },
        });

        localStorage.setItem("access_token", res);
        setUserDetails((prev) => ({ ...prev, token: res }));

        mutate(res);
      } catch (error) {
        console.error("Error getting access token:", error);
      }
    };

    if (isAuthenticated) {
      getTokenAndRegister();
    }
  }, [isAuthenticated]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
