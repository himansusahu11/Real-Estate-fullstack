import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allResidencies", {
      timeout: 10 * 100,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("somthing went wrong");
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 100,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("somthing went wrong");
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    const response = await api.post(
      "/users/register",
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/users/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/users/removeBookings/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const addToFeb = async (id, email, token) => {
  try {
    await api.post(
      `/users/addFev/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getAllFev = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/users/allFev`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data["favResidencies"];
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};
export const getAllBookings = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/users/allBookings`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res);
    return res.data["bookings"];
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};
export const createResidency = async (data, token) => {
  console.log(data);
  if (!token) return;
  try {
    const res = await api.post(
      `/residency/create`,
      { data },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};
