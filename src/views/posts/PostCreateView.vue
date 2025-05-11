<template>
	<div>
		<h2>Todo 작성</h2>
		<hr class="my-4" />

		<AppError v-if="error" :message="error.message" />

		<PostForm
			:title="post.title"
			:description="post.description"
			@update:title="post.title = $event"
			@update:description="post.description = $event"
			@submit="handleSave"
		>
			<template #actions>
				<button
					class="btn btn-outline-danger me-2"
					type="button"
					@click="handleList"
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
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const { vAlert, vSuccess } = useAlert();

const post = ref({
	title: '',
	description: '',
});

const router = useRouter();

const handleList = () => {
	router.push('/todos');
};

const { error, loading, execute } = useAxios(
	'/todos',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			router.push('/todos');
			vSuccess('등록이 완료되었습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const handleSave = () => {
	execute({
		title: post.value.title,
		description: post.value.description,
		completed: false,
	});
};
</script>

<style lang="scss" scoped></style>
