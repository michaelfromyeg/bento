// Weather comes straight from Open-Meteo (https://open-meteo.com), which needs
// no API key, so the page has no backend to keep alive.

// WMO weather interpretation codes, as documented by Open-Meteo. `icon` is the
// numeric part of the icon file names in assets/icons/<theme>/.
const WMO_CODES = {
    0: { description: "clear sky", icon: "01" },
    1: { description: "mainly clear", icon: "02" },
    2: { description: "partly cloudy", icon: "03" },
    3: { description: "overcast", icon: "04" },
    45: { description: "fog", icon: "50" },
    48: { description: "freezing fog", icon: "50" },
    51: { description: "light drizzle", icon: "09" },
    53: { description: "drizzle", icon: "09" },
    55: { description: "heavy drizzle", icon: "09" },
    56: { description: "freezing drizzle", icon: "09" },
    57: { description: "heavy freezing drizzle", icon: "09" },
    61: { description: "light rain", icon: "10" },
    63: { description: "rain", icon: "10" },
    65: { description: "heavy rain", icon: "10" },
    66: { description: "freezing rain", icon: "10" },
    67: { description: "heavy freezing rain", icon: "10" },
    71: { description: "light snow", icon: "13" },
    73: { description: "snow", icon: "13" },
    75: { description: "heavy snow", icon: "13" },
    77: { description: "snow grains", icon: "13" },
    80: { description: "light showers", icon: "09" },
    81: { description: "showers", icon: "09" },
    82: { description: "heavy showers", icon: "09" },
    85: { description: "snow showers", icon: "13" },
    86: { description: "heavy snow showers", icon: "13" },
    95: { description: "thunderstorm", icon: "11" },
    96: { description: "thunderstorm with hail", icon: "11" },
    99: { description: "thunderstorm with heavy hail", icon: "11" },
};

const UNKNOWN_WEATHER = { temperature: "-", description: "", icon: "unknown" };

/**
 * Convert the `current` block of an Open-Meteo forecast response into what the
 * page displays. Unrecognized weather codes fall back to the "unknown" icon.
 */
export const describeWeather = ({ temperature_2m, weather_code, is_day }) => {
    const temperature = Math.round(temperature_2m);
    const known = WMO_CODES[weather_code];
    if (!known) {
        return { ...UNKNOWN_WEATHER, temperature };
    }
    return {
        temperature,
        description: known.description,
        icon: known.icon + (is_day ? "d" : "n"),
    };
};

export const forecastUrl = ({ latitude, longitude, unit }) => {
    const params = new URLSearchParams({
        latitude,
        longitude,
        current: "temperature_2m,weather_code,is_day",
        temperature_unit: unit === "F" ? "fahrenheit" : "celsius",
    });
    return `https://api.open-meteo.com/v1/forecast?${params}`;
};

const currentPosition = (config) =>
    new Promise((resolve) => {
        const fallback = {
            latitude: config.defaultLatitude,
            longitude: config.defaultLongitude,
        };
        if (!config.trackLocation || !navigator.geolocation) {
            resolve(fallback);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) =>
                resolve({
                    latitude: pos.coords.latitude.toFixed(3),
                    longitude: pos.coords.longitude.toFixed(3),
                }),
            () => resolve(fallback)
        );
    });

const fetchWeather = async (config) => {
    const position = await currentPosition(config);
    try {
        const response = await fetch(
            forecastUrl({ ...position, unit: config.weatherUnit })
        );
        if (!response.ok) {
            throw new Error(`Open-Meteo responded ${response.status}`);
        }
        const { current } = await response.json();
        return describeWeather(current);
    } catch (error) {
        console.error("Could not load weather", error);
        return UNKNOWN_WEATHER;
    }
};

export const renderWeather = async (config) => {
    const weather = await fetchWeather(config);
    document.querySelector(".weatherIcon img").src =
        `assets/icons/${config.weatherIcons}/${weather.icon}.png`;
    document.querySelector(".weatherValue p").innerHTML =
        `${weather.temperature}°<span>${config.weatherUnit.toLowerCase()}</span>`;
    document.querySelector(".weatherDescription p").textContent =
        weather.description;
};
