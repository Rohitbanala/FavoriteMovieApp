const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");
const movies = [];
const renderMovies = (filter = "") => {
  const movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";
  // for(const movie of movies){
  //   const movieEl = document.createElement("li");
  //   movieEl.textContent = movie.info.title;
  //   movieList.append(movieEl);
  // }
  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));
  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement("li");
    // const { info } = movie;
    // const { title: movieTitle } = info;
    let { getFormattedTitle } = movie;
    // getFormattedTitle = movie.getFormattedTitle.bind(movie);
    let text = getFormattedTitle.call(movie) + "-";
    for (const key in movie.info) {
      if (key !== "title") {
        text = text + `- ${key} ${movie.info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};
const addMovieHandler = () => {
  let title = document.getElementById("title").value;
  let extraName = document.getElementById("extra-name").value;
  let extraValue = document.getElementById("extra-value").value;
  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.random(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };
  movies.push(newMovie);
  renderMovies();
  document.getElementById("title").value = "";
  document.getElementById("extra-name").value = "";
  document.getElementById("extra-value").value = "";
};
const searchMovieHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  console.log(filterTerm);
  renderMovies(filterTerm);
};
addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
