<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container">
			<router-link class="navbar-brand" to="/todos">Todo List</router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav me-auto">
					<template v-if="authStore.isAuthenticated">
						<li class="nav-item">
							<router-link class="nav-link" to="/todos">Todo 목록</router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" to="/todos/create"
								>Todo 작성</router-link
							>
						</li>
					</template>
				</ul>
				<div class="d-flex align-items-center">
					<template v-if="authStore.isAuthenticated">
						<span class="me-3">{{ authStore.user?.username }}님</span>
						<button
							class="btn btn-outline-danger"
							@click="handleLogout"
							:disabled="authStore.loading"
						>
							로그아웃
						</button>
					</template>
					<template v-else>
						<router-link to="/login" class="btn btn-outline-primary me-2">
							로그인
						</router-link>
						<router-link to="/signup" class="btn btn-primary">
							회원가입
						</router-link>
					</template>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
	try {
		await authStore.logoutUser();
		router.push('/login');
	} catch (error) {
		console.error('Logout failed:', error);
	}
};
</script>

<style scoped>
.navbar {
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
	font-weight: 600;
}

.nav-link {
	font-weight: 500;
}

.btn {
	font-weight: 500;
}
</style>
