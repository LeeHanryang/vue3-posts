import { createRouter, createWebHistory } from 'vue-router';
import PostListView from '@/views/posts/PostListView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import SignupView from '@/views/auth/SignupView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView,
		meta: { requiresAuth: false },
	},
	{
		path: '/signup',
		name: 'signup',
		component: SignupView,
		meta: { requiresAuth: false },
	},
	{
		path: '/todos',
		name: 'todos',
		component: PostListView,
		meta: { requiresAuth: true },
	},
	{
		path: '/todos/create',
		name: 'todos.create',
		component: PostCreateView,
		meta: { requiresAuth: true },
	},
	{
		path: '/todos/:id',
		name: 'todos.detail',
		component: PostDetailView,
		props: true,
		meta: { requiresAuth: true },
	},
	{
		path: '/todos/:id/edit',
		name: 'todos.edit',
		component: PostEditView,
		props: route => ({ id: Number(route.params.id) }),
		meta: { requiresAuth: true },
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'notFound',
		component: NotFoundView,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

// 네비게이션 가드
router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore();
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	// 인증이 필요한 페이지인 경우
	if (requiresAuth) {
		// 토큰이 없으면 로그인 페이지로 리다이렉트
		if (!authStore.isAuthenticated) {
			next('/login');
			return;
		}

		// 토큰은 있지만 사용자 정보가 없는 경우
		if (!authStore.user) {
			try {
				await authStore.fetchUser();
			} catch (error) {
				// 토큰이 유효하지 않은 경우
				next('/login');
				return;
			}
		}
	}

	// 이미 로그인된 상태에서 로그인/회원가입 페이지 접근 시
	if (!requiresAuth && authStore.isAuthenticated) {
		next('/todos');
		return;
	}

	next();
});

export default router;
