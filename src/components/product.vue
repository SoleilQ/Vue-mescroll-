<template>
	<div class="product">
		<div class="productnav">
			<div class="sort_item"  :class="{active:sortBy == 'general'}">
				<div class="sort_item_border" @click="chooseType('general')"><span>综合<i></i></span></div>
				<transition name="showlist">
					<div class="sort_detail" v-show="sortBy == 'general'" >
						<ul class="sort_list"  @click="sortList($event)">
							<li data="1" :class="{active_li: generalByType == 1}">
								<span>综合排序</span>
							</li>
							<li data="2" :class="{active_li: generalByType == 2}"><span>人气排序</span></li>
							<li data="3" :class="{active_li: generalByType == 3}"><span>销量排序</span></li>
							<li data="4" :class="{active_li: generalByType == 4}"><span>价格最低</span></li>
							<li data="5" :class="{active_li: generalByType == 5}"><span>价格最高</span></li>
						</ul>
					</div>>
				</transition>
			</div>

			<div class="sort_item" :class="{active:sortBy == 'local'}">
				<div class="sort_item_border"  @click="chooseType('local')"><span>{{localtitle}}<i></i></span></div>
				<transition name="showlist" v-show="cityList">
					<div class="sort_detail" v-show="sortBy == 'local'">
						<div class="category_left">
							<ul>
								<li v-for="(item, index) in cityList" :data="item.id" :key="index" :class="{active:cityItemId == item.id}" @click="selectCity(item,index)">
									{{item.name}}
							</li>
							</ul>
						</div>
						<div class="category_right">
							<ul>
								<li v-for="(item, index) in cityListRight" :data="item.id" :class="{active:cityItemIds == item.id}" @click="selectCityName(item,index)">
									{{item.name}}
								</li>
							</ul>
						</div>
					</div>
				</transition>
			</div>
			<div class="sort_item" :class="{active:sortBy == 'type'}">
				<div class="sort_item_border"  @click="chooseType('type')"><span>类型<i></i></span></div>
				<transition name="showlist">
					<div class="sort_detail" v-show="sortBy == 'type'" >
						<div class="category_left" style="min-height:240px;background:#f7f7f7">
							<ul class="sort_list">
								<li v-for="(item,index) in picList" @click="choosepicType(item,index)" :datya="index" :class="{active:pictypeIndex == index}">
									{{item.name}}
								</li>
							</ul>
						</div>
						<div class="category_right" v-show="pictypeIndex == 0">
							<ul>
								<li :class="{active:pictype === index}" v-for="(item, index) in picListRight" @click="choosepicTypes(item,index)">
									{{item.name}}
								</li>
							</ul>
						</div>
						<div class="category_right" v-show="pictypeIndex == 1">
							<ul>
								<li :class="{active:pictype === index}" v-for="(item, index) in picListRight"  @click="choosepicTypes(item,index)">
									{{item.name}}
								</li>
							</ul>						
						</div>
					</div>
				</transition>
			</div>
			<div class="sort_item" :class="{active:sortBy == 'price'}">
				<div class="sort_item_border"  @click="chooseType('price')"><span>价格<i></i></span></div>
				<transition name="showlist">
					<div class="sort_detail" v-show="sortBy == 'price'" >
						<ul class="sort_list">
							<li v-for="(item, index) in priceList" @click="choosePrice(item, index)" :class="{active_li:priceIndex == index}">
								<p>{{item.title}}</p><p class="min">{{item.min}}</p><p>{{item.mid}}</p><p class="max">{{item.max}}</p>
							</li>
						</ul>
					</div>
				</transition>
			</div>		
		</div>
		<transition name="showcover">
			<div class="back_cover" v-show="sortBy"></div>
		</transition>	

		<productlist :generalByType="generalByType" :cityItemIds="cityItemIds" :pictype="pictype" :priceMin="priceMin" :priceMax="priceMax"></productlist>
	</div>
</template>

<script type="text/javascript">
import productlist from 'components/productlist';

export default {
	data() {
		return {
			sortBy: '', // 筛选的dom
			generalByType: null, // 综合筛选条件
			localtitle: '地点',
			cityList: [],
			cityListRight: [], // 市级
			cityIndex: 0,
			cityItemId: '', // 城市左侧id
			cityItemIds: '', // 城市右侧id
			pictypeIndex: '', // 拍摄类型index
			picList: [
				{	name: '旅拍',
					list: [{name: '婚纱旅拍'}, {name: '亲子旅拍'}, {name: '全家福旅拍'}, {name: '写真旅拍'}, {name: '旅行跟拍'}]
				},
				{
					name: '当地拍',
					list: [{name: '婚纱照'}, {name: '孕妇照'}, {name: '写真照'}, {name: '纪念照'}, {name: '商务形象照'}, {name: '证件照'}]
				}
			],
			picListRight: null,
			pictype: null,
			// 价格
			priceList: [{
				title: '不限',
					min: '',
					mid: '',
					max: ''
				}, {
					min: '0',
					mid: '一',
					max: '2000'
				}, {
					min: '2000',
					mid: '一',
					max: '4000'
				}, {
					min: '4000',
					mid: '一',
					max: '6000'
				}, {
					min: '6000',
					mid: '一',
					max: '8000'
				}, {
					min: '8000',
					mid: '一',
					max: '10000'
				}, {
					min: '10000',
					max: '以上'
				}
			],
			// 价格区间
			priceIndex: null,
			priceMin: '',
			priceMax: ''
		};
	},
	created() {
		this._initCity();
	},
	methods: {
		// 点击顶部选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
		async chooseType(type) {
			if (this.sortBy !== type) {
				this.sortBy = type;
			} else {
				this.sortBy = '';
			}
		},
		sortList(event) {
			this.generalByType = event.target.getAttribute('data');
			this.sortBy = '';
		},
		// 数据初始化
		async _initCity() {
			this.$http.get('api/Phone/readfile').then((response) => {
				this.cityList = response.data.list || [];
				for (let i = 0; i < this.cityList.length; i++) {
					if (i === this.cityIndex) {
						this.cityListRight = this.cityList[i].city;
					}
				}
			});
			// 拍摄类型
			let picindex = 0;
			this.picListRight = this.picList[picindex].list;
		},
		selectCity(item, index) {
			this.cityIndex = index;
			this.cityItemId = item.id;
			for (let i = 0; i < this.cityList.length; i++) {
				if (i === this.cityIndex) {
					this.cityListRight = this.cityList[i].city;
				}
			}
		},
		selectCityName(item, index) {
			this.cityItemIds = item.id;
			this.sortBy = '';
			this.localtitle = item.name;
		},
		choosepicType(item, index) {
			this.pictypeIndex = index;
			for (let i = 0; i < this.picList.length; i++) {
				if (i === this.pictypeIndex) {
					this.picListRight = this.picList[i].list;
				}
			}
		},
		choosepicTypes(item, index) {
			this.pictype = index;
			this.sortBy = '';
		},
		choosePrice(item, index) {
			this.priceIndex = index;
			this.priceMin = item.min;
			this.priceMax = item.max;
			this.sortBy = '';
		}
	},
	components: {
		productlist
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../common/base.styl';
@import '../common/mixin.styl';

.product
	position: relative
	.productnav
		top: 44px
		left: 0
		z-index: 89
		background: #fff
		border-1px(#f1f1f1)
		height: 40px
		width: 100%
		position: fixed
		.sort_item
			float: left
			text-align: center
			padding: 12px 0
			width: 22%
			.sort_item_border
				& > span
					display: inline-block
					height: 16px
					width: 100%
					line-height: 16px
					font-size: 14px
					color: #666
					position: relative
					&:before
						content: "\20"
						position: absolute
						top: 0
						right: 0
						width: 1px
						height: 100%
						background: #e7e7e7
					& > i
						vertical-align: top
						margin: 6px 0 0 5px
						display: inline-block
						width: 0
						height: 0
						border-width: 4px 4px 0
						border-style: solid dashed dashed
						border-color: #aeaba5 transparent transparent
			&.active
				.sort_item_border
					& > span
						color: #f59c02
						i
							border-width: 0 4px 4px
							border-style: dashed dashed solid
							border-color: transparent transparent #f59c02
		
			
			.sort_detail
				width: 100%
				position: absolute
				display: flex
				top:40px
				left: 0
				background: #fff
				.sort_list
					width: 100%
					& > li
						display: flex
						align-items: center
						padding-left: 19px
						height: 40px
						font-size: 13px
						line-height: 40px
						color: #666
						border-1px(#f1f1f1)
						& > p
							font-size: 14px
							color: #666
							float: left
						&.active_li
							color: #f59c02
							&:before
								display: block
								content: "\20"
								position: absolute
								width: 13px
								height: 10px
								background: url('sel-icon1.png') 0 0 no-repeat
								background-size: 100% 100%
								top: 15px
								right: 16px
				.category_left
					flex: 0 0 100px
					& > ul
						max-height: 320px
						overflow-y: auto
						background: #f7f7f7
						& > li
							position: relative
							text-align: center
							height: 40px
							font-size: 13px
							color: #666
							line-height: 40px
							&.active
								background: #fff
								color: #fb8c09
				.category_right
					flex: 1
					& > ul
						max-height: 320px
						overflow-y: auto
						& > li
							padding-left: 16px
							position: relative
							height: 40px
							font-size: 13px
							line-height: 40px
							color: #666
							text-align: left
							&.active
								background: #fff
								color: #fb8c09
								&:before
									display: block
									content: "\20"
									position: absolute
									width: 13px
									height: 10px
									background: url('sel-icon1.png') 0 0 no-repeat
									background-size: 100% 100%
									top: 15px
									right: 16px 
					
	.showlist-enter-active, .showlist-leave-active
		transition: all .3s
		transform: translateY(0)
	.showlist-enter, .showlist-leave-active
		opacity: 0
		transform: translateY(-10%)
	.showcover-enter-active, .showcover-leave-active
		transition: opacity .3s
	.showcover-enter, .showcover-leave-active
		opacity: 0
	.back_cover
		position: fixed
		width: 100%
		height: 100%
		z-index: 10
		background-color: rgba(0, 0, 0, 0.3)

</style>