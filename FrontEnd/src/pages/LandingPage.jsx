import React from "react";
import Hero from "../components/Hero/Hero";
import { SliderData } from "../utils/sliderData";
import AboutUs from "../components/AboutUs/AboutUs";
import Residencies from "../components/Residencies/Residencies";
import Value from "../components/Value/Value";
import Services from "../components/Services/Services";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
const LandingPage = () => {
  return (
    <div className="app">
      <Hero slides={SliderData} />
      <AboutUs />
      <Residencies />
      <Value />
      <Services />
    </div>
  );
};

export default LandingPage;
