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
		camera = new THREE.PerspectiveCamera(60, proportion, 1, 20);

	renderer.setClearColor(0x000000);
	camera.position.set(6, 6, 6);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camera);
	
	// 画坐标系
	drawCoordinate(scene);

	let cube = new THREE.Mesh(
		// new THREE.BoxGeometry(1, 1, 1, 2, 2, 2), // 方体
		// new THREE.PlaneGeometry(1, 1, 4, 4), // 方形
		// new THREE.SphereGeometry(3, 10, 12, Math.PI, Math.PI / 12), // 球体
		// new THREE.CircleGeometry(3, 18), // 圆形
		// new THREE.CylinderGeometry(3, 4, 4, 10, 20, false), // 圆柱体
		// new THREE.TetrahedronGeometry(3), // 正四面体
		// new THREE.OctahedronGeometry(3), // 正八面体
		// new THREE.IcosahedronGeometry(3), // 正十二面体
		// new THREE.TorusGeometry(4, 1, 40, 60, Math.PI * 2), // 圆环面
		new THREE.TorusKnotGeometry(4, 1, 32, 10), // 圆环结
		new THREE.MeshBasicMaterial({
			color: 0xff00f0,
			wireframe: true
		})
	);

	scene.add(cube);

	renderer.render(scene, camera);
}