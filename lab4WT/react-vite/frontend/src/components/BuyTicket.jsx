import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyTicket.css";

const BuyTicket = () => {
  const dateScrollRef = useRef(null);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");  // Store the selected time
  const [selectedTheater, setSelectedTheater] = useState("");  // Store the selected theater
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const scrollDates = (direction) => {
    const scrollAmount = 90;
    if (dateScrollRef.current) {
      dateScrollRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  const selectDate = (event) => {
    document.querySelectorAll(".date-selector div, .calendar-button").forEach((div) =>
      div.classList.remove("active")
    );
    event.currentTarget.classList.add("active");
    setSelectedDate(event.currentTarget.innerText);
  };

  const selectTime = (time) => {
    setSelectedTime(time);
  };

  const selectTheater = (theater) => {
    setSelectedTheater(theater);
  };

  const handleDateChange = (event) => {
    const pickedDate = event.target.value;
    setSelectedDate(new Date(pickedDate).toDateString().toUpperCase());
    setIsCalendarOpen(false);
  };

  const handleShowTimeClick = (time) => {
    selectTime(time);
    navigate("/Seating", {
      state: { selectedDate, selectedTime: time, selectedTheater }, // Pass date, time, and theater to Seating page
    });
  };

  return (
    <div>
      <header>Buy Ticket</header>

      {/* Date Selector */}
      <div className="date-container">
        <span className="arrow" onClick={() => scrollDates(-1)}>&#9665;</span>
        <div className="date-selector" ref={dateScrollRef}>
          {["THU 30 JAN", "FRI 31 JAN", "SAT 01 FEB", "SUN 02 FEB", "MON 03 FEB"].map((date, index) => (
            <div key={index} onClick={selectDate}>{date}</div>
          ))}
          {!selectedDate && (
            <button className="calendar-button" onClick={() => setIsCalendarOpen(true)}>
              📅 Choose from Calendar
            </button>
          )}
        </div>
        <span className="arrow_right" onClick={() => scrollDates(1)}>&#9655;</span>
      </div>

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div className="calendar-modal">
          <div className="calendar-content">
            <h3>Select a Date</h3>
            <input
              type="date"
              className="calendar-input"
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]}
            />
            <button className="close-button" onClick={() => setIsCalendarOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {selectedDate && <div className="selected-date">Selected Date: {selectedDate}</div>}

      {/* Theater Selection */}
      <div className="container">
        <h3>Select Theater and Show Time</h3>
      </div>
      {[  // Theater and Time Selection
        {
          name: "Alankar A/C 4K Dolby Surround",
          location: "Vijayawada",
          times: ["10:50 AM", "01:45 PM", "03:00 PM", "06:30 PM", "09:30 PM"],
        },
        {
          name: "Balaji Iconia A/C 2K Dolby Surround",
          location: "Ibrahimpatnam",
          times: ["10:00 AM", "02:00 PM", "06:30 PM", "09:30 PM"],
        },
        {
          name: "Cinepolis: Power One Mall",
          location: "Vijayawada",
          times: ["10:50 AM", "02:00 PM", "05:00 PM", "08:30 PM"],
        },
      ].map((cinema, index) => (
        <div className="cinema" key={index} onClick={() => selectTheater(cinema.name)}>
          <strong>
            {cinema.name}:<br /> <i>{cinema.location}</i>
          </strong>
          <div className="timing-buttons">
            {cinema.times.map((time, timeIndex) => (
              <button
                className="show-time"
                key={timeIndex}
                onClick={() => handleShowTimeClick(time)}  // Pass time to Seating page
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyTicket;