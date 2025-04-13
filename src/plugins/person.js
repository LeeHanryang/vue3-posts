export default {
	install(app, options) {
		const person = {
			name: '이준혁',
			say() {
				alert(this.name);
			},
			...options,
		};
		app.config.globalProperties.$person = person;
		app.provide('person', person);
	},
};
