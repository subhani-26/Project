import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Book_Summary.css";

const Book_Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, date, time, theaterName, city, selectedSeats } = location.state || {};
  console.log("Received data in Book_Summary:", location.state);

  // Define seat prices per category
  const seatPrices = {
    Sofa: 200,
    Chair: 150,
    Table: 100,
  };

  // Calculate total cost safely
  const totalCost = (selectedSeats || []).reduce((total, seat) => {
    const category = seat.split("-")[0]; // Extract seat category
    return total + (seatPrices[category] || 0);
  }, 0);

  return (
    <div className="booking-details">
      <h1 className="booking-title">{movie?.title || "Unknown Movie"} </h1>

      <div className="booking-details">
        {/* Ensure the image path is correct */}
        <img src={`${movie?.image}`} alt={movie?.title} className="movie-poster" onError={(e) => e.target.src = "/images/default.jpg"} />

        <div className="info">
          <p><strong>Hero:</strong> {movie?.hero}</p>
          <p><strong>Heroine:</strong> {movie?.heroine}</p>
          
          <p><strong>Rating:</strong> {movie?.rating}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Theater:</strong> {theaterName}, {city}</p>
          <p><strong>Selected Seats:</strong> {selectedSeats?.length ? selectedSeats.join(", ") : "No seats selected"}</p>
          <p><strong>Total Cost:</strong> Rs. {totalCost}</p>

         
        </div>
      </div>

     
    </div>
  );
};

export default Book_Summary;
