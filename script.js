const appTitle = document.getElementById("app-title")
const movieCount = document.getElementById("movie-count")
const movieForm = document.getElementById("movie-form")
const titleInput = document.getElementById("title-input")
const genreInput = document.getElementById("genre-input")
const movieList = document.getElementById("movie-list")
const clearWatchedBtn = document.getElementById("clear-watched-btn")
const filterBtns = document.querySelectorAll(".filter-btn")

console.log(appTitle)
console.log(movieCount)
console.log(movieForm)
console.log(titleInput)
console.log(genreInput)
console.log(movieList)
console.log(clearWatchedBtn)
console.log(filterBtns)

// Change the app title
appTitle.textContent = "My Movie Watchlist"

// Read and log the current count text
console.log("Count says:", movieCount.textContent)

// Update the count text manually (JavaScript will keep this accurate later)
movieCount.textContent = "0 movies"

// .add() puts a class on the element
movieCount.classList.add("active-filter")
// Look at the browser — what changed?

// .remove() takes it off
movieCount.classList.remove("active-filter")

// .toggle() adds if missing, removes if present — one call does both
movieCount.classList.toggle("active-filter")
movieCount.classList.toggle("active-filter")

// getAttribute reads the HTML attribute as it was written in the file
console.log(titleInput.getAttribute("placeholder"))  // → "Movie title..."
console.log(titleInput.getAttribute("type"))         // → "text"
console.log(titleInput.getAttribute("required"))     // → "" (empty string = it exists)

// setAttribute changes or adds an attribute
titleInput.setAttribute("placeholder", "Try: The Matrix")
// Refresh — the placeholder text in the input changed

// removeAttribute removes it entirely
titleInput.removeAttribute("required")
// The input is no longer required — blank submissions won't be blocked
titleInput.setAttribute("required", "")  // put it back
// What is the difference between getAttribute("value") and .value on an input?
// getAttribute("value") → Checking HTML attributes like type, placeholder, required
// .value               → Getting the current value of the input field

movieForm.addEventListener("submit", (event) => {
  // 1. Stop the browser from reloading the page
  //    Without this line, the page refreshes on every submit and you lose everything
  event.preventDefault()

  // 2. Read the movie title from the input — use .value, not getAttribute
  const title = titleInput.value

  // 3. Read the genre the same way
  const genre = genreInput.value

  // 4. Log both values to the console
  //    Type a title and genre, submit — confirm you see them in DevTools
  console.log("Title:", title)
  console.log("Genre:", genre)
  // 5. At the end, reset the form so the inputs are blank for the next entry
  movieForm.reset()
  //    .reset() clears all inputs in the form at once — no need to blank them one by one

  // 6. Don't build cards yet — that's Phase 4
})