import { todos } from './index';

// Todo 목록 조회
export const getTodos = async (params = {}) => {
	return await todos.get('/', { params });
};

// Todo 상세 조회
export const getTodo = async id => {
	return await todos.get(`/${id}`);
};

// Todo 등록
export const createTodo = async todo => {
	return await todos.post('/', todo);
};

// Todo 수정
export const updateTodo = async (id, todo) => {
	return await todos.put(`/${id}`, todo);
};

// Todo 삭제
export const deleteTodo = async id => {
	return await todos.delete(`/${id}`);
};

// Todo 검색
export const searchTodos = async (params = {}) => {
	return await todos.get('/search', { params });
};
