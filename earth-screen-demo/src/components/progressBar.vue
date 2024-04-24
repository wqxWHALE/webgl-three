<template>
	<!--coded by qx-->
	<div>
		<div :class="`progress-data-content progress-data-content-${name}`">
			<div
				class="tip-row"
				v-for="(item, index) in data.data"
				:key="item.name"
				:style="
					isFloat && index > 2
						? {
								position: 'absolute',
								left: '50%',
								top: `${(index - 3) * 2.5}rem`,
						  }
						: ''
				">
				<div class="row-item" style="width: 20%">
					{{ item.name }}
				</div>
				<div class="row-item" style="width: 40%">
					<div class="progess-bar-root">
						<div class="progress-bar-box">
							<!-- <div class="progress-bar" :style="{width:(parseInt(Math.methods.numberExcept(item.value,data.sum)*100)==0?2:Math.methods.numberExcept(item.value,data.sum)*100)+'%'}"></div> -->
							<div class="progress-bar" :style="setProgress(item, index)"></div>
							<div
								class="progress-bar-pot"
								:style="{
									left:
										(parseInt(numberExcept(item.value, data.sum) * 100) == 0
											? 2
											: numberExcept(item.value, data.sum) * 100) + '%',
								}"></div>
						</div>
					</div>
				</div>
				<!-- <div class="row-item" style="width:40%;color:#E0B485"><span>{{parseFloat(item.value)>99 || item.value.indexOf(".00")!=-1 ? parseInt(item.value):parseFloat(item.value).toFixed(1)}}</span>万吨</div> -->
				<div class="row-item" style="width: 40%; color: #86735e">
					<span>{{ parseFloat(item.value).toFixed(1) }}</span
					>万吨
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Math from "@/utils/caculate";
	export default {
		name: "progressBar",
		props: ["name", "data", "width", "height"],
		components: {},
		data() {
			return {
				info: null,
				isFloat: false,
			};
		},
		watch: {
			data: {
				handler(newObj) {
					this.info = newObj;
					if (this.info.data.length > 2) {
						this.isFloat = true;
					}
					this.$nextTick(() => {
						this.initBar();
					});
				},
				deep: true,
				immediate: false,
			},
		},
		created() {},
		methods: {
			numberExcept(arg1, arg2) {
				return Math.methods.numberExcept(arg1, arg2);
			},
			setProgress(item) {
				let width =
					parseInt(
						Math.methods.numberExcept(item.value, this.data.sum) * 100
					) == 0
						? 2
						: Math.methods.numberExcept(item.value, this.data.sum) * 100;
				return {
					left: -width + "%",
					width: width + "%",
				};
			},
			initBar() {
				let that = this;
				let barName = ".progress-data-content-" + that.name + " .progress-bar";
				let domArr = document.querySelectorAll(barName);
				//console.log("bar",domArr);
				if (domArr.length > 0) {
					domArr[0].addEventListener(
						"animationend",
						function () {
							//console.log("bar执行完成");
							that.fininshAni();
						},
						false
					);
					that.animate();
				}
			},
			animate() {
				let that = this;
				setTimeout(function () {
					let barName =
						".progress-data-content-" + that.name + " .progress-bar";
					for (let i = 0; i < that.data.data.length; i++) {
						let parentDom = document.querySelectorAll(barName)[i];
						//console.log(parentDom);
						parentDom.classList.add("progress-bar-active");
					}
				}, 500);
			},
			fininshAni() {
				let barPot =
					".progress-data-content-" + this.name + " .progress-bar-pot";
				let root = ".progress-data-content-" + this.name + " .progress-bar-box";
				let barPotDomArr = document.querySelectorAll(barPot);
				let rootDomArr = document.querySelectorAll(root);
				for (let i = 0; i < this.data.data.length; i++) {
					//console.log(document.querySelectorAll(barPot)[i].style);
					barPotDomArr[i].style.display = "block";
					rootDomArr[i].style.overflow = "visible";
				}
			},
		},
	};
</script>

<style lang="scss">
	.progress-data-content {
		position: relative;
		margin-top: 0.3rem;
		width: 100%;
		height: 7rem;
		.tip-row {
			width: 50%;
			height: 2.5rem;
			overflow: hidden;
			padding: 0 5px;
			box-sizing: border-box;
			.row-item {
				width: 30%;
				text-align: center;
				color: #909ca0;
				font-size: 0.7rem;
				line-height: 1.4rem;
				float: left;
				span {
					color: #e0b485;
					font-size: 0.9rem;
					font-weight: bold;
				}
				.progess-bar-root {
					width: 100%;
					height: 1.4rem;
				}
				.progress-bar-box {
					position: relative;
					top: 50%;
					margin-top: -0.1rem;
					width: 100%;
					height: 0.2rem;
					background: #0f5160;
					overflow: hidden;
					.progress-bar {
						position: absolute;
						height: 0.2rem;
						background-image: linear-gradient(
							to right,
							rgba(62, 215, 230, 0.1),
							rgba(72, 255, 252, 1)
						);
					}
					.progress-bar-pot {
						position: absolute;
						display: none;
						width: 0.3rem;
						height: 0.3rem;
						top: -0.05rem;
						margin-left: -0.25rem;
						background: rgba(72, 255, 252, 1);
						border-radius: 50%;
						z-index: 9;
						box-shadow: 0 0 0.4rem rgba(72, 255, 252, 0.9),
							0 0 0.4rem rgba(72, 255, 252, 0.9),
							0 0 0.4rem rgba(72, 255, 252, 0.9),
							0 0 0.4rem rgba(72, 255, 252, 0.9);
					}
				}
			}
			.row-item-first {
				width: 70%;
			}
		}

		.progress-bar-active {
			animation: barShow 0.6s 1;
			transition-timing-function: ease-in;
			animation-fill-mode: forwards;
		}

		@keyframes barShow {
			0% {
			}
			100% {
				left: 0px;
			}
		}
	}
</style>
