<template>
	<!-- 数据部分 coded by qx-->
	<div>
		<div class="map-board-content">
			<xa-map-board :data="xaAreaData" v-if="showMap"></xa-map-board>
		</div>

		<div class="data-board-content data-board-content01">
			<div
				class="data-board-item data-board-item-right data-board-item-right01">
				<div class="title-box">
					<div class="title-bg">
						<img src="/img//dataTitleBg.png" />
						<div class="text-tip">全年</div>
					</div>
					<div class="title-text">工业行业碳排放量</div>
				</div>
				<div class="content-box-01">
					<energy-bar-chart
						:name="'industry'"
						:data="industryData.data"
						:option="{ energyColor: '#48FFFC' }"></energy-bar-chart>
				</div>
			</div>

			<div
				class="data-board-item data-board-item-right data-board-item-right02">
				<div class="title-box">
					<div class="title-bg">
						<img src="/img//dataTitleBg.png" />
						<div class="text-tip">全年</div>
					</div>
					<div class="title-text">建筑行业碳排放量</div>
				</div>
				<div class="content-box-01">
					<energy-bar-chart
						:name="'arch'"
						:data="archData.data"
						:option="{ energyColor: '#02B5FF' }"></energy-bar-chart>
				</div>
			</div>

			<div
				class="data-board-item data-board-item-right data-board-item-right03">
				<div class="title-box">
					<div class="title-bg">
						<img src="/img//dataTitleBg.png" />
						<div class="text-tip">全年</div>
					</div>
					<div class="title-text">居民消费碳排放量</div>
				</div>
				<div class="content-box-01">
					<progress-bar :name="'daily'" :data="dailyData"></progress-bar>
				</div>
			</div>

			<div
				class="data-board-item data-board-item-right data-board-item-right04">
				<div class="title-box">
					<div class="title-bg">
						<img src="/img//dataTitleBg.png" />
						<div class="text-tip">全年</div>
					</div>
					<div class="title-text">交通行业碳排放量</div>
				</div>
				<div class="content-box-03">
					<!-- <div class="box-limit"> -->
					<!-- <active-ring-chart
						:name="'traffic'"
						:chartData="trafficData"
						:width="'10.5rem'"
						:height="'10.5rem'"></active-ring-chart> -->
					<!-- </div> -->
				</div>
			</div>

			<div
				class="data-board-item data-board-item-right data-board-item-right05">
				<div class="title-box">
					<div class="title-bg">
						<img src="/img//dataTitleBg.png" />
						<div class="text-tip">全年</div>
					</div>
					<div class="title-text">电力行业碳排放量</div>
				</div>
				<div class="content-box-03">
					<!-- <active-ring-chart2
						:name="'elec'"
						:chartData="elecData"
						:boxWidth="'12rem'"
						:boxHeight="'7.5rem'"
						:width="'15rem'"
						:height="'9rem'"></active-ring-chart2> -->
				</div>
			</div>
		</div>
		<!-- <div class="data-board-content data-board-content02">
			<div
				class="data-board-item data-board-item-bottom data-board-item-bottom01">
				<div class="title-box">
					<div class="title-bg">
						<img src="/img//dataTitleBg2.png" />
					</div>
					<div class="arrow-tip arrow-tip01">
						<img src="/img//arrow.png" />
					</div>
					<div class="title-text">城市碳中和变化趋势</div>
				</div>
				<div class="content-box-02">
					<Echart
						class="bar-chart"
						:chartData="mainData"
						v-if="completeBarData"
						:openEvent="true"
						@thisEchart="barChartListener"></Echart>
				</div>
			</div>
			<div
				class="data-board-item data-board-item-bottom data-board-item-bottom02">
				<div class="title-box">
					<div class="title-bg">
						<img src="/img//dataTitleBg2.png" />
					</div>
					<div class="arrow-tip arrow-tip02">
						<img src="/img//arrow.png" />
					</div>
					<div class="title-text">城市碳中和年指标使用率</div>
				</div>
				<div class="content-box-04">
					<pie-chart
						:chartData="mainStandardData"
						:listData="listData"></pie-chart>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	import xaMapBoard from "./components/xaMapBoard";
	// import activeRingChart from "./components/activeRingChart";
	// import activeRingChart2 from "./components/activeRingChart2";
	//import pieChart from "./components/pieChart";
	import progressBar from "./components/progressBar";
	import energyBarChart from "./components/energyBarChart";
	//import Echart from "@/components/Chart/index";

	import Math from "@/utils/caculate";

	export default {
		name: "dataBoard",
		components: {
			xaMapBoard,
			// activeRingChart,
			// activeRingChart2,
			//pieChart,
			progressBar,
			energyBarChart,
			//Echart,
		},
		props: ["data"],
		data() {
			return {
				showMap: true,
				month: 0,
				infos: [],
				xaAreaData: [],
				mainData01: [], //碳总指标
				mainData02: [], //工业
				mainData03: [], //建筑
				mainData04: [], //交通
				mainData05: [], //电力
				mainData06: [], //居民消费
				listData: [],
				completeBarData: false,
				elecData: {
					tooltip: {
						trigger: "none",
					},
					legend: {
						show: false,
					},
					series: [
						{
							name: "",
							type: "pie",
							radius: ["40%", "60%"],
							avoidLabelOverlap: false,
							minAngle: 20,
							labelLine: {
								show: true,
								color: "#909CA0",
								length: 6,
								length2: 6,
							},
							label: {
								fontSize: "0.8rem",
								fontWeight: "bold",
								color: "#909CA0",
								formatter: "{b}",
							},
							emphasis: {
								scaleSize: 4,
								label: {
									show: true,
									color: "#DAE8EF",
									fontSize: "0.9rem",
									fontWeight: "normal",
									formatter: "{b}",
								},
							},
							data: [],
							color: [
								new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: "#F4C540 " },
									{ offset: 1, color: "#F4D478 " },
								]),
								new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: "#0E5DB5 " },
									{ offset: 1, color: "#1383FE " },
								]),
								new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: "#7B9CB0 " },
									{ offset: 1, color: "#B0E0FC " },
								]),
								new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: "#149156 " },
									{ offset: 1, color: "#1FDD82 " },
								]),
								new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: "#0E5DB5 " },
									{ offset: 1, color: "#1383FE " },
								]),
								new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: "#008E8F " },
									{ offset: 1, color: "#1CE1E2 " },
								]),
							],
						},
					],
				},
				industryData: {
					data: [],
					digitalFlopStyle: {
						fontSize: "0.9rem",
					},
					lineWidth: 15,
				},
				archData: {
					data: [],
					digitalFlopStyle: {
						fontSize: "0.9rem",
					},
					lineWidth: 15,
				},
				trafficData: {
					tooltip: {
						trigger: "none",
					},
					legend: {
						show: false,
					},
					series: [
						{
							name: "",
							type: "pie",
							radius: ["40%", "60%"],
							avoidLabelOverlap: true,
							label: {
								show: false,
								position: "center",
								color: "#909CA0",
								lineHeight: 20,
								formatter: "{b}\n{c}kg",
							},
							emphasis: {
								label: {
									show: false,
									fontSize: "0.9rem",
									fontWeight: "bold",
								},
							},
							labelLine: {
								show: false,
							},
							data: [],
							color: [
								new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: "#008E8F " },
									{ offset: 1, color: "#1CE1E2 " },
								]),
								new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: "#7B9CB0 " },
									{ offset: 1, color: "#B0E0FC " },
								]),
								new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: "#149156 " },
									{ offset: 1, color: "#1FDD82 " },
								]),
								new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: "#0E5DB5 " },
									{ offset: 1, color: "#1383FE " },
								]),
							],
						},
					],
					color: [
						{ start: "#008E8F", end: "#1CE1E2" },
						{ start: "#7B9CB0", end: "#B0E0FC" },
						{ start: "#149156", end: "#1FDD82" },
						{ start: "#0E5DB5", end: "#1383FE" },
					],
				},
				dailyData: {
					sum: 0,
					data: [],
				},
				mainData: {
					animation: true,
					animationEasing: "circularInOut",
					animationDuration: 600,
					tooltip: {
						trigger: "axis",
						extraCssText: "width:8.5rem",
						axisPointer: {
							type: "cross",
							crossStyle: {
								color: "#999",
							},
						},
						borderColor: "#02ACF4",
						backgroundColor: "#165482",
						textStyle: {
							color: "#DAE8EF",
						},
						formatter: (params) => {
							let res =
								"<div style='text-align:left;color:#DAE8EF;font-size:1rem;line-height:1.7rem;'>" +
								params[0].axisValue +
								"</div>";
							res +=
								"<div style='width:100%;font-size:0.8rem;'><div style='width:30%;float:left;text-align:left;color:#909CA0;line-height:1.7rem'>碳指标</div><div style='width:70%;float:left;text-align:right;color:#909CA0;line-height:1.7rem'><span style='font-size:1rem;color:#DAE8EF'>" +
								params[0].value +
								"</span>万吨</div></div>";
							res +=
								"<div style='width:100%;font-size:0.8rem;'><div style='width:30%;float:left;text-align:left;color:#909CA0;line-height:1.7rem'>碳排放</div><div style='width:70%;float:left;text-align:right;color:#909CA0;line-height:1.7rem'><span style='font-size:1rem;color:#DAE8EF'>" +
								params[1].value +
								"</span>万吨</div></div>";
							res +=
								"<div style='width:100%;font-size:0.8rem;'><div style='width:30%;float:left;text-align:left;color:#909CA0;line-height:1.7rem'>使用率</div><div style='width:70%;float:left;text-align:right;color:#909CA0;line-height:1.7rem'><span style='font-size:1rem;color:#DAE8EF'>" +
								params[2].value.toFixed(1) +
								"</span>%</div></div>";
							// for(let i=0;i<params.length;i++){
							//    res+="<div style='width:6rem;font-size:0.8rem;'><div style='width:50%;float:left;text-align:left;color:#909CA0;line-height:1.5rem'>"+params[i].seriesName+"</div><div style='width:50%;float:left;color:#909CA0;line-height:1.5rem'><span style='font-size:1rem;color:#DAE8EF'>"+params[i].value+"k</span>吨</div></div>";
							// }

							return res;
						},
					},
					legend: {
						itemHeight: 3,
						itemWidth: 14,
						data: ["碳指标", "工业", "建筑", "交通", "居民消费", "电力"],
						textStyle: {
							fontSize: "0.9rem", //字体大小
							color: "#DAE8EF", //字体颜色
						},
						inactiveColor: "#727A7C",
						selected: {
							碳指标: true,
							工业: true,
							建筑: false,
							交通: false,
							居民消费: false,
							电力: false,
						},
					},
					grid: {
						borderColor: "#727A7C",
					},
					xAxis: [
						{
							type: "category",
							// data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
							data: [],
							axisPointer: {
								type: "shadow",
							},
						},
					],
					yAxis: [
						{
							type: "value",
							name: "万吨",
							min: 0,
							max: 10,
							interval: 5,
							axisLabel: {
								formatter: function (value) {
									if (value >= 1000) {
										value = (value / 1000).toFixed(1) + "k";
									} else if (value < 1000) {
										value = value.toFixed(1);
									}
									return value;
								},
							},
							splitLine: {
								lineStyle: {
									color: ["#727A7C", "#727A7C"],
									type: "dashed",
								},
							},
						},
						{
							type: "value",
							name: "占比",
							min: 0,
							max: 100,
							interval: 50,
							axisLabel: {
								formatter: "{value} %",
							},
							splitLine: {
								lineStyle: {
									color: ["#727A7C", "#727A7C"],
									type: "dashed",
								},
							},
						},
					],
					series: [
						{
							name: "碳指标",
							type: "bar",
							barWidth: 6,
							tooltip: {
								valueFormatter: function (value) {
									return value + " 万";
								},
							},
							//data: [35.68,35.68,87.54,0,0,0,0],
							data: [],
							itemStyle: {
								color: {
									type: "linear",
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [
										{ offset: 0, color: "#E0B485" }, // 设置颜色渐变
										{ offset: 0.8, color: "#CBA376" }, // 设置颜色渐变
										{ offset: 1, color: "#977C00" },
									],
								},
							},
						},
						{
							name: "工业",
							type: "bar",
							barWidth: 5,
							tooltip: {
								valueFormatter: function (value) {
									return value + " 万";
								},
							},
							data: [],
							itemStyle: {
								color: {
									type: "linear",
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [
										{ offset: 0, color: "#3DC0E1" }, // 设置颜色渐变
										{ offset: 0.8, color: "#165482" }, // 设置颜色渐变
										{ offset: 1, color: "#071C4A" },
									],
								},
							},
						},
						{
							name: "建筑",
							type: "bar",
							barWidth: 5,
							tooltip: {
								valueFormatter: function (value) {
									return value + " 万";
								},
							},
							data: [],
							itemStyle: {
								color: {
									type: "linear",
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [
										{ offset: 0, color: "#3DC0E1" }, // 设置颜色渐变
										{ offset: 0.8, color: "#165482" }, // 设置颜色渐变
										{ offset: 1, color: "#071C4A" },
									],
								},
							},
						},
						{
							name: "交通",
							type: "bar",
							barWidth: 5,
							tooltip: {
								valueFormatter: function (value) {
									return value + " 万";
								},
							},
							data: [],
							itemStyle: {
								color: {
									type: "linear",
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [
										{ offset: 0, color: "#3DC0E1" }, // 设置颜色渐变
										{ offset: 0.8, color: "#165482" }, // 设置颜色渐变
										{ offset: 1, color: "#071C4A" },
									],
								},
							},
						},
						{
							name: "居民消费",
							type: "bar",
							barWidth: 5,
							tooltip: {
								valueFormatter: function (value) {
									return value + " 万";
								},
							},
							data: [],
							itemStyle: {
								color: {
									type: "linear",
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [
										{ offset: 0, color: "#3DC0E1" }, // 设置颜色渐变
										{ offset: 0.8, color: "#165482" }, // 设置颜色渐变
										{ offset: 1, color: "#071C4A" },
									],
								},
							},
						},
						{
							name: "电力",
							type: "bar",
							barWidth: 5,
							tooltip: {
								valueFormatter: function (value) {
									return value + " 万";
								},
							},
							data: [],
							itemStyle: {
								color: {
									type: "linear",
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [
										{ offset: 0, color: "#3DC0E1" }, // 设置颜色渐变
										{ offset: 0.8, color: "#165482" }, // 设置颜色渐变
										{ offset: 1, color: "#071C4A" },
									],
								},
							},
						},
						{
							name: "工业",
							type: "line",
							yAxisIndex: 1,
							tooltip: {
								valueFormatter: function (value) {
									return value + " %";
								},
							},
							data: [],
							itemStyle: {
								color: "#4EF2AB",
							},
						},
						{
							name: "建筑",
							type: "line",
							yAxisIndex: 1,
							tooltip: {
								valueFormatter: function (value) {
									return value + " %";
								},
							},
							data: [],
							itemStyle: {
								color: "#4EF2AB",
							},
						},
						{
							name: "交通",
							type: "line",
							yAxisIndex: 1,
							tooltip: {
								valueFormatter: function (value) {
									return value + " %";
								},
							},
							data: [],
							itemStyle: {
								color: "#4EF2AB",
							},
						},
						{
							name: "居民消费",
							type: "line",
							yAxisIndex: 1,
							tooltip: {
								valueFormatter: function (value) {
									return value + " %";
								},
							},
							data: [],
							itemStyle: {
								color: "#4EF2AB",
							},
						},
						{
							name: "电力",
							type: "line",
							yAxisIndex: 1,
							tooltip: {
								valueFormatter: function (value) {
									return value + " %";
								},
							},
							data: [],
							itemStyle: {
								color: "#4EF2AB",
							},
						},
					],
				},
				mainStandardData: {
					goalSum: 0,
					legend: {
						show: false,
					},
					series: [
						{
							name: "Area Mode",
							type: "pie",
							radius: [45, 75],
							left: 0,
							top: 0,
							roseType: "area",
							data: [],
							label: {
								color: "#fff",
							},
							labelLine: {
								length: 7,
								length2: 0,
								lineStyle: {
									color: "#909CA0",
								},
							},
							itemStyle: {
								borderRadius: 5,
								borderColor: "#000E1E",
								borderWidth: 1,
								color: function (params) {
									var colorList = [
										"#F4C540",
										"#2C47CF",
										"#1CE1E2",
										"#1383FE",
										"#1FDD82",
									];
									return colorList[params.dataIndex];
								},
							},
							color: ["#F4C540", "#2C47CF", "#1CE1E2", "#1383FE", "#1FDD82"],
						},
					],
				},
			};
		},
		watch: {
			data: {
				handler(newArr) {
					console.log("00000", newArr);
					setTimeout(() => {
						this.infos = newArr;
						for (let i = 0; i < this.infos.length; i++) {
							if (this.infos[i].firstCode == "02") {
								//区指标
								this.xaAreaData = this.infos[i].userRates;
							} else if (this.infos[i].firstCode == "05") {
								//工业
								this.industryData.data = this.infos[i].secondInfos;
							} else if (this.infos[i].firstCode == "06") {
								//居民消费
								this.dailyData.data = this.infos[i].secondInfos;
								this.dailyData.sum = 0;
								this.dailyData.data.forEach((item) => {
									this.dailyData.sum = Math.methods.numberAdd(
										this.dailyData.sum,
										item.value
									);
								});
							} else if (this.infos[i].firstCode == "07") {
								//建筑
								this.archData.data = this.infos[i].secondInfos;
							} else if (this.infos[i].firstCode == "08") {
								//电力
								this.elecData.series[0].data = this.infos[i].secondInfos;
								this.elecData.greenEnergy = this.infos[i].greenEnergy;
								this.elecData.noGreenEnergy = this.infos[i].noGreenEnergy;
							} else if (this.infos[i].firstCode == "09") {
								//交通
								this.trafficData.series[0].data = this.infos[i].secondInfos;
							} else if (this.infos[i].firstCode == "100") {
								//碳总指标
								this.mainData01 = this.infos[i].userRates;
							} else if (this.infos[i].firstCode == "101") {
								//工业
								this.mainData02 = this.infos[i].userRates;
							} else if (this.infos[i].firstCode == "102") {
								//建筑
								this.mainData03 = this.infos[i].userRates;
							} else if (this.infos[i].firstCode == "103") {
								//交通
								this.mainData04 = this.infos[i].userRates;
							} else if (this.infos[i].firstCode == "104") {
								//电力
								this.mainData05 = this.infos[i].userRates;
							} else if (this.infos[i].firstCode == "105") {
								//居民消费
								this.mainData06 = this.infos[i].userRates;
							} else if (this.infos[i].firstCode == "201") {
								//工业总体
								this.infos[i].userRate.name = "工业";
								this.listData.push(this.infos[i].userRate);
							} else if (this.infos[i].firstCode == "202") {
								//建筑总体
								this.infos[i].userRate.name = "建筑";
								this.listData.push(this.infos[i].userRate);
							} else if (this.infos[i].firstCode == "203") {
								//交通总体
								this.infos[i].userRate.name = "交通";
								this.listData.push(this.infos[i].userRate);
							} else if (this.infos[i].firstCode == "204") {
								//电力总体
								this.infos[i].userRate.name = "电力";
								this.listData.push(this.infos[i].userRate);
							} else if (this.infos[i].firstCode == "205") {
								//居民消费总体
								this.infos[i].userRate.name = "居民消费";
								this.listData.push(this.infos[i].userRate);
							}
						}
						//this.changeToBarChartData();
					}, 1000);
				},
				immediate: true,
			},
		},
		mounted() {
			window.addEventListener("resize", () => {
				this.showMap = false;
				this.$nextTick(() => {
					this.showMap = true;
				});
			});
		},
		created() {},
		methods: {
			barChartListener(myChart) {
				//myChart.off('legendselectchanged');
				let legend = this.mainData.legend;
				let that = this;
				myChart.on("legendselectchanged", (e) => {
					//  myChart.dispatchAction({
					//     type: 'legendSelect',
					//     name: e.name
					// });
					if (e.name != "碳指标") {
						for (let i = 1; i < legend.data.length; i++) {
							legend.selected[legend.data[i]] = false;
							// myChart.setOption({
							//     legend:{selected:{[legend.data[i]]:false}}
							// });
						}
						legend.selected[e.name] = true;

						//切换数据
						if (e.name == "工业") {
							that.setIndustryData(this.mainData02, myChart);
						} else if (e.name == "建筑") {
							that.setIndustryData(this.mainData03, myChart);
						} else if (e.name == "交通") {
							that.setIndustryData(this.mainData04, myChart);
						} else if (e.name == "电力") {
							that.setIndustryData(this.mainData05, myChart);
						} else if (e.name == "居民消费") {
							that.setIndustryData(this.mainData06, myChart);
						}
						//console.log(legend.selected);
					}
					myChart.setOption(this.mainData);
				});
			},
			setIndustryData(currentData, myChart) {
				this.mainData.series[0].data = [];
				//获取最大值
				let maxValue = parseFloat(currentData[0].standard).toFixed(1);
				let maxRateValue = parseFloat(currentData[0].rate * 100);

				//获取数据
				for (let j = 0; j < this.month; j++) {
					if (
						j + 1 < this.month &&
						maxValue < parseFloat(currentData[j + 1].standard)
					) {
						maxValue = parseFloat(currentData[j + 1].standard).toFixed(1);
					}
					if (
						j + 1 < this.month &&
						maxValue < parseFloat(currentData[j + 1].emission)
					) {
						maxValue = parseFloat(currentData[j + 1].emission).toFixed(1);
					}
					if (
						j + 1 < this.month &&
						maxRateValue < parseFloat(currentData[j + 1].rate * 100)
					) {
						maxRateValue = parseFloat(currentData[j + 1].rate * 100);
					}

					this.mainData.series[0].data.push(
						parseFloat(currentData[j].standard)
					);
				}
				//console.log("maxValue",maxValue);
				this.mainData.yAxis[0].max = parseInt(
					Math.numberExcept(Math.methods.numberAdd(maxValue + 1), 0.8)
				);
				//console.log("max",this.mainData.yAxis[0].max);
				this.mainData.yAxis[0].interval = Math.numberExcept(
					this.mainData.yAxis[0].max,
					2
				);

				//console.log("maxRateValue",maxRateValue);
				this.mainData.yAxis[1].max = parseInt(
					Math.numberExcept(maxRateValue, 0.8)
				);
				//this.mainData.yAxis[1].interval=Math.numberExcept(this.mainData.yAxis[1].max,2);
				if (this.mainData.yAxis[1].max > 100) {
					this.mainData.yAxis[1].max = Math.methods.numberAdd(
						this.mainData.yAxis[1].max,
						2
					);
					this.mainData.yAxis[1].interval = Math.numberExcept(
						this.mainData.yAxis[1].max,
						2
					);
				} else {
					this.mainData.yAxis[1].max = 100;
					this.mainData.yAxis[1].interval = 50;
				}
				myChart.setOption(this.mainData);
			},
			animate() {
				let index = 1;
				let that = this;
				let legend = that.mainData.legend;
				setInterval(function () {
					if (index == 6) {
						index = 1;
					}
					legend.selected[legend.data[index]] = true;
					for (let i = 1; i < legend.data.length; i++) {
						if (index != i) {
							legend.selected[legend.data[i]] = false;
						}
					}
					index++;
				}, 3000);
			},
			/**
			 * 将获得的数据转换成碳指标的折线图和碳排放的饼图
			 */
			changeToBarChartData() {
				//先获取当前月份
				this.month = new Date().getMonth() + 1;
				for (let i = 1; i <= this.month; i++) {
					this.mainData.xAxis[0].data.push(i + "月");
				}

				//获取碳指标最大值
				let maxValue = parseFloat(this.mainData02[0].standard).toFixed(1);
				let maxRateValue = parseFloat(this.mainData02[0].rate * 100).toFixed(1);

				//获取数据
				for (let j = 0; j < this.month; j++) {
					if (
						j + 1 < this.month &&
						maxValue < parseFloat(this.mainData02[j + 1].standard)
					) {
						maxValue = parseFloat(this.mainData02[j + 1].standard).toFixed(1);
					}
					if (
						j + 1 < this.month &&
						maxValue < parseFloat(this.mainData02[j + 1].emission)
					) {
						maxValue = parseFloat(this.mainData02[j + 1].emission).toFixed(1);
					}
					//if(j+1<this.month) console.log("rate:"+parseFloat(this.mainData02[j+1].rate*100));
					if (
						j + 1 < this.month &&
						maxRateValue < parseFloat(this.mainData02[j + 1].rate * 100)
					) {
						maxRateValue = parseFloat(this.mainData02[j + 1].rate * 100);
					}
					//console.log("current:"+maxRateValue);

					this.mainData.series[0].data.push(
						parseFloat(this.mainData02[j].standard)
					);
					this.mainData.series[1].data.push(
						parseFloat(this.mainData02[j].emission)
					);
					this.mainData.series[2].data.push(
						parseFloat(this.mainData03[j].emission)
					);
					this.mainData.series[3].data.push(
						parseFloat(this.mainData04[j].emission)
					);
					this.mainData.series[4].data.push(
						parseFloat(this.mainData06[j].emission)
					);
					this.mainData.series[5].data.push(
						parseFloat(this.mainData05[j].emission)
					);

					this.mainData.series[6].data.push(
						parseFloat(this.mainData02[j].rate) * 100
					);
					this.mainData.series[7].data.push(
						parseFloat(this.mainData03[j].rate) * 100
					);
					this.mainData.series[8].data.push(
						parseFloat(this.mainData04[j].rate) * 100
					);
					this.mainData.series[9].data.push(
						parseFloat(this.mainData06[j].rate) * 100
					);
					this.mainData.series[10].data.push(
						parseFloat(this.mainData05[j].rate) * 100
					);
				}
				this.mainData.yAxis[0].max = parseInt(
					Math.numberExcept(Math.methods.numberAdd(maxValue + 1), 0.8)
				);
				//onsole.log(maxValue);
				this.mainData.yAxis[0].interval = Math.numberExcept(
					this.mainData.yAxis[0].max,
					2
				);

				//console.log("interval:"+this.mainData.yAxis[1].interval);
				this.mainData.yAxis[1].max = parseInt(
					Math.numberExcept(maxRateValue, 0.8)
				);
				//console.log("maxRateValue:"+maxRateValue);
				if (this.mainData.yAxis[1].max > 100) {
					this.mainData.yAxis[1].max = Math.methods.numberAdd(
						this.mainData.yAxis[1].max,
						2
					);
					this.mainData.yAxis[1].interval = Math.numberExcept(
						this.mainData.yAxis[1].max,
						2
					);
				} else {
					this.mainData.yAxis[1].max = 100;
					this.mainData.yAxis[1].interval = 50;
				}

				for (let j = 0; j < this.listData.length; j++) {
					this.mainStandardData.series[0].data.push({
						value: parseFloat(this.listData[j].standard),
						name:
							parseFloat(this.listData[j].proportion * 100).toFixed(1) + "%",
					});
					this.mainStandardData.goalSum = Math.methods.numberAdd(
						this.mainStandardData.goalSum,
						this.listData[j].standard
					);
				}

				//console.log("mainData",this.mainData);

				this.completeBarData = true;
			},
		},
	};
</script>

<style lang="scss">
	@import "./style/main.scss";

	.map-board-content {
		position: absolute;
		width: 50rem;
		height: 20rem;
		// top: 25%;
		// left:15%;
		//top: 14.5rem;
		bottom: 40%;
		left: 16rem;
		z-index: 999;
	}

	.data-board-content {
		position: absolute;
		z-index: 9999;
	}
	.data-board-content01 {
		//right:0;
		width: 23%;
		height: 100%;
		left: 76%;
		top: 1%;
		z-index: 9999;
	}
	.data-board-content02 {
		left: 0;
		bottom: 2%;
		height: 15rem;
		width: 100%;
		z-index: 999;
	}
	.data-board-item {
		position: absolute;
		z-index: 9;
		border: 1px solid #165482;
		text-align: center;
		background: rgba($color: #000e1e, $alpha: 0.9);

		.title-box {
			position: relative;
			height: 38px;
			margin-top: -18px;
		}
		.title-bg {
			//width:100%;
			position: absolute;
			left: -40px;
			height: 100%;
			width: 435px;
			img {
				width: 100%;
				height: 100%;
			}
		}

		.arrow-tip {
			position: absolute;
			top: 50%;
			margin-top: -0.2rem;
			color: #727a7c;
			width: 0.7rem;
			img {
				width: 100%;
				height: auto;
			}
		}
		.arrow-tip01 {
			left: 13rem;
		}
		.arrow-tip02 {
			left: 15rem;
		}

		.title-text {
			position: absolute;
			//font-size: 16px;
			font-size: 0.9rem;
			line-height: 36px;
			color: #c5dcea;
			font-family: "Microsoft YaHei", 微软雅黑;
		}

		.content-box-01 {
			position: relative;
			top: 45%;
			margin-top: -60px;
			width: 100%;
			//padding:0px 50px;
			padding: 0rem 1rem;
			box-sizing: border-box;
			//width:300px;
			//margin-top:30px;
			//padding-left:50px;
			height: 120px;
		}

		.content-box-02 {
			//width:580px;
			position: relative;
			top: 2.5rem;
			//height:85%;
			height: 15rem;
			//margin-top:-22px;
			margin-top: -1rem;
			display: inline-block;

			.bar-chart {
				width: 30rem;
			}
		}

		.content-box-04 {
			position: relative;
			//top:2.5rem;
			height: 15rem;
			//margin-top:-22px;
			margin-top: 0.5rem;
		}

		.content-box-03 {
			position: relative;
			width: 100%;
			height: 10.5rem;
			top: 50%;
			margin-top: -6rem;
			.box-limit {
				width: 23rem;
				margin: auto;
				position: relative;
			}
		}
	}
	.data-board-item-right {
		right: 1%;
		//width:23%;
		width: 100%;
		height: 16%;
		// right:20px;
		// width:400px;
		// height:150px;
	}
	.data-board-item-bottom {
		//bottom:150px;
		//bottom: 2.5%;
		//width:35%;
		//height:26%;

		// width:45rem;
		// height:19rem;

		width: 36.5rem;
		height: 15rem;

		.title-box {
			margin-top: -22px;
		}
		.title-bg {
			//width:77%;
			width: 430px;
			//top:-22px;
			left: 0px;
			img {
				width: 100%;
				height: 45px;
			}
		}
		.title-text {
			left: 45px;
			// font-size:16px;
			font-size: 1rem;
			line-height: 42px;
		}
	}
	.data-board-item-bottom01 {
		left: 1%;
	}
	.data-board-item-bottom02 {
		right: 28%;
	}
	.data-board-item-right01 {
		top: 7%;
	}
	.data-board-item-right02 {
		top: 25.5%;
	}
	.data-board-item-right03 {
		top: 44%;
	}
	.data-board-item-right04 {
		top: 62.5%;
	}
	.data-board-item-right05 {
		top: 81%;
	}
</style>
