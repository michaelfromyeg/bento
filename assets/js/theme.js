// The saved theme is applied by an inline script in <head> so the page never
// flashes the wrong theme; this module only handles toggling it.

const STORAGE_KEY = "darkTheme";

const setThemeIcon = (button, isDark) => {
    button.innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}"></i>`;
    lucide.createIcons({ root: button });
};

export const setUpThemeToggle = () => {
    const root = document.documentElement;
    const button = document.getElementById("themeButton");
    setThemeIcon(button, root.classList.contains("darktheme"));

    button.addEventListener("click", () => {
        const isDark = root.classList.toggle("darktheme");
        try {
            if (isDark) {
                localStorage.setItem(STORAGE_KEY, "enabled");
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch {
            // Storage can be unavailable (e.g. private browsing); the toggle
            // still works for this visit.
        }
        setThemeIcon(button, isDark);
    });
};
