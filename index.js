const key = "39925d05"; 

function search() {
  const inputTag = document.getElementById("movieTag");
  const movieName = inputTag.value.trim();

  if (!movieName) {
    alert("Please enter a movie name.");
    return;
  }

  const url = `https://www.omdbapi.com/?apikey=${key}&t=${encodeURIComponent(movieName)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(movie => {
      if (movie.Response === "False") {
        alert("Movie not found!");
        return;
      }

      document.getElementById("title").textContent = movie.Title;
      document.getElementById("year").textContent = `Year: ${movie.Year}`;
      document.getElementById("poster").src = movie.Poster;
      document.getElementById("plot").textContent = `Plot: ${movie.Plot}`;
      document.getElementById("genre").textContent = `Genre: ${movie.Genre}`;
      document.getElementById("actors").textContent = `Actors: ${movie.Actors}`;
      document.getElementById("rating").textContent = `IMDb Rating: ${movie.imdbRating}`;
      document.getElementById("runtime").textContent = `Runtime: ${movie.Runtime}`;
      document.getElementById("released").textContent = `Released: ${movie.Released}`;

      const imdbLink = document.getElementById("imdb-link");
      imdbLink.href = `https://www.imdb.com/title/${movie.imdbID}`;
      imdbLink.style.display = "inline-block";
    })
    .catch(error => {
      console.error("Error fetching movie:", error);
      alert("Something went wrong. Please check your internet or API key.");
    });
}
