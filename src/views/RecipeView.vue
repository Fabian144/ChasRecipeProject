<template>
	<recipeInfo />
	<RatingSection :recipe-id="recipeId" />
	<CommentSection :recipeId="recipeId" />
</template>

<script>
import RatingSection from '@/components/recipepage/RatingSection.vue';
import CommentSection from '@/components/recipepage/commentSection.vue';
import recipeInfo from '@/components/recipepage/recipeInfo.vue';

export default {
	components: {
		CommentSection,
		RatingSection,
		recipeInfo,
	},

	computed: {
		recipeId() {
			return this.$route.params.recipeId;
		},
	},
};
</script>

<style scoped></style>