/*! <author: minfive; github: https://github.com/Mrminfive> */
webpackJsonp([0,2],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var renderer = new THREE.WebGLRenderer({
		canvas: (0, _createCanvas2.default)('page-main')
	}),
	    scene = new THREE.Scene(),
	    camera = new THREE.OrthographicCamera(-1, 2, 1.5, -1.5, 1, 10);

	renderer.setClearColor(0x000000);
	camera.position.set(0, 0, 5);
	scene.add(camera);

	var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3), new THREE.MeshBasicMaterial({
		color: 0xff0000,
		wireframe: true
	}));

	scene.add(cube);

	renderer.render(scene, camera);
};

var _createCanvas = __webpack_require__(3);

var _createCanvas2 = _interopRequireDefault(_createCanvas);

var _three = __webpack_require__(2);

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (id) {
  var box = null == id ? document.body : document.getElementById(id),
      canvas = document.createElement('canvas');

  canvas.style.backgroundColor = '#fff';
  canvas.setAttribute('width', Math.floor(box.clientWidth));
  canvas.setAttribute('height', Math.floor(box.clientHeight));

  return box.appendChild(canvas);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _style = __webpack_require__(1);

var _style2 = _interopRequireDefault(_style);

var _orthographic = __webpack_require__(0);

var _orthographic2 = _interopRequireDefault(_orthographic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.body.onload = (0, _orthographic2.default)();

/***/ })
],[4]);