<template>
	<header>
		<nav class="navbar navbar-expand-sm navbar-dark bg-primary">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">GYM CODING</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto">
						<li class="nav-item">
							<router-link class="nav-link" active-class="active" to="/">
								HOME
							</router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" active-class="active" to="/about">
								About
							</router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" active-class="active" to="/posts">
								게시글
							</router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" active-class="active" to="/nested">
								Nested
							</router-link>
						</li>
					</ul>
					<div class="d-flex" role="search">
						<button
							class="btn btn-outline-light"
							type="button"
							@click="handleWrite"
						>
							글쓰기
						</button>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleWrite = () => {
	router.push('/posts/create');
};
</script>

<style lang="scss" scoped></style>
