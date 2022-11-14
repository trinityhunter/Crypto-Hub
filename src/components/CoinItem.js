import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function CoinItem(props) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Card sx={{ maxWidth: 445 }}>
        <CardActionArea>
          <img src={`${props.img}`} alt={`${props.name}`} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Symbol: {props.symbol}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Rank: {props.rank}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Current Price: $ {props.price}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Market Cap: $ {props.marketCap}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}
