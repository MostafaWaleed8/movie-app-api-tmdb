const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=26422703fa0de205ab53753b9502d57c&query=";

const form = document.getElementById("search");
const searchInput = document.getElementById("searchbar");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  app.innerHTML = "";
  const formSearch = searchInput.value;

  const search = async () => {
    const res = await fetch(SEARCH_API + formSearch);
    const data = await res.json();
    const movies = await data.results;
    console.log(movies);
    movies.map((movie) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
            <img src=${IMG_API + movie.poster_path} loading="lazy" />
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
    });
  };

  search();
});
