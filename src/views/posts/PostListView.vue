<template>
	<div>
		<h2>Todo List</h2>
		<hr class="my-4" />

		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		/>

		<hr class="my-4" />

		<AppLoading v-if="loading" />

		<AppError v-else-if="error" :message="error.message" />

		<template v-else>
			<div class="table-responsive">
				<table class="table table-hover">
					<thead>
						<tr>
							<th scope="col" class="text-center" style="width: 80px">순번</th>
							<th scope="col" style="width: 200px">제목</th>
							<th scope="col">내용</th>
							<th scope="col" class="text-center" style="width: 150px">
								생성일
							</th>
							<th scope="col" class="text-center" style="width: 100px">완료</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(todo, index) in todos"
							:key="todo.id"
							@dblclick="handleTodoDetail(todo.id)"
							class="cursor-pointer"
						>
							<td class="text-center">
								{{ (params._page - 1) * params._limit + index + 1 }}
							</td>
							<td>{{ todo.title }}</td>
							<td class="text-truncate" style="max-width: 300px">
								{{ todo.contents }}
							</td>
							<td class="text-center">{{ formatDate(todo.createdAt) }}</td>
							<td class="text-center">
								<input
									type="checkbox"
									class="form-check-input"
									v-model="todo.completed"
									@click.stop="handleToggleComplete(todo)"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<AppPagination
				:currentPage="params._page"
				:totalPages="totalPages"
				@page="page => (params._page = page)"
			/>
		</template>
	</div>
</template>

<script setup>
import PostFilter from '@/components/posts/PostFilter.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import dayjs from 'dayjs';
import { updateTodo } from '@/api/todo';

const router = useRouter();

// 페이징
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 10,
	title_like: '',
});

const {
	response,
	data: todos,
	error,
	loading,
} = useAxios('/todos', { method: 'get', params });
const totalCount = computed(() => response.value.headers['x-total-count']);
const totalPages = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

const handleTodoDetail = id => {
	router.push({
		name: 'posts.detail',
		params: { id },
	});
};

const handleToggleComplete = async todo => {
	try {
		await updateTodo(todo.id, {
			...todo,
			completed: !todo.completed,
		});
	} catch (err) {
		console.error('Failed to update todo:', err);
	}
};

const formatDate = date => {
	return dayjs(date).format('YYYY-MM-DD');
};
</script>

<style scoped>
.cursor-pointer {
	cursor: pointer;
}
.text-truncate {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
