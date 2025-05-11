import axios from 'axios';

function createInstance(baseURL, options = {}) {
	const instance = axios.create(Object.assign({ baseURL }, options));
	return instance;
}

const baseURL = 'http://localhost:8080';

export const todos = createInstance(baseURL + '/todos');
export const users = createInstance(baseURL + '/users');
