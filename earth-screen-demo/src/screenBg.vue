<template>
	<div id="three-container" ref="threeContainerRef"></div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import * as THREE from "three";
	import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
	import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
	import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
	import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
	import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
	import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

	let renderer = null,
		positions = [],
		colors = [],
		geometry = null,
		earthGeometry = null,
		composer = null,
		width = null,
		height = null,
		threeContainerRef = null,
		camera = null,
		controls = null,
		scene = null;

	threeContainerRef = ref(null);

	onMounted(() => {
		console.log(threeContainerRef.value);
		//threeContainerRef.value.style.opacity = 0;
		width = window.innerWidth;
		height = window.innerHeight;
		initRenderer();
		initCamera();
		initScene();
		initLight();
		initControls();
		setBg();
		setEarth();
		animate();
	});

	// window.addEventListener('resize', onWindowResize, false);

	function initRenderer() {
		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(width, height);
		const containerDom = threeContainerRef.value;
		containerDom.appendChild(renderer.domElement);
	}

	function initCamera() {
		camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
		camera.position.set(0, 10, 200);
		camera.lookAt(30, 30, 30);
	}
	function initScene() {
		scene = new THREE.Scene();
		//this.scene.background = new THREE.Color( 0x020924 );
		scene.fog = new THREE.Fog(0x020924, 200, 1000);
	}
	function initLight() {
		const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
		scene.add(ambientLight);
		var directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
		directionalLight.position.set(0, 1, 0).normalize();
		var directionalLight2 = new THREE.DirectionalLight(0xff2ffff, 0.2);
		directionalLight2.position.set(1, 0.1, 0.1).normalize();
		scene.add(directionalLight);
		scene.add(directionalLight2);
		var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.1);
		hemiLight.position.set(0, 1, 0);
		scene.add(hemiLight);
		var directionalLight3 = new THREE.DirectionalLight(0xffffff);
		directionalLight3.position.set(100, 500, -20);
		directionalLight3.castShadow = true;
		directionalLight3.shadow.camera.top = 18;
		directionalLight3.shadow.camera.bottom = -10;
		directionalLight3.shadow.camera.left = -52;
		directionalLight3.shadow.camera.right = 12;
		scene.add(directionalLight3);
	}
	function initControls() {
		controls = new OrbitControls(camera, renderer.domElement);
		//this.controls.target = new THREE.Vector3(-30 ,10,-30);
		controls.enableDamping = true;
		controls.enableZoom = true;
		controls.autoRotate = true;
		controls.autoRotateSpeed = 0.2;
		controls.enablePan = true;
	}

	function setBg() {
		geometry = new THREE.BufferGeometry();
		//this.geometry = new THREE.CircleBufferGeometry( 5, 32 );
		for (var i = 0; i < 1000; i++) {
			var vertex = new THREE.Vector3();
			vertex.x = Math.random() * 2 - 1;
			vertex.y = Math.random() * 2 - 1;
			vertex.z = Math.random() * 1.5 - 1;
			positions.push(vertex.x, vertex.y, vertex.z);
			var color = new THREE.Color();
			color.setHSL(
				Math.random() * 0.2 + 0.5,
				0.55,
				Math.random() * 0.25 + 0.55
			);
			colors.push(color.r, color.g, color.b);
		}
		geometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(positions, 3)
		);
		geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

		let canvas = document.createElement("canvas");
		canvas.width = 100;
		canvas.height = 100;

		let context = canvas.getContext("2d");
		//context.fillStyle = "#ffffff";

		let image = new Image();
		image.src = "./img/lightPot.png";

		image.onload = function () {
			context.drawImage(image, 0, 0, 100, 90);

			//canvas 创建圆
			// context.arc(50, 50, 45, 0, 2 * Math.PI);
			// context.fill();

			// 创建材质
			let texture = new THREE.Texture(canvas);
			texture.needsUpdate = true;

			var starsMaterial = new THREE.PointsMaterial({
				map: texture,
				transparent: true,
				size: 5,
				depthWrite: false,
				//depthTest: false
			});

			let stars = new THREE.Points(geometry, starsMaterial);
			stars.scale.set(210, 210, 210);
			scene.add(stars);
		};
	}

	function setEarth() {
		let canvas = document.createElement("canvas");
		canvas.width = 1920;
		canvas.height = 1081;

		let context = canvas.getContext("2d");
		let image = new Image();
		image.src = "./img/road.png";
		image.onload = function () {
			context.drawImage(image, 0, 0, 1921, 1081);

			// 创建材质
			let texture = new THREE.Texture(canvas);
			texture.needsUpdate = true;

			earthGeometry = new THREE.SphereGeometry(100, 200, 100);

			var earthMaterial = new THREE.MeshBasicMaterial({
				map: texture,
				transparent: true,
				side: THREE.DoubleSide,
				//overdraw: true,
				//depthWrite:false,
				//depthTest: false
				//color:'#B0E0FC'
				//color:new THREE.Color(244, 197, 64, 0.3)
			});

			let mesh = new THREE.Mesh(earthGeometry, earthMaterial);

			mesh.position.set(0, -60, -10);
			scene.add(mesh);

			setEarthGlow([mesh]);
		};
	}
	function setEarthGlow(selectedObjects) {
		// 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
		composer = new EffectComposer(renderer);
		// 新建一个场景通道  为了覆盖到原理来的场景上
		let renderPass = new RenderPass(scene, camera);
		composer.addPass(renderPass);
		// 物体边缘发光通道
		let outlinePass = new OutlinePass(
			new THREE.Vector2(window.innerWidth, window.innerHeight),
			scene,
			camera,
			selectedObjects
		);
		outlinePass.selectedObjects = selectedObjects;
		outlinePass.edgeStrength = 1.0; // 边框的亮度
		outlinePass.edgeGlow = 6; // 光晕[0,1]
		outlinePass.usePatternTexture = false; // 是否使用父级的材质
		outlinePass.edgeThickness = 6.0; // 边框宽度
		outlinePass.downSampleRatio = 4; // 边框弯曲度
		//outlinePass.usePatternTexture = false; // 使用纹理覆盖？
		//outlinePass.pulsePeriod = 5; // 呼吸闪烁的速度
		outlinePass.visibleEdgeColor.set(parseInt(0x7bdeeb)); // 呼吸显示的颜色
		//outlinePass.visibleEdgeColor= new THREE.Color(114,122,124,0.5);
		//outlinePass.hiddenEdgeColor = new THREE.Color(114,122,124); // 呼吸消失的颜色
		outlinePass.clear = true;
		composer.addPass(outlinePass);
		// 自定义的着色器通道 作为参数
		var effectFXAA = new ShaderPass(FXAAShader);
		effectFXAA.uniforms.resolution.value.set(
			1 / window.innerWidth,
			1 / window.innerHeight
		);
		effectFXAA.renderToScreen = true;
		composer.addPass(effectFXAA);
	}
	function animate() {
		window.requestAnimationFrame(() => {
			if (controls) controls.update();
			renders();
			animate();
		});
	}
	function renders() {
		renderer.clear();
		renderer.render(scene, camera);
		if (composer) {
			composer.render();
		}
	}
</script>

<style lang="scss">
	#three-container {
		position: absolute;
		width: 100%;
		height: 100%;
		//background: #020924;
		background-image: linear-gradient(to bottom, #0a184e, #020924);
	}
</style>
