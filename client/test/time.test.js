import assert from "node:assert/strict";
import { test } from "node:test";

import { formatClock } from "../assets/js/time.js";

test("24-hour format pads minutes", () => {
    const clock = formatClock(new Date(2026, 0, 1, 9, 5), false);

    assert.deepEqual(clock, { hours: "9", minutes: "05" });
});

test("12-hour format shows midnight as 12 am", () => {
    const clock = formatClock(new Date(2026, 0, 1, 0, 30), true);

    assert.deepEqual(clock, { hours: "12", minutes: "30 am" });
});

test("12-hour format shows 1pm as 1 pm", () => {
    const clock = formatClock(new Date(2026, 0, 1, 13, 0), true);

    assert.deepEqual(clock, { hours: "1", minutes: "00 pm" });
});
