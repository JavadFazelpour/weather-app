const API_ENDPOINT =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const UNIT_GROUP = `metric`;
const API_KEY = `U2N6AF5EBPQFA4E8HYJRQHKWM`;
async function getWeatherData(city) {
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
