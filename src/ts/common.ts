import "./forms";

import "./documents";

declare global {
	interface Window {
		TweenLite: any;
		$: any;
		is: any;
		notificator: any
	}
}