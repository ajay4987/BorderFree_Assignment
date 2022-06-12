import React from "react";
import Products from "./Products";
import Slider from "../Components/Carousel/Slider";

const Home = () => {
  return (
    <div className="hero">
      <Slider />
      <Products />
    </div>
  );
};

export default Home;
