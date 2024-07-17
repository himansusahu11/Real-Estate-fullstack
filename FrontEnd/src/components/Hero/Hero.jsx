import React, { useEffect, useState, useRef } from "react";
import "./Hero.css";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const timeout = useRef(null);

  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    const nextSlide = () => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    };

    timeout.current = setTimeout(nextSlide, 3000);

    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length]);

  const nextSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="hero-section">
      <div className="hero-wrapper">
        {slides.map((slide, index) => {
          return (
            <div className="hero-slide" key={index}>
              {index === current && (
                <div className="hero-slider">
                  <img
                    className="hero-image"
                    src={slide.Image}
                    alt={slide.alt}
                  />
                  <div className="hero-content" data-aos="fade-up">
                    {index === 0 && (
                      <>
                        <h1 className="from-left">
                          Tropical Winds Resort Hotel
                        </h1>
                        <p className="from-right">
                          This Daytona Beach hotel is situated on the <br />
                          Atlantic coast and offers direct beach access.
                          <br /> It boasts a heated indoor and outdoor pool, and
                          <br />
                          offers rooms with a private balcony.
                        </p>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <h1>Master Suite</h1>
                        <p>
                          These rooms offer a cozy and rustic <br />
                          accommodation option for travelers <br />
                          looking to experience the great outdoors
                        </p>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <h1>Beach House Inn</h1>
                        <p>
                          This Daytona hotel is 1.6 km from the Daytona Beach{" "}
                          <br />
                          International Airport and 6.4 km from Daytona Beach.{" "}
                          <br />
                          Guests will enjoy free WiFi, an outdoor pool, and{" "}
                          <br />
                          rooms with a fully equipped kitchen.
                        </p>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <h1 className="from-left">
                          RECONNECT WITH <br /> NATURE
                        </h1>
                        <p className="from-right">
                          An hour and a half drive from Ngurah Rai International
                          <br />
                          Airport is all it takes to get you to this holiday
                          haven. <br /> Samsara Ubud is all about luxury
                          aesthetics and is the <br /> perfect sanctuary with a
                          soul.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div className="slider-btn">
          <div className="prev-arrow">
            <IoArrowBack onClick={prevSlide} />
          </div>
          <div className="next-arrow">
            <IoArrowForward onClick={nextSlide} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
