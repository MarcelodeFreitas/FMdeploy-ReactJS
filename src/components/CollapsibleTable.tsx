import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./CollapsibleTable.css";

function Row(props: { row: any }) {
  const { row } = props;
  console.log("ROW:", row);
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {" "}
          {row.title}{" "}
        </TableCell>
        <TableCell align="right">{row.input_file_name}</TableCell>
        <TableCell align="right">
          {row.output_file_name ? row.output_file_name : "No file available"}
        </TableCell>
        <TableCell align="right">
          {new Date(row.timestamp).toLocaleString("pt-PT", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props: { historyList: any[] }) {
  const rows = props.historyList;
  console.log("ROWS:", rows);
  console.log("PROPS:", props);
  return (
    <>
      {rows ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead
              sx={{
                maxHeight: 400,
                "& .MuiTableCell-head": {
                  backgroundColor: "#0385B0",
                  color: "#FFFFFF",
                  position: "sticky",
                  top: 0,
                },
              }}
            >
              <TableRow>
                <TableCell>Flag</TableCell>
                <TableCell>Project</TableCell>
                <TableCell align="right">Input</TableCell>
                <TableCell align="right">Output</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.run_history_id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>no content</div>
      )}
    </>
  );
}
