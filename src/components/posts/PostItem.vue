<template>
	<AppCard>
		<h5 class="card-title">{{ title }}</h5>
		<p class="card-text">
			{{ contents }}
		</p>
		<p class="text-muted">{{ createdDate }}</p>
		<template #footer>
			<div class="d-flex flex-row-reverse">
				<button class="btn p-1" @click.stop="$emit('modal')">
					<i class="bi bi-emoji-sunglasses"></i>
				</button>
				<button class="btn p-1" @click.stop="$emit('preview')">
					<i class="bi bi-ticket-detailed"></i>
				</button>
			</div>
		</template>
	</AppCard>
</template>

<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
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

defineEmits(['modal', 'preview']);

const dayjs = inject('dayjs');

const createdDate = computed(() =>
	dayjs(props.createdAt).format('YYYY.MM.DD HH:mm:ss'),
);
</script>

<style lang="scss" scoped></style>
