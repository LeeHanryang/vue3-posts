import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';

const routes = [
	{ path: '/', name: 'home', component: HomeView },
	{ path: '/about', name: 'about', component: AboutView },
	{ path: '/posts', name: 'posts', component: PostListView },
	{ path: '/posts/create', name: 'posts.create', component: PostCreateView },
	{
		path: '/posts/:id',
		name: 'posts.detail',
		component: PostDetailView,
		props: true,
		// props: route => ({ id: Number(route.params.id) }),
	},
	{
		path: '/posts/:id/edit',
		name: 'posts.edit',
		component: PostEditView,
		props: route => ({ id: Number(route.params.id) }),
	},
	{ path: '/:pathMatch(.*)*', name: 'notFound', component: NotFoundView },
	{
		path: '/nested',
		name: 'nested',
		component: NestedView,
		children: [
			{ path: '', name: 'nested.home', component: NestedHomeView },
			{ path: 'one', name: 'nested.one', component: NestedOneView },
			{ path: 'two', name: 'nested.two', component: NestedTwoView },
		],
	},
];

const router = createRouter({
	history: createWebHistory('/'),
	// history: createWebHashHistory(),
	routes,
});

export default router;
