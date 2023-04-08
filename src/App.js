import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "../src/components/Loader.css";
import "./App.css";
import Loader from "./components/Loader";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function sum(a) {
    return function (b) {
      if (b) {
        return sum(a + b);
      } else {
        return a;
      }
    };
  }

  console.log(sum(2)(3)(9)());

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Oops something went wrong!!");
      }
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
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content;

  if (error) {
    return (content = (
      <section>
        {" "}
        <h3>{error}</h3>
      </section>
    ));
  }
  if (isLoading) {
    content = (
      <section>
        <Loader />
      </section>
    );
  }

  if (!isLoading && movies.length > 0) {
    content = (
      <section>
        <MoviesList movies={movies} />
      </section>
    );
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      {content}
    </React.Fragment>
  );
}

export default App;
