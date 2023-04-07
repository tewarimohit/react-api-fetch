import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "../src/components/Loader.css";
import "./App.css";
import Loader from "./components/Loader";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const modifiedData = data?.results?.map((movie) => {
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      };
    });
    setMovies(modifiedData);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      {isLoading && (
        <section>
          <Loader />
        </section>
      )}
      {!isLoading && movies.length > 0 && (
        <section>
          <MoviesList movies={movies} />
        </section>
      )}
    </React.Fragment>
  );
}

export default App;
