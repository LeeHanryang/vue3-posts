<template>
	<div class="container">
		<div class="row mb-3">
			<div class="col">
				<h2>Todo List</h2>
			</div>
			<div class="col text-end">
				<button class="btn btn-primary" @click="goToCreate">새 Todo</button>
			</div>
		</div>

		<AppLoading v-if="loading" />

		<AppError v-else-if="error" :message="error.message" />

		<div v-else class="table-responsive">
			<table class="table table-hover">
				<thead>
					<tr>
						<th class="text-center" style="width: 80px">순번</th>
						<th style="width: 200px">제목</th>
						<th>내용</th>
						<th class="text-center" style="width: 180px">생성일</th>
						<th class="text-center" style="width: 100px">완료</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(todo, index) in todos" :key="todo.id">
						<td class="text-center align-middle">{{ index + 1 }}</td>
						<td class="align-middle">
							<a
								href="#"
								@click.prevent="goToDetail(todo.id)"
								class="text-decoration-none"
								>{{ todo.title }}</a
							>
						</td>
						<td class="align-middle">{{ todo.description }}</td>
						<td class="text-center align-middle">
							{{ formatDate(todo.createdAt) }}
						</td>
						<td class="text-center align-middle">
							<div class="form-check d-flex justify-content-center">
								<input
									class="form-check-input"
									type="checkbox"
									:checked="todo.completed"
									@change="toggleTodo(todo)"
									:disabled="toggleLoading === todo.id"
								/>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();
const { vAlert, vSuccess } = useAlert();

const formatDate = date => {
	if (!date) return '';
	const d = new Date(date);
	return d.toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	});
};

const { data: todos, error, loading } = useAxios('/todos');

let toggleLoading = false;

const toggleTodo = todo => {
	const { execute: toggleExecute } = useAxios(
		`/todos/${todo.id}`,
		{
			method: 'put',
		},
		{
			immediate: false,
			onSuccess: () => {
				vSuccess('상태가 변경되었습니다.');
			},
			onError: err => {
				if (err.response?.status === 401) {
					vAlert('로그인이 필요합니다.');
					router.push('/login');
				} else {
					vAlert(err.message);
				}
			},
		},
	);

	const updatedData = {
		id: todo.id,
		title: todo.title,
		description: todo.description,
		completed: !todo.completed,
	};
	toggleExecute(updatedData);
};

const goToCreate = () => {
	router.push('/todos/create');
};

const goToDetail = id => {
	router.push(`/todos/${id}`);
};
</script>

<style scoped>
.table th {
	background-color: #f8f9fa;
}

.table td {
	vertical-align: middle;
}

.table a {
	color: #0d6efd;
}

.table a:hover {
	color: #0a58ca;
}

.form-check-input {
	cursor: pointer;
}
</style>
