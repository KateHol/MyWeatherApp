let now = new Date();
let currentDay = document.querySelector("#day");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
currentDay.innerHTML = day;

function displayForecast(){
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHtml = `<div class = "row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function(day){
  forecastHtml = forecastHtml + `
    <div class="col-4">
    <div class="weather-forecast-date"> ${day} </div>
    <img src="http://openweathermap.org/img/wn/01d@2x.png" id ="weather-icon" alt="" width="36"/>
   <div class="weather-forecast-temperature"> 
    <span class="weather-forecast-temperature-max">18°</span>
    <span class="weather-forecast-temperature-min">  12°</span> </div>
  </div>
`;
});
forecastHtml = forecastHtml + `</div>`;
forecastElement.innerHTML = forecastHtml

}

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let dateElement = document.querySelector("#dateTime");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
//let hours = document.querySelector("#hours");
//let minutes = document.querySelector("#minutes");
//hours.innerHTML = now.getHours();

//minutes.innerHTML = now.getMinutes();

let date = document.querySelector("#date");
date.innerHTML = now.getDate();

let monthes = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = document.querySelector("#month");
month.innerHTML = monthes[now.getMonth()];

// current position weather

let currentB = document.querySelector("#currentB");
currentB.addEventListener("click", currentPositionWeather);

function currentPositionWeather() {
  function displayTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    currentCity.innerHTML = response.data.name;
    temp.innerHTML = temperature;
  }

  function getPosition(position) {
    let key = "d773f6cbefee55a5ba39025c971004bf";
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}`;
    axios.get(url).then(displayTemp);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentCity = document.querySelector("#hometown");
let temp = document.querySelector("#dayTemp");
let sky = document.querySelector("#sky");
let rain = document.querySelector("#rain");
let wind = document.querySelector("#wind");
let icon = document.querySelector("#weather-icon");

//celsiusTemperature = response.data.main.temp;

function displayWeather(response) {
  document.querySelector("#hometown").innerHTML = response.data.name;
  
  
  celsiusTemperature = response.data.main.temp;
  
  document.querySelector("#dayTemp").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#rain").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;
  icon.setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function search(city) {
  let apiKey = "d773f6cbefee55a5ba39025c971004bf";
  let Apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(Apiurl).then(displayWeather);
}
let city = document.querySelector("#inCity").value;

function pressSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inCity");
  search(cityInput.value);
}


function displayFahrenheit(event){
event.preventDefault();
let tempElement = document.querySelector("#dayTemp");

celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature* 9/5)+ 32;
tempElement.innerHTML = Math.round(fahrenheitTemperature);
}



function displayCelsius(event){
event.preventDefault();
let tempElement = document.querySelector("#dayTemp");
tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#form");
form.addEventListener("submit", pressSubmit);


let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click",displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click",displayCelsius);

search("Kyiv");
displayForecast();