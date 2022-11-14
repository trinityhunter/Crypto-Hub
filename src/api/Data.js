import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TableComponent from "../components/TableComponent";

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return <div>{data !== [] ? <TableComponent allData={data} /> : ""}</div>;
};

export default Data;
