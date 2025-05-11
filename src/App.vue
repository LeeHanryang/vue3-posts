<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppAlert from '@/components/app/AppAlert.vue';
</script>

<template>
	<AppHeader />
	<main class="container py-4">
		<router-view />
	</main>
	<AppAlert />
</template>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'bootstrap-icons/font/bootstrap-icons.css';

body {
	background-color: #f8f9fa;
}
</style>
