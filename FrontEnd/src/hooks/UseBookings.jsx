import { useContext, useEffect, useRef } from "react";
import UserDetailsContext from "../context/UserDetailsContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllBookings } from "../utils/api";

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const { user } = useAuth0();
  const queryRef = useRef();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allBookings", user?.email],
    queryFn: () => getAllBookings(user?.email, userDetails?.token),
    onSuccess: (data) => {
      setUserDetails((prev) => ({ ...prev, bookings: data || [] }));
    },
    enabled: !!user,
    staleTime: 30000,
  });

  queryRef.current = refetch;

  useEffect(() => {
    if (userDetails?.token) {
      console.log("Fetching bookings with token:", userDetails.token);
      queryRef.current && queryRef.current();
    }
  }, [userDetails?.token]);

  return { data, isLoading, isError, refetch };
};

export default useBookings;
