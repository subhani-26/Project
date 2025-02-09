import React from "react";
import {
  FaUser,
  FaFilm,
  FaTicketAlt,
  FaRegStar,
  FaCalendarCheck,
  FaHistory,
  FaPercent,
  FaBookmark,
  FaGift,
} from "react-icons/fa";
import "./Profile.css";

function Profile() {
  const user = {
    name: "John Doe",
    phone: "+1234567890",
  };

  const sections = [
    {
      icon: <FaGift className="section-icon" />,
      title: "Gift Cards",
      content: "You have 2 gift cards available.",
    },
    {
      icon: <FaTicketAlt className="section-icon" />,
      title: "My Tickets",
      content: "You have 3 active tickets. View your upcoming movies.",
    },
    {
      icon: <FaFilm className="section-icon" />,
      title: "Movies",
      content: "Browse through available movies and showtimes.",
    },
    {
      icon: <FaRegStar className="section-icon" />,
      title: "Ratings & Reviews",
      content: "Rate and review movies you’ve watched.",
    },
    {
      icon: <FaCalendarCheck className="section-icon" />,
      title: "Upcoming Movies",
      content: "Check your upcoming movie showtimes.",
    },
    {
      icon: <FaHistory className="section-icon" />,
      title: "Booking History",
      content: "View your past bookings and tickets.",
    },
    {
      icon: <FaPercent className="section-icon" />,
      title: "Offers & Discounts",
      content: "You have 1 offer available. Redeem now.",
    },
    {
      icon: <FaBookmark className="section-icon" />,
      title: "Wishlist",
      content: "Add your favorite movies to the wishlist.",
    },
  ];

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="header-left">
          <h1>{user.name}</h1>
          <p>{user.phone}</p>
        </div>
        <div className="header-right">
          <FaUser className="profile-icon" />
        </div>
      </header>

      <div className="profile-sections">
        {sections.map((section, index) => (
          <section className="profile-section" key={index}>
            <div className="section-header">
              {section.icon}
              <h2>{section.title}</h2>
            </div>
            <p>{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Profile;
