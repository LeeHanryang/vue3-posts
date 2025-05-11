export default {
	install: (app, options) => {
		app.config.globalProperties.$person = {
			name: '홍길동',
			age: 20,
		};
	},
};
