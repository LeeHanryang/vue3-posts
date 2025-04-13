<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<h2>{{ post.title }}</h2>
		<p>id: {{ props.id }}, isOdd: {{ isOdd }}, isEven: {{ isEven }}</p>
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
					@click="remove"
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
import useAlert from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';
import { computed, toRefs } from 'vue';
import { useNumber } from '@/composables/number';

const props = defineProps({
	id: [String, Number],
});

const router = useRouter();
const { id: idRef } = toRefs(props);
// const idRef = toRef(props, 'id');
const { vSuccess, vAlert } = useAlert();
const url = computed(() => `/posts/${props.id}`);
const { data: post, error, loading } = useAxios(url);

const { isOdd, isEven } = useNumber(idRef);

const {
	error: removeError,
	loading: removeLoading,
	execute,
} = useAxios(
	`/posts/${props.id}`,
	{
		method: 'delete',
		data: { ...post.value },
	},
	{
		immediate: false,
		onSuccess: () => {
			router.push('/posts');
			vSuccess('삭제가 완료되었습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const remove = () => {
	if (confirm('삭제하시겠습니까?') === false) return;
	execute();
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
</script>

<style lang="scss" scoped></style>
