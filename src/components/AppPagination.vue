<template>
	<nav class="mt-5" aria-label="Page navigation example">
		<ul class="pagination justify-content-center">
			<li class="page-item" :class="isPrevPage">
				<a
					class="page-link"
					href="#"
					@click.prevent="$emit('page', props.currentPage - 1)"
				>
					이전
				</a>
			</li>
			<li
				class="page-item"
				:class="{ active: currentPage === page }"
				v-for="page in totalPages"
				:key="page"
			>
				<a class="page-link" href="#" @click.prevent="$emit('page', page)">
					{{ page }}
				</a>
			</li>
			<li class="page-item" :class="isNextPage">
				<a
					class="page-link"
					href="#"
					@click.prevent="$emit('page', props.currentPage + 1)"
				>
					다음
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	currentPage: {
		type: Number,
		required: true,
	},
	totalPages: {
		type: Number,
		required: true,
	},
});

defineEmits(['prevPage', 'nextPage', 'page']);

const isPrevPage = computed(() => ({ disabled: props.currentPage <= 1 }));
const isNextPage = computed(() => ({
	disabled: props.currentPage >= props.totalPages,
}));
</script>

<style lang="scss" scoped></style>
