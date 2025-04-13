<template>
	<div>
		<h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
		<hr class="my-4" />

		<AppLoading v-if="loading" />
		<AppError v-else-if="error" :message="error.message" />

		<PostForm
			v-if="visibleForm"
			v-model:title="post.title"
			v-model:contents="post.contents"
			@submit.prevent="handleSave"
		>
			<template #actions>
				<button class="btn btn-outline-dark" type="button" @click="handleList">
					목록
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
import useAlert from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const { vAlert, vSuccess } = useAlert();

const post = ref({
	title: '',
	contents: '',
	createdAt: Date.now(), // yyyy-mm-dd
});

const router = useRouter();

const handleList = () => {
	router.push('/posts');
};

const { error, loading, execute } = useAxios(
	'/posts',
	{
		method: 'post',
		data: { ...post.value },
	},
	{
		immediate: false,
		onSuccess: () => {
			router.push('/posts');
			vSuccess('등록이 완료되었습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const handleSave = async () => {
	execute({ ...post.value });
};

const visibleForm = ref(true);
</script>

<style lang="scss" scoped></style>
