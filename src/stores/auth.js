import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
	login,
	logout,
	getCurrentUser,
	handleSocialLoginCallback,
} from '@/api/user';

export const useAuthStore = defineStore('auth', () => {
	const token = ref(localStorage.getItem('token') || '');
	const user = ref(null);
	const loading = ref(false);

	const isAuthenticated = computed(() => !!token.value);

	const setToken = newToken => {
		token.value = newToken;
		if (newToken) {
			localStorage.setItem('token', newToken);
		} else {
			localStorage.removeItem('token');
		}
	};

	const loginUser = async credentials => {
		try {
			loading.value = true;
			const response = await login(credentials);
			setToken(response.data.token);
			await fetchUser();
			return response;
		} finally {
			loading.value = false;
		}
	};

	const logoutUser = async () => {
		try {
			await logout();
		} finally {
			setToken('');
			user.value = null;
		}
	};

	const fetchUser = async () => {
		try {
			const response = await getCurrentUser();
			user.value = response.data;
		} catch (error) {
			setToken('');
			user.value = null;
			throw error;
		}
	};

	const handleSocialLogin = async (provider, code) => {
		try {
			loading.value = true;
			const response = await handleSocialLoginCallback(provider, code);
			setToken(response.data.token);
			await fetchUser();
			return response;
		} finally {
			loading.value = false;
		}
	};

	return {
		token,
		user,
		loading,
		isAuthenticated,
		loginUser,
		logoutUser,
		fetchUser,
		handleSocialLogin,
	};
});
