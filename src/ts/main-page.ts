import domReady from "./xpage/ready";
import App from "./xpage/core";

domReady(() => {    
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
}