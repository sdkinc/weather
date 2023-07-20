const temperatureElement = document.getElementById("temperature");
const placeElement = document.getElementById("place");
const windspeedElement = document.getElementById("windspeed");
const imgWinddirectionElement = document.getElementById("img-winddirection");
const imgWeathercodeElement = document.getElementById("img-weathercode");
const txtWeathercodeElement = document.getElementById("txt-weathercode");

async function getGeoFromAPI() {
    const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const obj = await res.json();
    const { longitude, latitude, city } = obj;
    placeElement.innerText = city;
    getWeatherByLocation(latitude, longitude);
}

async function getWeatherByLocation(longitude, latitude) {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weather = await res.json();
    console.log(weather);
    const { temperature, windspeed, winddirection, is_day, time, weathercode } = weather.current_weather;
    temperatureElement.innerText = `${temperature} ºC`;
    windspeedElement.innerText = `${windspeed} m/s`;
    console.log(weathercode);
    console.log(getWEatherDescriptionByWeatherCode(weathercode));
    const {textDescr,icon} = getWEatherDescriptionByWeatherCode(weathercode);
    txtWeathercodeElement.innerText = textDescr;
    imgWeathercodeElement.src = icon;
    console.log(winddirection);
    imgWinddirectionElement.style.transform = `rotate(${winddirection}deg)`;


}

function getWEatherDescriptionByWeatherCode(weatherCode) {
    switch (Number(weatherCode)) {
        case 0: return { "textDescr": "Clear sky", "icon": "https://openweathermap.org/img/wn/01d@2x.png" };
        case 1: return { "textDescr": "Mainly clear", "icon": "https://openweathermap.org/img/wn/04d@2x.png" };
        case 2: return { "textDescr": "Partly cloudy", "icon": "https://openweathermap.org/img/wn/04d@2x.png" };
        case 3: return { "textDescr": "Overcast", "icon": "https://openweathermap.org/img/wn/04d@2x.png" };
        case 48: return { "textDescr": "Fog and depositing rime fog", "icon": "https://openweathermap.org/img/wn/50d@2x.png" };
        case 45: return { "textDescr": "Fog and depositing rime fog", "icon": "https://openweathermap.org/img/wn/50d@2x.png" };
        case 51: return { "textDescr": "Drizzle: light", "icon": "https://openweathermap.org/img/wn/09d@2x.png" };
        case 53: return { "textDescr": "Drizzle: moderate", "icon": "https://openweathermap.org/img/wn/09d@2x.png" };
        case 55: return { "textDescr": "Drizzle: dense intensity", "icon": "https://openweathermap.org/img/wn/09d@2x.png" };
        case 57: return { "textDescr": "Freezing Drizzle: light", "icon": "https://openweathermap.org/img/wn/09d@2x.png" };
        case 56: return { "textDescr": "Freezing Drizzle: dense intensity", "icon": "https://openweathermap.org/img/wn/09d@2x.png" };
        case 61: return { "textDescr": "Rain: slight", "icon": "https://openweathermap.org/img/wn/10d@2x.png" };
        case 63: return { "textDescr": "Rain: moderate", "icon": "https://openweathermap.org/img/wn/10d@2x.png" };
        case 65: return { "textDescr": "Rain: heavy intensity", "icon": "https://openweathermap.org/img/wn/10d@2x.png" };
        case 66: return { "textDescr": "Freezing Rain: light", "icon": "https://openweathermap.org/img/wn/13d@2x.png" };
        case 67: return { "textDescr": "Freezing Rain: heavy intensity", "icon": "https://openweathermap.org/img/wn/13d@2x.png" };
        case 71: return { "textDescr": "Snow fall: slight", "icon": "https://openweathermap.org/img/wn/13d@2x.png" };
        case 73: return { "textDescr": "Snow fall: moderate", "icon": "https://openweathermap.org/img/wn/13d@2x.png" };
        case 75: return { "textDescr": "Snow fall: heavy intensity", "icon": "https://openweathermap.org/img/wn/13d@2x.png" };
        case 77: return { "textDescr": "Snow grains", "icon": "https://openweathermap.org/img/wn/13d@2x.png" };
        case 80: return { "textDescr": "Rain showers: slight", "icon": "https://openweathermap.org/img/wn/09d@2x.png" };
        case 81: return { "textDescr": "Rain showers: moderate", "icon": "https://openweathermap.org/img/wn/09d@2x.png" };
        case 82: return { "textDescr": "Rain showers: violent", "icon": "https://openweathermap.org/img/wn/09d@2x.png" };
        case 85: return { "textDescr": "Snow showers slight and heavy", "icon": "https://openweathermap.org/img/wn/13d@2x.png" };
        case 86: return { "textDescr": "Snow showers slight and heavy", "icon": "https://openweathermap.org/img/wn/13d@2x.png" };
        case 95: return { "textDescr": "Thunderstorm: Slight or moderate", "icon": "https://openweathermap.org/img/wn/11d@2x.png" };
        case 96: return { "textDescr": "Thunderstorm with slight and heavy hail", "icon": "https://openweathermap.org/img/wn/11d@2x.png" };
        case 99: return { "textDescr": "Thunderstorm with slight and heavy hail", "icon": "https://openweathermap.org/img/wn/11d@2x.png" };
        default : return { "textDescr": "Clear sky", "icon": "https://openweathermap.org/img/wn/01d@2x.png" };
    }
}

getGeoFromAPI();