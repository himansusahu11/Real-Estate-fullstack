import React, { useEffect, useRef, useState } from "react";
import "./AboutUs.css";
import CountUp from "react-countup";
import aImg1 from "../../assets/a-img1.jpg";
import aImg2 from "../../assets/a-img2.jpg";
import aImg3 from "../../assets/a-img3.jpg";
import aImg4 from "../../assets/a-img4.jpg";
import { LiaHotelSolid } from "react-icons/lia";
import { FaPeopleCarry } from "react-icons/fa";
import { FaPeopleRoof } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({
    rooms: false,
    staffs: false,
    clients: false,
  });

  const statsRef = useRef({
    rooms: null,
    staffs: null,
    clients: null,
  });

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            setIsVisible((prevState) => ({ ...prevState, [id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(statsRef.current).forEach((stat) => {
      if (stat) observer.observe(stat);
    });

    return () => {
      Object.values(statsRef.current).forEach((stat) => {
        if (stat) observer.unobserve(stat);
      });
    };
  }, []);

  return (
    <section className="a-wrapper">
      <div className="paddings innerWidth about-container">
        {/* left side */}
        <div className="a-left">
          <span className="orangeText">About Us</span>
          <span className="primaryText">Welcome to HOTELIER</span>
          <span className="secondaryText">
            We always ready to help by providing the best service for you. We
            believe a good place to live can make your life better
          </span>

          <div className="stats">
            <div
              className="flexColCenter stat"
              ref={(el) => (statsRef.current.rooms = el)}
              data-id="rooms"
            >
              <LiaHotelSolid style={{ fontSize: "3rem", color: "orange" }} />
              <span>
                {isVisible.rooms && (
                  <CountUp start={8800} end={9000} duration={6} />
                )}
              </span>
              <span className="secondaryText">Rooms</span>
            </div>
            <div
              className="flexColCenter stat"
              ref={(el) => (statsRef.current.staffs = el)}
              data-id="staffs"
            >
              <FaPeopleCarry style={{ fontSize: "3rem", color: "orange" }} />
              <span>
                {isVisible.staffs && (
                  <CountUp start={1950} end={2000} duration={6} />
                )}
              </span>
              <span className="secondaryText">Staffs</span>
            </div>

            <div
              className="flexColCenter stat"
              ref={(el) => (statsRef.current.clients = el)}
              data-id="clients"
            >
              <FaPeopleRoof style={{ fontSize: "3rem", color: "orange" }} />
              <span>
                {isVisible.clients && <CountUp end={28} duration={4} />}
              </span>
              <span className="secondaryText">Clients</span>
            </div>
          </div>
          <button className="button a-btn">EXPLORE MORE</button>
        </div>
        <div className="a-right">
          <img
            height={224}
            width={224}
            src={aImg1}
            alt="Image 1"
            className="zoom-in-img"
            data-aos="zoom-in"
            style={{ marginTop: "auto" }}
          />
          <img
            height={298}
            width={298}
            src={aImg2}
            alt="Image 2"
            className="zoom-in-img"
            data-aos="zoom-in"
            data-aos-delay="100"
          />
          <img
            height={149}
            width={149}
            src={aImg3}
            alt="Image 3"
            className="zoom-in-img"
            data-aos="zoom-in"
            data-aos-delay="200"
            style={{ marginLeft: "auto" }}
          />
          <img
            height={224}
            width={224}
            src={aImg4}
            alt="Image 4"
            className="zoom-in-img"
            data-aos="zoom-in"
            data-aos-delay="300"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
