<template>
	<!-- coded by qx-->
	<div>
		<div class="map-board">
			<div class="map-area">
				<div class="map-board-bg">
					<img id="mapImgBg" src="/img//xaMap.png" />
					<img class="areaImg area01" src="/img//area01.png" />
					<img class="areaImg area02" src="/img//area02.png" />
					<img class="areaImg area03" src="/img//area03.png" />
					<img class="areaImg area04" src="/img//area04.png" />
					<img class="areaImg area05" src="/img//area05.png" />
					<img class="areaImg area06" src="/img//area06.png" />
					<img class="areaImg area07" src="/img//area07.png" />
					<img class="areaImg area08" src="/img//area08.png" />
					<img class="areaImg area09" src="/img//area09.png" />
					<canvas class="xa-boader-pag" id="xaBoaderPag"></canvas>
					<!-- <div class="areaImgBlock block01" @mouseenter="stopAni(0)" @mouseleave="startAni(0)"></div>
                <div class="areaImgBlock block02" @mouseenter="stopAni(1)" @mouseleave="startAni(1)"></div>
                <div class="areaImgBlock block03" @mouseenter="stopAni(2)" @mouseleave="startAni(2)"></div>
                <div class="areaImgBlock block04" @mouseenter="stopAni(3)" @mouseleave ="startAni(3)"></div>
                <div class="areaImgBlock block05" @mouseenter="stopAni(4)" @mouseleave ="startAni(4)"></div>
                <div class="areaImgBlock block06" @mouseenter="stopAni(5)" @mouseleave ="startAni(5)"></div>
                <div class="areaImgBlock block07" @mouseenter="stopAni(6)" @mouseleave ="startAni(6)"></div>
                <div class="areaImgBlock block08" @mouseenter="stopAni(7)" @mouseleave ="startAni(7)"></div>
                <div class="areaImgBlock block09" @mouseenter="stopAni(8)" @mouseleave ="startAni(8)"></div> -->
				</div>
				<div
					class="area-item"
					v-for="(item, index) in xaAreaArr"
					:key="item.name"
					:style="{ left: item.left, top: item.top }"
					@mouseover="stopAni(index)"
					@mouseout="startAni(index)">
					<div class="area-name">{{ item.showName }}</div>
					<div :class="`block block0${index + 1}`"></div>
					<div
						class="circle-ripple"
						v-if="index == currentIndex && isShowPoint"></div>
					<transition name="fade" :appear="true">
						<div
							class="area-detail"
							v-if="index == currentIndex && isShowPoint">
							<div class="area-detail-box">
								<!-- <dv-border-box-8> -->
								<div class="area-detail-info">
									<div class="area-detail-name">
										<div class="pot"></div>
										{{ item.name }}
									</div>
									<div class="area-detail-content">
										<div class="detail-item">
											<div class="item-name">碳指标</div>
											<div class="item-value" style="color: rgb(134, 115, 94)">
												<span style="color: #e0b485">{{
													parseFloat(item.detail.standard).toFixed(1)
												}}</span
												>万吨
											</div>
										</div>
										<div class="detail-item">
											<div class="item-name">碳排放</div>
											<div class="item-value">
												<span>{{
													parseFloat(item.detail.emission).toFixed(1)
												}}</span
												>万吨
											</div>
										</div>
										<div class="detail-item">
											<div class="item-name">使用率</div>
											<div class="item-value">
												<span>{{
													parseFloat(item.detail.rate).toFixed(1)
												}}</span
												>%
											</div>
										</div>
									</div>
								</div>
								<!-- </dv-border-box-8> -->
							</div>
							<div class="area-detail-line"></div>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { validatenull } from "@/utils/validate";
	export default {
		name: "xaMapBoard",
		components: {},
		props: ["data"],
		data() {
			return {
				banHover: false,
				currentIndex: -1,
				mapDetailAnimFunc: 0,
				isShowPoint: true,
				xaAreaArr: [
					{
						name: "周至县",
						showName: "周至县",
						code: "02113",
						width: "auto",
						left: "24%",
						top: "72%",
						detail: {
							standard: 0,
							emission: 0,
							rate: 0,
						},
					},
					{
						name: "鄠邑区",
						showName: "鄠邑区",
						code: "02111",
						width: "auto",
						left: "41%",
						top: "71%",
						detail: {
							standard: 0,
							emission: 0,
							rate: 0,
						},
					},
					{
						name: "长安区",
						showName: "长安区",
						code: "02101",
						width: "auto",
						left: "57%",
						top: "70%",
						detail: {
							standard: 0,
							emission: 0,
							rate: 0,
						},
					},
					{
						name: "蓝田县",
						showName: "蓝田县",
						code: "02112",
						width: "auto",
						left: "75%",
						top: "72%",
						detail: {
							standard: 0,
							emission: 0,
							rate: 0,
						},
					},
					{
						name: "临潼区",
						showName: "临潼区",
						code: "02109",
						width: "auto",
						left: "72%",
						top: "35%",
						detail: {
							standard: 0,
							emission: 0,
							rate: 0,
						},
					},
					{
						name: "阎良区",
						showName: "阎良区",
						code: "02108",
						width: "auto",
						left: "72%",
						top: "12%",
						detail: {
							standard: 0,
							emission: 0,
							rate: 0,
						},
					},
					{
						name: "高陵区",
						showName: "高陵区",
						code: "02110",
						width: "auto",
						left: "63%",
						top: "24%",
						detail: {
							standard: 0,
							emission: 0,
							rate: 0,
						},
					},
					{
						name: "未央区",
						showName: "未央区",
						code: "02106",
						width: "auto",
						left: "56%",
						top: "39%",
						detail: {
							standard: 0,
							emission: 0,
							rate: 0,
						},
					},
					{
						name: "灞桥区",
						showName: "灞桥区",
						code: "02107",
						width: "auto",
						left: "63%",
						top: "48%",
						detail: {
							standard: 0,
							emission: 0,
							rate: 0,
						},
					},
					{
						name: "雁塔区",
						showName: "雁塔区",
						code: "02105",
						width: "auto",
						left: "56%",
						top: "53.3%",
						detail: {
							standard: 0,
							emission: 0,
							rate: 0,
						},
					},
					{
						name: "新城区",
						showName: "",
						code: "02102",
						width: "auto",
						left: "61%",
						top: "50%",
						detail: {
							standard: 0,
							emission: 0,
							rate: 0,
						},
					},
					{
						name: "莲湖区",
						showName: "",
						code: "02104",
						width: "auto",
						left: "57%",
						top: "48.5%",
						detail: {
							standard: 0,
							emission: 0,
							rate: 0,
						},
					},
					{
						name: "碑林区",
						showName: "",
						code: "02103",
						width: "auto",
						left: "59.5%",
						top: "52%",
						detail: {
							standard: 0,
							emission: 0,
							rate: 0,
						},
					},
				],
			};
		},
		created() {
			// that.$nextTick(()=>{
			//     that.boarderAnimate();
			//     setTimeout(function(){
			//         that.mapDetailAnimate();
			//     },1500);
			// });
			if (!validatenull(this.data)) {
				clearInterval(this.mapDetailAnimFunc);
				let that = this;
				that.setXaAreaArr();
				that.currentIndex = 0;
				that.$nextTick(() => {
					that.boarderAnimate();
					setTimeout(function () {
						that.mapDetailAnimate();
					}, 1500);
				});
			}
		},
		watch: {
			data: {
				handler() {
					let that = this;
					that.setXaAreaArr();
					that.currentIndex = 0;
					that.$nextTick(() => {
						that.boarderAnimate();
						setTimeout(function () {
							that.mapDetailAnimate();
						}, 1500);
					});
				},
				keep: true,
			},
		},
		beforeUnmount() {
			if (this.mapDetailAnimFunc) {
				//如果定时器还在运行 或者直接关闭，不用判断
				clearInterval(this.mapDetailAnimFunc); //关闭
			}
		},
		mounted() {
			document.addEventListener("visibilitychange", () => {
				if (document.visibilityState == "hidden") {
					//切离该页面时执行
					if (this.mapDetailAnimFunc) {
						//如果定时器还在运行 或者直接关闭，不用判断
						clearInterval(this.mapDetailAnimFunc); //关闭
					}
				} else if (document.visibilityState == "visible") {
					//切换到该页面时执行
					this.mapDetailAnimFunc = this.autoMapDetailShow();
				}
			});
		},
		methods: {
			setXaAreaArr() {
				for (let i = 0; i < this.xaAreaArr.length; i++) {
					for (let j = 0; j < this.data.length; j++) {
						if (this.xaAreaArr[i].code == this.data[j].secondCode) {
							this.xaAreaArr[i].detail.standard = this.data[j].standard; //碳指标
							this.xaAreaArr[i].detail.emission = this.data[j].emission; //碳排放
							this.xaAreaArr[i].detail.rate = this.data[j].rate; //使用率
							break;
						}
					}
				}
			},
			async boarderAnimate() {
				// 实例化 PAG
				let PAG = await window.libpag.PAGInit();
				// 获取 PAG 素材数据
				let buffer = await fetch("/img//xaMapBoarder.pag").then((response) =>
					response.arrayBuffer()
				);
				// 加载 PAG 素材为 PAGFile 对象
				let pagFile = await PAG.PAGFile.load(buffer);
				// 将画布尺寸设置为 PAGFile的尺寸
				let canvas = document.getElementById("xaBoaderPag");
				canvas.width = pagFile.width();
				canvas.height = pagFile.height();
				// 实例化 PAGView 对象
				let pagView = await PAG.PAGView.init(pagFile, canvas);
				pagView.setRepeatCount(0);
				// 播放 PAGView
				await pagView.play();
			},
			mapDetailAnimate() {
				this.mapDetailAnimFunc = this.autoMapDetailShow();
			},
			stopAni(currentIndex) {
				if (!this.banHover) {
					this.banHover = true;
					this.isShowPoint = true;
					clearInterval(this.mapDetailAnimFunc);
					this.currentIndex = currentIndex;
					let areaDom = document.querySelectorAll(".areaImg");
					for (let i = 0; i < 9; i++) {
						areaDom[i].classList.remove("area-active");
					}
					if (areaDom[this.currentIndex]) {
						areaDom[this.currentIndex].classList.add("area-active");
					}
				}
			},
			startAni() {
				let areaDom = document.querySelectorAll(".areaImg");
				if (areaDom[this.currentIndex]) {
					areaDom[this.currentIndex].classList.remove("area-active");
				}
				if (this.mapDetailAnimFunc) {
					clearInterval(this.mapDetailAnimFunc);
				}
				this.isShowPoint = false;
				this.mapDetailAnimFunc = this.autoMapDetailShow();
				this.banHover = false;
			},
			autoMapDetailShow() {
				let that = this;
				return setInterval(function () {
					that.isShowPoint = true;
					if (that.currentIndex > that.xaAreaArr.length - 1) {
						that.currentIndex = 0;
					} else {
						that.currentIndex++;
					}
					let areaDom = document.querySelectorAll(".areaImg");
					for (let i = 0; i < 9; i++) {
						areaDom[i].classList.remove("area-active");
					}
					if (areaDom[that.currentIndex]) {
						areaDom[that.currentIndex].classList.add("area-active");
					}
				}, 6000);
			},
		},
	};
</script>
@/utils/validate
