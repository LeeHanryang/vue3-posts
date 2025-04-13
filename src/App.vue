<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheView from '@/layouts/TheView.vue';
import useAlert from './composables/alert';

const { alerts } = useAlert();
</script>

<template>
	<main>
		<TheHeader />
		<TheView />
		<AppAlert :items="alerts" />
	</main>
</template>

<style></style>
