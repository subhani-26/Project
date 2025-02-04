import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaFilm, FaSearch, FaStar } from "react-icons/fa";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="full-screen-background">
      {/* Top Header */}
      <header className="header">
        {/* Center Section: Movie Icon + Search Bar + Search Button */}
        <div className="center-section">
          <FaFilm className="movie-icon" />
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onClick={() => navigate("/SearchBar")}
          />
          <button className="search-button">Search</button>
        </div>

        {/* Right Section: Navigation Icons */}
        <ul className="header-links">
          <li className="header-item" onClick={() => navigate("/")}>
            <FaHome className="header-icon" />
            <span className="header-text">Home</span>
          </li>
          <li className="header-item" onClick={() => navigate("/Movies")}>
            <FaFilm className="header-icon" />
            <span className="header-text">Movies</span>
          </li>
          <li className="header-item" onClick={() => navigate("/Profile")}>
            <FaUser className="header-icon" />
            <span className="header-text">Profile</span>
          </li>
        </ul>
      </header>

      {/* Latest Movies Section */}
      <h2 className="latest-movies-title">Latest Movies</h2>

      {/* Movie Grid */}
      <div className="image-container">
        {[ 
          { src: "/first.jpg", hero: "Venkatesh", heroine: "Aishwarya Rajesh,Meenakshi Chaudhary", rating: "4.8" },
          { src: "/second.jpg", hero: "Ramcharan", heroine: "Kiara Advani", rating: "4.8" },
          { src: "/three.jpg", hero: "Nandamuri Balakrishna ", heroine: "Shraddha Srinath , and Pragya Jaisal ", rating: "4.7" },
          { src: "/four.jpg", hero: "Robert Downey Jr.", heroine: "Gwyneth Paltrow", rating: "4.9" },
          { src: "/five.jpg", hero: "Allu Arjun", heroine:"Rashmika Mandana", rating: "4.9" },
          { src: "/six.jpg", hero: "Robert Downey Jr.", heroine: "Gwyneth Paltrow", rating: "4.9" },
          { src: "/eight.jpg", hero: "Vijay Sethupathi", heroine: "Manju Warrior", rating: "4.9" },
        ].map((movie, index) => (
          <div className="movie-box" key={index}>
            <img src={movie.src} alt={`Movie ${index + 1}`} className="header-image" />
            <div className="movie-info">
              <div className="hero-name-rating">
                <p className="hero-heroine">Hero: {movie.hero}</p>
                <div className="rating">
                  <FaStar color="white" /> {movie.rating}
                </div>
              </div>
              <p className="hero-heroine">Heroine: {movie.heroine}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
