const MOVIE_API = "https://fuckyou-api.herokuapp.com?name=";

const url_string = window.location.href;
const url = new URL(url_string);
const mvid = url.searchParams.get("id");
if (mvid) {
  const getMoviePageat = async () => {
    const smres = await fetch(FSINGLE_MOVIE_API + mvid + SSINGLE_MOVIE_API);
    const smovie = await smres.json();

    const tres = await fetch(TRAILER_API_F + mvid + TRAILER_API_S);
    const tdata = await tres.json();
    const tmovies = await tdata.results;
    const tYTlink = `https://youtube.com/embed/${tmovies[0].key}`;
    console.clear();
    const moive_name = smovie.title
      .replaceAll("-", "")
      .replaceAll(":", "")
      .replaceAll(" ", "-")
      .replaceAll("'", "")
      .replaceAll("/", "-")
      .toLowerCase();

    const movie_date = smovie.release_date.slice(0, 4);

    const movie_sQ = (moive_name + " " + movie_date).replaceAll(" ", "-");

    const smovier = await fetch(MOVIE_API + movie_sQ);
    await console.log(smovier.status);
    
    if (smovier.status == 200) {
      const smoview = await smovier.json();
      app.classList.add("movie-page");
      app.innerHTML = `
  
      <div class="movie-banner-wrapper">
        <div class="movie-banner-img-wrapper">
          <picture>
          <source media="(max-width: 600px)" srcset="${
            IMG_API + smovie.poster_path
          }">
          <img src="${IMG_API + smovie.backdrop_path}"  class="movie-banner">
          </picture>
  
          <div class="movie-banner-img-wrapper-overlay"></div>
          <div class="banner-overlab">
            <h1 class="movie-title">${smovie.title}</h1>
            <div class="bo-btns">
            <a class="btn" href=${tYTlink} data-lity>Watch Trailer</a>
            <a class="btn btn-wm" data-lity href=${await smoview.movie} >Watch Movie</a>
          </div>
        </div>
      </div>
  
          
   
  </div>
  
  <div class="movie-info"> 
  <hr>
  <div class="overview_s">
    <h1>Overview :</h1>
    <div class="det-two"> 
      <p class="high ov">${smovie.overview}</p>
      <p class="high rd">Release Date <span> ${smovie.release_date}</span></p>
    </div>  
  </div>
  <hr>
  <div class="genres_s">
      <h1>Genres :</h1>
      <div class="det-two"> 
      ${smovie.genres
        .map(
          (genere) =>
            "<p class='high'>" +
            genere.name +
            "<span> <i class='fa fa-star green-v'></i></span>" +
            "</p>"
        )
        .join("")}
    </div>
  </div>
  
  <hr>
  
  <div class="rate_s">
    <h1>Rating :</h1>
    <div class="det-two"> 
      <p class="high">Vote Average <span class="vote
        ${smovie.vote_average >= 8 ? "green-v" : ""} 
        ${smovie.vote_average < 8 ? "yellow-v" : ""} 
        ${smovie.vote_average <= 5 ? "red-v" : ""} ">
        ${smovie.vote_average * 10 + "%"}</span>
      </p>
      <p class="high">Voters <span>${smovie.vote_count}</span></p>
    </div>
  </div>
  <hr>
          
          `;
    } else {
      app.classList.add("movie-page");
      app.innerHTML = `
  
      <div class="movie-banner-wrapper">
        <div class="movie-banner-img-wrapper">
          <picture>
          <source media="(max-width: 600px)" srcset="${
            IMG_API + smovie.poster_path
          }">
          <img src="${IMG_API + smovie.backdrop_path}"  class="movie-banner">
          </picture>
  
          <div class="movie-banner-img-wrapper-overlay"></div>
          <div class="banner-overlab">
            <h1 class="movie-title">${smovie.title}</h1>
            <div class="bo-btns">
            <a class="btn" href=${tYTlink} data-lity>Watch Trailer</a>
            <a class="btn btn-wm ntav" style="cursor:not-allowed;">Not Available</a>
          </div>
        </div>
      </div>
  
          
   
  </div>
  
  <div class="movie-info"> 
  <hr>
  <div class="overview_s">
    <h1>Overview :</h1>
    <div class="det-two"> 
      <p class="high ov">${smovie.overview}</p>
      <p class="high rd">Release Date <span> ${smovie.release_date}</span></p>
    </div>  
  </div>
  <hr>
  <div class="genres_s">
      <h1>Genres :</h1>
      <div class="det-two"> 
      ${smovie.genres
        .map(
          (genere) =>
            "<p class='high'>" +
            genere.name +
            "<span> <i class='fa fa-star green-v'></i></span>" +
            "</p>"
        )
        .join("")}
    </div>
  </div>
  
  <hr>
  
  <div class="rate_s">
    <h1>Rating :</h1>
    <div class="det-two"> 
      <p class="high">Vote Average <span class="vote
        ${smovie.vote_average >= 8 ? "green-v" : ""} 
        ${smovie.vote_average < 8 ? "yellow-v" : ""} 
        ${smovie.vote_average <= 5 ? "red-v" : ""} ">
        ${smovie.vote_average * 10 + "%"}</span>
      </p>
      <p class="high">Voters <span>${smovie.vote_count}</span></p>
    </div>
  </div>
  <hr>
          
          `;
    }
  };
  getMoviePageat();
} else {
  getMovies();
}
