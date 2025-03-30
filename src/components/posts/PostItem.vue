<template>
	<AppCard>
		<h5 class="card-title">{{ title }}</h5>
		<p class="card-text">
			{{ contents }}
		</p>
		<p class="text-muted">{{ createdAt }}</p>
	</AppCard>
</template>

<script setup>
import AppCard from '@/components/AppCard.vue';

defineProps({
	title: {
		type: String,
		required: true,
	},
	contents: {
		type: String,
		required: true,
	},
	createdAt: {
		type: [String, Number, Date],
		required: true,
	},
});
</script>

<style lang="scss" scoped></style>
