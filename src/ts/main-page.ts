import domReady from "./xpage/ready";
import App from "./xpage/core";
import { EventListener } from "./xpage/index";
import {TweenLite} from "gsap";

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

const tersObjects: Array<territory> = [];

domReady(() => {
    ;(function(){
        const ters = App.transformNodeListToArray( document.querySelectorAll("#territories > g")),
            tersListItems = App.transformNodeListToArray(document.querySelectorAll(".ter-regions__item"));

        if (!ters.length)
            return;

        for (const ter of ters){
            tersObjects.push(new territory(ter));
        }

        if (!tersListItems.length) return;

        for (const terItem of tersListItems)
            terItem.addEventListener("mouseover", function(){
                const targetID = this.getAttribute("data-target");
                
                for (const ter of getAnotherTerritories(targetID))
                    ter.hide();

                getTerritoriBYID(targetID).show();
            });
    })();
});

class territory{
    public id: string;

    private object: HTMLElement;

    private center: SVGCircleElement;
    private circle: SVGPathElement;

    private text: SVGTextElement;
    private textBG: SVGRectElement;

    private line: SVGRectElement;

    private bg: SVGPathElement;

    private curAnimation: any = {};

    constructor(object: HTMLElement){
        this.id = object.getAttribute("id");

        this.center = object.querySelector(".reg-center");
        this.circle = object.querySelector(".reg-circle");

        this.text = object.querySelector("text.reg-label");
        this.textBG = object.querySelector("rect.reg-label");

        this.line = object.querySelector(".line");

        this.bg = object.querySelector(".reg-fill");

        this.object = object;
        
        this.bindEvents();
    }

    public show(){
        const self = this;

        for (const ter of getAnotherTerritories(this.id))
            ter.hide();
        
        self.curAnimation = window.TweenLite.to(self.bg, .1, {
            opacity: 1,
            onComplete(){
                self.curAnimation = window.TweenLite.to(self.circle, .1, {
                    opacity: 1,
                    onComplete(){
                        self.curAnimation = window.TweenLite.to(self.center, .1, {
                            opacity: 1,
                            onComplete(){
                                self.curAnimation = window.TweenLite.to(self.line, .1, {
                                    opacity: 1,
                                    onComplete(){
                                        self.curAnimation = window.TweenLite.to(self.text, .1, {
                                            opacity: 1
                                        });
                                        self.curAnimation = window.TweenLite.to(self.textBG, .1, {
                                            opacity: 1
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    public hide(){
        const self = this;

        if (this.curAnimation.kill)
            this.curAnimation.kill();

        window.TweenLite.to(self.text, .1, {
            opacity: 0
        });
        window.TweenLite.to(self.textBG, .1, {
            opacity: 0,
            onComplete(){
                window.TweenLite.to(self.line, .1, {
                    opacity: 0,
                    onComplete(){
                        window.TweenLite.to(self.center, .1, {
                            opacity: 0,
                            onComplete(){
                                window.TweenLite.to(self.circle, .1, {
                                    opacity: 0,
                                    onComplete(){
                                        window.TweenLite.to(self.bg, .1, {
                                            opacity: 0,
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    private setTRO(){
        window.TweenLite.set(this.center, {
            transformOrigin: "center"
        });

        window.TweenLite.set(this.circle, {
            transformOrigin: "center"
        });
    }

    private bindEvents(){
        this.bg.addEventListener("mouseover", () => {
            this.show();
        });
        this.object.addEventListener("mouseleave", () => {
            this.hide();
        });
    }
}

function getTerritoriBYID (id: string): territory{
    return tersObjects.filter(item => item.id == id)[0];
}

function getAnotherTerritories(excludeID: string): Array<territory>{
    return tersObjects.filter(item => item.id != excludeID);
}