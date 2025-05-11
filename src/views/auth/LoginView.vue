<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<div class="card mt-5">
					<div class="card-body">
						<h2 class="text-center mb-4">로그인</h2>

						<form @submit.prevent="handleSubmit">
							<div class="mb-3">
								<label for="email" class="form-label">이메일</label>
								<input
									type="email"
									class="form-control"
									id="email"
									v-model="form.email"
									required
								/>
							</div>
							<div class="mb-3">
								<label for="password" class="form-label">비밀번호</label>
								<input
									type="password"
									class="form-control"
									id="password"
									v-model="form.password"
									required
								/>
							</div>
							<div class="d-grid">
								<button
									type="submit"
									class="btn btn-primary"
									:disabled="authStore.loading"
								>
									{{ authStore.loading ? '로그인 중...' : '로그인' }}
								</button>
							</div>
						</form>
						<div class="text-center mt-3">
							<router-link to="/signup"
								>계정이 없으신가요? 회원가입</router-link
							>
							<SocialLoginButtons />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { handleSocialLoginCallback } from '@/api/user';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const form = ref({
	email: '',
	password: '',
});

const handleSubmit = async () => {
	try {
		await authStore.loginUser(form.value);
		router.push('/');
	} catch (error) {
		alert(error.response?.data?.message || '로그인 중 오류가 발생했습니다.');
	}
};

// 소셜 로그인 콜백 처리
onMounted(async () => {
	const { provider, code } = route.query;
	if (provider && code) {
		try {
			const response = await handleSocialLoginCallback(provider, code);
			authStore.setToken(response.data.token);
			await authStore.fetchUser();
			router.push('/');
		} catch (error) {
			alert('소셜 로그인 중 오류가 발생했습니다.');
			router.push('/login');
		}
	}
});
</script>
