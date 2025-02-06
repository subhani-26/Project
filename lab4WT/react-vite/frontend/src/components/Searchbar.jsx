import React, { useState } from "react";
import "./Searchbar.css";
import { useNavigate } from "react-router-dom";

const movieData = {
  Chennai: [
    {
      title: "Movie A",
      hero: "Hero A",
      heroine: "Heroine A",
      description: "Description of Movie A",
      rating: 4.7,
      reviews: ["Fantastic!", "A must-watch!"],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0hZTW45PKs7eJqqyKj8djWpjtpmg9KTMy7A&s",
      theaters: [
        {
          name: "Theater 1",
          address: "123 Street, Chennai",
          showtimes: ["10:00 AM", "2:00 PM", "6:00 PM"],
        },
        {
          name: "Theater 2",
          address: "456 Avenue, Chennai",
          showtimes: ["11:00 AM", "3:00 PM", "7:00 PM"],
        },
      ],
    },
    {
      title: "Movie B",
      hero: "Hero B",
      heroine: "Heroine B",
      description: "Description of Movie B",
      rating: 4.3,
      reviews: ["Very good!", "Highly enjoyable!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 3",
          address: "789 Road, Chennai",
          showtimes: ["12:00 PM", "4:00 PM", "8:00 PM"],
        },
      ],
    },
  ],
  Bengaluru: [
    {
      title: "Movie C",
      hero: "Hero C",
      heroine: "Heroine C",
      description: "Description of Movie C",
      rating: 4.5,
      reviews: ["Superb!", "Loved it!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 4",
          address: "123 Main St, Bengaluru",
          showtimes: ["10:30 AM", "2:30 PM", "6:30 PM"],
        },
        {
          name: "Theater 5",
          address: "456 Road, Bengaluru",
          showtimes: ["12:00 PM", "4:00 PM", "8:00 PM"],
        },
      ],
    },
    {
      title: "Movie D",
      hero: "Hero D",
      heroine: "Heroine D",
      description: "Description of Movie D",
      rating: 4.1,
      reviews: ["Great performance!", "Worth watching!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 6",
          address: "789 Avenue, Bengaluru",
          showtimes: ["1:00 PM", "5:00 PM", "9:00 PM"],
        },
      ],
    },
  ],
  Hyderabad: [
    {
      title: "Movie E",
      hero: "Hero E",
      heroine: "Heroine E",
      description: "Description of Movie E",
      rating: 4.6,
      reviews: ["Amazing!", "Brilliant!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 7",
          address: "12 Park Street, Hyderabad",
          showtimes: ["10:45 AM", "2:45 PM", "6:45 PM"],
        },
      ],
    },
    {
      title: "Movie F",
      hero: "Hero F",
      heroine: "Heroine F",
      description: "Description of Movie F",
      rating: 4.2,
      reviews: ["Entertaining!", "Enjoyed every bit!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 8",
          address: "89 Boulevard, Hyderabad",
          showtimes: ["11:15 AM", "3:15 PM", "7:15 PM"],
        },
      ],
    },
  ],
  Kochi: [
    {
      title: "Movie G",
      hero: "Hero G",
      heroine: "Heroine G",
      description: "Description of Movie G",
      rating: 4.8,
      reviews: ["Excellent!", "Highly recommended!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 9",
          address: "23 Beach Road, Kochi",
          showtimes: ["12:30 PM", "4:30 PM", "8:30 PM"],
        },
      ],
    },
  ],
  Coimbatore: [
    {
      title: "Movie H",
      hero: "Hero H",
      heroine: "Heroine H",
      description: "Description of Movie H",
      rating: 3.9,
      reviews: ["Good!", "Worth a watch."],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 10",
          address: "55 Park Road, Coimbatore",
          showtimes: ["11:00 AM", "3:00 PM", "7:00 PM"],
        },
      ],
    },
  ],
  Mysore: [
    {
      title: "Movie I",
      hero: "Hero I",
      heroine: "Heroine I",
      description: "Description of Movie I",
      rating: 4.4,
      reviews: ["Nice!", "Enjoyable!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 11",
          address: "12 Garden Lane, Mysore",
          showtimes: ["10:15 AM", "2:15 PM", "6:15 PM"],
        },
      ],
    },
  ],
  Thiruvananthapuram: [
    {
      title: "Movie J",
      hero: "Hero J",
      heroine: "Heroine J",
      description: "Description of Movie J",
      rating: 4.6,
      reviews: ["Great!", "Must watch!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 12",
          address: "67 River Street, Thiruvananthapuram",
          showtimes: ["1:00 PM", "5:00 PM", "9:00 PM"],
        },
      ],
    },
  ],
  Madurai: [
    {
      title: "Movie K",
      hero: "Hero K",
      heroine: "Heroine K",
      description: "Description of Movie K",
      rating: 4.2,
      reviews: ["Good movie!", "Worth it!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 13",
          address: "89 High Street, Madurai",
          showtimes: ["11:30 AM", "3:30 PM", "7:30 PM"],
        },
      ],
    },
  ],
  Vijayawada: [
    {
      title: "Movie L",
      hero: "Hero L",
      heroine: "Heroine L",
      description: "Description of Movie L",
      rating: 4.3,
      reviews: ["Nice!", "Enjoyed it!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 14",
          address: "21 Main Road, Vijayawada",
          showtimes: ["12:45 PM", "4:45 PM", "8:45 PM"],
        },
      ],
    },
  ],
  Visakhapatnam: [
    {
      title: "Movie M",
      hero: "Hero M",
      heroine: "Heroine M",
      description: "Description of Movie M",
      rating: 4.5,
      reviews: ["Great!", "Must watch!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 15",
          address: "100 Market Street, Visakhapatnam",
          showtimes: ["11:30 AM", "3:30 PM", "7:30 PM"],
        },
      ],
    },
  ],
  Puducherry: [
    {
      title: "Movie N",
      hero: "Hero N",
      heroine: "Heroine N",
      description: "Description of Movie N",
      rating: 4.4,
      reviews: ["Nice!", "Enjoyable!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 16",
          address: "45 Coastal Road, Puducherry",
          showtimes: ["10:30 AM", "2:30 PM", "6:30 PM"],
        },
      ],
    },
  ],
  Kozhikode: [
    {
      title: "Movie O",
      hero: "Hero O",
      heroine: "Heroine O",
      description: "Description of Movie O",
      rating: 4.3,
      reviews: ["Good movie!", "Worth it!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 17",
          address: "25 City Road, Kozhikode",
          showtimes: ["12:00 PM", "4:00 PM", "8:00 PM"],
        },
      ],
    },
  ],
  Tiruchirappalli: [
    {
      title: "Movie P",
      hero: "Hero P",
      heroine: "Heroine P",
      description: "Description of Movie P",
      rating: 4.2,
      reviews: ["Nice!", "Enjoyable!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 18",
          address: "99 Park Street, Tiruchirappalli",
          showtimes: ["11:00 AM", "3:00 PM", "7:00 PM"],
        },
      ],
    },
  ],
  Hubli: [
    {
      title: "Movie Q",
      hero: "Hero Q",
      heroine: "Heroine Q",
      description: "Description of Movie Q",
      rating: 4.1,
      reviews: ["Good movie!", "Worth it!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 19",
          address: "10 Main Road, Hubli",
          showtimes: ["12:00 PM", "4:00 PM", "8:00 PM"],
        },
      ],
    },
  ],
  Kannur: [
    {
      title: "Movie R",
      hero: "Hero R",
      heroine: "Heroine R",
      description: "Description of Movie R",
      rating: 4.0,
      reviews: ["Nice!", "Enjoyable!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 20",
          address: "12 Avenue, Kannur",
          showtimes: ["11:30 AM", "3:30 PM", "7:30 PM"],
        },
      ],
    },
    {
      title: "Movie Q",
      hero: "Hero Q",
      heroine: "Heroine Q",
      description: "Description of Movie Q",
      rating: 4.1,
      reviews: ["Good movie!", "Worth it!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 21",
          address: "98 Street, Kannur",
          showtimes: ["1:00 PM", "5:00 PM", "9:00 PM"],
        },
      ],
    },
    {
      title: "Movie S",
      hero: "Hero S",
      heroine: "Heroine S",
      description: "Description of Movie S",
      rating: 3.8,
      reviews: ["Nice movie", "Great watch!"],
      image: "https://via.placeholder.com/150",
      theaters: [
        {
          name: "Theater 22",
          address: "45 City Rd, Kannur",
          showtimes: ["2:00 PM", "6:00 PM", "10:00 PM"],
        },
      ],
    },
  ],
};

function Searchbar() {
  const [cityInput, setCityInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Filter cities based on input value
  const handleInputChange = (e) => {
    const input = e.target.value;
    setCityInput(input);

    if (input) {
      const filteredCities = Object.keys(movieData).filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredCities);

      if (filteredCities.length === 0) {
        setMessage(
          "Oops! We couldn't find any city matching your search. Try again with a different name."
        );
      } else {
        setMessage(""); // Clear message if cities are found
      }
    } else {
      setSuggestions([]);
      setMessage(""); // Clear message when input is empty
    }
  };

  const handleSuggestionClick = (city) => {
    setCityInput(city);
    displayMoviesForCity(city);
    setSuggestions([]); // Clear suggestions after selection
    setMessage(""); // Clear message when a valid city is selected
  };

  const displayMoviesForCity = (city) => {
    const selectedMovies = movieData[city] || [];
    setMovies(selectedMovies);
  };

  const handleFindTheaters = (movie, city) => {
    navigate("/Theaters", { state: { movie, city } }); // Navigate to TheaterList with movie data
  };

  return (
    <div className="container">
      <h1 className="abc">Movie Ticket Booking</h1>
      <div className="search-container">
        <input
          type="text"
          id="cityInput"
          placeholder="Search for a city..."
          value={cityInput}
          onChange={handleInputChange}
        />
        <button onClick={() => displayMoviesForCity(cityInput)}>Search</button>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div id="suggestions">
          {suggestions.map((city) => (
            <div
              key={city}
              className="suggestion"
              onClick={() => handleSuggestionClick(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}

      {/* Message for no city found */}
      {message && <div className="no-results-message">{message}</div>}

      {/* Movie List */}
      <div id="movieList">
        {movies.map((movie, index) => (
          <div key={index} className="movie-item">
            <div className="movie-item-inner">
              <img src={movie.image} alt={`${movie.title} poster`} />
              <h3>{movie.title}</h3>
              <p>Hero: {movie.hero}</p>
              <p>Heroine: {movie.heroine}</p>
              <p>Description: {movie.description}</p>
              <p>Rating: {movie.rating}</p>
              <p>Reviews: {movie.reviews.join(", ")}</p>
              <button
                className="find-theater-button"
                onClick={() => handleFindTheaters(movie, cityInput)}
              >
                Find Theaters
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Searchbar;
