import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import backgroundImage from "../assets/pexels-tara-winstead-8386440.jpg";
import { useNavigate } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const responsive = {
  0: {
    items: 2,
  },
  512: {
    items: 5,
  },
};

const MainCarousel = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc`
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const items = [];
  data.map((coin) =>
    items.push(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }}
      >
        <img
          src={coin.image}
          height="80"
          alt={coin.symbol}
          onDragStart={handleDragStart}
          role="presentation"
          onClick={() => navigate(`/${coin.id}`)}
        />
        <span style={{ margin: "20px", fontSize: "30px", fontWeight: "Bold" }}>
          {coin.symbol}
        </span>
        <span
          style={{
            color: coin.market_cap_change_percentage_24h > 0 ? "green" : "red",
            fontSize: "30px",
            fontWeight: "Bold",
          }}
        >
          {coin.market_cap_change_percentage_24h} %
        </span>
        <span style={{ margin: "20px", fontSize: "30px", fontWeight: "Bold" }}>
          $ {coin.current_price}
        </span>
      </div>
    )
  );

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "1300px 600px",
          paddingTop: "30px",
          paddingBottom: "0px",
        }}
      >
        <h1 style={{ color: "white" }}>CRYPTO-HUB</h1>
        <AliceCarousel
          responsive={responsive}
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          infinite
          autoPlay
          mouseTracking
          items={items}
        />
      </div>
    </>
  );
};

export default MainCarousel;
