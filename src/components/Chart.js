import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ThemeProvider, createTheme } from "@mui/material/styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Chart(props) {
  const propsLabel = props.label;

  const name = props.name;

  const labels = [];

  const mydata = [];

  propsLabel.map((singleLabel) => {
    labels.push(
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(Number(singleLabel[0]))
    );
    mydata.push(singleLabel[1]);
  });

  // console.log(labels)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: name.toUpperCase(),
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Price in $",
        data: mydata,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ width: "60%", margin: "25px" }}>
        <Line options={options} data={data} />
      </div>
    </ThemeProvider>
  );
}
