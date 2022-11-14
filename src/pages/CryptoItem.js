import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Chart } from "../components/Chart";
import parse from "html-react-parser";
import CoinItem from "../components/CoinItem";
import Navbar from "../components/Navbar";

const CryptoItem = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const [coinData, setCoinData] = useState();

  const [prices, setPrices] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=99`
      )
      .then((res) => {
        setData(res.data);
        setPrices(res.data.prices);
      });

    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then((res) => {
      // console.log(res.data);
      setCoinData(res.data);
    });
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        width: "auto",
        height: "830px",
        backgroundColor: "black",
      }}
    >
      <Navbar />

      <h1 style={{ color: "rgb(255, 99, 132)" }}>{coinData?.name}</h1>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 25,
          }}
        >
          {coinData !== undefined ? (
            <CoinItem
              img={coinData?.image.large}
              name={coinData?.name}
              symbol={coinData?.symbol}
              rank={coinData?.market_cap_rank}
              price={coinData?.market_data.current_price.usd}
              marketCap={coinData?.market_data.market_cap.usd}
              description={parse(coinData?.description.en.split(". ")[0])}
            />
          ) : (
            ""
          )}
        </div>

        {prices.length > 0 ? <Chart name={id} label={prices} /> : ""}
      </div>
    </div>
  );
};

export default CryptoItem;
