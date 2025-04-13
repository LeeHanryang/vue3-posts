<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />

		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		/>

		<hr class="my-4" />

		<AppLoading v-if="loading" />

		<AppError v-else-if="error" :message="error.message" />

		<template v-else>
			<AppGrid :items="posts" cols="col-4">
				<template v-slot="{ item }">
					<PostItem
						:title="item.title"
						:contents="item.contents"
						:createdAt="item.createdAt"
						@click="handlePostDetail(item.id)"
						@modal="openModal(item)"
						@preview="selectPreview(item.id)"
					/>
				</template>
			</AppGrid>

			<AppPagination
				:currentPage="params._page"
				:totalPages="totalPages"
				@page="page => (params._page = page)"
			/>
		</template>

		<Teleport to="#modal">
			<PostModal
				v-model="show"
				:title="modalTitle"
				:contents="modalContents"
				:createdAt="modalCreateAt"
			/>
		</Teleport>

		<template v-if="previewId">
			<hr class="my-5" />
			<AppCard>
				<PostDetail :id="previewId" />
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetail from '@/views/posts/PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();

const previewId = ref(null);
const selectPreview = id => (previewId.value = id);

// 페이징
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 3,
	title_like: '',
});

const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/posts', { method: 'get', params });
const totalCount = computed(() => response.value.headers['x-total-count']);
const totalPages = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

const handlePostDetail = id => {
	router.push({
		name: 'posts.detail',
		params: { id },
	});
};

//modal
const show = ref(false);
const modalTitle = ref('');
const modalContents = ref('');
const modalCreateAt = ref('');

const openModal = ({ title, contents, createdAt }) => {
	show.value = true;
	modalTitle.value = title;
	modalContents.value = contents;
	modalCreateAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
