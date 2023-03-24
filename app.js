const selectStateForm = document.getElementById('states');
const searchStateForm = document.getElementById('inputField');
const API_KEY = '4485c2dd8e2b33cd3309b3c3f0fde461'
// URL (required), options (optional)
// fetch('https://api.openweathermap.org/data/2.5/weather?q=ElPaso&APPID=4485c2dd8e2b33cd3309b3c3f0fde461',)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(response) {
//         console.log(response);
//         // document.querySelector('.content').textContent = response.main.temp
//         printWeather(response);
//       })
//     .catch(function (err) {
//         console.log('error')
//     });

// printWeather = function (data) {
//     document.querySelector('.content').textContent = data.main.temp
// }

function getWeather(location) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=4485c2dd8e2b33cd3309b3c3f0fde461`,)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      printWeather(response, location);
    })
    .then(function (response) {
      getForecast(selectStateForm.value);
    })
    .catch(function (err) {
      console.log('error')
      document.querySelector('#stateName').textContent = "Not Found"
    });
}
function getForecast(location) {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      printForecast(response, location);
    })
}
printWeather = function (data, location) {
  document.querySelector('#stateName').textContent = location
  document.querySelector('#tempNum').textContent = Math.round((data.main.temp * 9 / 5) - 459.67) + '°F'
  // document.querySelector('#cloudsInfo').textContent = data.clouds.all
  document.querySelector('#cloudsIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png?size=1228`
  document.querySelector('#feelsNum').textContent = Math.round((data.main.feels_like * 9 / 5) - 459.67) + '°F'
  let unixTimestamp = data.dt
  let dateObj = new Date(unixTimestamp * 1000)
  const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
  const dateString = formatter.format(dateObj); // Convert to readable string
  document.querySelector('#lastUpdatedInfo').textContent = dateString
}
printForecast = function (data, location) {
  for (let i = 0; i <= 7; i++) {
    const forecastCard = document.createElement('div');
    forecastCard.classList = 'forecastCard';
    const forecastClouds = document.createElement("img");
    forecastClouds.classList = 'forecast-cloud'
    forecastClouds.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`
    const forecastElement = document.createElement("div");
    forecastElement.classList = "forecast-element";
    // forecastElement.innerHTML = data.list[i]
    forecastElement.appendChild(forecastClouds);
    const forecastTemp = document.createElement("div");
    forecastTemp.classList = 'forecast-temp';
    forecastTemp.innerHTML = Math.round((data.list[i].main.temp * 9 / 5) - 459.67) + '°F'
    const dayofweekEle = document.createElement("div");
    dayofweekEle.classList = 'dayofweek';
    const timestamp2 = data.list[i].dt
    console.log(timestamp2)
    // const timestamp = data.list[i].dt;
    // const dateObj = new Date(timestamp * 1000);
    // const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dateObj.getUTCDay()];
    // console.log('Date:', dateObj.toISOString().slice(0, 10));
    // console.log('Day of the week:', dayOfWeek);
    const timestamp = 1679637600;
    const dateObj = new Date(timestamp * 1000);
    const dateStr = dateObj.toUTCString();
    console.log(dateStr);
    dayofweekEle.innerHTML = dateStr
    forecastCard.append(forecastTemp, forecastClouds, dayofweekEle)
    document.querySelector('#forecastBody').appendChild(forecastCard);
  }
}

getWeather(selectStateForm.value);
