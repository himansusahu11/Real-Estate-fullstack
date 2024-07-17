import { useContext, useEffect, useRef } from "react";
import UserDetailsContext from "../context/UserDetailsContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFev } from "../utils/api";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const { user } = useAuth0();
  const queryRef = useRef();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allFavourites", user?.email],
    queryFn: () => getAllFev(user?.email, userDetails?.token),
    onSuccess: (data) => {
      setUserDetails((prev) => ({ ...prev, favourites: data || [] }));
    },
    enabled: !!user,
    staleTime: 30000,
  });

  queryRef.current = refetch;

  useEffect(() => {
    if (userDetails?.token) {
      queryRef.current && queryRef.current();
    }
  }, [userDetails?.token]);

  return { data, isLoading, isError, refetch };
};

export default useFavourites;
