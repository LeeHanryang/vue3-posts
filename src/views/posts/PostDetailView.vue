<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<h2>{{ todo.title }}</h2>
		<p>{{ todo.description }}</p>
		<p class="text-muted">{{ formatDate(todo.createdAt) }}</p>
		<hr class="my-4" />

		<AppError v-if="removeError" :message="removeError.message" />

		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goToList">목록</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goToEdit">수정</button>
			</div>
			<div class="col-auto">
				<button
					class="btn btn-outline-danger"
					@click="remove"
					:disabled="removeLoading"
				>
					<template v-if="removeLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else>삭제</template>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const route = useRoute();
const router = useRouter();
const { vSuccess, vAlert } = useAlert();

const formatDate = date => {
	if (!date) return '';
	const d = new Date(date);
	return d.toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	});
};

const {
	data: todo,
	error,
	loading,
} = useAxios(`/todos/${route.params.id}`, {}, { immediate: true });

const {
	error: removeError,
	loading: removeLoading,
	execute,
} = useAxios(
	`/todos/${route.params.id}`,
	{
		method: 'delete',
	},
	{
		immediate: false,
		onSuccess: () => {
			router.push('/todos');
			vSuccess('삭제가 완료되었습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const remove = () => {
	if (confirm('삭제하시겠습니까?') === false) return;
	execute();
};

const goToList = () => {
	router.push('/todos');
};

const goToEdit = () => {
	router.push(`/todos/${route.params.id}/edit`);
};
</script>

<style scoped>
.btn {
	font-weight: 500;
}
</style>
