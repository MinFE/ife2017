/**
 * @desc init模块
 * @author minfive
 * @date 2017-02-27
 * @lastModify minfive
 * @lastDate 2017-02-27
 * @github https://github.com/Mrminfive
 */

import createCanvas from './createCanvas';
import calculation from './calculation';
import * as THREE from 'three';

export default function() {
	let 
		canvas = createCanvas('page-main'),
		renderer = new THREE.WebGLRenderer({ canvas }),
		scene = new THREE.Scene(),
		proportion = canvas.width / canvas.height, // 视窗宽高比例
		camera = new THREE.OrthographicCamera(-4, 4, 2, -(8 / proportion - 2), 1, 10);

	renderer.setClearColor(0x000000);
	// camera.position.set(0, 0, 5);
	camera.position.set(4, -3, 5);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camera);

	let cube = new THREE.Mesh(
		new THREE.CubeGeometry(1, 1, 1),
		new THREE.MeshBasicMaterial({
			color: 0xff0000,
			wireframe: true
		})
	);

	scene.add(cube);

	renderer.render(scene, camera);
}