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
		let loader = new THREE.TextureLoader();
		loader.load(src, (texture) => {
			resolve(texture);
		});
	});
}

export default function() {
	const
		MAX_HEIGHT = 6, // 最高点
		ACCELERATION = -0.05, // 加速度
		BALL_RADIUS = 1, // 小球半径
		PLANE_WIDTH = 6, // 面板宽,
		PLANE_HEIGHT = 6; // 面板高

	let
		canvas = createCanvas('page-main'),
		fpsStat = fpsPanel('page-main'),
		renderer = new THREE.WebGLRenderer({ canvas }), // 渲染器
		scene = new THREE.Scene(), // 场景
		proportion = canvas.width / canvas.height,
		camera = new THREE.PerspectiveCamera(60, proportion, 1, 20), // 摄像机
		light = new THREE.DirectionalLight(0xffffff); // 灯光

	let
		timer = null, // 渲染进程id
		isMove = true, // 是否运动
		speed = 0, // 当前速度
		ballMesh, // 球素材
		planeMesh; // 面板素材

	// 初始化球素材
	async function initBallMesh(ballRadius, widthSegments, heightSegments) {
		let material = await imgTexture('../static/images/user.jpg');

		material.wrapS = material.wrapT = THREE.RepeatWrapping;
		material.repeat.set(8, 8);

		let mesh = new THREE.Mesh(
			new THREE.SphereGeometry(ballRadius, widthSegments, heightSegments),
			new THREE.MeshLambertMaterial({
				map: material
			})
		);

		mesh.position.y = MAX_HEIGHT;

		return mesh;
	}

	// 初始化面板素材
	async function initPlaneMesh(width, height) {
		let material = await imgTexture('../static/images/chess.png');

		material.wrapS = material.wrapT = THREE.RepeatWrapping;
		material.repeat.set(8, 8);

		let mesh = new THREE.Mesh(
			new THREE.PlaneGeometry(width, height),
			new THREE.MeshLambertMaterial({
				map: material
			})
		);

		mesh.rotation.x = -Math.PI / 2;

		return mesh;
	}

	// 布置
	async function setting() {
		renderer.setClearColor(0xffffff);

		light.position.set(3, 3, 9);
		scene.add(light);

		camera.position.set(3, 3, 9);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		scene.add(camera);

		ballMesh = await initBallMesh(BALL_RADIUS, 100, 100);
		planeMesh = await initPlaneMesh(PLANE_WIDTH, PLANE_HEIGHT);

		scene.add(ballMesh);
		scene.add(planeMesh);
		drawCoordinate(scene);
	}

	// 渲染
	function draw() {
		fpsStat.begin();

		if (isMove) {
			let newY = ballMesh.position.y + speed;
			speed += ACCELERATION;

			if (newY <= BALL_RADIUS) {
				speed = -speed * 0.85;
				newY = BALL_RADIUS;
			}

			if (Math.abs(speed) < 0.001) {
				isMove = false;
				newY = BALL_RADIUS;
			}

			ballMesh.position.y = newY;
		}

		renderer.render(scene, camera);
		timer = requestAnimationFrame(draw);

		fpsStat.end();
	}

	// 停止渲染
	function stop() {
		if (timer != null) {
			cancelAnimationFrame(timer);
			timer = null;
		}
	}

	setting()
		.then(() => {
			draw();
		})
		.catch((err) => {
			console.log(err);
		})
}