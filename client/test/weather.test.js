import assert from "node:assert/strict";
import { test } from "node:test";

import { describeWeather, forecastUrl } from "../assets/js/weather.js";

test("clear sky during the day uses the 01d icon", () => {
    const weather = describeWeather({
        temperature_2m: 7.4,
        weather_code: 0,
        is_day: 1,
    });

    assert.deepEqual(weather, {
        temperature: 7,
        description: "clear sky",
        icon: "01d",
    });
});

test("rain at night uses the 10n icon", () => {
    const weather = describeWeather({
        temperature_2m: 3.6,
        weather_code: 63,
        is_day: 0,
    });

    assert.deepEqual(weather, {
        temperature: 4,
        description: "rain",
        icon: "10n",
    });
});

test("an unrecognized weather code keeps the temperature but shows the unknown icon", () => {
    const weather = describeWeather({
        temperature_2m: -2.2,
        weather_code: 42,
        is_day: 1,
    });

    assert.deepEqual(weather, {
        temperature: -2,
        description: "",
        icon: "unknown",
    });
});

test("forecastUrl asks for Fahrenheit when the unit is F", () => {
    const url = new URL(
        forecastUrl({ latitude: 49.27, longitude: -123.25, unit: "F" })
    );

    assert.equal(url.searchParams.get("temperature_unit"), "fahrenheit");
});

test("forecastUrl requests the current fields describeWeather reads", () => {
    const url = new URL(
        forecastUrl({ latitude: 49.27, longitude: -123.25, unit: "C" })
    );

    assert.equal(
        url.searchParams.get("current"),
        "temperature_2m,weather_code,is_day"
    );
});
