import domReady from "./xpage/ready";
import { EventListener, App } from "./xpage/index";

domReady(() => {
    let isAnimatingNow = false;

    new EventListener(".document-item__title").add("click", (el: HTMLElement) => {
        isAnimatingNow = true;

        const curItem = el.closest(".document-item"),
            targetContent = curItem.querySelector(".document-item__content") as HTMLElement;

        targetContent.style.overflow = "hidden";

        if (!curItem.classList.contains("js__opened")){

            App.each(".document-item__title", (el: HTMLElement) => {
                const curOrderItem = el.closest(".document-item"),
                    targetContent = curOrderItem.querySelector(".document-item__content") as HTMLElement;

                targetContent.style.height = `${targetContent.scrollHeight}px`;
                getComputedStyle(targetContent, null).getPropertyValue("height");

                curOrderItem.classList.remove("js__opened");

                targetContent.style.height = "0";

                new EventListener(targetContent).add("transitionend", (el: HTMLElement) => {
                    if (el.style.height !== "0px")
                        el.style.height = "auto";
                    else
                        el.style.display = "none";
        
                    isAnimatingNow = false;
                }, {
                    once: true
                });
            });


            curItem.classList.add("js__opened");

            targetContent.style.height = "0";

            targetContent.style.display = "block";

            targetContent.style.height = `${targetContent.scrollHeight}px`;
        }else{
            targetContent.style.height = `${targetContent.scrollHeight}px`;
            getComputedStyle(targetContent, null).getPropertyValue("height");

            curItem.classList.remove("js__opened");

            targetContent.style.height = "0";
        }


        new EventListener(targetContent).add("transitionend", (el: HTMLElement) => {
            if (el.style.height !== "0px")
                el.style.height = "auto";
            else
                el.style.display = "none";

            isAnimatingNow = false;
        }, {
            once: true
        });
    });
});