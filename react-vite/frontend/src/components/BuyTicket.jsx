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
  const [disabledTimes, setDisabledTimes] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState("");  // Add a new state to track the selected theater

const selectTime = (time, theaterName) => {
  // Update selected time and theater when the user selects a time
  setSelectedTime(time);
  setSelectedTheater(theaterName);  // Save the selected theater name
};

const handleSeatingRedirect = () => {
  console.log('Selected Date:', selectedDate);
  console.log('Selected Time:', selectedTime);
  console.log('Selected Theater:', selectedTheater);
  console.log('Selected Movie:', movie);
  console.log('Selected city:', city);
  if (selectedDate && selectedTime && selectedTheater) {
    navigate("/Seating", {
      state: { 
        date: selectedDate, 
        time: selectedTime, 
        movie, 
        city, 
        theaterName: selectedTheater // Add the theater name to the state
      }
    });
  }
};


  const { movie, city } = location.state || {}; 
  console.log(city)
  console.log(movie)

  // Get today's date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  // Function to check if a time is in the past for the selected date
  const checkIfTimeIsPast = (time) => {
    const now = new Date();
    const selectedDateTime = new Date(`${selectedDate} ${time}`);
    return selectedDate === new Date().toISOString().split("T")[0] && selectedDateTime < now;
  };

  const selectDate = (event) => {
    const selected = event.currentTarget.textContent;
    setSelectedDate(selected);

    const dateDivs = document.querySelectorAll(".buyticket-date-selector div");
    dateDivs.forEach((div) => div.classList.remove("active"));
    event.currentTarget.classList.add("active");

    setSelectedTime(""); // Reset selected time when a new date is selected
    setDisabledTimes([]); 
  };

  // const handleTimeSelection = (time, theater) => {
  //   // If the selected date is today, disable past times in the selected theater only
  //   if (selectedDate === new Date().toISOString().split("T")[0]) {
  //     if (checkIfTimeIsPast(time)) {
  //       return;
  //     }
  //   }

    
  //   setSelectedTime(time);
  // };

  // const handleSeatingRedirect = () => {
  //   if (selectedDate && selectedTime) {
  //     navigate("/Seating", { state: { date: selectedDate, time: selectedTime, movie, city } });
  //   }
  // };
  const handleTimeSelection = (time, theater) => {
    // If the selected date is today, disable past times in the selected theater only
    if (selectedDate === new Date().toISOString().split("T")[0]) {
      if (checkIfTimeIsPast(time)) {
        return; // Ignore the click if the time is in the past
      }
    }
  
    // Use selectTime to update both the time and theater
    selectTime(time, theater);  // Here, we set both the time and the theater
  };
  

  const handleCalendarChange = (event) => {
    setSelectedDate(event.target.value);
    setShowCalendar(false);
  };

  const getDisabledTimesForToday = (times) => {
    if (selectedDate === new Date().toISOString().split("T")[0]) {
      return times.filter((time) => checkIfTimeIsPast(time));
    }
    return []; // No disabled times if it's not today's date
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
              min={minDate} // Set the min date to today's date
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