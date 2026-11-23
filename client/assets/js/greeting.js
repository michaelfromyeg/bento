export const greetingFor = (hour, config) => {
    if (hour >= 23 || hour < 5) {
        return config.greetingNight;
    }
    if (hour < 12) {
        return config.greetingMorning;
    }
    if (hour < 17) {
        return config.greetingAfternoon;
    }
    return config.greetingEvening;
};

export const renderGreeting = (config) => {
    const greeting = greetingFor(new Date().getHours(), config);
    document.getElementById("greetings").textContent =
        `${greeting}\xa0${config.name}.`;
};
