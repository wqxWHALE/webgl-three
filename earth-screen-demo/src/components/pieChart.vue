<template>
	<!-- coded by qx-->
	<div>
		<div class="chart-content">
			<Echart class="pie-chart" :chartData="chartData"></Echart>
			<div class="pie-tip">
				目标指标<br /><span>{{ parseFloat(chartData.goalSum).toFixed(1) }}</span
				>万吨
			</div>
			<!-- <div class="pie-tip-img"><img src="/img//rotate.png" /></div> -->
		</div>
		<div class="data-content">
			<div class="data-list">
				<div class="list-hearder">
					<div class="list-row">
						<div class="row-item row-header row-item-first"></div>
						<div class="row-item row-header">碳指标</div>
						<div class="row-item row-header">碳排放</div>
						<div class="row-item row-header" style="width: 20%">使用率</div>
					</div>
				</div>
				<div class="list-content">
					<div
						class="list-row"
						v-for="(item, index) in listData"
						:key="item.name">
						<div class="row-item row-item-first">
							<div
								class="row-color"
								:style="{ background: colors[index] }"></div>
							{{ item.name }}
						</div>
						<div class="row-item">
							<span>{{ parseFloat(item.standard).toFixed(1) }}</span
							>万吨
						</div>
						<div class="row-item">
							<span>{{ parseFloat(item.emission).toFixed(1) }}</span
							>万吨
						</div>
						<div class="row-item row-item-mini">
							<span>{{ (parseFloat(item.rate) * 100).toFixed(1) }}</span
							>%
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Echart from "@/components/Chart/index";
	export default {
		name: "pieChart",
		components: {
			Echart,
		},
		props: ["chartData", "listData"],
		data() {
			return {
				colors: [],
			};
		},
		watch: {
			chartData: {
				handler() {
					//this.colors=this.chartData.series[0].color;
				},
			},
			listData: {
				handler() {},
			},
		},
		created() {
			this.colors = this.chartData.series[0].color;
		},
	};
</script>

<style lang="scss">
	.chart-content {
		// width:270px;
		position: relative;
		width: 16rem;
		height: 12rem;
		float: left;
		margin-top: 0.5rem;
		.pie-tip,
		.pie-tip-img {
			position: absolute;
			top: 50%;
			left: 50%;
			//background:#000E1E;
			//background:red;
			width: 6rem;
			height: 5rem;
			margin-left: -3rem;
			margin-top: -2.5rem;
			// width: 5.2rem;
			// height: 5.2rem;
			// margin-left: -2.6rem;
			// margin-top: -2.6rem;
			border-radius: 50%;
			padding: 1rem 0rem;
			line-height: 1.5rem;
			color: #909ca0;
			box-sizing: border-box;
			font-size: 0.7rem;
			border-radius: 50%;
			overflow: hidden;

			span {
				color: #dae8ef;
				font-size: 0.9rem;
				font-weight: bold;
			}
		}

		.pie-tip-img {
			position: absolute;
			background: transparent;
			padding: 0;
			margin-left: -2.5rem;
			margin-top: -2.5rem;
			//background:red;
			//text-align: center;
			img {
				animation: rotateImg 1.5s linear infinite;
				//margin-left:-2%;
				margin-top: 3%;
				// width:100%;
				// height:98%;
				width: 100%;
			}
		}
	}

	@keyframes rotateImg {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.data-content {
		margin-top: 0rem;
		//width:300px;
		width: 19.5rem;
		padding-right: 1%;
		box-sizing: border-box;
		float: left;
	}
	.data-list {
		//margin-top:15px;
		.list-hearder,
		.list-content {
			position: relative;
			z-index: 99;
			.list-row {
				position: relative;
				//font-size:12px;
				color: #909ca0;
				margin-bottom: 0.4rem;
				height: 1.7rem;
				.row-item {
					float: left;
					font-size: 0.7rem;
					font-weight: normal;
					line-height: 1.7rem;
					height: 1.7rem;
					text-align: center;
					width: 25%;
					color: #909ca0;
					overflow: hidden;
					span {
						font-size: 0.9rem;
						font-weight: bold;
						color: #dae8ef;
					}
				}
				.row-header {
					height: 1.4rem;
					color: #727a7c;
				}
				.row-item-first {
					width: 30%;
					color: #909ca0;
					text-align: left;
					.row-color {
						display: inline-block;
						width: 10px;
						height: 10px;
						background: red;
						margin-left: 0.5rem;
						margin-right: 0.1rem;
					}
				}
				.row-item-mini {
					font-size: 0.7rem;
					color: #909ca0;
					width: 20%;
					span {
						font-size: 0.9rem;
						color: #dae8ef;
						font-weight: bold;
					}
				}
			}
		}
		.list-hearder {
			.list-row {
				color: #909ca0;
			}
		}

		.list-content .list-row {
			.row-item:nth-child(2) {
				color: rgb(134, 115, 94);
				span {
					color: #e0b485;
				}
			}
			&:nth-child(odd) {
				background: #113f62;
				//background:#082D4F;
				//border-top: 1px solid #02ACF4;
				//border-bottom: 1px solid #02ACF4;

				&::before,
				&::after {
					content: "";
					position: absolute;
					top: -1.1px;
					left: 5px;
					bottom: 0;
					width: 96%;
					height: 1.71rem;
					z-index: -1;
					border-radius: 40%;
					border-top: 1px solid #02acf4;
					border-bottom: 1px solid #02acf4;
					box-shadow: 0px 0 6px rgba(2, 179, 252, 0.7);
				}
			}
			&:nth-child(even) {
				background: #082d4f;
			}
		}
	}
</style>
