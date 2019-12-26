import domReady from "./xpage/ready";
import App from "./xpage/core";
import { EventListener } from "./xpage/index";

domReady(() => {    
    if (!window.is.touchDevice())
        (async function(){
            await import("./main-decorations");
        })();

    App.each(".ml-side", (el: HTMLElement, i: number) => {
        document.body.addEventListener("scroll", function(){
            setSideBlockBottomOffset(el, i);
        });

        setSideBlockBottomOffset(el, i);
    });    

    App.each(".mr-side", (el: HTMLElement, i: number) => {
        document.body.addEventListener("scroll", function(){
            setSideBlockBottomOffset(el, i);
        });


        setSideBlockBottomOffset(el, i);
    });
});

function setSideBlockBottomOffset(sideBlock: HTMLElement, blockIndex: number){
    const parentMainScreen = sideBlock.closest(".main-screen"),
        allParents = App.transformNodeListToArray(document.querySelectorAll(".main-screen"));

    let topOffset = -parentMainScreen.clientHeight * blockIndex + document.body.scrollTop;

    allParents.forEach(function(el: HTMLElement, i: number){
        if (el.clientHeight > window.innerHeight && blockIndex > i)
            topOffset -= el.clientHeight - window.innerHeight;

        if (parentMainScreen.clientHeight > window.innerHeight && blockIndex == i)
            topOffset += (parentMainScreen.clientHeight - window.innerHeight) * i;
    });

    
    requestAnimationFrame(function(){
        sideBlock.style.transform = `translate3d(0, ${topOffset}px, 0)`;
    });
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