var searchBox = document.querySelector("#search-input")

searchBox.addEventListener('keypress', function(key) {
  if (key.keyCode === 13) {
    getWeather()
  } 
})

function getWeather() {
  fetch('https://blooming-island-81872.herokuapp.com/api/v1/forecast?location=denver,co')
    .then(response => {return response.json()})
    .then(data => {buildService(data)})
}

function searchLocation() {
  searchBox.value
}

function buildService (raw_forecast) {
  service = {
    current: raw_forecast["data"]["attributes"]["predict"]["currently"]
  }
}

function hideSearchBox() {
  searchBox.style.display = 'none';
}

