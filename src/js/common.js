import $ from "jquery"

window.jQuery = $
window.$ = $

let isFancyboxReady = false;

import("./jquery.fancybox.js")
	.then(() => {
		const event = document.createEvent("HTMLEvents");

		event.initEvent("fancyboxReady", true, true)

		document.dispatchEvent(event);
		isFancyboxReady = true

	})

window.fancyboxReady = callback => {
	if (isFancyboxReady)
		callback()
	else
		document.addEventListener("fancyboxReady", callback)
}

document.addEventListener("DOMContentLoaded", () => {
    fancyboxReady(initFancybox)
});

document.addEventListener("DOMContentLoaded", () => {
	const phoneInputs = document.querySelectorAll(".phone-input, .input--phone");

	if (!phoneInputs.length)
		return;

	;(async function(){
		const IMask = await import("imask");

		for (let i = 0; i < phoneInputs.length; i++){
			const phoneInput = phoneInputs[i];

			new IMask.default(phoneInput, {
				mask: '+{7}(000)000-00-00'
			});
		}
		
	})();
});

window.initFancybox = () => {
	$(".fancybox").fancybox({
		trapFocus: false,
		touch : false,
		loop: true,
		buttons: ["fullscreen", "slideShow", "close", "thumbs"],
		image: {
			preload: true,
		},
		transitionEffect: "slide",
	});
};