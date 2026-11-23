const linkTarget = (config) => (config.openInNewTab ? "_blank" : "_self");

const renderCards = (config) => {
    const container = document.getElementById("buttonsContainer");
    for (const card of config.cards) {
        container.insertAdjacentHTML(
            "beforeend",
            `<a
                href="${card.link}"
                target="${linkTarget(config)}"
                class="buttons__link card"
                aria-label="${card.name}"
                title="${card.name}"
            >
                <i class="buttonLink__icon" data-lucide="${card.icon}"></i>
            </a>`
        );
    }
};

const renderList = (container, list, config) => {
    container.insertAdjacentHTML(
        "beforeend",
        `<i class="list__head" data-lucide="${list.icon}"></i>`
    );
    for (const link of list.links) {
        container.insertAdjacentHTML(
            "beforeend",
            `<a target="${linkTarget(config)}" href="${link.link}" class="list__link">${link.name}</a>`
        );
    }
};

export const renderLinks = (config) => {
    renderCards(config);
    renderList(document.getElementById("list_1"), config.lists[0], config);
    renderList(document.getElementById("list_2"), config.lists[1], config);
};
