import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Services.css";
import { FaHotel } from "react-icons/fa6";
import { MdOutlineRestaurant } from "react-icons/md";
import { FaSpa } from "react-icons/fa";
import { FaSwimmer } from "react-icons/fa";
import { PiWineFill } from "react-icons/pi";
import { CgGym } from "react-icons/cg";

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  return (
    <section className="s-wrapper">
      <div className="paddings innerWidth s-container">
        <div className="headings">
          <span className="orangeText">OUR SERVICES</span>
          <span className="primaryText">
            Explore our{" "}
            <span
              className="orangeText"
              style={{ fontSize: "2rem", fontWeight: "bold" }}
            >
              SERVICES
            </span>
          </span>
        </div>
        <div className="services">
          <div className="services-card" data-aos="fade-up">
            <div className="s-icon">
              <FaHotel />
            </div>
            <h5 className="primaryText">Rooms & Appartment</h5>
            <p>
              Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
              sed diam stet diam sed stet lorem.
            </p>
          </div>
          <div
            className="services-card"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="s-icon">
              <MdOutlineRestaurant />
            </div>
            <h5 className="primaryText">Food & Restaurant</h5>
            <p>
              Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
              sed diam stet diam sed stet lorem.
            </p>
          </div>
          <div
            className="services-card"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="s-icon">
              <FaSpa />
            </div>
            <h5 className="primaryText">Spa & Fitness</h5>
            <p>
              Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
              sed diam stet diam sed stet lorem.
            </p>
          </div>
          <div
            className="services-card"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="s-icon">
              <FaSwimmer />
            </div>
            <h5 className="primaryText">Sports & Gaming</h5>
            <p>
              Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
              sed diam stet diam sed stet lorem.
            </p>
          </div>
          <div
            className="services-card"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="s-icon">
              <PiWineFill />
            </div>
            <h5 className="primaryText">Event & Party</h5>
            <p>
              Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
              sed diam stet diam sed stet lorem.
            </p>
          </div>
          <div
            className="services-card"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="s-icon">
              <CgGym />
            </div>
            <h5 className="primaryText">GYM & Yoga</h5>
            <p>
              Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
              sed diam stet diam sed stet lorem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
