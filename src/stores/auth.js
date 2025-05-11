import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
	login,
	logout,
	getCurrentUser,
	handleSocialLoginCallback,
} from '@/api/user';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
	const user = ref(null);
	const token = ref(localStorage.getItem('token'));
	const loading = ref(false);

	const isAuthenticated = computed(() => !!token.value);

	const loginUser = async (email, password) => {
		try {
			const response = await axios.post('/users/login', {
				email,
				password,
			});
			token.value = response.data.access_token;
			localStorage.setItem('token', response.data.access_token);
			await fetchUser();
			return response;
		} catch (error) {
			throw error;
		}
	};

	const logoutUser = async () => {
		try {
			loading.value = true;
			await logout();
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			token.value = null;
			user.value = null;
			localStorage.removeItem('token');
			loading.value = false;
		}
	};

	const fetchUser = async () => {
		try {
			loading.value = true;
			const response = await getCurrentUser();
			user.value = response.data;
		} catch (error) {
			console.error('Failed to fetch user:', error);
			token.value = null;
			user.value = null;
			localStorage.removeItem('token');
		} finally {
			loading.value = false;
		}
	};

	const handleSocialLogin = async (provider, code) => {
		try {
			loading.value = true;
			const response = await handleSocialLoginCallback(provider, code);
			token.value = response.data.token;
			localStorage.setItem('token', token.value);
			await fetchUser();
			return response;
		} finally {
			loading.value = false;
		}
	};

	return {
		user,
		token,
		loading,
		isAuthenticated,
		loginUser,
		logoutUser,
		fetchUser,
		handleSocialLogin,
	};
});
