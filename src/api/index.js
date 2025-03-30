import axios from 'axios';

function createInstance(baseURL, options = {}) {
	const instance = axios.create(Object.assign({ baseURL }, options));
	return instance;
}

export const posts = createInstance(import.meta.env.VITE_APP_API_URL + 'posts');
// development : http://localhost:5000/posts/
// production : http://localhost:5001/posts/
