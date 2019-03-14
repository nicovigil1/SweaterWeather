var searchBox = document.querySelector("#search-input")
var currentWeather = document.querySelector(".current-weather")

searchBox.addEventListener('keypress', function(key) {
  if (key.keyCode === 13) {
    getWeather()
  } 
})

function getWeather() {
  fetch('https://blooming-island-81872.herokuapp.com/api/v1/forecast?location=denver,co')
    .then(response => {return response.json()})
    .then(data => {buildService(data)})
    .then(showCurrentForecast)
  moveSearchBox()
  setTimeout(showCurrentWeather, 700)
}

function searchLocation() {
  searchBox.value
}

function buildService (raw_forecast) {
  service = {
    current: raw_forecast["data"]["attributes"]["predict"]["currently"]
  }
}




// page renders
function showCurrentForecast() {
  let currentForecast = document.querySelector(".current-forecast")
  let weather = service.current
  currentForecast.innerHTML = `
  <p>Current Temperature: ${weather.apparentTemperature}<p>
  <p>Chance of Rain: ${weather.precipProbability} </p>
  <p>Windspeed: ${weather.windSpeed} mph</p>
  `
}

// animations 
function hideSearchBox() {
  searchBox.style.display = 'none';
}

function showCurrentWeather() {
  currentWeather.style.display = 'inline'
}

var pos = 45;
function moveSearchBox() {
  let searchDiv = document.querySelector('.search-box')
  var interval = setInterval(moveSearchBox, 40)
  if (pos === 60) {
    clearInterval(interval)
  } else {
    pos++
    searchDiv.style.bottom = pos + 'vh'
  }
}