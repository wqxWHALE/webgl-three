<template>
	<!-- 环状动图 coded by qx-->
	<div>
		<div :class="`active-ring-chart1 active-ring-chart-${name}`">
			<!-- <dv-active-ring-chart :class="`active-ring-chart-${name}`" :config="chartData" :style="{width:width,height:height,marginTop:'-1.5rem',marginLeft:'-1rem'}" /> -->
			<div
				class="chart-box"
				:style="{
					width: width,
					height: height,
					marginTop: '-1.5rem',
					marginLeft: '-1rem',
				}">
				<Echart
					v-if="isInit"
					:chartData="chartData"
					@thisEchart="mouseListener"
					:openEvent="true"
					:style="{ width: width, height: height }"></Echart>
				<div class="echart-tip">
					占比<br /><span>{{ currentData.toFixed(1) }}%</span>
				</div>
			</div>
			<div :class="`data-content data-content-${name}`">
				<div
					class="tip-row"
					v-for="(item, index) in chartData.series[0].data"
					:key="item.name"
					:style="
						isFloat && index > 3
							? {
									position: 'absolute',
									left: '8rem',
									top: `${(index - 4) * 1.5}rem`,
							  }
							: ''
					">
					<div class="row-item row-item-first">
						<div class="row-color"></div>
						{{ item.name }}
					</div>
					<div class="row-item">
						<span>{{ parseFloat(item.value).toFixed(1) }}</span
						>万吨
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Echart from "@/components/Chart/index";
	export default {
		name: "activeRingChart",
		components: { Echart },
		props: ["name", "chartData", "width", "height"],
		data() {
			return {
				colors: [],
				currentData: 0,
				changePieInterval: null,
				myChart: null,
				isFloat: false,
				isInit: false,
			};
		},
		watch: {
			chartData: {
				handler() {
					this.isInit = true;
					this.$nextTick(() => {
						this.initChart();
					});
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
					this.currentData = 0;
					this.autoSelectPie(this.myChart, 0);
				}
			},
			/**
			 * 拿到数据后，设置页面
			 */
			initChart() {
				this.colors = this.chartData.color;
				//console.log(this.colors);
				if (this.chartData.series[0].data.length > 4) {
					this.isFloat = true;
				}
				let rowColorDom = document.querySelectorAll(
					".active-ring-chart-" + this.name + " .row-color"
				);
				for (let i = 0; i < rowColorDom.length; i++) {
					rowColorDom[
						i
					].style.backgroundImage = `linear-gradient(to top, ${this.colors[i].start} , ${this.colors[i].end})`;
				}

				let tipDom = document.querySelector(".data-content-" + this.name);
				tipDom.style.position = "absolute";
				if (this.isFloat) {
					tipDom.style.left =
						parseInt(this.width.replace("rem", "")) - 2 + "rem";
				} else {
					tipDom.style.left = parseInt(this.width.replace("rem", "")) + "rem";
					for (let i = 0; i < tipDom.children.length; i++) {
						tipDom.children[i].style.width = "12rem";
					}

					let chartDom = document.querySelector(
						".active-ring-chart-" + this.name
					);
					//console.log(chartDom)
					chartDom.style.marginLeft = "1.7rem";
				}

				tipDom.style.top = "1.5rem";
				tipDom.style.right = "0";
				tipDom.style.fontSize = "0.9rem";
			},

			/**
			 * 监听鼠标事件：高亮选项
			 */
			mouseListener(myChart) {
				this.myChart = myChart;
				var currentIndex = 0;
				this.autoSelectPie(myChart, currentIndex);
				myChart.on("mouseover", (params) => {
					console.log("mouseover");
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
						this.currentData =
							parseFloat(
								this.chartData.series[0].data[currentIndex].proportion
							) * 100;
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
				var len = that.chartData.series[0].data.length;
				var data = that.chartData.series[0].data;
				that.changePieInterval = setInterval(function () {
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
						that.currentData =
							parseFloat(
								that.chartData.series[0].data[currentIndex].proportion
							) * 100;
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
	.active-ring-chart1 {
		margin-top: 0.3rem;
		.chart-box {
			position: relative;
			.echart-tip {
				position: absolute;
				width: 3.4rem;
				height: 3.4rem;
				text-align: center;
				line-height: 1.2rem;
				margin-left: -1.7rem;
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
	}
	.data-content {
		height: 7.2;
		.tip-row {
			width: 6.5rem;
			line-height: 1.8rem;
			.row-item {
				width: 55%;
				color: #909ca0;
				//font-size: 12px;
				font-size: 0.7rem;
				float: left;
				text-align: left;
				.row-color {
					display: inline-block;
					width: 10px;
					height: 10px;
					background: red;
					margin-left: 5px;
					margin-right: 5px;
				}
				span {
					color: #dae8ef;
					font-size: 1rem;
					font-weight: bold;
				}
			}
			.row-item-first {
				width: 45%;
				font-size: 0.8rem;
				text-align: left;
			}
		}
	}
</style>
@/utils/validate
