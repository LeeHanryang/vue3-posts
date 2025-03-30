import { useRouter, useRoute } from 'vue-router';

export function usePostNavigation() {
	const router = useRouter();
	const route = useRoute();

	const goToDetail = () => {
		router.push({ name: 'posts.detail', params: { id: route.params.id } });
	};

	return {
		goToDetail,
	};
}
