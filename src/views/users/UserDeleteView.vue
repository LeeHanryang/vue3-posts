<template>
	<div>
		<h2>사용자 삭제</h2>
		<hr class="my-4" />

		<AppError v-if="error" :message="error.message" />

		<div v-if="user" class="card">
			<div class="card-body">
				<h5 class="card-title">정말로 삭제하시겠습니까?</h5>
				<p class="card-text">이름: {{ user.name }}</p>
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
					<template v-else>삭제</template>
				</button>
				<button class="btn btn-secondary" @click="handleCancel">취소</button>
			</div>
		</div>
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

const { execute: deleteUser } = useAxios(
	`/users/${router.currentRoute.value.params.id}`,
	{
		method: 'delete',
	},
	{
		immediate: false,
		onSuccess: () => {
			router.push('/users');
			vSuccess('삭제가 완료되었습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const handleDelete = () => {
	deleteUser();
};

const handleCancel = () => {
	router.push(`/users/${user.value.id}`);
};
</script>

<style lang="scss" scoped></style>
