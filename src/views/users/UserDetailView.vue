<template>
	<div>
		<h2>내 정보</h2>
		<hr class="my-4" />

		<AppError v-if="error" :message="error.message" />

		<div v-if="user" class="card">
			<div class="card-body">
				<h5 class="card-title">
					<strong>{{ user.username }}</strong>
				</h5>
				<p class="card-text">이메일: {{ user.email }}</p>
				<p class="card-text">가입일: {{ formatDate(user.createdAt) }}</p>
				<p class="card-text">수정일: {{ formatDate(user.updatedAt) }}</p>
			</div>
			<div class="card-footer">
				<button class="btn btn-primary me-2" @click="handleEdit">수정</button>
				<button class="btn btn-danger me-2" @click="handleDelete">탈퇴</button>
				<button class="btn btn-secondary" @click="handleList">목록</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();
const user = ref(null);

const formatDate = dateString => {
	if (!dateString) return '';
	const date = new Date(dateString);
	return date.toLocaleString('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	});
};

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
