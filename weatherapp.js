const api = {
  key: "dd4bc95d0ece3720f73df6eaf432ff9d",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

  let icon = document.querySelector('.icon');
  icon.innerHTML = ("<img src = 'http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png'>");

  let description = document.querySelector('.current .description');
  description.innerText = weather.weather[0].description;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_max)}°F / ${Math.round(weather.main.temp_min)}°F`;
  
  let feels_like = document.querySelector('.current .feels_like');
  feels_like.innerText = `${"Feels Like: " + Math.round(weather.main.feels_like)}°F`;

  let humidity = document.querySelector('.current .humidity');
  humidity.innerText = `${"Humidity: " + Math.round(weather.main.humidity)}%`;

  let wind = document.querySelector('.current .wind');
  wind.innerText = `${"Wind Speed: " + Math.round(weather.wind.speed)} mph`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${month} ${date}, ${year}`;
}
