import React, { useState } from "react";
import './../styles/MovieTicketSystem.css';  // Import the CSS file for styling

const MovieTicketSystem = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const timings = [
    { label: "Morning Show", time: "9 AM - 12 Noon" },
    { label: "Matinee", time: "1 PM - 4 PM" },
    { label: "Evening", time: "5 PM - 8 PM" },
    { label: "Night", time: "9 PM - 12 Midnight" },
  ];

  const sections = [
    { name: "Sofa", rate: 200, rows: ["A", "B", "C"], cols: 20 },
    { name: "Reserved", rate: 100, rows: ["D", "E", "F", "G"], cols: 20 },
    { name: "Chair", rate: 50, rows: ["H", "I", "J"], cols: 20 },
  ];

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const bookSeats = () => {
    setBookedSeats((prev) => [...prev, ...selectedSeats]);
    setSelectedSeats([]);
  };

  const renderSeats = (section) => {
    return section.rows.map((row) => (
      <div key={row} className="flex items-center">
        <span className="mr-2 font-bold">{row}</span>
        <div className="flex gap-2">
          {Array.from({ length: section.cols }, (_, index) => {
            const seatId = `${row}${index + 1}`;
            const isSelected = selectedSeats.includes(seatId);
            const isBooked = bookedSeats.includes(seatId);
            return (
              <button
                id={seatId}
                key={seatId}
                onClick={() => !isBooked && toggleSeatSelection(seatId)}
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

  const calculateRemainingSeats = (section) => {
    const totalSeats = section.rows.length * section.cols;
    const bookedCount = bookedSeats.filter((seat) =>
      section.rows.some((row) => seat.startsWith(row))
    ).length;
    return totalSeats - bookedCount;
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Movie Ticket Booking</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Show Timings</h2>
        <div className="flex gap-4">
          {timings.map((timing) => (
            <button
              key={timing.label}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {timing.label} ({timing.time})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.name} className="space-y-4">
            <h3 className="text-lg font-bold">
              {section.name} - Rs. {section.rate} (Remaining: {calculateRemainingSeats(section)})
            </h3>
            <div className="space-y-2">{renderSeats(section)}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Selected Seats</h2>
        <p>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "No seats selected"}</p>
        <button
          onClick={bookSeats}
          disabled={selectedSeats.length === 0}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300"
        >
          Book Seats
        </button>
      </div>

      <div className="mt-6 flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border border-red-600 bg-red-200"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border border-green-600 bg-gray-200"></div>
          <span>Available</span>
        </div>
      </div>
    </div>
  );
};

export default MovieTicketSystem;
