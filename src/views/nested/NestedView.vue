<template>
	<div>
		<ul class="nav nav-pills">
			<li class="nav-item">
				<router-link
					class="nav-link"
					:to="{ name: 'nested.one', replace: true }"
					active-class="active"
					>Nested One</router-link
				>
			</li>
			<li class="nav-item">
				<router-link
					class="nav-link"
					:to="{ name: 'nested.two', replace: true }"
					active-class="active"
					>Nested Two</router-link
				>
			</li>
		</ul>
		<hr class="my-4" />
		<router-view />
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
