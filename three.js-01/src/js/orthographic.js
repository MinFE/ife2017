/**
 * @desc init模块
 * @author minfive
 * @date 2017-02-27
 * @lastModify minfive
 * @lastDate 2017-02-27
 * @github https://github.com/Mrminfive
 */

import createCanvas from './createCanvas';
import * as THREE from 'three';

export default function() {
	let 
		renderer = new THREE.WebGLRenderer({
			canvas: createCanvas('page-main')
		}),
		scene = new THREE.Scene(),
		camera = new THREE.OrthographicCamera(-1, 2, 1.5, -1.5, 1, 10);

	renderer.setClearColor(0x000000);
	camera.position.set(0, 0, 5);
	scene.add(camera);

	let cube = new THREE.Mesh(
		new THREE.CubeGeometry(1, 2, 3),
		new THREE.MeshBasicMaterial({
			color: 0xff0000,
			wireframe: true
		})
	);

	scene.add(cube);

	renderer.render(scene, camera);
}