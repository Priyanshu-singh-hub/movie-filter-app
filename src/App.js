import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  useEffect(() => {
    if (search !== "") {
      fetch(`https://www.omdbapi.com/?s=${search}&apikey=aab32753`)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.Search || []);
        });
    } else {
      setMovies([]);
    }
  }, [search]);

  return (
    <div className="container mt-4 px-3">

      {/* 🔝 Header Section */}
      <div className="d-flex flex-column align-items-center text-center">

        <h1 className="mb-4">🎬 Movie Filter App</h1>

        {/* 🔍 Search Input */}
        <div className="mb-3 w-100" style={{ maxWidth: "500px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 🎭 Dropdown */}
        <div className="mb-4 w-100" style={{ maxWidth: "500px" }}>
          <select
            className="form-control"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="All">All</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
        </div>

      </div>

      {/* 🎬 Movies */}
      <div className="row justify-content-center">

        {search !== "" && movies.length === 0 ? (
          <h3 className="text-center text-danger mt-4">
            ❌ No Results Found
          </h3>
        ) : (
          movies
            .filter((movie) => genre === "All" || movie.Type === genre)
            .map((movie, index) => (

              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
                key={index}
              >

                <div className="card shadow w-100" style={{ maxWidth: "18rem" }}>

                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x400"
                    }
                    className="card-img-top"
                    alt={movie.Title}
                    style={{ height: "300px", objectFit: "cover" }}
                  />

                  <div className="card-body text-center">
                    <h5 className="card-title">{movie.Title}</h5>
                    <p>📅 {movie.Year}</p>
                    <p>🎬 {movie.Type}</p>
                  </div>

                </div>

              </div>
            ))
        )}

      </div>
    </div>
  );
}

export default App;