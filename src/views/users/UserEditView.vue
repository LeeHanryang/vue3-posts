<template>
	<div>
		<h2>사용자 수정</h2>
		<hr class="my-4" />

		<AppError v-if="error" :message="error.message" />

		<form v-if="user" @submit.prevent="handleSave">
			<div class="mb-3">
				<label for="name" class="form-label">이름</label>
				<input
					type="text"
					class="form-control"
					id="name"
					v-model="user.name"
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

const router = useRouter();
const { vAlert, vSuccess } = useAlert();
const user = ref(null);

const {
	error,
	loading,
	execute: fetchUser,
} = useAxios(
	`/users/${router.currentRoute.value.params.id}`,
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

const { execute: updateUser } = useAxios(
	`/users/${router.currentRoute.value.params.id}`,
	{
		method: 'put',
	},
	{
		immediate: false,
		onSuccess: () => {
			router.push(`/users/${user.value.id}`);
			vSuccess('수정이 완료되었습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const handleSave = () => {
	updateUser({
		name: user.value.name,
		email: user.value.email,
	});
};

const handleCancel = () => {
	router.push(`/users/${user.value.id}`);
};
</script>

<style lang="scss" scoped></style>
