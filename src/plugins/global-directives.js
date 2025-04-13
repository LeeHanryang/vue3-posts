import color from '@/directives/color';
import focus from '@/directives/focus';
export default {
	install(app) {
		app.directive('focus', focus);
		app.directive('color', color);
	},
};
