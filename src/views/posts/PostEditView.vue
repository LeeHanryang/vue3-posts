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
			@submit.prevent="handleUpdate"
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
import { useRouter } from 'vue-router';
import { getPost, updatePost } from '@/api/post';
import { ref, onMounted } from 'vue';
import PostForm from '@/components/posts/PostForm.vue';
import useAlert from '@/composables/alert';

const error = ref(null);
const loading = ref(false);

const props = defineProps({
	id: {
		type: Number,
		required: true,
	},
});

const router = useRouter();
// const route = useRoute();

const { vAlert, vSuccess } = useAlert();

const post = ref({
	title: '',
	contents: '',
});

const handleDetail = () => {
	router.push({ name: 'posts.detail', params: { id: props.id } });
};

const editError = ref(null);
const editLoading = ref(false);

const handleUpdate = async () => {
	try {
		editLoading.value = true;
		await updatePost(props.id, { ...post.value });
		router.push({ name: 'posts.detail', params: { id: props.id } });
		vSuccess('수정이 완료되었습니다.');
	} catch (err) {
		vAlert('수정에 실패하였습니다.');
		editError.value = err;
	} finally {
		editLoading.value = false;
	}
};

onMounted(async () => {
	try {
		loading.value = true;
		const { data } = await getPost(props.id);
		post.value = data;
	} catch (error) {
		console.error(error);
		vAlert(error.message);
	} finally {
		loading.value = false;
	}
});
</script>

<style lang="scss" scoped></style>
