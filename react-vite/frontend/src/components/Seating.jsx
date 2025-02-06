import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Seating.css";
import { useLocation } from "react-router-dom";

const Seating = () => {
  const location = useLocation(); // To access the state passed from BuyTicket
  const { date, time, movie, city, theaterName } = location.state || {};
  console.log("Received Data: ", { date, time, movie, city, theaterName });
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [seats, setSeats] = useState([]);

  const fetchSeats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/seats");
      const updatedSeats = response.data;

      // Update the bookedSeats state with booked seat ids
      setBookedSeats(updatedSeats.filter(seat => seat.booked).map(seat => `${seat.section}-${seat.row}-${seat.col}`));
      setSeats(updatedSeats); // Update the seats state
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  const toggleSeatSelection = (seat) => {
    const seatId = `${seat.section}-${seat.row}-${seat.col}`;
    if (bookedSeats.includes(seatId)) return; // Prevent booking already booked seats

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId) // Deselect seat
        : [...prev, seatId] // Select seat
    );
  };

  const bookSeats = async () => {
    try {
      for (let seatId of selectedSeats) {
        const [category, row, col] = seatId.split("-");
        console.log(`Booking seat: ${seatId}, category: ${category}, row: ${row}, col: ${col}`);
  
        const seatData = { section: category, row: parseInt(row), col: parseInt(col) };
        console.log("Request Data: ", seatData); // Log the request body
  
        const response = await axios.post(
          "http://localhost:5000/book-seat",
          seatData, // Sending data as an object
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        console.log(response.data.message);
  
        if (response.status === 200) {
          setBookedSeats((prevBookedSeats) => [
            ...prevBookedSeats,
            response.data.seatId, // Add the booked seat to bookedSeats
          ]);
        }
      }
  
      fetchSeats(); // Refresh seat data after booking
      setSelectedSeats([]); // Clear selected seats
    } catch (error) {
      console.error("Error booking seats:", error);
      alert("Failed to book seats. Please try again.");
    }
  };
  

  const renderSeats = (category, rate, rows) => (
    <div className="seating-section">
      <h3 className="seating-section-title">{category} - Rs. {rate}</h3>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="seating-rows">
          {Array.from({ length: 20 }).map((_, colIndex) => {
            const seatId = `${category}-${rowIndex + 1}-${colIndex + 1}`;
            const isSelected = selectedSeats.includes(seatId);
            const isBooked = bookedSeats.includes(seatId);

            return (
              <button
                key={seatId}
                onClick={() => toggleSeatSelection({ section: category, row: rowIndex + 1, col: colIndex + 1 })}
                className={`w-8 h-8 rounded-md border text-sm font-bold flex items-center justify-center cursor-pointer ${
                  isBooked
                    ? "border-red-600 bg-red-200 text-gray-500 cursor-not-allowed"
                    : isSelected
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-green-600 bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {colIndex + 1}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <div className="seating-container">
      <h1 className="seating-main-title">Movie Ticket Booking</h1>
      <div className="seating-layout">
        {renderSeats("Sofa", 200, 5)}
        {renderSeats("Chair", 150, 5)}
        {renderSeats("Table", 100, 5)}
      </div>

      <div className="seating-selection">
        <h2 className="seating-selection-title">Selected Seats</h2>
        <p className="seating-selected-seats">
          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "No seats selected"}
        </p>
        <button
          onClick={bookSeats}
          disabled={selectedSeats.length === 0}
          className="seating-book-button"
        >
          Book Seats
        </button>
      </div>
    </div>
  );
};

export default Seating;
