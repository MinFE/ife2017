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

export default function() {
	let 
		canvas = createCanvas('page-main'),
		renderer = new THREE.WebGLRenderer({ canvas }),
		scene = new THREE.Scene(),
		proportion = canvas.width / canvas.height,
		camera = new THREE.PerspectiveCamera(60, proportion, 1, 20),
		loader = new THREE.FontLoader();

	renderer.setClearColor(0x000000);
	camera.position.set(3, 3, 6);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camera);
	
	// 画坐标系
	drawCoordinate(scene);

	// let cube = new THREE.Mesh(
	// 	new THREE.TorusKnotGeometry(4, 1, 32, 10), // 圆环结
	// 	new THREE.MeshBasicMaterial({
	// 		color: 0xff00f0,
	// 		wireframe: true
	// 	})
	// );

	// scene.add(cube);

	loader.load('../static/optimer_regular.typeface.json', (font) => {
		let mesh = new THREE.Mesh(
			new THREE.TextGeometry('Hello', {
				font: font,
				size: 1,
				height: 1
			}),
			new THREE.MeshBasicMaterial({
				color: 0xff00f0,
				wireframe: true
			})
		);

		scene.add(mesh);

		renderer.render(scene, camera);
	});
}