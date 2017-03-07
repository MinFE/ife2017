/**
 * @desc init模块
 * @author minfive
 * @date 2017-02-27
 * @lastModify minfive
 * @lastDate 2017-02-27
 * @github https://github.com/Mrminfive
 */

import createCanvas from './create-canvas';
import { drawLine } from './utils';
import * as THREE from 'three';
import Stats from 'Static/lib/stats';

// 画坐标系
function drawCoordinate(scene) {
	let lines = [
		// x轴
		drawLine([0, 0, 0], [6, 0, 0], { color: 0xff0000 }),
		drawLine([0, 0, 0], [-6, 0, 0], { color: 0xff0000 }),
		// y轴
		drawLine([0, 0, 0], [0, 6, 0], { color: 0x00ff00 }),
		drawLine([0, 0, 0], [0, -6, 0], { color: 0x00ff00 }),
		// z轴
		drawLine([0, 0, 0], [0, 0, 6], { color: 0xffffff }),
		drawLine([0, 0, 0], [0, 0, -6], { color: 0xffffff })
	];

	lines.forEach((line) => scene.add(line));
}

// FPS面板
function fpsPanel(parentId) {
	let stat = new Stats();

	Object.assign(stat.domElement.style, {
		position: 'absolute',
		right: '0px',
		left: '0px'
	})

	document.getElementById(parentId).appendChild(stat.domElement);

	return stat;
}

async function imgTexture(src) {
	return new Promise((resolve, reject) => {
		let texture = THREE.ImageUtils.loadTexture(src, {}, () => {
			resolve(texture);
		});
	});
}

export default function() {
	let 
		canvas = createCanvas('page-main'),
		fpsStat = fpsPanel('page-main'), // 新增 fps 面板
		renderer = new THREE.WebGLRenderer({ canvas }),
		scene = new THREE.Scene(),
		proportion = canvas.width / canvas.height,
		camera = new THREE.PerspectiveCamera(60, proportion, 1, 10),
		loader = new THREE.FontLoader(),
		light = new THREE.DirectionalLight(),
		light2 = new THREE.PointLight(0xffffff);

	renderer.setClearColor(0x000000);
	camera.position.set(3, 3, 6);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camera);

	// 光源
	light.position.set(3, 3, 6);
	scene.add(light);
	light2.position.set(3, 3, -6);
	// scene.add(light2);
	// 画坐标系
	drawCoordinate(scene);

	initMesh()
		.then(([ballMesh, planeMesh]) => {
			planeMesh.rotation.x = -Math.PI / 2;
			planeMesh.position.y = -3;

			scene.add(ballMesh);
			scene.add(planeMesh);

			renderer.render(scene, camera);

			requestAnimationFrame(draw.bind(null, ballMesh));
		});

	function draw(ballMesh) {
		fpsStat.begin();
		ballMesh.rotation.x = (ballMesh.rotation.x + 0.01) % (Math.PI * 2);
		ballMesh.rotation.y = (ballMesh.rotation.y + 0.02) % (Math.PI * 2);
		ballMesh.rotation.z = (ballMesh.rotation.z + 0.03) % (Math.PI * 2);
		renderer.render(scene, camera);

		fpsStat.end();
		requestAnimationFrame(draw.bind(null, ballMesh));
	}

	async function initMesh() {
		let 
			ballImgTexture = await imgTexture('../static/images/user.jpg'),
			planeImgTexture = await imgTexture('../static/images/chess.png');

		ballImgTexture.wrapS = ballImgTexture.wrapT = THREE.RepeatWrapping;
		ballImgTexture.repeat.set(4, 4);

		planeImgTexture.wrapS = planeImgTexture.wrapT = THREE.RepeatWrapping;
		planeImgTexture.repeat.set(6, 6);

		let 
			ballMesh = new THREE.Mesh(
				new THREE.SphereGeometry(3, 100, 100),
				// new THREE.MeshLambertMaterial({
				// 	color: 0xffff00
				// }) // 漫反射材质
				// new THREE.MeshPhongMaterial({
				// 	color: 0xff0000,
				// 	specykar: 0xff0000,
				// 	shininess: 100
				// }) // 镜面反射材质
				// new THREE.MeshNormalMaterial() // 法向材质
				new THREE.MeshLambertMaterial({
					map: ballImgTexture
				})
			),
			planeMesh = new THREE.Mesh(
				new THREE.PlaneGeometry(6, 6),
				new THREE.MeshLambertMaterial({
					map: planeImgTexture
				})
			);

		return [ballMesh, planeMesh];
	}
}