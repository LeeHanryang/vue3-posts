<template>
	<div>
		<h2>Home View</h2>
		<p>{{ $route.path }}</p>
		<button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
		<hr class="my-4" />
		<AppGrid :items="items" cols="col-4" v-slot="{ item }">
			<AppCard>{{ item }}</AppCard>
		</AppGrid>
	</div>
	<!-- <h2 class="my-4">
		{{ $person.name }}
	</h2>
	<button class="btn btn-primary" @click="person.say">click person</button> -->
	<h2>{{ position }}</h2>
	<h2>x: {{ x }}, y: {{ y }}</h2>
</template>

<script>
export default {
	created() {
		// this.$person.say();
	},
};
</script>

<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref, toRefs } from 'vue';

const router = useRouter();
const goAboutPage = () => {
	router.push('/about');
};

const items = ref(['사과', '딸기', '바나나', '라임', '레몬']);

const position = reactive({
	x: 100,
	y: 1000,
});
// const { x, y } = position;
// const x = toRef(position, 'x');
// const y = toRef(position, 'y');
const { x, y } = toRefs(position);
</script>

<style lang="scss" scoped></style>
