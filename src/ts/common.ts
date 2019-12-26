import "./forms";

import "./documents";
import "./card";
import "./top-tabs";
import domReady from "./xpage/ready";
import MobileMenu from "./xpage/mobileMenu";

declare global {
	interface Window {
		TweenLite: any;
		$: any;
		is: any;
		notificator: any,
		fancyboxReady: Function
	}
}

domReady(() => {
	const menu = new MobileMenu({
		burger: ".burger",
        menu: ".mobile-menu__cont",
        menuActiveClass: "js__opened",
        bodyActiveClass: "js__menu-opened",
        ignoreWarnings: false,
        fixBody: true,
        media: "(max-width: 1000px)"
	})
})