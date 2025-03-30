<template>
	<div>
		<h2>게시글 등록</h2>
		<hr class="my-4" />
		<PostForm
			v-model:title="post.title"
			v-model:contents="post.contents"
			@submit.prevent="handleSave"
		>
			<template #actions>
				<button class="btn btn-outline-dark" type="button" @click="handleList">
					목록
				</button>
				<button class="btn btn-primary" @click="handleSave">저장</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { createPost } from '@/api/post';
import { ref } from 'vue';
import PostForm from '@/components/posts/PostForm.vue';

const post = ref({
	title: '',
	contents: '',
	createdAt: new Date().toISOString().split('T')[0], // yyyy-mm-dd
});

const router = useRouter();

const handleList = () => {
	router.push('/posts');
};

const handleSave = async () => {
	try {
		await createPost(post.value);
		router.push('/posts');
	} catch (error) {
		console.error(error);
	}
};
</script>

<style lang="scss" scoped></style>
