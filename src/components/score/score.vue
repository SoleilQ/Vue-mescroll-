<template>
	<div class="score">
		<div class="score_s">
			<i v-for="(item, index) in scoreClass" :class="item"></i>
		</div>
		<div class="score_n">{{getScore}}</div>
	</div>
</template>

<script type="text/javascript">
	const StarActive = 'active';
	const Star = '';
	export default {
		name: 'score',
		props: {
			score: {
				type: String
			}
		},
		computed: {
			scoreClass() {
				let result = [];
				let score = Math.floor(this.score * 2) / 2;
				for (let i = 0; i < 5; i++) {
					if (i < score) {
						result.push(StarActive);
					} else {
						result.push(Star);
					}
				}
				return result;
			},
			getScore() {
				return parseFloat(this.score).toFixed(1);
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.score
	font-size: 0
	.score_s
		& >i
			display: inline-block
			width: 12px
			height: 12px
			background: url('eStar.png') 0 0 no-repeat
			margin-right: 6px
			background-size: 100%
			&.active
				background: url('Star.png') 0 0 no-repeat
				background-size: 100%
	.score_n
		color: #ffa508
		font-size: 14px
		line-height: 22px;

</style>