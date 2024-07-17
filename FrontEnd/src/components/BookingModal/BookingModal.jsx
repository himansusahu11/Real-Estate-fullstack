import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React, { useContext, useState } from "react";
import "@mantine/dates/styles.css";
import "./BookingModal.css";
import { useMutation } from "react-query";
import UserDetailsContext from "../../context/UserDetailsContext";
import { bookVisit } from "../../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, propertyId, email }) => {
  const [value, setValue] = useState(null);

  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailsContext);

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit successfully", {
      position: "bottom-right",
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ resp }) => toast.error(resp.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="select your date of visit"
      centered
    >
      <div className="b-modal">
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book Visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
