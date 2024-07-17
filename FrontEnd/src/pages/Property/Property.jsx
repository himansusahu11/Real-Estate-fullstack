import React, { useContext, useEffect, useState } from "react";
import "./Property.css";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";

import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import { Button, MantineProvider } from "@mantine/core";
import UserDetailsContext from "../../context/UserDetailsContext";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const { data, isLoading, isError, error } = useQuery(["residency", id], () =>
    getProperty(id)
  );

  const [modelOpened, setModelOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailsContext);

  const { mutate: cancleBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));
      toast.success("Booking canceled", { position: "bottom-right" });
    },
  });

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetch data</span>
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

  return (
    <div className="p-wrapper">
      <div className="paddings innerWidth property-container">
        {/* like button  */}
        <div className="like">
          <Heart id={id} />
        </div>

        {/* image  */}
        <img src={data?.image} alt="home image" />

        <div className=" property-details">
          {/* left  */}
          <div className=" left">
            {/* head  */}
            <div className=" head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                ${data?.price}
              </span>
            </div>

            {/* facilities  */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>

              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities?.parkings} Parkings</span>
              </div>

              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.bedrooms} Bedrooms</span>
              </div>
            </div>

            {/* description  */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address  */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} color="#1F3E72" />
              <span className="secondaryText">
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>

            {/* booking button  */}
            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancleBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel Booking</span>
                </Button>
                <span>
                  Your visit already booked for date{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>
            ) : (
              <Button
                variant="filled"
                w={"100%"}
                onClick={() => {
                  validateLogin() && setModelOpened(true);
                }}
              >
                Book your visit
              </Button>
            )}

            <MantineProvider withGlobalStyles withNormalizeCSS>
              <BookingModal
                opened={modelOpened}
                setOpened={setModelOpened}
                propertyId={id}
                email={user?.email}
              />
            </MantineProvider>
          </div>
          {/* right side  */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
