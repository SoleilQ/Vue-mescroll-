<template>
	<div class="productlist">
		<div class="mescroll" id="mescrollp">
			<div class="mescroll-bounce">
				<ul class="">
					<li v-for="(item, index) in productList">
						<div class="thumb">
							<img :src="item.goods_thumb">
						</div>
						<div class="content">
							<div class="title">
								<h3 class="name">{{item.goods_name}}</h3>
								<span class="collect"><p>{{item.collectnum}}</p></span>
							</div>
							<div class="tips">
								<div></div>							
							</div>
							<div class="labal">
								<score :score="item.score"></score>
								<span class="price">￥{{item.shop_price}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>		
	</div>
</template>

<script type="text/javascript">
import score from 'components/score/score';
import Mescroll from '../../static/mescroll.min.js';

export default {
	props: ['generalByType', 'cityItemIds', 'pictype', 'priceMin', 'priceMax'],
	data() {
		return {
			productList: [],
			mescroll: null,
			hasNext: true,
			//  筛选数据条件
			order: 0,
			city: 0,
			type: 0,
			min: 0,
			max: 0
		};
	},
	mounted() {
		this.mescroll = new Mescroll('mescrollp', {
			up: {
				callback: this.upCallback,
				auto: true
			}
		});
	},
	methods: {
		upCallback(page, e) {
			let self = this;
			setTimeout(() => {
				self.getListData(page.num, page.size, function(curPageData) {
					if (page.num === 1) {
					self.productList = [];
					}
					self.productList = self.productList.concat(curPageData);
					self.mescroll.endSuccess(curPageData.length, self.hasNext);
				}, function() {
					self.mescroll.endErr();
				});
			}, 2000);
		},
		getListData(pageNum, pageSize, successCallback, errorCallback) {
			this.$http.get('api/MIndex/goodslist',	{
				params: {
					p: pageNum,
					num: pageSize,
					order: this.generalByType,
					city: this.cityItemIds,
					type: this.pictype + 1,
					min: this.priceMin,
					max: this.priceMax
				}
			}).then((response) => {
				let List = JSON.parse(response.body) || [];
				let listData = [];
				for (let i = 0; i < List.length; i++) {
					if (i === List.length) {
						break;
					}
					listData.push(List[i]);
				}
				successCallback && successCallback(listData);// 成功回调
			});
		},
		generalChange() {
			this.mescroll.resetUpScroll();
		},
		cityItemIdsChange() {
			this.mescroll.resetUpScroll();
		},
		pictypeChange() {
			this.mescroll.resetUpScroll();
		},
		priceMinChange() {
			this.mescroll.resetUpScroll();
		},
		priceMaxChange() {
			if (this.priceMax === '以上') {
				this.priceMax = 0;
			}
			this.mescroll.resetUpScroll();
		}
	},
	watch: {
		// 监听父组件的筛选
		generalByType(value) {
			this.generalChange();
		},
		cityItemIds(value) {
			this.cityItemIdsChange();
		},
		pictype(value) {
			this.pictypeChange();
		},
		priceMin(value) {
			this.priceMinChange();
		},
		priceMax(value) {
			this.priceMaxChange();
		}
	},
	components: {
		score
	}

};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../static/mescroll.min.css';

.productlist
	position: fixed
	top: 84px
	left: 0
	z-index:30
	width: 100%
	bottom: 50px
	background: #f1f1f1
	.mescroll
		.mescroll-bounce
			& > ul
				width: 100%
				& > li
					width: 100%
					background: #fff
					margin-top: 10px
					.thumb
						& > img
							width: 100%
					.content
						padding: 10px 13px
						overflow: hidden
						.title
							display:flex
							align-items: center
							.name
								flex: 1
								font-size: 16px
								line-height: 20px
								color: #282828 
								line-height: 18px
								-webkit-line-clamp: 1
								-webkit-box-orient: vertical
								overflow: hidden
								font-weight: 600
							.collect
								position: relative
								padding-left: 18px
								&:before
									content: ''
									position: absolute
									top: 2px
									left: 0
									width: 15px
									height: 14px
									background: url('goodscoll.png') no-repeat
									background-size: 100% 100%
								& > p
									font-size: 14px
									color: #666
									line-height: 18px
						.tips
							display: flex
							align-items: center
						.labal
							display: flex
							align-items: center
							margin-top: 8px
							.score
								flex: 1
								padding-right: 5px
								display: flex
								align-items: center
							.price
								position: relative
								padding-left: 10px
								color: #ff5100
								font-size: 18px
								line-height: 22px


</style>