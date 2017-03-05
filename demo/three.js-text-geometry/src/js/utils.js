/**
 * @desc 工具集
 * @author minfive
 * @date 2017-03-05
 * @lastModify minfive
 * @lastDate 2017-03-05
 * @github https://github.com/Mrminfive
 * @param {String} proportion: 要创建canvas的父级id
 * @return {DOM} 创建的canvas
 */

import * as THREE from 'three';

/**
 * @desc 画直线
 * @author minfive
 * @date 2017-03-05
 * @lastModify minfive
 * @lastDate 2017-03-05
 * @param {Array} start: 线条的起点
 * @param {Array} end: 线条的终点
 * @param {Object} material: 线条的材质配置
 * @return {THREE.Line} THREE.js中的线实例
 */

export function drawLine(start, end, material) {
	let
		geo = new THREE.Geometry(),
		mat = new THREE.LineBasicMaterial(material);

	geo.vertices.push(new THREE.Vector3(...start));
	geo.vertices.push(new THREE.Vector3(...end));

	return new THREE.Line(geo, mat);
}

export default {
	drawLine
}