<template>
	<form>
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>
			<input
				type="text"
				class="form-control"
				autofocus
				id="title"
				:value="title"
				@input="$emit('update:title', $event.target.value)"
			/>
		</div>
		<div class="mb-3">
			<label for="contents" class="form-label">내용</label>
			<textarea
				class="form-control"
				id="contents"
				rows="3"
				:value="contents"
				@input="$emit('update:contents', $event.target.value)"
			>
			</textarea>
		</div>
		<div class="d-flex gap-2 mt-4">
			<slot name="actions"></slot>
		</div>
	</form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
	title: {
		type: String,
		required: true,
		default: '',
	},
	contents: {
		type: String,
		required: true,
		default: '',
	},
});

defineEmits(['update:title', 'update:contents']);
</script>

<style></style>
