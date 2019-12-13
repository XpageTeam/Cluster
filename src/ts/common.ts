import "./forms";

import "./documents";
import "./card";

declare global {
	interface Window {
		TweenLite: any;
		$: any;
		is: any;
		notificator: any,
		fancyboxReady: Function
	}
}