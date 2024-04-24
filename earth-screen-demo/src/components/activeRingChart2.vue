<template>
	<!-- 环状动图 coded by qx-->
	<div>
		<div :class="`active-ring-chart2 active-ring-chart-${name}`">
			<div class="chart-box" :style="{ width: boxWidth, height: boxHeight }">
				<div class="guide-pot-01"></div>
				<div class="guide-pot"></div>
				<div class="guide-pot-02"></div>
				<Echart
					v-if="isInit"
					:chartData="chartData"
					@thisEchart="mouseListener"
					:openEvent="true"
					:style="{
						width: width,
						height: height,
						marginTop: '-0.7rem',
						marginLeft: '-1rem',
					}"></Echart>
				<div class="echart-tip">
					占比<br /><span>{{ currentData.toFixed(1) }}%</span>
				</div>
			</div>
			<div class="content-box" :style="{ height: boxHeight }">
				<div class="content-item">
					<div class="item-icon">
						<img src="/img//icon05.png" />
					</div>
					<div class="item-text">
						<div class="item-name">绿色能源碳减排量</div>
						<div class="item-value">
							<span>{{ parseFloat(chartData.greenEnergy).toFixed(1) }}</span
							>万吨
						</div>
					</div>
				</div>
				<div class="content-item">
					<div class="item-icon">
						<img src="/img//icon06.png" />
					</div>
					<div class="item-text">
						<div class="item-name">非绿色能源碳减排量</div>
						<div class="item-value">
							<span>{{ parseFloat(chartData.noGreenEnergy).toFixed(1) }}</span
							>万吨
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//
	import Echart from "@/components/Chart/index";
	export default {
		name: "activeRingChart2",
		components: {
			Echart,
		},
		props: ["name", "chartData", "boxWidth", "boxHeight", "width", "height"],
		data() {
			return {
				changePieInterval: null,
				myChart: null,
				currentData: 0,
				isInit: false,
			};
		},
		watch: {
			chartData: {
				handler() {
					this.isInit = true;
				},
				deep: true,
				immediate: false,
			},
		},
		created() {},
		mounted() {
			document.addEventListener("visibilitychange", this.closeInterval);
		},
		beforeUnmount() {
			if (this.changePieInterval) {
				//如果定时器还在运行 或者直接关闭，不用判断
				clearInterval(this.changePieInterval); //关闭
			}
			document.removeEventListener(
				"visibilitychange",
				this.closeInterval,
				false
			);
		},
		methods: {
			/**
			 * 关闭定时器
			 */
			closeInterval() {
				if (document.visibilityState == "hidden") {
					//切离该页面时执行
					if (this.changePieInterval) {
						//如果定时器还在运行 或者直接关闭，不用判断
						clearInterval(this.changePieInterval); //关闭
					}
				} else if (document.visibilityState == "visible") {
					//切换到该页面时执行
					(this.currentData = 0), this.autoSelectPie(this.myChart, 0);
				}
			},
			/**
			 * 监听鼠标事件：高亮选项
			 */
			mouseListener(myChart) {
				this.myChart = myChart;
				var currentIndex = 0;
				this.autoSelectPie(myChart, currentIndex);
				myChart.on("mouseover", (params) => {
					clearInterval(this.changePieInterval);
					for (var idx in this.chartData.series[0].data) {
						myChart.dispatchAction({
							type: "downplay",
							seriesIndex: 0,
							dataIndex: idx,
						});
					}
					currentIndex = params.dataIndex;

					if (
						!this.validatenull(
							this.chartData.series[0].data[currentIndex].proportion
						)
					) {
						this.currentData = parseFloat(
							this.chartData.series[0].data[currentIndex].proportion
						);
					} else {
						this.currentData = 0;
					}
					myChart.dispatchAction({
						type: "highlight",
						seriesIndex: 0,
						dataIndex: params.dataIndex,
					});
				});

				myChart.on("mouseout", () => {
					if (this.changePieInterval) {
						clearInterval(this.changePieInterval);
					}
					this.autoSelectPie(myChart, currentIndex);
				});
			},
			/**
			 * 自动展示
			 */
			autoSelectPie(myChart, currentIndex) {
				//var currentIndex=0;
				let that = this;
				var len = this.chartData.series[0].data.length;
				var data = this.chartData.series[0].data;
				this.changePieInterval = setInterval(() => {
					for (var idx in data) {
						myChart.dispatchAction({
							type: "downplay",
							seriesIndex: 0,
							dataIndex: idx,
						});
					}
					myChart.dispatchAction({
						type: "highlight",
						seriesIndex: 0,
						dataIndex: currentIndex,
					});

					if (
						!this.validatenull(
							that.chartData.series[0].data[currentIndex].proportion
						)
					) {
						that.currentData = parseFloat(
							that.chartData.series[0].data[currentIndex].proportion
						);
					} else {
						that.currentData = 0;
					}

					currentIndex++;
					if (currentIndex >= len) {
						currentIndex = 0;
					}
				}, 1500);
			},
		},
	};
</script>

<style lang="scss">
	.active-ring-chart2 {
		position: relative;
		width: 23rem;
		margin: 1.7rem auto 0;
		.chart-box {
			position: absolute;
			background: rgba(12, 65, 88, 0.4);
			top: -0.2rem;
			left: 11rem;

			.guide-pot-01 {
				position: absolute;
				width: 1rem;
				height: 1rem;
				top: 0;
				left: -1rem;
				border-radius: 100% 0 0 0;
				background: rgba(12, 65, 88, 0.4);
			}
			.guide-pot {
				position: absolute;
				width: 0;
				height: 0;
				top: 0.8rem;
				left: -0.5rem;
				border: 0.2rem solid transparent;
				border-left-color: #42eced;
			}
			.guide-pot-02 {
				position: absolute;
				width: 1rem;
				height: 1rem;
				top: 1rem;
				left: -1rem;
				border-radius: 0 0 0 100%;
				background: rgba(12, 65, 88, 0.4);
			}

			.echart-tip {
				position: absolute;
				width: 3.4rem;
				height: 3.4rem;
				text-align: center;
				line-height: 1.2rem;
				margin-left: -1.2rem;
				margin-top: -1.7rem;
				color: #909ca0;
				font-size: 0.8rem;
				left: 50%;
				top: 50%;
				border-radius: 50%;
				padding: 0.5rem 0;
				box-sizing: border-box;
				span {
					color: #dae8ef;
					font-weight: bold;
					font-size: 0.8rem;
				}
			}
		}
		.content-box {
			position: relative;
			width: 11rem;
			top: 0.5rem;
			.content-item {
				position: relative;
				margin-top: 1.6rem;
			}
			.item-icon {
				width: 1.6rem;
				img {
					width: 100%;
				}
			}
			.item-text {
				position: absolute;
				top: 0;
				left: 2.5rem;
				color: #909ca0;
				font-size: 0.7rem;
				text-align: left;
				span {
					color: #dae8ef;
					font-size: 1rem;
					font-weight: bold;
				}
			}
		}
	}
</style>
@/utils/validate
