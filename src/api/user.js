import axios from './index';

// 회원가입
export const signup = userData => {
	return axios.post('/users/signup', userData);
};

// 로그인
export const login = credentials => {
	return axios.post('/users/login', credentials);
};

// 로그아웃
export const logout = () => {
	return axios.post('/users/logout');
};

// 현재 사용자 정보 조회
export const getCurrentUser = () => {
	return axios.get('/users/me');
};

// 소셜 로그인 URL 요청
export const getSocialLoginUrl = provider => {
	return axios.get(`/oauth2/authorization/${provider}`);
};

// 소셜 로그인 콜백 처리
export const handleSocialLoginCallback = (provider, code) => {
	return axios.get(`/login/oauth2/code/${provider}?code=${code}`);
};
