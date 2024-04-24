<template>
	<!--coded by qx-->
	<div>
		<div class="statistics-data-content">
			<div class="statistic-item">
				<div class="item-icon">
					<img src="/img//icon01.png" />
				</div>
				<div class="item-text item-text-first">
					碳指标<br /><span>{{ parseFloat(info.standard).toFixed(2) }}</span
					><span style="font-size: 0.9rem; color: rgb(134, 115, 94)">万吨</span>
				</div>
			</div>
			<div class="statistic-item">
				<div class="item-icon">
					<img src="/img//icon02.png" />
				</div>
				<div class="item-text">
					碳排放总量<br /><span>{{ parseFloat(info.emission).toFixed(2) }}</span
					>万吨
				</div>
			</div>
			<div class="statistic-item">
				<div class="item-icon">
					<img src="/img//icon03.png" />
				</div>
				<div class="item-text">
					CCER<br /><span>{{ parseFloat(info.ccer).toFixed(2) }}</span
					>万吨
				</div>
			</div>
			<div class="statistic-item" style="width: 12rem">
				<div class="item-icon">
					<img src="/img//icon04.png" />
				</div>
				<div class="item-text" style="width: 8rem">
					碳捕集及封存总量<br /><span>{{
						parseFloat(info.ccus).toFixed(2)
					}}</span
					>万吨
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "progressBar",
		props: ["data"],
		components: {},
		data() {
			return {
				info: {},
				isFloat: false,
			};
		},
		watch: {
			data: {
				handler(newObj) {
					this.info = newObj;
					//console.log("info:",newObj);
				},
				deep: true,
				immediate: false,
			},
		},
	};
</script>

<style lang="scss">
	.statistics-data-content {
		padding: 50px 15px;
		overflow: hidden;
		.statistic-item {
			float: left;
			width: 12rem;
			overflow: hidden;
			.item-icon {
				float: left;
				width: 4rem;
				img {
					width: 100%;
				}
			}
			.item-text {
				padding: 7px 0px;
				float: left;
				width: 8rem;
				line-height: 22px;
				//font-size:12px;
				font-size: 0.8rem;
				font-weight: bold;
				color: #909ca0;
				span {
					color: #dae8ef;
					//font-size:18px;
					font-size: 1.2rem;
				}
			}
			.item-text-first span {
				color: #e0b485;
			}
		}
	}
</style>
