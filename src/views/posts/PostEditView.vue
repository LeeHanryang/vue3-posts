<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<h2>Todo 수정</h2>
		<hr class="my-4" />
		<AppError v-if="editError" :message="editError.message" />
		<PostForm
			:title="todo.title"
			:description="todo.description"
			@update:title="todo.title = $event"
			@update:description="todo.description = $event"
			@submit="edit"
		>
			<template #actions>
				<button
					class="btn btn-outline-danger me-2"
					type="button"
					@click="goToDetail"
				>
					취소
				</button>
				<button class="btn btn-primary" :disabled="editLoading">
					<template v-if="editLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else>수정</template>
				</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { vSuccess, vAlert } = useAlert();
const { data: todo, error, loading } = useAxios(`/todos/${id}`);

const {
	error: editError,
	loading: editLoading,
	execute,
} = useAxios(
	`/todos/${id}`,
	{
		method: 'put',
	},
	{
		immediate: false,
		onSuccess: response => {
			console.log('수정 성공 응답:', response);
			vSuccess('수정이 완료되었습니다.');
			router.push(`/todos/${id}`);
		},
		onError: err => {
			console.error('수정 실패:', err);
			vAlert(err.message);
		},
	},
);

const edit = () => {
	const updatedData = {
		title: todo.value.title,
		description: todo.value.description,
		completed: todo.value.completed,
	};
	console.log('수정할 데이터:', updatedData);
	execute(updatedData);
};

const goToDetail = () => {
	router.push(`/todos/${id}`);
};
</script>

<style lang="scss" scoped></style>
