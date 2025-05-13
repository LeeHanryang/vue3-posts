<template>
	<div>
		<h2>계정 탈퇴</h2>
		<hr class="my-4" />

		<AppError v-if="error" :message="error.message" />

		<div v-if="user" class="card">
			<div class="card-body">
				<h5 class="card-title">정말로 탈퇴하시겠습니까?</h5>
				<p class="card-text">사용자명: {{ user.username }}</p>
				<p class="card-text">이메일: {{ user.email }}</p>
			</div>
			<div class="card-footer">
				<button
					class="btn btn-outline-danger me-2"
					:disabled="loading"
					@click="handleDelete"
				>
					<template v-if="loading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else>탈퇴</template>
				</button>
				<button class="btn btn-secondary" @click="handleCancel">취소</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAuthStore } from '@/stores/auth';
import { getCurrentUser, deleteCurrentUser } from '@/api/user';

const router = useRouter();
const { vAlert, vSuccess } = useAlert();
const authStore = useAuthStore();
const user = ref(null);
const loading = ref(false);

const fetchUser = async () => {
	try {
		const response = await getCurrentUser();
		user.value = response.data;
	} catch (err) {
		vAlert(
			err.response?.data?.message || '사용자 정보를 불러오는데 실패했습니다.',
		);
	}
};

fetchUser();

const handleDelete = async () => {
	try {
		loading.value = true;
		await deleteCurrentUser();
		// 로그아웃 처리
		await authStore.logoutUser();
		vSuccess('탈퇴가 완료되었습니다.');
		router.push('/login');
	} catch (err) {
		vAlert(err.response?.data?.message || '탈퇴 중 오류가 발생했습니다.');
	} finally {
		loading.value = false;
	}
};

const handleCancel = () => {
	router.push('/users/me');
};
</script>

<style lang="scss" scoped></style>
