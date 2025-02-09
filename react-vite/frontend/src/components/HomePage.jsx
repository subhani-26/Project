import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaFilm, FaSearch, FaStar } from "react-icons/fa";
import first from "../assets/images/first.jpg";
import pushpa2 from "../assets/images/pushpa2.jpg";
import hissab from "../assets/images/hissab.jpg";
import dakuimg1 from "../assets/images/dakuimg1.jpg";
import virupaksha from "../assets/images/Virupaksha.webp";
import second from "../assets/images/second.jpg";


function Homepage() {
  const navigate = useNavigate();

  const movies = [
    { src: first, hero: "Venkatesh", heroine: "Aishwarya Rajesh", rating: "4.8", title: "Sankranti ki Vastunnam" },
    { src: pushpa2, hero: "Allu Arjun", heroine: "Rashmika Mandanna", rating: "4.9", title: "Pushpa 2" },
    { src: hissab, hero: "Nandamuri Balakrishna", heroine: "Shraddha Srinath", rating: "4.7", title: "Hissab" },
    { src: dakuimg1, hero: "Karthi", heroine: "Rakul Preet Singh", rating: "4.6", title: "Daku" },
    { src: second, hero: "Ram Charan", heroine: "Kiara Advani", rating: "4.8", title: "Game Changer" },
    { src: virupaksha, hero: "Sai Dharam Tej", heroine: "Samyuktha Menon", rating: "4.7", title: "Virupaksha" }
  ];

  return (
    <div className="homepage-background">
      {/* Top Header */}
      <header className="homepage-header">
        {/* Center Section: Movie Icon + Search Bar + Search Button */}
        <div className="homepage-center-section">
          <FaFilm className="homepage-movie-icon" />
          <input
            type="text"
            className="homepage-search-bar"
            placeholder="Search..."
            onClick={() => navigate("/SearchBar")}
          />
          <button className="homepage-search-button">Search</button>
        </div>

        {/* Right Section: Navigation Icons */}
        <ul className="homepage-nav-links">
          <li className="homepage-nav-item" onClick={() => navigate("/")}>
            <FaHome className="homepage-nav-icon" />
            <span className="homepage-nav-text">Home</span>
          </li>
          <li className="homepage-nav-item" onClick={() => navigate("/Movies")}>
            <FaFilm className="homepage-nav-icon" />
            <span className="homepage-nav-text">Movies</span>
          </li>
          <li className="homepage-nav-item" onClick={() => navigate('/ProfilePage')}>
            <FaUser className="homepage-nav-icon" />
            <span className="homepage-nav-text">Profile</span>
          </li>
        </ul>
      </header>

      {/* Latest Movies Section */}
      <h2 className="homepage-latest-movies-title">Latest Movies</h2>

      {/* Movie Grid */}
      <div className="homepage-movie-grid">
        {movies.map((movie, index) => (
          <div className="homepage-movie-box" key={index}>
            <img src={movie.src} alt={movie.title} className="homepage-movie-image" />
            <div className="homepage-movie-info">
              <div className="homepage-movie-details">
                <p className="homepage-movie-title">{movie.title}</p>
                <div className="homepage-movie-rating">
                  <FaStar color="white" /> {movie.rating}
                </div>
              </div>
              <p className="homepage-movie-cast">Hero: {movie.hero}</p>
              <p className="homepage-movie-cast">Heroine: {movie.heroine}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
