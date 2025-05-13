import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

// 인증 토큰을 헤더에 추가하는 인터셉터
axios.interceptors.request.use(
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

const defaultConfig = {
	method: 'get',
};

const defaultOptions = {
	immediate: true,
};

export const useAxios = (url, config = {}, options = {}) => {
	const response = ref(null);
	const data = ref(null);
	const error = ref(null);
	const loading = ref(false);

	const { onSuccess, onError, immediate } = { ...defaultOptions, ...options };

	const { params } = config;
	const execute = body => {
		data.value = null;
		error.value = null;
		loading.value = true;
		axios(unref(url), {
			...defaultConfig,
			...config,
			params: unref(params),
			data: typeof body === 'object' ? body : {},
		})
			.then(res => {
				response.value = res;
				data.value = res.data;
				if (onSuccess) onSuccess(res);
			})
			.catch(err => {
				// error.value = err;
				error.value = err.response.data;
				if (onError) onError(err);
			})
			.finally(() => {
				loading.value = false;
			});
	};

	if (isRef(params) || isRef(url)) {
		watchEffect(execute);
	} else {
		if (immediate) execute();
	}

	return {
		response,
		data,
		error,
		loading,
		execute,
	};
};
