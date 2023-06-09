const API_KEY = '4485c2dd8e2b33cd3309b3c3f0fde461'

function getWeather(location) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=4485c2dd8e2b33cd3309b3c3f0fde461`,)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      printWeather(response, location);
      getForecast(location);
    })
    .catch(function (err) {
      console.log('error')
      document.querySelector('#stateName').textContent = "Not Found"
    });
}
function getForecast(location) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=4485c2dd8e2b33cd3309b3c3f0fde461`)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const list = response.list.filter(item => {
        const date = new Date(item.dt * 1000);
        const today = new Date();
        // ********** WHAT IS THIS??? **********
        // return date.getDate() === today.getDate() + 1 || 
        //      date.getDate() === today.getDate() + 2 || 
        //      date.getDate() === today.getDate() + 3 || 
        //      date.getDate() === today.getDate() + 4 || 
        //      date.getDate() === today.getDate() + 5 || 
        //      date.getDate() === today.getDate() + 6 || 
        //      date.getDate() === today.getDate() + 7 || 
        //      date.getDate() === today.getDate() + 8;
        return date.getDate()
      });
      printForecast(response, list);
    })
}
printWeather = function (data, location) {
  document.querySelector('#stateName').textContent = location
  document.querySelector('#tempNum').textContent = Math.round((data.main.temp * 9 / 5) - 459.67) + '°'
  // document.querySelector('#cloudsInfo').textContent = data.clouds.all
  document.querySelector('#cloudsIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
  document.querySelector('#feelsNum').textContent = Math.round((data.main.feels_like * 9 / 5) - 459.67) + '°'
  let unixTimestamp = data.dt
  let dateObj = new Date(unixTimestamp * 1000)
  const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
  const dateString = formatter.format(dateObj); // Convert to readable string
  document.querySelector('#lastUpdatedInfo').textContent = dateString
}
printForecast = function (data, list) {
  const forecast = document.querySelector('#forecast')
  while (forecast.firstChild) {
    forecast.removeChild(forecast.firstChild);
  }
  for (let i = 0; i <= 5; i++) {
    // make card
    const forecastCard = document.createElement('div');
    forecastCard.classList = 'forecastCard';

    // get cloud info
    const forecastClouds = document.createElement("img");
    forecastClouds.classList = 'forecast-cloud'
    forecastClouds.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`

    // get temp info
    const forecastTemp = document.createElement("div");
    forecastTemp.classList = 'forecast-temp';
    forecastTemp.innerHTML = Math.round((data.list[i].main.temp * 9 / 5) - 459.67) + '°'

    // get day of the week
    const dayofweekEle = document.createElement("div");
    dayofweekEle.classList = 'dayofweek';

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // generate list
    const today = new Date();
    document.querySelector('#dayOfWeek').innerHTML = daysOfWeek[today.getDay()]
    const forecastList = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(today.getDate() + i);
  
      const dayOfWeek = daysOfWeek[date.getDay()];
  
      if (dayOfWeek !== list[list.length - 1].dayOfWeek && dayOfWeek !== daysOfWeek[today.getDay()]) {
        forecastList.push(dayOfWeek);
      }
    }
    dayofweekEle.innerHTML = forecastList[i]

    // append created elements to card and then card to HTML element
    forecastCard.append(dayofweekEle, forecastTemp, forecastClouds)
    document.querySelector('#forecast').appendChild(forecastCard);
  }
}

// makeForecastCard = function (data) {

// }

getWeather('El Paso');
