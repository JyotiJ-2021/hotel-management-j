import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NavBar from "./Navbar";
import { Container,IconButton,Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CardModal from "./CardModal";

export default function History() {
  const [reserveList, setReserveList] = useState(JSON.parse(localStorage.getItem("reserve")) || []);
  const [edit, setEdit] = useState(false)
  const [hotelInfo, setHotelInfo] = useState()
  const handleDelete = (value) => {
    const result = JSON.parse(localStorage.getItem("reserve"));
     if (
      result !== null &&
      result !== undefined &&
      result !== "" &&
      result.length > 0
    ) {
      result.splice(value, 1);
      setReserveList(result)
      JSON.parse(localStorage.setItem("reserve", JSON.stringify(result)));
       
    }
    //getting undefined
  };

  const handleEdit=(data)=>{
 setEdit(true)
setHotelInfo(data)
  }

  return (
    <>
      <Container sx={{ marginTop: 15 }}>
      <Typography
        variant="h4"
        sx={{ fontSize: "22px", fontWeight: "600", marginBottom: "20px" }}
      >
       Booking History
      </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Hotel Name</TableCell>
                <TableCell align="right">Hotel Address</TableCell>
                <TableCell align="right">Checking In</TableCell>
                <TableCell align="right">check out</TableCell>

                <TableCell align="right">Total Guest</TableCell>
                <TableCell align="right">Total Prize</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reserveList.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row[0].name}
                  </TableCell>
                  <TableCell align="right">{row[0].address}</TableCell>
                  <TableCell align="right">{row[0].checkInDate}</TableCell>
                  <TableCell align="right">{row[0].checkOutDate}</TableCell>
                  <TableCell align="right">{row[0].guestNumber}</TableCell>
                  <TableCell align="right">{row[0].total}</TableCell>
                  <TableCell align="right" sx={{display:"flex"}}><IconButton>
                 <DeleteOutlineIcon sx={{color:"red"}} onClick={()=> handleDelete(row.id)}/></IconButton>
             <IconButton> <EditIcon onClick={()=> handleEdit(row)} sx={{color:"blue"}} /></IconButton> 
                  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    {edit &&  <CardModal  open={edit}
            handleClose={()=> setEdit(false)}
            price={hotelInfo[0].pricePerNight}
            hotelInfo={hotelInfo[0]} />}
    </>
  );
}
