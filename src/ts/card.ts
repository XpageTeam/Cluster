import domReady from "./xpage/ready";

domReady(async () => {
    const cardSlider = document.querySelector(".detail-slider") as HTMLElement;

    if (!cardSlider) return;

    const {Swiper, Navigation, Autoplay, EffectFade, Lazy} = await import("swiper/dist/js/swiper.esm");

	Swiper.use([Navigation, Autoplay, EffectFade, Lazy]);
	
	console.log({
		prevEl: cardSlider.querySelector(".swiper-button-prev") as HTMLElement,
		nextEl: cardSlider.querySelector(".swiper-button-next") as HTMLElement,
	});

    new Swiper(cardSlider, {
        effect: "fade",
        lazy: {
            loadPrevNext: true,
		},
		navigation: {
			prevEl: cardSlider.querySelector(".swiper-button-prev") as HTMLElement,
			nextEl: cardSlider.querySelector(".swiper-button-next") as HTMLElement,
		}
    });

    window.fancyboxReady(() => {
        window.$(".detail-slider__slide").fancybox({
            trapFocus: false,
            touch : true,
            loop: true,
            buttons: ["fullscreen", "slideShow", "close"],
            image: {
                preload: true,
            },
            transitionEffect: "slide",
        });
    });
});