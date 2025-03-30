<template>
	<div>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
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
				<button class="btn btn-primary" @click="handleUpdate">수정</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getPost, updatePost } from '@/api/post';
import { ref, onMounted } from 'vue';
import PostForm from '@/components/posts/PostForm.vue';

const props = defineProps({
	id: {
		type: Number,
		required: true,
	},
});

const router = useRouter();
// const route = useRoute();

const post = ref({
	title: '',
	contents: '',
});

const handleDetail = () => {
	router.push({ name: 'posts.detail', params: { id: props.id } });
};

const handleUpdate = async () => {
	try {
		await updatePost(props.id, { ...post.value });
		router.push({ name: 'posts.detail', params: { id: props.id } });
	} catch (error) {
		console.error(error);
	}
};

onMounted(async () => {
	const { data } = await getPost(props.id);
	post.value = data;
});
</script>

<style lang="scss" scoped></style>
