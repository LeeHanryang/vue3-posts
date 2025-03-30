import { posts } from './index';

// 게시글 목록 조회
export const getPosts = async (params = {}) => {
	return await posts.get('/', { params });
};

// 게시글 상세 조회
export const getPost = async id => {
	return await posts.get(`/${id}`);
};

// 게시글 등록
export const createPost = async post => {
	return await posts.post('/', post);
};

// 게시글 수정
export const updatePost = async (id, post) => {
	return await posts.patch(`/${id}`, post);
};

// 게시글 삭제
export const deletePost = async id => {
	return await posts.delete(`/${id}`);
};
