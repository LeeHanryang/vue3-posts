<template>
	<div>
		<h2>About View</h2>
		<p>{{ $route.path }}</p>
		<button class="btn btn-primary" @click="goToHome">Home으로 이동</button>
		<h2>Store</h2>
		<p>counter: {{ counter }}</p>
		<p>counter2: {{ counter }}</p>
		<p>doubleCount: {{ doubleCount }}</p>
		<p>doubleCountPlusOne: {{ doubleCountPlusOne }}</p>
		<button @click="increment">Click!!</button>
	</div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const store = useCounterStore();
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);
const { increment } = store;

const route = useRoute();
const router = useRouter();

const goToHome = () => {
	router.push('/');
};
</script>

<style lang="scss" scoped></style>
