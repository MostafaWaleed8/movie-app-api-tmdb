//! APIs !//
const BASE_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=26422703fa0de205ab53753b9502d57c";

const IMG_API = "http://image.tmdb.org/t/p/w500";

const TRAILER_API_F = "https://api.themoviedb.org/3/movie/";
const TRAILER_API_S = "/videos?api_key=26422703fa0de205ab53753b9502d57c";
//! End of APIs !//

const app = document.getElementById("app");

const header = document.getElementById("header");
header.innerHTML = `
<a href="/"><img src="assets/logo.svg" class="logo" alt="" /></a>
<form method="post" id="search">
  <input
    type="text"
    class="search"
    placeholder="Search..."
    id="searchbar"
  />
</form>`;

const getMovies = async () => {
  const res = await fetch(BASE_API);
  const data = await res.json();
  const movies = await data.results;
  console.log(movies);

  await movies.map((movie) => {
    const getMovieswT = async () => {
      const tres = await fetch(TRAILER_API_F + movie.id + TRAILER_API_S);
      const tdata = await tres.json();
      const tmovies = await tdata.results;
      console.log(tmovies[0].key);
      const tYTlink = `https://youtube.com/embed/${tmovies[0].key}`;

      const div = document.createElement("div");

      div.classList.add("card");
      div.innerHTML = `
          <div class="img">
          <img src=${
            IMG_API + movie.poster_path
          } loading="lazy" class="movie-poster"  />
          <a href="${tYTlink}" data-lity>
           <img src="assets/play-button.svg" class="trailer-button">
           </a>
          </div>
          <div class="n-v"> 
          <h4 class="title">${movie.title}</h4>
          <span class="vote
           ${movie.vote_average >= 8 ? "green-v" : ""} 
           ${movie.vote_average < 8 ? "yellow-v" : ""} 
           ${movie.vote_average <= 5 ? "red-v" : ""} ">
            ${movie.vote_average}
            </span>
          </div>
          <div class="overview">
              <h3>${movie.overview}</h3> 
          </div>
          `;
      app.appendChild(div);
    };

    getMovieswT();
  });
};

getMovies();
