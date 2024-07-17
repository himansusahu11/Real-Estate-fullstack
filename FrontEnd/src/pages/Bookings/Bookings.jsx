import React, { useContext, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import UserDetailsContext from "../../context/UserDetailsContext";
import { PuffLoader } from "react-spinners";
import "../Properties/Properties.css";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

const Bookings = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const {
    userDetails: { bookings },
  } = useContext(UserDetailsContext);
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  const bookingIds = new Set(bookings.map((booking) => booking.id));

  // Filter properties based on booking IDs and log the filtered properties
  const filteredProperties = data
    .filter((property) => {
      const hasBooking = bookingIds.has(property._id);
      return hasBooking;
    })
    .filter(
      (property) =>
        property.title.toLowerCase().includes(filter.toLowerCase()) ||
        property.city.toLowerCase().includes(filter.toLowerCase()) ||
        property.country.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter properties">
          {filteredProperties.map((card) => (
            <PropertyCard card={card} key={card._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
