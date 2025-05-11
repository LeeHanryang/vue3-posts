<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-6 col-lg-4">
				<div class="card shadow-sm">
					<div class="card-body p-4">
						<h2 class="text-center mb-4">로그인</h2>
						<form @submit.prevent="handleSubmit">
							<div class="mb-3">
								<label for="email" class="form-label">이메일</label>
								<input
									type="email"
									class="form-control"
									id="email"
									v-model="email"
									required
								/>
							</div>
							<div class="mb-3">
								<label for="password" class="form-label">비밀번호</label>
								<input
									type="password"
									class="form-control"
									id="password"
									v-model="password"
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

						<SocialLoginButtons />

						<div class="text-center mt-3">
							<router-link to="/signup" class="text-decoration-none">
								계정이 없으신가요? 회원가입
							</router-link>
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
import SocialLoginButtons from '@/components/auth/SocialLoginButtons.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
	try {
		await authStore.loginUser({
			email: email.value,
			password: password.value,
		});
		router.push('/todos');
	} catch (error) {
		console.error('Login failed:', error);
	}
};

onMounted(async () => {
	// 소셜 로그인 콜백 처리
	const { provider, code } = route.query;
	if (provider && code) {
		try {
			await authStore.handleSocialLogin(provider, code);
			router.push('/todos');
		} catch (error) {
			console.error('Social login failed:', error);
		}
	}
});
</script>

<style scoped>
.card {
	border: none;
	border-radius: 10px;
}

.form-control:focus {
	box-shadow: none;
	border-color: #0d6efd;
}

.btn-primary {
	padding: 0.6rem;
}
</style>
