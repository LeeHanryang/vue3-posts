<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<h2>{{ post.title }}</h2>
		<p>{{ post.contents }}</p>
		<p class="text-muted">
			{{ $dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss') }}
		</p>
		<hr class="my-4" />

		<AppError v-if="removeError" :message="removeError.message" />

		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="handlePostList">
					목록
				</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="handlePostEdit">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button
					class="btn btn-outline-danger"
					@click="handlePostDelete"
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
import { useRouter } from 'vue-router';
import { getPost, deletePost } from '@/api/post';
import { ref, onMounted } from 'vue';
import useAlert from '@/composables/alert';

const props = defineProps({
	id: {
		type: [String, Number],
		required: true,
	},
});

const router = useRouter();
// const route = useRoute();

const { vSuccess } = useAlert();

/*
 * ref
 * 장점) 객체 할당 가능
 * 단점) post.value.title, post.value.contents, post.value.createdAt 접근 불편
 * reactive
 * 장점) post.title, post.contents, post.createdAt 접근 편리
 * 단점) 객체 할당 불가능
 */
const post = ref({
	title: null,
	content: null,
	createAt: null,
});

const error = ref(null);
const loading = ref(false);
// const post = reactive({});

// const id = route.params.id;

const setPost = ({ title, contents, createdAt }) => {
	post.value.title = title;
	post.value.contents = contents;
	post.value.createdAt = createdAt;
};

const fetchPost = async () => {
	try {
		loading.value = true;
		const { data } = await getPost(props.id);
		setPost(data);
	} catch (err) {
		error.value = err;
	} finally {
		loading.value = false;
	}
};

const handlePostList = () => {
	router.push({
		name: 'posts',
	});
};

const handlePostEdit = () => {
	router.push({
		name: 'posts.edit',
		params: {
			id: props.id,
		},
	});
};

const removeError = ref(null);
const removeLoading = ref(false);

const handlePostDelete = async () => {
	try {
		removeLoading.value = true;

		if (confirm('삭제하시겠습니까?') === false) return;

		await deletePost(props.id);
		vSuccess('삭제가 완료되었습니다.');
		router.push({
			name: 'posts',
		});
	} catch (err) {
		console.error(err);
		removeError.value = err;
	} finally {
		removeLoading.value = false;
	}
};

onMounted(async () => {
	// post.value = await getPost(route.params.id);
	fetchPost();
});
</script>

<style lang="scss" scoped></style>
