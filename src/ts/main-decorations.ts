import App from "./xpage/core";
import randomInt from "./functions/randomInt";

const decorations: Array<HTMLElement> = App.transformNodeListToArray(
    document.querySelectorAll(".main-territory__decor > *, .main-contacts__decor > *, .main-prod__decor")
);

decorations.map(function(el: HTMLElement, i: number) {
    document.addEventListener("mousemove", function(e: MouseEvent){
        const pos = {
            x: 0,
            y: 0,
        },
        random = randomInt(5, 60);

        pos.x = (e.pageX - window.innerWidth / 2) * -1 / random;
        pos.y = !el.classList.contains("main-contacts__decor-bot") ? (e.pageY - window.innerHeight / 2) * -1 / random : 0;

        window.TweenLite.to(el, 2, {
            x: pos.x,
            y: pos.y
        });
    });
});