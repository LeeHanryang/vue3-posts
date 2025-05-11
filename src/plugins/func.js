export default {
	install: app => {
		app.config.globalProperties.$person = {
			name: '홍길동',
			age: 20,
		};
	},
};
