import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Residencies.css";
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../PropertyCard/PropertyCard";
import { PuffLoader } from "react-spinners";
import useProperties from "../../hooks/useProperties";
// import data from "../../utils/slider.json";

const Residencies = () => {
  const { data, isError, isLoading } = useProperties();
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
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>

        <Swiper {...sliderSettings}>
          <SliderButtions />
          {data.slice(0, 8).map((card, i) => {
            return (
              <SwiperSlide key={i}>
                <PropertyCard card={card} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Residencies;

const SliderButtions = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-button">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
