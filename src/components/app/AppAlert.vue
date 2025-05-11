<template>
	<!-- <Transition name="slide">
		
		<div v-if="show" class="app-alert alert" :class="typeStyle" role="alert">
			{{ message }}
		</div>
	</Transition> -->
	<div class="app-alert">
		<TransitionGroup name="slide">
			<div
				v-for="({ message, type }, index) in alerts"
				:key="index"
				class="alert"
				:class="typeStyle(type)"
				role="alert"
			>
				{{ message }}
			</div>
		</TransitionGroup>
	</div>
</template>

<script setup>
import { useAlert } from '@/composables/alert';

const { alerts } = useAlert();

const typeStyle = type => {
	switch (type) {
		case 'error':
			return 'alert-danger';
		case 'success':
			return 'alert-success';
		default:
			return 'alert-primary';
	}
};
</script>

<style scoped>
.app-alert {
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 1000;
}

.alert {
	min-width: 300px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	transform: translateY(30px);
}

.slide-enter-active,
.slide-leave-active {
	transition: all 0.3s ease;
}

.slide-enter-to,
.slide-leave-from {
	opacity: 1;
	transform: translateY(0px);
}
</style>
