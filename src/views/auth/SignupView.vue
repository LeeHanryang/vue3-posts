<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<div class="card mt-5">
					<div class="card-body">
						<h2 class="text-center mb-4">회원가입</h2>
						<form @submit.prevent="handleSubmit">
							<div class="mb-3">
								<label for="username" class="form-label">사용자 이름</label>
								<input
									type="text"
									class="form-control"
									id="username"
									v-model="form.username"
									autocomplete="username"
									required
								/>
							</div>
							<div class="mb-3">
								<label for="email" class="form-label">이메일</label>
								<input
									type="email"
									class="form-control"
									id="email"
									v-model="form.email"
									autocomplete="email"
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
									autocomplete="new-password"
									required
								/>
							</div>
							<div class="mb-3">
								<label for="passwordConfirm" class="form-label"
									>비밀번호 확인</label
								>
								<input
									type="password"
									class="form-control"
									id="passwordConfirm"
									v-model="form.passwordConfirm"
									autocomplete="new-password"
									required
								/>
							</div>
							<div class="d-grid">
								<button
									type="submit"
									class="btn btn-primary"
									:disabled="loading"
								>
									{{ loading ? '처리중...' : '회원가입' }}
								</button>
							</div>
						</form>
						<SocialLoginButtons />
						<div class="text-center mt-3">
							<router-link to="/login"
								>이미 계정이 있으신가요? 로그인</router-link
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { signup } from '@/api/user';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons.vue';

const router = useRouter();
const { vAlert, vSuccess } = useAlert();
const loading = ref(false);

const form = ref({
	username: '',
	email: '',
	password: '',
	passwordConfirm: '',
});

const handleSubmit = async () => {
	try {
		// 비밀번호 검증
		if (form.value.password !== form.value.passwordConfirm) {
			vAlert('비밀번호가 일치하지 않습니다.');
			return;
		}

		loading.value = true;
		await signup(form.value);
		vSuccess('회원가입이 완료되었습니다.');
		router.push('/login');
	} catch (error) {
		vAlert(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
	} finally {
		loading.value = false;
	}
};
</script>
