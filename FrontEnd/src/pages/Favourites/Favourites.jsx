import React, { useContext, useState } from "react";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import "../Properties/Properties.css";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import UserDetailsContext from "../../context/UserDetailsContext";
import SearchBar from "../../components/SearchBar/SearchBar";

const Favourites = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const {
    userDetails: { favourites },
  } = useContext(UserDetailsContext);

  if (isError) {
    return <div className="wrapper">Error while fetching data</div>;
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader color="#4066ff" />
      </div>
    );
  }

  const favouritesIds = new Set(favourites);
  const filteredProperties = data
    .filter((property) => favouritesIds.has(property._id))
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

export default Favourites;
