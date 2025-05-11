<template>
	<form @submit.prevent="onSubmit">
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>
			<input
				type="text"
				class="form-control"
				id="title"
				:value="title"
				@input="$emit('update:title', $event.target.value)"
				required
			/>
		</div>
		<div class="mb-3">
			<label for="description" class="form-label">내용</label>
			<textarea
				class="form-control"
				id="description"
				rows="3"
				:value="description"
				@input="$emit('update:description', $event.target.value)"
				required
			></textarea>
		</div>
		<slot name="actions"></slot>
	</form>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

const emit = defineEmits(['update:title', 'update:description', 'submit']);

const onSubmit = () => {
	emit('submit');
};
</script>

<style></style>
