import "./forms";

import "./documents";
import "./card";
import "./top-tabs";

declare global {
	interface Window {
		TweenLite: any;
		$: any;
		is: any;
		notificator: any,
		fancyboxReady: Function
	}
}