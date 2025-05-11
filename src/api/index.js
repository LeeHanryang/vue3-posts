import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8080',
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor
instance.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

// Response interceptor
instance.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		return Promise.reject(error);
	},
);

export default instance;
