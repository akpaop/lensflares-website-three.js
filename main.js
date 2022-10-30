import * as THREE from './build/three.module.js';
import { FlyControls } from './jsm/controls/FlyControls.js';
const init = () => {
	console.log('init');

	const clock = new THREE.Clock();
	const windouWD = window.innerWidth;
	const windouHT = window.innerHeight;

	//カメラ
	const camera = new THREE.PerspectiveCamera(
		40, //1st 40:視野角
		windouWD / windouHT, //2nd アスペクト比
		1, //3rd 開始距離
		15000 //4th 終了距離
	);
	camera.position.z = 250;

	//シーン
	const scene = new THREE.Scene();

	//geometry
	const boxSize = 250;
	const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
	const material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		specular: 0xffffff,
		shininess: 50,
	});

	for (let i = 0; i < 2500; i++) {
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
		mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
		mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);
		mesh.rotation.x = Math.random() * Math.PI;
		scene.add(mesh);
	}

	//並行光源
	const dirLight = new THREE.DirectionalLight(0xffffff, 0.03);
	scene.add(dirLight);

	//ポイント光源
	const addLight = (h, s, l, x, y, z) => {
		const light = new THREE.PointLight(0xffffff, 1.5, 2000);
		light.color.setHSL(h, s, l);
		light.position.set(x, y, z);
		scene.add(light);
	};
	addLight(0.08, 0.3, 0.9, 0, 0, -1000);

	//レンダラー
	const renderer = new THREE.WebGLRenderer();

	// controls = new FlyControls(camera, renderer.domElement);

	renderer.setSize(windouWD, windouHT);
	document.body.appendChild(renderer.domElement);
	renderer.render(scene, camera);
};

init();

//ブイルド、ワイド、ロテーション
