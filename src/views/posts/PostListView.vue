<template>
	<div class="container mt-4">
		<div class="d-flex justify-content-between align-items-center mb-4">
			<h2>Todo List</h2>
			<router-link to="/todos/create" class="btn btn-primary">
				<i class="bi bi-plus-lg"></i> Todo 작성
			</router-link>
		</div>

		<div class="card">
			<div class="card-body">
				<div class="table-responsive">
					<table class="table table-hover">
						<thead>
							<tr>
								<th style="width: 60px">#</th>
								<th style="width: 80px">상태</th>
								<th>제목</th>
								<th style="width: 180px">작성일</th>
								<th style="width: 100px">작성자</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(todo, index) in todos"
								:key="todo.id"
								@dblclick="viewTodoDetail(todo.id)"
								style="cursor: pointer"
							>
								<td>{{ index + 1 }}</td>
								<td>
									<div class="form-check">
										<input
											class="form-check-input"
											type="checkbox"
											:checked="todo.completed"
											@click.stop="toggleComplete(todo)"
										/>
									</div>
								</td>
								<td>
									<span
										:class="{
											'text-decoration-line-through': todo.completed,
										}"
									>
										{{ todo.title }}
									</span>
								</td>
								<td>{{ formatDate(todo.createdAt) }}</td>
								<td>{{ todo.username }}</td>
							</tr>
							<tr v-if="todos.length === 0">
								<td colspan="5" class="text-center py-4">
									등록된 Todo가 없습니다.
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getTodos, toggleTodoComplete } from '@/api/todo';

const router = useRouter();
const todos = ref([]);

const formatDate = date => {
	if (!date) return '';
	const d = new Date(date);
	return d.toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
};

const fetchTodos = async () => {
	try {
		const response = await getTodos();
		todos.value = response.data;
	} catch (error) {
		console.error('Failed to fetch todos:', error);
	}
};

const toggleComplete = async todo => {
	try {
		await toggleTodoComplete(todo.id);
		todo.completed = !todo.completed;
	} catch (error) {
		console.error('Failed to toggle todo:', error);
	}
};

const viewTodoDetail = id => {
	router.push(`/todos/${id}`);
};

onMounted(() => {
	fetchTodos();
});
</script>

<style scoped>
.table th {
	background-color: #f8f9fa;
}

.form-check-input {
	cursor: pointer;
}

.form-check-input:checked {
	background-color: #198754;
	border-color: #198754;
}
</style>
