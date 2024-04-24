<template>
	<div id="base-view-container">
		<nav-title id="navTitle" class="nav-title"></nav-title>
		<div id="xa-base-view-container">
			<!-- <dv-full-screen-container> -->
			<!--<left-top-statistics
					id="dataStatisticsNav"
					class="data-statistics-nav hide"
					:data="cityInfo"></left-top-statistics>-->
			<data-Board
				id="dataBoard"
				class="data-board"
				:data="industryInfos"></data-Board>
			<!-- </dv-full-screen-container> -->
		</div>

		<div id="earthMask" class="earth-mask"></div>
		<screen-bg></screen-bg>
	</div>
</template>

<script>
	import screenBg from "./screenBg";
	// import leftTopStatistics from "./leftTopStatistics";
	import dataBoard from "./dataBoard";
	import navTitle from "./navTitle";
	export default {
		components: { screenBg, navTitle, dataBoard },
		data() {
			return {
				data() {
					return {
						industryInfos: [],
					};
				},
			};
		},
		created() {
			this.industryInfos = [
				{
					firstCode: "05",
					secondInfos: [
						{ name: "test1", value: 90 },
						{ name: "test2", value: 80 },
						{ name: "test3", value: 10 },
					],
				},
				{
					firstCode: "07",
					secondInfos: [
						{ name: "test1", value: 40 },
						{ name: "test2", value: 30 },
						{ name: "test3", value: 20 },
					],
				},
				{
					firstCode: "06",
					secondInfos: [
						{ name: "test1", value: 40 },
						{ name: "test2", value: 30 },
						{ name: "test3", value: 20 },
						{ name: "test4", value: 50 },
						{ name: "test5", value: 80 },
					],
				},
				// { firstCode: "09" },
			];
			console.log(this.industryInfos);
		},
	};
</script>

<style lang="scss">
	@import "./style/main.scss";
</style>
