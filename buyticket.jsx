import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";
import "./BuyTicket.css";

const BuyTicket = () => {
  const dateScrollRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");

  // Extract movie and city, provide default values to avoid errors
  const { movie = "", city = "" } = location.state || {}; 

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  const checkIfTimeIsPast = (time) => {
    if (!selectedDate) return false; // Prevent errors if no date is selected
    
    const now = new Date();
    
    // Convert the time string into a Date object
    const [hour, minute, period] = time.match(/(\d+):(\d+) (AM|PM)/).slice(1);
    let hour24 = parseInt(hour, 10);
    
    if (period === "PM" && hour24 !== 12) hour24 += 12;
    if (period === "AM" && hour24 === 12) hour24 = 0;
    
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(hour24, parseInt(minute, 10), 0, 0);

    return selectedDate === new Date().toISOString().split("T")[0] && selectedDateTime < now;
  };

  const selectTime = (time, theaterName) => {
    setSelectedTime(time);
    setSelectedTheater(theaterName);
  };

  const handleSeatingRedirect = () => {
    if (selectedDate && selectedTime && selectedTheater) {
      navigate("/Seating", {
        state: { date: selectedDate, time: selectedTime, movie, city, theaterName: selectedTheater }
      });
    }
  };

  const selectDate = (event) => {
    setSelectedDate(event.target.textContent);
    setSelectedTime(""); // Reset selected time when a new date is selected
  };

  const handleTimeSelection = (time, theater) => {
    if (selectedDate === new Date().toISOString().split("T")[0] && checkIfTimeIsPast(time)) {
      return;
    }
    selectTime(time, theater);
  };

  const handleCalendarChange = (event) => {
    setSelectedDate(event.target.value);
    setShowCalendar(false);
  };

  return (
    <div>
      <header className="buyticket-header">Buy Ticket</header>

      <div className="buyticket-datepicker-container">
        <button className="buyticket-datepicker" onClick={() => setShowCalendar(true)}>
          <Calendar size={20} /> Choose from Calendar
        </button>
      </div>

      {showCalendar && (
        <div className="buyticket-calendar-popup">
          <div className="buyticket-calendar-content">
            <h3>Select Date</h3>
            <input
              type="date"
              className="buyticket-datepicker-input"
              onChange={handleCalendarChange}
              min={minDate}
            />
            <button className="buyticket-close-button" onClick={() => setShowCalendar(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="buyticket-container">
        <h3>Select Theater and Show Time</h3>
      </div>

      {[
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
        <div className="buyticket-cinema" key={index}>
          <strong>
            {cinema.name}:<br /> <i>{cinema.location}</i>
          </strong>
          <div className="buyticket-timing-buttons">
            {cinema.times.map((time, timeIndex) => {
              const isTimeDisabled = selectedDate === new Date().toISOString().split("T")[0] && checkIfTimeIsPast(time);
              return (
                <button
                  className="buyticket-show-time"
                  key={timeIndex}
                  onClick={() => handleTimeSelection(time, cinema.name)}
                  disabled={isTimeDisabled}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="buyticket-seating-button-container">
        <button
          className="buyticket-seating-button"
          onClick={handleSeatingRedirect}
          disabled={!selectedDate || !selectedTime}
        >
          Go to Seating
        </button>
      </div>
    </div>
  );
};

export default BuyTicket;
