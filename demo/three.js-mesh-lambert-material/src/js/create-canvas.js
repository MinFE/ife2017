/**
 * @desc 创建canvas标签
 * @author minfive
 * @date 2017-02-27
 * @lastModify minfive
 * @lastDate 2017-02-27
 * @github https://github.com/Mrminfive
 * @param {String} id: 要创建canvas的父级id
 * @return {DOM} 创建的canvas
 */

export default function (id) {
	let 
		box = null == id 
			? document.body
			: document.getElementById(id),

		canvas = document.createElement('canvas');

	canvas.style.backgroundColor = '#fff';
	canvas.setAttribute('width', Math.floor(box.clientWidth));
	canvas.setAttribute('height', Math.floor(box.clientHeight));

	return box.appendChild(canvas);
}