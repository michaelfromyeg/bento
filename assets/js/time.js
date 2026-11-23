const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const formatClock = (date, twelveHourFormat) => {
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const hours = date.getHours();
    if (!twelveHourFormat) {
        return { hours: String(hours), minutes };
    }
    const suffix = hours >= 12 ? " pm" : " am";
    return { hours: String(hours % 12 || 12), minutes: minutes + suffix };
};

export const startClock = (config) => {
    const tick = () => {
        const now = new Date();
        const { hours, minutes } = formatClock(now, config.twelveHourFormat);
        document.getElementById("hour").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("month").textContent = MONTHS[now.getMonth()];
        document.getElementById("day").textContent = now.getDate();
    };
    tick();
    setInterval(tick, 1000);
};
