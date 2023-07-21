const temperatureElement = document.getElementById("temperature");
const placeElement = document.getElementById("place");
const windspeedElement = document.getElementById("windspeed");
const imgWinddirectionElement = document.getElementById("img-winddirection");
const imgWeathercodeElement = document.getElementById("img-weathercode");
const txtWeathercodeElement = document.getElementById("txt-weathercode");

async function getGeoFromAPI() {
    const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const obj = await res.json();
    const { longitude, latitude, city, country_code } = obj;
    placeElement.textContent += ` ${city}, ${country_code}`;
    getWeatherByLocation(longitude,latitude);
}

async function getWeatherByLocation(longitude, latitude) {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&windspeed_unit=ms`);
    const weather = await res.json();
    console.log(weather);
    const { temperature, windspeed, winddirection, is_day, time, weathercode } = weather.current_weather;
    temperatureElement.textContent += ` ${temperature} ºC`;
    windspeedElement.textContent += `${windspeed} m/s`;
    console.log(weathercode);
    console.log(getWEatherDescriptionByWeatherCode(weathercode));
    const { textDescr, icon } = getWEatherDescriptionByWeatherCode(weathercode);
    txtWeathercodeElement.innerText = textDescr;
    imgWeathercodeElement.src = icon;
    console.log(winddirection);
    imgWinddirectionElement.style.transform = `rotate(${winddirection}deg)`;
}

function getWEatherDescriptionByWeatherCode(weatherCode) {
    switch (Number(weatherCode)) {
        case 0: return { "textDescr": "Clear sky", "icon": "https://cdn-icons-png.flaticon.com/128/4814/4814268.png" };
        case 1: return { "textDescr": "Mainly clear", "icon": "https://cdn-icons-png.flaticon.com/128/1163/1163661.png" };
        case 2: return { "textDescr": "Partly cloudy", "icon": "https://cdn-icons-png.flaticon.com/128/1163/1163624.png" };
        case 3: return { "textDescr": "Overcast", "icon": "https://cdn-icons-png.flaticon.com/128/4814/4814293.png" };
        case 48: return { "textDescr": "Fog and depositing rime fog", "icon": "https://cdn-icons-png.flaticon.com/128/5243/5243833.png" };
        case 45: return { "textDescr": "Fog and depositing rime fog", "icon": "https://cdn-icons-png.flaticon.com/128/5243/5243833.png" };
        case 51: return { "textDescr": "Drizzle: light", "icon": "https://img.icons8.com/?size=1x&id=NjsqgHjrCASE&format=png" };
        case 53: return { "textDescr": "Drizzle: moderate", "icon": "https://img.icons8.com/?size=1x&id=NjsqgHjrCASE&format=png" };
        case 55: return { "textDescr": "Drizzle: dense intensity", "icon": "https://img.icons8.com/?size=1x&id=NjsqgHjrCASE&format=png" };
        case 57: return { "textDescr": "Freezing Drizzle: light", "icon": "https://img.icons8.com/?size=1x&id=JPFoI922p1gw&format=png" };
        case 56: return { "textDescr": "Freezing Drizzle: dense intensity", "icon": "https://img.icons8.com/?size=1x&id=JPFoI922p1gw&format=png" };
        case 61: return { "textDescr": "Rain: slight", "icon": "https://cdn-icons-png.flaticon.com/128/414/414966.png" };
        case 63: return { "textDescr": "Rain: moderate", "icon": "https://cdn-icons-png.flaticon.com/128/414/414966.png" };
        case 65: return { "textDescr": "Rain: heavy intensity", "icon": "https://cdn-icons-png.flaticon.com/128/414/414966.png" };
        case 66: return { "textDescr": "Freezing Rain: light", "icon": "https://cdn-icons-png.flaticon.com/128/3628/3628484.png" };
        case 67: return { "textDescr": "Freezing Rain: heavy intensity", "icon": "https://cdn-icons-png.flaticon.com/128/3628/3628484.png" };
        case 71: return { "textDescr": "Snow fall: slight", "icon": "https://cdn-icons-png.flaticon.com/128/1409/1409310.png" };
        case 73: return { "textDescr": "Snow fall: moderate", "icon": "https://cdn-icons-png.flaticon.com/128/1409/1409310.png" };
        case 75: return { "textDescr": "Snow fall: heavy intensity", "icon": "https://cdn-icons-png.flaticon.com/128/1409/1409310.png" };
        case 77: return { "textDescr": "Snow grains", "icon": "https://cdn-icons-png.flaticon.com/128/1409/1409310.png" };
        case 80: return { "textDescr": "Rain showers: slight", "icon": "https://cdn-icons-png.flaticon.com/128/9755/9755226.png" };
        case 81: return { "textDescr": "Rain showers: moderate", "icon": "https://cdn-icons-png.flaticon.com/128/9755/9755226.png" };
        case 82: return { "textDescr": "Rain showers: violent", "icon": "https://cdn-icons-png.flaticon.com/128/9755/9755226.png" };
        case 85: return { "textDescr": "Snow showers slight and heavy", "icon": "https://cdn-icons-png.flaticon.com/128/1409/1409310.png" };
        case 86: return { "textDescr": "Snow showers slight and heavy", "icon": "https://cdn-icons-png.flaticon.com/128/1409/1409310.png" };
        case 95: return { "textDescr": "Thunderstorm: Slight or moderate", "icon": "https://cdn-icons-png.flaticon.com/128/1409/1409310.png" };
        case 96: return { "textDescr": "Thunderstorm with slight", "icon": "https://cdn-icons-png.flaticon.com/128/2042/2042235.png" };
        case 99: return { "textDescr": "Thunderstorm heavy hail", "icon": "https://cdn-icons-png.flaticon.com/128/2042/2042235.png" };
        default: return { "textDescr": "Clear sky", "icon": "https://cdn-icons-png.flaticon.com/128/3226/3226453.png" };
    }
}

getGeoFromAPI();