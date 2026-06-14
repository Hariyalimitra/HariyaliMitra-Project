// HariyaliMitra - Live Weather using Open-Meteo (free, no API key)

// Default location: Patna, Bihar
const DEFAULT_LAT = 25.5941;
const DEFAULT_LON = 85.1376;
const DEFAULT_LOCATION_NAME = "Patna, Bihar";

function weatherCodeToInfo(code) {
    // Maps Open-Meteo WMO weather codes to emoji + description
    const map = {
        0: ["☀️", "Clear Sky"],
        1: ["🌤️", "Mainly Clear"],
        2: ["⛅", "Partly Cloudy"],
        3: ["☁️", "Overcast"],
        45: ["🌫️", "Fog"],
        48: ["🌫️", "Fog"],
        51: ["🌦️", "Light Drizzle"],
        53: ["🌦️", "Drizzle"],
        55: ["🌦️", "Dense Drizzle"],
        61: ["🌧️", "Light Rain"],
        63: ["🌧️", "Rain"],
        65: ["🌧️", "Heavy Rain"],
        66: ["🌧️", "Freezing Rain"],
        67: ["🌧️", "Freezing Rain"],
        71: ["🌨️", "Light Snow"],
        73: ["🌨️", "Snow"],
        75: ["🌨️", "Heavy Snow"],
        80: ["🌦️", "Rain Showers"],
        81: ["🌦️", "Rain Showers"],
        82: ["⛈️", "Violent Showers"],
        95: ["⛈️", "Thunderstorm"],
        96: ["⛈️", "Thunderstorm + Hail"],
        99: ["⛈️", "Severe Thunderstorm"]
    };
    return map[code] || ["🌡️", "Unknown"];
}

function loadWeather(lat, lon, locationName) {

    document.getElementById("weatherLocation").innerText = "📍 " + locationName;

    let url = "https://api.open-meteo.com/v1/forecast" +
        "?latitude=" + lat +
        "&longitude=" + lon +
        "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code" +
        "&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code" +
        "&forecast_days=10" +
        "&timezone=auto";

    fetch(url)
        .then(response => response.json())
        .then(data => {

            // Current weather
            let current = data.current;
            document.getElementById("liveTemp").innerText = current.temperature_2m + "°C";
            document.getElementById("liveHumidity").innerText = current.relative_humidity_2m + "%";
            document.getElementById("liveWind").innerText = current.wind_speed_10m + " km/h";

            // 10-day forecast
            let daily = data.daily;
            let container = document.getElementById("forecastContainer");
            container.innerHTML = "";

            for (let i = 0; i < daily.time.length; i++) {

                let date = new Date(daily.time[i]);
                let dayName = date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

                let [icon, desc] = weatherCodeToInfo(daily.weather_code[i]);
                let maxTemp = Math.round(daily.temperature_2m_max[i]);
                let minTemp = Math.round(daily.temperature_2m_min[i]);
                let rainChance = daily.precipitation_probability_max[i];

                let card = document.createElement("div");
                card.style.background = "white";
                card.style.borderRadius = "12px";
                card.style.padding = "15px";
                card.style.width = "130px";
                card.style.boxShadow = "0px 2px 10px rgba(0,0,0,0.1)";
                card.style.textAlign = "center";

                card.innerHTML = `
                    <p style="font-weight:bold; margin:5px 0;">${dayName}</p>
                    <p style="font-size:28px; margin:5px 0;">${icon}</p>
                    <p style="margin:5px 0; font-size:14px;">${desc}</p>
                    <p style="margin:5px 0; font-weight:bold;">${maxTemp}° / ${minTemp}°</p>
                    <p style="margin:5px 0; color:#1e90ff; font-size:13px;">💧 ${rainChance}% rain</p>
                `;

                container.appendChild(card);
            }

        })
        .catch(error => {
            console.log("Weather fetch error:", error);
            document.getElementById("liveTemp").innerText = "Unavailable";
            document.getElementById("liveHumidity").innerText = "Unavailable";
            document.getElementById("liveWind").innerText = "Unavailable";
            document.getElementById("forecastContainer").innerHTML = "<p>⚠️ Could not load forecast. Please try again later.</p>";
        });
}

// Try to get user's location, fallback to Patna, Bihar
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            loadWeather(position.coords.latitude, position.coords.longitude, "Your Location");
        },
        function () {
            // User denied location, use default
            loadWeather(DEFAULT_LAT, DEFAULT_LON, DEFAULT_LOCATION_NAME);
        }
    );
} else {
    loadWeather(DEFAULT_LAT, DEFAULT_LON, DEFAULT_LOCATION_NAME);
}