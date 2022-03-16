let todayWeather;
let todayTemp;

async function getWeather() {
  try {
    let apiResponse = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?lat=33.5097&lon=126.5219&appid=6f52dd6e18a33b27eeb952e9a1bc76f5&units=metric"
    );
    let result = await apiResponse.json();
    todayWeather = result.weather[0].main;
    todayTemp = result.main.temp;
    console.log(todayWeather);
  } catch (error) {
    console.log(error);
  }

  if (todayWeather.includes("Thunderstorm")) {
    document.getElementById("weather-span").innerHTML =
      "<div class='icon thunder-storm'><div class='cloud'></div><div class='lightning'><div class='bolt'></div><div class='bolt'></div></div></div>";
  } else if (todayWeather.includes("Clear")) {
    document.getElementById("weather-span").innerHTML =
      "<div class='icon sunny'><div class='sun'><div class='rays'></div></div></div>";
  } else if (todayWeather.includes("Clouds") || todayWeather.includes("Mist")) {
    document.getElementById("weather-span").innerHTML =
      "<div class='icon cloudy'><div class='cloud'></div><div class='cloud'></div></div>";
  } else if (todayWeather.includes("Snow")) {
    document.getElementById("weather-span").innerHTML =
      "<div class='icon flurries'><div class='cloud'></div><div class='snow'><div class='flake'></div><div class='flake'></div></div></div>";
  } else if (todayWeather.includes("Rain")) {
    document.getElementById("weather-span").innerHTML =
      "<div class='icon rainy'><div class='cloud'></div><div class='rain'></div></div>";
  }
  let temp = document.createElement("span");
  temp.classList.add("temperature");
  temp.innerText = Math.round(todayTemp) + "\xB0C";

  document.getElementById("weather-span").appendChild(temp);
}

getWeather();
