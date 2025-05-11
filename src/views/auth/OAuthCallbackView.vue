<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-6 col-lg-4">
				<div class="card shadow-sm mt-5">
					<div class="card-body p-4 text-center">
						<div v-if="loading" class="py-4">
							<div class="spinner-border text-primary" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
							<p class="mt-3">로그인 처리 중...</p>
						</div>
						<div v-else-if="error" class="py-4">
							<p class="text-danger">{{ error }}</p>
							<button class="btn btn-primary mt-3" @click="goToLogin">
								로그인 페이지로 이동
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useAlert } from '@/composables/alert';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { vAlert } = useAlert();

const loading = ref(true);
const error = ref(null);

const goToLogin = () => {
	router.push('/login');
};

onMounted(async () => {
	const { token } = route.query;
	if (token) {
		try {
			// 먼저 localStorage에 토큰 저장
			localStorage.setItem('token', token);
			// 그 다음 authStore에 토큰 설정
			authStore.token = token;
			// 마지막으로 사용자 정보 가져오기
			await authStore.fetchUser();
			router.push('/todos');
		} catch (err) {
			console.error('Failed to fetch user:', err);
			error.value = '로그인에 실패했습니다.';
			vAlert('로그인에 실패했습니다.');
			// 에러 발생 시 토큰 제거
			localStorage.removeItem('token');
			authStore.token = null;
		} finally {
			loading.value = false;
		}
	} else {
		error.value = '유효하지 않은 요청입니다.';
		loading.value = false;
	}
});
</script>

<style scoped>
.card {
	border: none;
	border-radius: 10px;
}
</style>
