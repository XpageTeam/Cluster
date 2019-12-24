import domReady from "./xpage/ready";
import App from "./xpage/core";
import { EventListener } from "./xpage/index";

domReady(() => {
    console.log(window.is.touchDevice());
    
    if (!window.is.touchDevice())
        (async function(){
            await import("./main-decorations");
        })();

    App.each(".ml-side", (el: HTMLElement, i: Number) => {
        document.body.addEventListener("scroll", function(){
            setSideBlockBottomOffset(el, i);
        });

        setSideBlockBottomOffset(el, i);
    });    

    App.each(".mr-side", (el: HTMLElement, i: Number) => {
        document.body.addEventListener("scroll", function(){
            setSideBlockBottomOffset(el, i);
        });


        setSideBlockBottomOffset(el, i);
    });
});

function setSideBlockBottomOffset(sideBlock: HTMLElement, blockIndex: Number){
    requestAnimationFrame(function(){
        sideBlock.style.transform = `translate3d(0, calc(-100vh * ${blockIndex} + ${document.body.scrollTop}px), 0)`;
    })
};



domReady(() => {
    new EventListener(".mr-side__burger .burger").add("click", () => {
        if (!document.body.classList.contains("js__menu-opened")){
            App.each(".mr-side__menu", (menuItem: HTMLElement) => {
                menuItem.style.overflow = "hidden";

                menuItem.style.width = "0";

                menuItem.style.display = "flex";

                menuItem.style.width = `${menuItem.scrollWidth}px`;



                new EventListener(menuItem).add("transitionend", (el: HTMLElement) => {
                    if (el.style.height !== "0px")
                        el.style.height = "auto";
                    else
                        el.style.display = "none";

                    el.style.overflow = "visible";
                }, {
                    once: true
                });
            });
        }else{
            App.each(".mr-side__menu", (menuItem: HTMLElement) => {
                menuItem.style.overflow = "hidden";

                menuItem.style.width = `${menuItem.scrollWidth}px`;

                getComputedStyle(menuItem, null).getPropertyValue("width");

                menuItem.style.width = "0";

                

                new EventListener(menuItem).add("transitionend", (el: HTMLElement) => {
                    if (el.style.width !== "0px")
                        el.style.width = "auto";
                    else
                        el.style.display = "none";

                    el.style.overflow = "visible";
                }, {
                    once: true
                });
            });
        }

        document.body.classList.toggle("js__menu-opened")

    });
});