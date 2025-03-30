<template>
	<div>
		<h2>{{ post.title }}</h2>
		<p>{{ post.contents }}</p>
		<p class="text-muted">{{ post.createdAt }}</p>
		<hr class="my-4" />

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
				<button class="btn btn-outline-danger" @click="handlePostDelete">
					삭제
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getPost, deletePost } from '@/api/post';
import { ref, onMounted } from 'vue';

const props = defineProps({
	id: {
		type: [String, Number],
		required: true,
	},
});

const router = useRouter();
// const route = useRoute();

/*
 * ref
 * 장점) 객체 할당 가능
 * 단점) post.value.title, post.value.contents, post.value.createdAt 접근 불편
 * reactive
 * 장점) post.title, post.contents, post.createdAt 접근 편리
 * 단점) 객체 할당 불가능
 */
const post = ref({});
// const post = reactive({});

// const id = route.params.id;

const setPost = ({ title, contents, createdAt }) => {
	post.value.title = title;
	post.value.contents = contents;
	post.value.createdAt = createdAt;
};

const fetchPost = async () => {
	// const data = await getPost(props.id);
	// post.value = { ...data };

	// post.title = data.title;
	// post.contents = data.contents;
	// post.createdAt = data.createdAt;
	try {
		const { data } = await getPost(props.id);
		setPost(data);
	} catch (error) {
		console.error(error);
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

const handlePostDelete = async () => {
	try {
		if (confirm('삭제하시겠습니까?') === false) return;

		await deletePost(props.id);
		router.push({
			name: 'posts',
		});
	} catch (error) {
		console.error(error);
	}
};

onMounted(async () => {
	// post.value = await getPost(route.params.id);
	fetchPost();
});
</script>

<style lang="scss" scoped></style>
