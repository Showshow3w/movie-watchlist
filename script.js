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
// --- Phase 4: Build a Card ---
function createMovieCard(title, genre) {
  // 1. Create the outer <li>
  const li = document.createElement("li")
  li.classList.add("movie-card")
  li.setAttribute("data-genre", genre)

  // 2. Create the info div with two spans
  const infoDiv = document.createElement("div")
  infoDiv.classList.add("movie-info")

  const titleSpan = document.createElement("span")
  titleSpan.classList.add("movie-title")
  titleSpan.textContent = title

  const genreSpan = document.createElement("span")
  genreSpan.classList.add("movie-genre")
  genreSpan.textContent = genre || "No genre"

  infoDiv.appendChild(titleSpan)
  infoDiv.appendChild(genreSpan)

  // 3. Create the actions div with two buttons
  const actionsDiv = document.createElement("div")
  actionsDiv.classList.add("movie-actions")

  const watchBtn = document.createElement("button")
  watchBtn.classList.add("watch-btn")
  watchBtn.textContent = "Mark Watched"

  const removeBtn = document.createElement("button")
  removeBtn.classList.add("remove-btn")
  removeBtn.textContent = "Remove"

  actionsDiv.appendChild(watchBtn)
  actionsDiv.appendChild(removeBtn)

  // 4. Append both divs into the <li>
  li.appendChild(infoDiv)
  li.appendChild(actionsDiv)

  // 5. Return the card — NOT appending here, that's the caller's job
  return li
}
//phase 3 
movieForm.addEventListener("submit", (event) => {
  // 1. Stop the browser from reloading the page
  //    Without this line, the page refreshes on every submit and you lose everything
  event.preventDefault()

  // 2. Read the movie title from the input — use .value, not getAttribute
  const title = titleInput.value

  // 3. Read the genre the same way
  const genre = genreInput.value
  const card = createMovieCard(title, genre)
  // 4. Log both values to the console
  //    Type a title and genre, submit — confirm you see them in DevTools
  movieList.appendChild(card)
  updateCount()  
  // 5. At the end, reset the form so the inputs are blank for the next entry
  movieForm.reset()
  //    .reset() clears all inputs in the form at once — no need to blank them one by one

  // 6. Don't build cards yet — that's Phase 4
})

// --- Phase 5: Button Behavior (Event Delegation) ---

// Why do we attach the listener to #movie-list instead of to each button?
// Answer: Buttons are created dynamically — they don't exist when the page loads.
//         Attaching to the list means ALL future buttons are covered automatically.
//
// What does event.target.closest("li") do?
// Answer: Walks UP the DOM tree from the clicked button until it finds
//         the nearest <li> — giving us the whole card element.

movieList.addEventListener("click", (event) => {
  // 1. If the click was not on a button, ignore it
  if (event.target.tagName !== "BUTTON") return

  // 2. Get the whole card the button lives in
  const card = event.target.closest("li")

  // 3. Was it the Remove button?
  if (event.target.classList.contains("remove-btn")) {
    card.remove()
    updateCount()   
    // TODO: call updateCount() here — Phase 6
    // TODO: call applyFilter(currentFilter) here — Phase 6
  }

  // 4. Was it the Watch button?
  if (event.target.classList.contains("watch-btn")) {
    card.classList.toggle("watched")

    // Update button text based on new state
    if (card.classList.contains("watched")) {
      event.target.textContent = "Unmark Watched"
    } else {
      event.target.textContent = "Mark Watched"
    }
    // TODO: call applyFilter(currentFilter) here — Phase 6
  }
})
// --- Phase 6A: Keep the Count Accurate ---

function updateCount() {
  // 1. Count all cards currently in the list
  const total = movieList.querySelectorAll(".movie-card").length

  // 2. Update the header — handle singular vs plural
  if (total === 1) {
    movieCount.textContent = "1 movie"
  } else {
    movieCount.textContent = total + " movies"
  }
}