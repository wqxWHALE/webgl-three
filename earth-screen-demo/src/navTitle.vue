<template>
	<!-- 标题 coded by qx-->
	<div class="nav-content">
		<div class="content-bg">
			<img src="/img/screenName.png" />
		</div>
		<canvas class="title-boader-pag" id="titleBoaderPag"></canvas>
		<div class="show-time-box">
			<div class="time-show">{{ time }}</div>
			<div class="date-show">{{ date }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				date: null,
				time: null,
				timeInterval: null,
			};
		},
		created() {
			this.timeInterval = setInterval(this.showTime, 1000);
			this.boarderAnimate();
		},
		methods: {
			showTime() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				month = month < 10 ? "0" + month : month;
				let day = date.getDate(); //获取日期
				day = day < 10 ? "0" + day : day;
				let hour = date.getHours();
				hour = hour < 10 ? "0" + hour : hour;
				let minute = date.getMinutes();
				minute = minute < 10 ? "0" + minute : minute;
				let week = date.getDay(); //获取星期
				let second = date.getSeconds();
				second = second < 10 ? "0" + second : second;
				week = "日一二三四五六".charAt(week);
				week = "星期" + week;
				this.date = year + "." + month + "." + day + " " + week + " ";
				this.time = hour + ":" + minute + ":" + second;
			},
			async boarderAnimate() {
				// 实例化 PAG
				const PAG = await window.libpag.PAGInit();
				// 获取 PAG 素材数据
				const buffer = await fetch("/img/xaTitleBoarder.pag").then((response) =>
					response.arrayBuffer()
				);
				// 加载 PAG 素材为 PAGFile 对象
				const pagFile = await PAG.PAGFile.load(buffer);
				// 将画布尺寸设置为 PAGFile的尺寸
				const canvas = document.getElementById("titleBoaderPag");
				canvas.width = pagFile.width();
				canvas.height = pagFile.height();
				// 实例化 PAGView 对象
				const pagView = await PAG.PAGView.init(pagFile, canvas);
				pagView.setRepeatCount(0);
				// 播放 PAGView
				await pagView.play();
			},
		},
	};
</script>

<style lang="scss">
	.nav-content {
		width: 100%;
		img {
			width: 100%;
		}
		.show-time-box {
			position: absolute;
			right: 0;
			top: 0;
			text-align: center;
			color: #909ca0;
			.date-show {
				float: right;
				line-height: 3.2rem;
				font-size: 1rem;
				color: #909ca0;
				margin-right: 1rem;
			}
			.time-show {
				float: right;
				margin-right: 2rem;
				line-height: 3rem;
				font-size: 1.5rem;
				color: #dae8ef;
			}
		}
	}

	.title-boader-pag {
		width: 100%;
		position: absolute;
		top: 0.7rem;
		z-index: 999;
	}
</style>
