import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function TableComponent(props) {
  const [search, setSearch] = useState("");

  // console.log(props.allData);

  const rows = props.allData;

  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          backgroundImage: "linear-gradient(90deg, #EE4D5F 0%, #FFCDA5 100%)",
          paddingTop: "5px",
        }}
      >
        <h1 style={{ color: "#003060" }}>
          CryptoCurrency Ranked by Market Cap
        </h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{
            color: "black",
            paddingLeft: "15px",
            fontSize: "20px",
            width: "750px",
            height: "50px",
            margin: "20px",
            borderRadius: "50px",
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: "150px", margin: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#003060" }}>
              <TableCell>Rank</TableCell>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Symbol</TableCell>
              <TableCell align="right">Market Cap Change % in 24h</TableCell>
              <TableCell align="right">Current Price ($)</TableCell>
              <TableCell align="right">Market Cap ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .filter((val) => {
                return val.name.toLowerCase().includes(search.toLowerCase());
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    backgroundColor: "#E1E2E2",
                    ":hover": {
                      backgroundImage:
                        "linear-gradient(90deg, #EE4D5F 0%, #FFCDA5 100%)",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => navigate(`/${row.id}`)}
                >
                  <TableCell
                    sx={{ fontSize: "20px", color: "#2568FB", gap: 150 }}
                  >
                    {row.market_cap_rank}
                  </TableCell>
                  <TableCell>
                    <img
                      src={row.image}
                      height="50"
                      alt={row.symbol}
                      role="presentation"
                    />
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "20px", color: "#003060", gap: 150 }}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "20px",
                      color: "#003060",
                      textTransform: "uppercase",
                    }}
                    align="right"
                  >
                    {row.symbol}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "20px",
                      color:
                        row.market_cap_change_percentage_24h > 0
                          ? "green"
                          : "red",
                    }}
                    align="right"
                  >
                    {row.market_cap_change_percentage_24h} %
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "20px", color: "#003060" }}
                    align="right"
                  >
                    $ {row.current_price}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "20px", color: "#003060" }}
                    align="right"
                  >
                    $ {row.market_cap}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </ThemeProvider>
  );
}

export default TableComponent;
