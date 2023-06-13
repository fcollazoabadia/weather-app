
var apiKey = 'bf0f7985b6acec17e7b656cb46548c35';
var searchEl = document.getElementById('searchBar');
var searchBtn = document.getElementById('searchBtn');

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function getCoords() {
  var cityName = searchEl.value;
  var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      var lat = data[0].lat
      var lon = data[0].lon
      console.log(lat, lon)
    
      getWeather(lat, lon)

    })

}

function getWeather(lat, lon) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
 
  fetch(requestUrl)
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {

      // console.log(data)

      const currentWeather = data.list[0];

      const cardHtml = `
      <div class="col-12 bg-light primary rounded border border-dark">
        <h2 class="fw-bold">${data.city.name} </h2>
        <p>Temp: ${currentWeather.main.temp}°F</p>
        <p>Wind: ${currentWeather.wind.speed} MPH</p>
        <p>Humidity: ${currentWeather.main.humidity}%</p>
      </div>
      `
      $('#todays-weather').html(cardHtml)
      const weatherArr = data.list;
      for (let i = 7; i < weatherArr.length; i += 8) {
        const today = weatherArr[i];

        const iconUrl = `https://openweathermap.org/img/w/${today.weather[0].icon}.png`
        console.log(today);
        
        const weatherDayCard = `
        <div class="col-sm-2 bg-dark text-white rounded">
          <p>${today.dt_txt}</p>
          <img src=${iconUrl} />
          <p>Temp: ${today.main.temp}°F</p>
          <p>Wind: ${today.wind.speed} MPH</p>
          <p>Humidity: ${today.main.humidity}%</p>
        </div>
        `

        $('#5-day-forecast').append(weatherDayCard);

      };


    })
}

searchBtn.addEventListener("click", getCoords)