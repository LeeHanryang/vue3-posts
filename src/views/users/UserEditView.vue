<template>
	<div>
		<h2>내 정보 수정</h2>
		<hr class="my-4" />

		<AppError v-if="error" :message="error.response.data.message" />

		<form v-if="user" @submit.prevent="handleSave">
			<div class="mb-3">
				<label for="username" class="form-label">사용자명</label>
				<input
					type="text"
					class="form-control"
					id="username"
					v-model="user.username"
					required
				/>
			</div>
			<div class="mb-3">
				<label for="email" class="form-label">이메일</label>
				<input
					type="email"
					class="form-control"
					id="email"
					v-model="user.email"
					required
				/>
			</div>
			<div class="mb-3">
				<label for="created_at" class="form-label">생성일</label>
				<input
					type="text"
					class="form-control"
					id="created_at"
					:value="formatDate(user.createdAt)"
					disabled
				/>
			</div>
			<div class="mb-3">
				<label for="updated_at" class="form-label">수정일</label>
				<input
					type="text"
					class="form-control"
					id="updated_at"
					:value="formatDate(user.updatedAt)"
					disabled
				/>
			</div>
			<div class="mb-3">
				<button
					class="btn btn-outline-danger me-2"
					type="button"
					@click="handleCancel"
				>
					취소
				</button>
				<button class="btn btn-primary" :disabled="loading">
					<template v-if="loading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else>저장</template>
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/composables/alert';
import { useAuthStore } from '@/stores/auth';
import { updateCurrentUser } from '@/api/user';

const router = useRouter();
const { vAlert, vSuccess } = useAlert();
const authStore = useAuthStore();
const user = ref(null);

const formatDate = dateString => {
	if (!dateString) return '';
	const date = new Date(dateString);
	return date.toLocaleString('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	});
};

const { error, loading } = useAxios(
	'/users/me',
	{
		method: 'get',
	},
	{
		immediate: true,
		onSuccess: response => {
			user.value = response.data;
		},
	},
);

const handleSave = async () => {
	try {
		await updateCurrentUser({
			username: user.value.username,
			email: user.value.email,
		});

		// auth store의 사용자 정보 업데이트
		authStore.user = {
			...authStore.user,
			username: user.value.username,
			email: user.value.email,
		};
		router.push('/users/me');
		vSuccess('수정이 완료되었습니다.');
	} catch (err) {
		vAlert(
			err.response?.data?.message || '회원정보 수정 중 오류가 발생했습니다.',
		);
	}
};

const handleCancel = () => {
	router.push('/users/me');
};
</script>

<style lang="scss" scoped></style>
