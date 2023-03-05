const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied"); //querySelectorAll puts elements in node list which is like an array
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  //   console.log(selectedSeats);

  //copy selected seats into an arr(converting node list into arr)
  //map through array
  //return a new array of indexes

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  //storig in local stprage(key-value pair)
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); //JSON.stringify==turning into string
  console.log(seatsIndex);

  const selectedSeatsCount = selectedSeats.length;
  //   console.log(selectedSeatsCount);
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//get data from local storage and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")); //JSON.parse is opposite of JSON.stringify
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  //   console.log(selectedSeats);
}
// console.log(typeof ticketPrice);
//movie select element
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
//seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // console.log(e.target);
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

//initial count and total set
updateSelectedCount();
