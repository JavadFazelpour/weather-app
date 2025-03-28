let UNIT_GROUP = `metric`;
const unitCheckbox = document.querySelector("#unit-toggle-checkbox");
unitCheckbox.addEventListener("change", setUnit);
let unit = "";
const API_ENDPOINT =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const API_KEY = `U2N6AF5EBPQFA4E8HYJRQHKWM`;
window.addEventListener("load", () => {
  setUnit();
});
function setUnit() {
  if (unitCheckbox.checked === false) {
    unit = "°C";
    UNIT_GROUP = "metric";
  } else {
    unit = "°F";
    UNIT_GROUP = "us";
  }
}

async function getWeatherData(city) {
  setUnit();
  const URL = `${API_ENDPOINT}${city}?unitGroup=${UNIT_GROUP}&key=${API_KEY}&contentType=json`;
  const OPTIONS = {
    method: "GET",
    headers: {},
    mode: "cors",
  };
  const response = await fetch(URL, OPTIONS);
  return response.json();
}

export default getWeatherData;
