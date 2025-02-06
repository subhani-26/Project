import React, { useEffect, useState } from 'react';
import { FaUser,FaHistory } from 'react-icons/fa';
import './ProfilePage.css';

function ProfilePage() {
  // State to hold the user's booking history
  const [bookingHistory, setBookingHistory] = useState(null);
  
  const username = localStorage.getItem("username");
  console.log("Username from localStorage: ", username);

  // Fetch booking history from your backend or mock it
  useEffect(() => {
    // Simulate fetching booking history (you can replace this with an API call)
    setBookingHistory([]);  // Empty array means no bookings
  }, []);

  return (
    <div className="profile-page">
      <div className="header">
        <FaUser className="profile-icon" />
        <h2 className="profile-name">{username}</h2> {/* Display username from localStorage */}
      </div>
      <div className="history-box">
      <FaHistory className="profile" />
        <h3>Booking History</h3>
        {/* Check if there are no bookings */}
        {bookingHistory && bookingHistory.length === 0 ? (
          <p>No bookings right now</p>
        ) : (
          <p>Displaying booking history...</p>  // Replace with actual booking history data if available
        )}
       

      </div>
    </div>
  );
}

export default ProfilePage;
