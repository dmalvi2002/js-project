/**
 * Weather App
 * DONE: Complete getWeatherData() to return json response Promise
 * DONE: Complete searchCity() to get user input and get data using getWeatherData()
 * DONE: Complete showWeatherData() to set the data in the the html file from response
 */

// Selectors
const cityName = document.getElementById("city-name");
const weatherType = document.getElementById("weather-type");
const temperature = document.getElementById("temp");
const minTemp = document.getElementById("min-temp");
const maxTemp = document.getElementById("max-temp");

// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this:
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */
let data;
getWeatherData = (city) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial`;
  //HINT: Use template literals to create a url with input and an API key
  //CODE GOES HERE
  fetch(URL)
    .then((res) => res.json())
    .then((d) => {
      data = d;
      console.log(data);
      showWeatherData(data);
    });
};
/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */
searchCity = () => {
  const city = document.getElementById("city-input").value;
  // CODE GOES HERE
  getWeatherData(city);
};

/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
showWeatherData = (weatherData) => {
  //CODE GOES HERE
  let temp = weatherData.main;
  let type = weatherData.weather[0];
  console.log(temp);
  cityName.innerText = weatherData.name;
  weatherType.innerText = type.main;
  temperature.innerText = temp.temp;
  minTemp.innerText = temp.temp_min;
  maxTemp.innerText = temp.temp_max;
};
