import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Films from "./components/Films";
import { Container, Row } from "reactstrap";

function App() {
  const [movieLike, setMovieLike] = useState([]);
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    async function load() {
      var movieFind = await fetch("/new-movies");
      var movieJson = await movieFind.json();

      setMoviesData(movieJson.movies);
      // var wishlistFind = await fetch("/wishlist-movie");
      // var wishlistJson = await wishlistFind.json();

      // setMovieLike(wishlistJson.wishlistFind);
    }
    load();
  }, []);

  var clickAddMovie = async (movieName, movieImg) => {
    setMovieLike([...movieLike, { movieName, movieImg }]);

    // await fetch("/wishlist-movie", {
    //   method: "post",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: `name=${movieName}&img=${movieImg}`,
    // });
  };
  var clickDeleteMovie = async (name) => {
    const resultat = movieLike.filter((movie) => movie.movieName !== name);

    setMovieLike(resultat);
    // await fetch(`/wishlist-movie/${name}`, {
    //   method: "delete",
    // });
  };

  var filmsList = moviesData.map(function (movie, i) {
    var movieLiked = movieLike.find((name) => name.movieName === movie.title);
    var seen = false;
    if (movieLiked !== undefined) {
      seen = true;
    }
    var urlImg = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

    var desc = movie.overview;

    return (
      <Films
        key={movie.title}
        movieName={movie.title}
        movieDesc={desc}
        movieImg={urlImg}
        globalRating={movie.vote_average}
        globalCountRating={movie.vote_count}
        clickAddMovie={clickAddMovie}
        clickDeleteMovie={clickDeleteMovie}
        seen={seen}
      />
    );
  });

  return (
    <div style={{ backgroundColor: "#232528" }}>
      <Container>
        <Row>
          <NavBar movieLike={movieLike} clickDeleteMovie={clickDeleteMovie} />
        </Row>
        <Row>{filmsList}</Row>
      </Container>
    </div>
  );
}

export default App;
