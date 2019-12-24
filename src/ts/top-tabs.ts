import domReady from "./xpage/ready";
import { EventListener } from "./xpage/index";

domReady(() => {
    new EventListener(".top-tabs select").add("change", (el: HTMLSelectElement) => {
        const value = el.value,
            tabsElement = el.closest(".top-tabs");

        (tabsElement.querySelector(`.top-tabs__link:nth-child(${value})`) as HTMLElement).click();
    });
});