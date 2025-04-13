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
import { createPost } from '@/api/post';
import { ref } from 'vue';
import PostForm from '@/components/posts/PostForm.vue';
import useAlert from '@/composables/alert';

const { vAlert, vSuccess } = useAlert();

const error = ref(null);
const loading = ref(false);

const post = ref({
	title: '',
	contents: '',
	createdAt: Date.now(), // yyyy-mm-dd
});

const router = useRouter();

const handleList = () => {
	router.push('/posts');
};

const handleSave = async () => {
	try {
		loading.value = true;
		await createPost(post.value);
		router.push('/posts');
		vSuccess('등록이 완료되었습니다.');
	} catch (err) {
		error.value = err;
		vAlert('등록에 실패하였습니다.');
	} finally {
		loading.value = false;
	}
};

const visibleForm = ref(true);
</script>

<style lang="scss" scoped></style>
