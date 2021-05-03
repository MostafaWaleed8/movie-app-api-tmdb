const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?api_key=26422703fa0de205ab53753b9502d57c&query=";

const form = document.getElementById("search");
const searchInput = document.getElementById("searchbar");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    app.innerHTML = "";
    const formSearch = searchInput.value;

    const search = async() => {
        const res = await fetch(SEARCH_API + formSearch);
        const data = await res.json();
        const movies = await data.results;
        console.log(movies);
        if (movies.length > 0) {
            await movies.map((movie) => {
                const getMovieswT = async() => {
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
          <div class="m-a">
          <a>
          <i class="fa fa-video" id=${movie.id}></i>
          </a>
          <a href="${tYTlink}" data-lity>
          <i class="fa fa-ad"></i>
          </a>
           </div>
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
                    const moviepbtn = document.getElementById(movie.id);

                    moviepbtn.addEventListener("click", () => {
                        const id = movie.id;
                        window.location.href = `${"http://localhost:5500" + "?id=" + id}`;
                    });
                };

                getMovieswT();
            });
        } else {
            const div = document.createElement("div");
            div.classList.add("card");
            div.innerHTML = `<p>Sorry, the movie that you  searched for was not found </p>`;
            app.appendChild(div);
        }
    };

    search();
});