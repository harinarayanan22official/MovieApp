import React from "react"
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import MovieDetails from "./pages/MovieDetails"
import SeatLayout  from "./pages/SeatLayout"
import MyBooking from "./pages/MyBookings"
import Favorite from "./pages/Favorite"
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import MyBookings from "./pages/MyBookings";
import  Layout from "./pages/admin/Layout";
import Dashboard  from "./pages/admin/Dashboard";
import AddShow  from "./pages/admin/AddShow";
import ListShow  from "./pages/admin/ListShow";
import ListBookings  from "./pages/admin/ListBookings";

function App(){
  const isAdminRoute=useLocation().pathname.startsWith("/admin")
  return(

    <>
      <Toaster/>
      {!isAdminRoute && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<Movie/>}/>
        <Route path="/movies/:id" element={<MovieDetails/>}/>
        <Route path="/movies/:id/:date" element={<SeatLayout/>}/>
        <Route path="/my-bookings" element={<MyBookings/>}/>
        <Route path="/favorite" element={<Favorite/>}/>
        <Route path="/admin/*" element={<Layout/>}>
           <Route index element={<Dashboard/>}/>
             <Route path="add-shows" element={<AddShow/>}/>
             <Route path="list-shows" element={<ListShow/>}/>
             <Route path="list-bookings" element={<ListBookings/>}/>
        </Route>
      </Routes>
      {!isAdminRoute && <Footer/>}
    </>
  )
}

export default App;