var searchBox = document.querySelector("#search-input")
var currentWeather = document.querySelector(".current-weather")
var dailyWeather = document.querySelector(".daily-weather")

searchBox.addEventListener('keypress', function(key) {
  if (key.keyCode === 13 && searchBox.value != "") {
    place = searchBox.value
    resetWeatherHeader()
    getWeather(searchBox.value)
  } 
})

function getWeather(location) {
  fetch('https://blooming-island-81872.herokuapp.com/api/v1/forecast?location=' + location)
    .then(response => {return response.json()})
    .then(data => {buildService(data)})
    .then(buildDailyForecast)
    .then(buildCurrentForecast)
  interval = setInterval(moveSearchBox, 30)
  document.querySelector("#weather-header").innerHTML += `${capitalizeSearch(location)}`
}

function searchLocation() {
  searchBox.value
}

function buildService (raw_forecast) {
  service = {
    current: raw_forecast["data"]["attributes"]["predict"]["currently"],
    daily: raw_forecast["data"]["attributes"]["predict"]["daily"]["data"]
  }
}


function parseDate(timestamp) {
    let date = new Date(timestamp * 1000)
    return date.toLocaleDateString('en-us', { weekday: 'long' })
}

function capitalizeSearch(search) {
  let splitSearch = search.split(",");
  let city = splitSearch[0].charAt(0).toUpperCase() + splitSearch[0].slice(1);
  let state = ", " + splitSearch[1].toUpperCase();
  return " in " + city + state
}  
  
// div builds
  function buildCurrentForecast() {
    let currentForecast = document.querySelector(".current-forecast")
    let weather = service.current
    currentForecast.innerHTML = `
    <p>Current Temperature: ${weather.apparentTemperature}<p>
    <p>Chance of Rain: ${weather.precipProbability} </p>
    <p>Windspeed: ${weather.windSpeed} mph</p>
    `
    showCurrentWeather()
  }
  
  function buildDailyForecast() {
    let sevenDay = service.daily.slice(1,7)
    sevenDay.forEach(day => {
      let date = parseDate(day.time)
      dailyWeather.innerHTML += `
        <h3>${date}</h3>
        <div class="daily-forecast">
          <p>${day.summary}</p>
          <p>High: ${day.apparentTemperatureHigh}</p>
          <p>Low: ${day.apparentTemperatureLow}</p>
        </div>
      `})
    showDailyWeather()
  }

// page renders
function showCurrentWeather() {
  currentWeather.style.display = 'inline' // 'block'
}

function showDailyWeather() {
  dailyWeather.style.display = 'inline' // 'block'
}

// animations 
function hideSearchBox() {
  searchBox.style.display = 'none';
}

var pos = 45;
function moveSearchBox() {
  let searchDiv = document.querySelector('.search-box')
  if (pos === 60) {
    clearInterval(interval)
  } else if (pos < 70){
    pos++
    searchDiv.style.bottom = pos + 'vh'
  }
}

function resetWeatherHeader() {
  document.querySelector("#weather-header").innerHTML =  "Current Weather"
}
// bad code? - written then abandoned - saved for review 

// api authorization 
// function setKey() {
//   let email = "?email=email&";
//   let password = "password=password&";
//   let confirm = "confirm_password=password";
//   let endpoint = "api/v1/users";
//   let params = {method: "POST"};
//   fetch('https://blooming-island-81872.herokuapp.com/' + endpoint + email + password + confirm, params)
//     .then(response => {things = response.json()})
// }

// function getBackground() {
//   // let endpoint = "api/v1/backgrounds?location="
//   // let key = "&api_key=e7c8c4f1-0ef9-4c15-91ef-b3e28ebdf111"
//   let headers = { headers: {"Authorization" : "563492ad6f91700001000001e74b80b6e5ac4e5a9e9520a4f168f762"}}
//   // fetch('https://blooming-island-81872.herokuapp.com/' + endpoint + place + key, headers)
//   fetch('https://api.pexels.com/v1/search?query=denver,co', headers)
//     .then(response => {return response.json()})
//     .then(data => {things = data})

//     // .then(data => {changeBackground(data.photo)})
// }

// function changeBackground(url) {
//   document.querySelector("body").style.backgroundImage = `url(${url})`
// }