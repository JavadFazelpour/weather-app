import "../css/styles.css";
import "../css/weather-icons.min.css";
import getWeatherData from "./api.js";

const cityTitle = document.querySelector("#title");
const currentCondition = document.querySelector("#current-condition");
const tempHeader = document.querySelector("#temp");
const uvIndex = document.querySelector("#uv-index");
const humidity = document.querySelector("#humidity");
const weatherCardForecast = document.querySelector(".weather-card.forecast");
const searchInput = document.querySelector("#city");
const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const cityName = searchInput.value.trim();
  if (cityName) {
    try {
      const data = await getWeatherData(cityName);
      updateDOM(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  } else {
    console.warn("Please enter a city name.");
  }
});

function updateDOM(data) {
  console.log(data);
  const { city, currentConditionObj } = processFetchedData(data);
  updateCurrentWeather(city, currentConditionObj);
  processFutureWeatherData(data);
}

function updateCurrentWeather(city, currentConditionObj) {
  cityTitle.textContent = `Current Weather in ${city}`;
  currentCondition.textContent = currentConditionObj.conditions;
  tempHeader.textContent = `${currentConditionObj.temp} °C`;
  uvIndex.textContent = `${currentConditionObj.uvindex}`;
  humidity.textContent = `${currentConditionObj.humidity}%`;
}

function processFetchedData(data) {
  const address = data.resolvedAddress;
  const city = address.split(",")[0];
  const currentConditionObj = data.currentConditions;
  return { city, currentConditionObj };
}

function processFutureWeatherData(data) {
  const days = data.days;
  for (let index = 1; index < days.length; index++) {
    const day = days[index];
    const forecastDiv = document.createElement("div");
    forecastDiv.className = "forecast__day";
    const date = document.createElement("p");
    const temperature = document.createElement("p");
    const condition = document.createElement("p");
    const humidity = document.createElement("i");
    humidity.className = "wi wi-humidity";
    date.textContent = day.datetime;
    temperature.textContent = `${day.temp} °C`;
    condition.textContent = day.conditions;
    humidity.textContent = `   ${day.humidity}%`;
    forecastDiv.appendChild(date);
    forecastDiv.appendChild(temperature);
    forecastDiv.appendChild(condition);
    forecastDiv.appendChild(humidity);
    weatherCardForecast.appendChild(forecastDiv);
  }
}
