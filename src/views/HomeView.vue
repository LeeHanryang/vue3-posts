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
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import AppCard from '@/components/AppCard.vue';
import AppGrid from '@/components/AppGrid.vue';
const router = useRouter();
const goAboutPage = () => {
	router.push('/about');
};

const items = ref(['사과', '딸기', '바나나', '라임', '레몬']);
</script>

<style lang="scss" scoped></style>
