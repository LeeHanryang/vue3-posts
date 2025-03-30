<template>
	<form @submit.prevent>
		<div class="row g-3">
			<div class="col">
				<input
					type="text"
					class="form-control"
					:value="title"
					@input="$emit('update:title', $event.target.value)"
					placeholder="제목을 입력해주세요"
				/>
			</div>
			<div class="col-3">
				<select
					:value="limit"
					class="form-select"
					@change="$emit('update:limit', $event.target.value)"
				>
					<option value="3">3개씩</option>
					<option value="6">6개씩</option>
					<option value="10">10개씩</option>
				</select>
			</div>
		</div>
	</form>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		default: '',
	},
	limit: {
		type: Number,
		default: 3,
	},
});

defineEmits(['update:title', 'update:limit']);
</script>

<style lang="scss" scoped></style>
