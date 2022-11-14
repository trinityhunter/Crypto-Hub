import React from "react";
import Data from "../api/Data";
import MainCarousel from "../components/MainCarousel";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <MainCarousel />
      <Data />
    </div>
  );
};

export default Home;
