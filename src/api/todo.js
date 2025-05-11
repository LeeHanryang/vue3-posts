import axios from './index';

// Todo 목록 조회
export const getTodos = () => {
	return axios.get('/todos');
};

// Todo 상세 조회
export const getTodo = id => {
	return axios.get(`/todos/${id}`);
};

// Todo 생성
export const createTodo = todoData => {
	return axios.post('/todos', todoData);
};

// Todo 수정
export const updateTodo = (id, todoData) => {
	return axios.put(`/todos/${id}`, todoData);
};

// Todo 삭제
export const deleteTodo = id => {
	return axios.delete(`/todos/${id}`);
};

// Todo 완료 상태 토글
export const toggleTodoComplete = id => {
	return axios.patch(`/todos/${id}/complete`);
};

// Todo 검색
export const searchTodos = async (params = {}) => {
	return await axios.get('/search', { params });
};
