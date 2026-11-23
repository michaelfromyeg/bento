import assert from "node:assert/strict";
import { test } from "node:test";

import { greetingFor } from "../assets/js/greeting.js";

const greetings = {
    greetingMorning: "morning",
    greetingAfternoon: "afternoon",
    greetingEvening: "evening",
    greetingNight: "night",
};

test("4am is night", () => {
    assert.equal(greetingFor(4, greetings), "night");
});

// 5am used to fall through every branch and say "Good evening".
test("5am is morning", () => {
    assert.equal(greetingFor(5, greetings), "morning");
});

test("noon is afternoon", () => {
    assert.equal(greetingFor(12, greetings), "afternoon");
});

test("5pm is evening", () => {
    assert.equal(greetingFor(17, greetings), "evening");
});

test("11pm is night", () => {
    assert.equal(greetingFor(23, greetings), "night");
});
