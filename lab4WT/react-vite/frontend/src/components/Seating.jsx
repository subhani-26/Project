import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import axios
import "./Seating.css";

const Seating = () => {
  const { state } = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [selectedDate, setSelectedDate] = useState(state.selectedDate);
  const [selectedTime, setSelectedTime] = useState(state.selectedTime);
  const [selectedTheater, setSelectedTheater] = useState(state.selectedTheater);

  const sections = [
    { name: "Sofa", rate: 200, rows: ["A", "B", "C"], cols: 20 },
    { name: "Reserved", rate: 100, rows: ["D", "E", "F", "G"], cols: 20 },
    { name: "Chair", rate: 50, rows: ["H", "I", "J"], cols: 20 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8000/get_booked_seats.php", {
        params: {
          theater: selectedTheater,
          date: selectedDate,
          time: selectedTime,
        },
      })
      .then((response) => {
        setBookedSeats(response.data);
      })
      .catch((error) => console.error("Error fetching booked seats:", error));
  }, [selectedTheater, selectedDate, selectedTime]);

  const toggleSeatSelection = (seatId, sectionRate) => {
    if (!bookedSeats.includes(seatId)) {
      setSelectedSeats((prev) =>
        prev.some((seat) => seat.id === seatId)
          ? prev.filter((seat) => seat.id !== seatId)
          : [...prev, { id: seatId, rate: sectionRate }]
      );
    }
  };

  const calculateTotalCost = () => {
    return selectedSeats.reduce((total, seat) => total + seat.rate, 0);
  };

  const confirmPayment = () => {
    axios
      .post("http://localhost:8000/book_seats.php", {
        theater: selectedTheater,
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats.map((seat) => seat.id),
      })
      .then(() => {
        setBookedSeats((prev) => [...prev, ...selectedSeats.map((seat) => seat.id)]);
        setSelectedSeats([]);
        setShowPayment(false);
        setShowTicket(true);
      })
      .catch((error) => console.error("Error booking seats:", error));
  };

  const renderSeats = (section) => {
    return section.rows.map((row) => (
      <div key={row} className="flex items-center">
        <span className="mr-2 font-bold">{row}</span>
        <div className="flex gap-2">
          {Array.from({ length: section.cols }, (_, index) => {
            const seatId = `${row}${index + 1}`;
            const isSelected = selectedSeats.some((seat) => seat.id === seatId);
            const isBooked = bookedSeats.includes(seatId);
            return (
              <button
                key={seatId}
                onClick={() => !isBooked && toggleSeatSelection(seatId, section.rate)}
                className={`w-8 h-8 rounded-md border text-sm font-bold flex items-center justify-center cursor-pointer ${
                  isBooked
                    ? "border-red-600 bg-red-200 text-gray-500 cursor-not-allowed"
                    : isSelected
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-green-600 bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    ));
  };

  return (
    <div className="container p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Movie Ticket Booking</h1>

      <h3 className="text-xl font-bold">Selected Date: {selectedDate}</h3>
      <h3 className="text-xl font-bold">Selected Time: {selectedTime}</h3>
      <h3 className="text-xl font-bold">Selected Theater: {selectedTheater}</h3>

      {sections.map((section) => (
        <div key={section.name} className="space-y-4">
          <h3>{section.name} - Rs. {section.rate}</h3>
          {renderSeats(section)}
        </div>
      ))}

      <button onClick={() => setShowPayment(true)} disabled={!selectedSeats.length}>
        Book Seats
      </button>

      {showPayment && <button onClick={confirmPayment}>Confirm Payment</button>}
    </div>
  );
};

export default Seating;
