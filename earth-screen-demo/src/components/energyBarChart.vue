<template>
	<!-- 能量版柱状图 coded by qx-->
	<div :class="`energy-bar-chart energy-bar-chart-${name}`">
		<div class="coordinate" :style="{ height: coordinateHeight + 'px' }">
			<div
				class="energy-bar-box"
				v-for="(item, index) in infos"
				:key="item.name"
				:style="setBarStyle(index)">
				<div class="energy-bar">
					<div
						v-for="val in data[index].length"
						:key="val"
						class="energy-bar-item"
						style="bwidth: 100%; height: 3px; margin-top: 1px"
						:style="{ background: option.energyColor }"></div>
				</div>
				<div class="bar-value">
					<span>{{ parseFloat(item.value).toFixed(1) }}</span
					>万吨
				</div>
			</div>
			<div class="bar-mask"></div>
		</div>
		<div class="bar-name-show">
			<div
				class="bar-item-name"
				v-for="(item, index) in infos"
				:key="item.name"
				:style="setBarStyle(index)">
				{{ item.name }}
			</div>
		</div>
	</div>
</template>

<script>
	import Math from "@/utils/caculate";
	//import Vue from "vue";
	export default {
		name: "energyBarChart",
		props: ["name", "data", "option"],
		data() {
			return {
				infos: [],
				chartMaxValue: 0,
				coordinateHeight: 0,
				perWidth: 0,
				energyLenArr: [], //用于显示差异
				energyBarItemComponent: null,
			};
		},
		watch: {
			data: {
				handler(newArr) {
					this.infos = newArr;
					//console.log("infos",this.infos);
					this.$nextTick(() => {
						this.initChart();
					});
				},
				deep: true,
				immediate: false,
			},
		},
		mounted() {},
		created() {
			/**
			 * 思路：
			 * 1、拿到数据，先进行对比，取最大值从而得到上限值
			 * 2、根据上限值计算每个能量块占比，能量块显示由四舍五入判断
			 */
		},
		methods: {
			initChart() {
				var that = this;
				let chartName = ".energy-bar-chart-" + this.name + " .energy-bar-box";
				let parentDomArr = document.querySelectorAll(chartName);
				if (parentDomArr.length > 0) {
					parentDomArr[0].addEventListener(
						"animationend",
						function () {
							//console.log("执行完成");
							that.showValue(parentDomArr);
						},
						false
					);
					this.setChartStyle();
					this.animate();
				}
			},
			// getEnergyBarItemComponent() {
			// 	let obj = Vue.extend({
			// 		template: `<div class='energy-bar-item' style='background:${this.option.energyColor};width:100%;height:3px;margin-top:1px'></div>`,
			// 	});

			// 	return new obj().$mount();
			// },
			/**
			 * 获取数据中最大的值
			 */
			getMaxDataValue() {
				let maxValue = 0;
				this.infos.forEach((element) => {
					if (parseFloat(element.value) > maxValue) {
						maxValue = parseFloat(element.value);
					}
				});
				return maxValue;
			},
			/**
			 * 根据数据最大值得到图表中最大显示阀值
			 */
			setChartMaxValue(maxValue, distance = 0) {
				if (maxValue > 0 && maxValue < 10) distance = 0.2;
				if (maxValue > 10) distance = 2;
				this.chartMaxValue = maxValue + distance;
			},
			/**
			 * 设置图表样式
			 */
			setChartStyle() {
				this.setCoordinateStyle();
				//this.setEnergyBar();
			},

			setBarStyle(index) {
				let currentValue = this.infos[index].value;
				this.setChartMaxValue(this.getMaxDataValue());
				//console.log("chartMaxValue:" + this.chartMaxValue);
				let rate = Math.methods.numberExcept(currentValue, this.chartMaxValue);
				//console.log("rate:" + rate);
				let energyLen = parseInt(Math.methods.numberExcept(rate * 100, 5));
				if (!energyLen) {
					energyLen = 0;
				}
				if (
					parseFloat(currentValue) !== 0 &&
					(energyLen == 0 || energyLen == 1)
				) {
					//除非数据为0，不然块数至少为2
					energyLen = 2;
				}
				this.energyLenArr[index] = energyLen;
				if (index > 0) {
					//如果出现能量条块数相等，则根据value值再具体调整块数
					for (let i = 0; i < this.energyLenArr.length; i++) {
						//console.log("energyLen:"+energyLen);
						//console.log("this.energyLenArr[i]:"+this.energyLenArr[i]);
						// console.log(parseFloat(this.infos[i].value));
						if (i != index && energyLen == this.energyLenArr[i]) {
							// console.log(parseFloat(currentValue));
							// console.log(parseFloat(this.infos[i].value));
							if (parseFloat(currentValue) > parseFloat(this.infos[i].value)) {
								energyLen++;
							} else if (
								energyLen > 0 &&
								parseFloat(currentValue) !== parseFloat(this.infos[i].value)
							) {
								energyLen--;
							}
						}
					}
				}

				this.infos[index].length = energyLen;
				if (energyLen == 0) {
					this.perHeight = 1;
				} else {
					this.perHeight = energyLen * 4;
				}

				let dataLength = this.infos.length;
				this.perWidth = 100 / dataLength;

				return {
					left: index * this.perWidth + "%",
					width: this.perWidth + "%",
					height: this.perHeight + "px",
					bottom: -this.perHeight + "px",
				};
			},
			setCoordinateStyle() {
				let chartName = ".energy-bar-chart-" + this.name;
				this.coordinateHeight =
					document.querySelector(chartName).clientHeight - 24;
			},
			// setEnergyBar() {
			// 	for (let i = 0; i < this.data.length; i++) {
			// 		let chartName = ".energy-bar-chart-" + this.name + " .energy-bar-box";
			// 		let parentDom = document.querySelectorAll(chartName)[i];
			// 		let childDom = parentDom.getElementsByClassName("energy-bar")[0];
			// 		//console.log(childDom);
			// 		for (let j = 0; j < this.data[i].length; j++) {
			// 			childDom.appendChild(this.getEnergyBarItemComponent().$el);
			// 		}
			// 	}
			// },
			animate() {
				let that = this;
				setTimeout(function () {
					for (let i = 0; i < that.data.length; i++) {
						let chartName =
							".energy-bar-chart-" + that.name + " .energy-bar-box";
						let parentDom = document.querySelectorAll(chartName)[i];
						parentDom.classList.add("energy-bar-active");
					}
				}, 500);
			},
			/**
			 * 动画结束后展示数据
			 */
			showValue(parentDomArr) {
				for (let i = 0; i < this.data.length; i++) {
					let dom = parentDomArr[i].children[1];
					dom.style.bottom = parentDomArr[i].style.height;
					dom.classList.add("bar-value-show");
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.energy-bar-chart {
		width: 100%;
		height: 100%;

		.coordinate {
			position: relative;
			width: 100%;
			border-bottom: 1px solid #7d8a8e;
			overflow: hidden;

			.bar-mask {
				position: absolute;
				width: 100%;
				bottom: 0;
				left: 0;
				height: 3rem;
				background-image: linear-gradient(
					to top,
					rgba(5, 13, 26, 0.5),
					rgba(5, 13, 26, 0)
				);
			}

			.energy-bar-box {
				position: absolute;
				bottom: 0px;

				.energy-bar {
					position: absolute;
					left: 50%;
					bottom: 0px;
					margin-left: -0.4rem;
					width: 0.8rem;
					height: 100%;
					.energy-bar-item {
						background: #1ce1e2;
						width: 100%;
						height: 10px;
					}
				}
				.bar-value {
					opacity: 0;
					position: absolute;
					//color:#727A7C;
					color: #909ca0;
					//font-size:12px;
					font-size: 0.7rem;
					line-height: 16px;
					text-align: center;
					width: 120%;
					left: -10%;
					font-weight: bold;
					transition: opacity 0.2s;
					span {
						color: #dae8ef;
						//font-size:16px;
						font-size: 0.9rem;
					}
				}
				.bar-value-show {
					opacity: 1;
				}
			}
		}

		.bar-name-show {
			width: 100%;
		}

		.bar-item-name {
			float: left;
			height: 24px;
			line-height: 24px;
			color: #909ca0;
			text-align: center;
			//font-size:12px;
			font-size: 0.7rem;
		}

		.energy-bar-active {
			animation: barShow 0.5s 1;
			transition-timing-function: ease-in;
			animation-fill-mode: forwards;
		}

		@keyframes barShow {
			0% {
				transform: translateY(0);
			}
			100% {
				bottom: 0px;
				transform: translateY(50);
			}
		}
	}
</style>
