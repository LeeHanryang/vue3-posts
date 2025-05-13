<template>
	<div class="social-login-buttons">
		<div class="divider">
			<span>소셜 계정으로 시작하기</span>
		</div>
		<div class="d-grid gap-2">
			<a :href="`${apiUrl}/oauth2/authorization/google`" class="btn btn-google">
				<img
					src="https://www.google.com/favicon.ico"
					alt="Google"
					class="social-icon"
				/>
				Google로 시작하기
			</a>
			<a :href="`${apiUrl}/oauth2/authorization/naver`" class="btn btn-naver">
				<img
					src="https://www.naver.com/favicon.ico"
					alt="Naver"
					class="social-icon"
				/>
				Naver로 시작하기
			</a>
			<a :href="`${apiUrl}/oauth2/authorization/kakao`" class="btn btn-kakao">
				<img
					src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
					alt="Kakao"
					class="social-icon"
				/>
				Kakao로 시작하기
			</a>
		</div>
	</div>
</template>

<script setup>
const apiUrl = import.meta.env.VITE_APP_API_URL;
</script>

<style scoped>
.social-login-buttons {
	margin: 1.5rem 0;
}

.divider {
	text-align: center;
	position: relative;
	margin: 1.5rem 0;
}

.divider::before,
.divider::after {
	content: '';
	position: absolute;
	top: 50%;
	width: 35%;
	height: 1px;
	background-color: #e0e0e0;
}

.divider::before {
	left: 0;
}

.divider::after {
	right: 0;
}

.divider span {
	background-color: white;
	padding: 0 1rem;
	color: #666;
	font-size: 0.9rem;
	position: relative;
	z-index: 1;
}

.btn {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	padding: 0.75rem;
	font-weight: 500;
	text-decoration: none;
	color: white;
	transition: all 0.2s ease;
	border: none;
}

.btn-google {
	background-color: #4285f4;
}

.btn-google:hover {
	background-color: #357abd;
	color: white;
	transform: translateY(-1px);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-naver {
	background-color: #03c75a;
}

.btn-naver:hover {
	background-color: #02b351;
	color: white;
	transform: translateY(-1px);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-kakao {
	background-color: #fee500;
	color: #000000;
}

.btn-kakao:hover {
	background-color: #f4dc00;
	color: #000000;
	transform: translateY(-1px);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.social-icon {
	width: 20px;
	height: 20px;
	object-fit: contain;
}
</style>
