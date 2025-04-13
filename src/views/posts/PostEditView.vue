<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<AppError v-if="editError" :message="editError.message" />
		<PostForm
			v-model:title="post.title"
			v-model:contents="post.contents"
			@submit.prevent="edit"
		>
			<template #actions>
				<button
					class="btn btn-outline-danger"
					type="button"
					@click="handleDetail"
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
import useAlert from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { vSuccess, vAlert } = useAlert();
const { data: post, error, loading } = useAxios(`/posts/${id}`);

const {
	error: editError,
	loading: editLoading,
	execute,
} = useAxios(
	`/posts/${id}`,
	{
		method: 'patch',
		data: { ...post.value },
	},
	{
		immediate: false,
		onSuccess: () => {
			router.push({ name: 'posts.detail', params: { id } });
			vSuccess('수정이 완료되었습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const edit = () => {
	execute({ ...post.value });
};
</script>

<style lang="scss" scoped></style>
