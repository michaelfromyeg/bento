import { CONFIG } from "./config.js";
import { renderGreeting } from "./greeting.js";
import { renderLinks } from "./links.js";
import { setUpThemeToggle } from "./theme.js";
import { startClock } from "./time.js";
import { renderWeather } from "./weather.js";

if (CONFIG.imageBackground) {
    document.body.classList.add("withImageBackground");
}

startClock(CONFIG);
renderGreeting(CONFIG);
renderLinks(CONFIG);
lucide.createIcons();
setUpThemeToggle();
renderWeather(CONFIG);
