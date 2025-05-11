<template>
	<div>
		<h2>사용자 상세</h2>
		<hr class="my-4" />

		<AppError v-if="error" :message="error.message" />

		<div v-if="user" class="card">
			<div class="card-body">
				<h5 class="card-title">{{ user.name }}</h5>
				<p class="card-text">이메일: {{ user.email }}</p>
				<p class="card-text">가입일: {{ formatDate(user.createdAt) }}</p>
			</div>
			<div class="card-footer">
				<button class="btn btn-primary me-2" @click="handleEdit">수정</button>
				<button class="btn btn-danger me-2" @click="handleDelete">삭제</button>
				<button class="btn btn-secondary" @click="handleList">목록</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import { formatDate } from '@/utils/date';

const router = useRouter();
const user = ref(null);

const { error, loading, execute } = useAxios(
	'/users/me',
	{
		method: 'get',
	},
	{
		immediate: true,
		onSuccess: response => {
			user.value = response.data;
		},
	},
);

const handleEdit = () => {
	router.push('/users/me/edit');
};

const handleDelete = () => {
	router.push('/users/me/delete');
};

const handleList = () => {
	router.push('/todos');
};
</script>

<style lang="scss" scoped></style>
