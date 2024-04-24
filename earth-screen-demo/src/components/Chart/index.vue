<template>
	<div
		ref="echart"
		:style="{
			maxHeight: maxHeight ? maxHeight : 'auto',
			height: height,
		}"></div>
</template>

<script>
	let that;
	export default {
		props: {
			chartData: {
				type: Object,
				default() {
					// 组件复用都会使用此对象的引用  所以要return的方式 确保组件被调用时地址不一样
					return {};
				},
			},
			// 是否联动
			connect: {
				type: Boolean,
				default() {
					return false;
				},
			},
			// 联动名称
			groupName: {
				type: String,
				default() {
					return "group1";
				},
			},
			// 是否开启事件
			openEvent: {
				type: Boolean,
				default() {
					return false;
				},
			},
			height: {
				type: String,
				default: "100%",
			},
			maxHeight: {
				type: String,
				default: null,
			},
		},
		computed: {},
		watch: {
			chartData: {
				deep: true,
				immediate: false,
				handler(newValue) {
					this.options = newValue;
					this.initChart();
				},
			},
		},
		data() {
			return {
				echart: null,
				options: this.chartData,
			};
		},
		beforeUnmount() {
			window.removeEventListener("resize", () => {}, false);
		},
		mounted() {
			that = this;
			this.initChart();
			window.addEventListener(
				"resize",
				() => {
					if (that.echart && that.echart.resize) {
						that.echart.resize();
					}
				},
				false
			);
		},
		methods: {
			initChart() {
				if (this.echart) {
					this.echart.setOption(this.options, true);
				} else {
					this.echart = this.echarts.init(this.$refs.echart);
					this.echart.setOption(this.options, true);
				}
				if (this.connect) {
					this.echart.group = this.groupName;
					this.echarts.connect(this.groupName);
				}
				let that = this;
				// let listener = function () {
				// 	that.echart.resize();
				// };
				//EleResize.on(that.$refs.echart, listener);
				if (that.openEvent) {
					this.$emit("thisEchart", this.echart);
				}
			},
			resizeSet() {
				if (that.echart && that.echart.resize) {
					that.echart.resize();
				}
			},
		},
	};
</script>
<style scoped></style>
