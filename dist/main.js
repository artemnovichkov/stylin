(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["extension"] = factory();
	else
		root["extension"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _helpers = __webpack_require__(1);

function layer(context, selectedLayer) {
    return `Hello ${layer.name}.`;
} /**
   * Export functions you want to work with, see documentation for details:
   * https://github.com/zeplin/zeplin-extension-documentation
   */

function screen(context, selectedVersion, selectedScreen) {}

function component(context, selectedVersion, selectedComponent) {}

function styleguideColors(context, colors) {}

function styleguideTextStyles(context, textStyles) {
    var styles = textStyles.map(function (textStyle) {
        return `${(0, _helpers.style)(context.project, textStyle)}`;
    });
    var code = `
extension TextStyle {

    ${styles.sort(_helpers.compareStyles).join(`\n\n` + (0, _helpers.space)(4))}
}`;
    return {
        code: code,
        language: 'swift',
        filename: 'TextStyle+App'
    };
}

function exportStyleguideColors(context, colors) {}

function exportStyleguideTextStyles(context, textStyles) {
    return styleguideTextStyles(context, textStyles);
}

function comment(context, text) {}

exports.default = {
    layer,
    screen,
    component,
    styleguideColors,
    styleguideTextStyles,
    exportStyleguideColors,
    exportStyleguideTextStyles,
    comment
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.style = style;
exports.compareStyles = compareStyles;
exports.space = space;
function style(project, textStyle) {
    var code = `static let ${camelize(textStyle.name)}: TextStyle = {
        let style = TextStyle()
        style.font = .${fontName(textStyle.fontFamily)}(ofSize: ${textStyle.fontSize}, weight: .${textStyle.weightText})\n`;
    if (textStyle.letterSpacing != undefined) {
        code += space(8) + `style.kerning = ${textStyle.letterSpacing}\n`;
    }
    var projectColor = project.findColorEqual(textStyle.color);
    if (projectColor == undefined) {
        code += space(8) + `style.color = .init(red: ${textStyle.color.r} / 255, green: ${textStyle.color.g} / 255, blue: ${textStyle.color.b} / 255, alpha: ${textStyle.color.a})\n`;
    } else {
        code += space(8) + `style.color = .${projectColor.name}\n`;
    }
    if (textStyle.textAlign != undefined) {
        code += space(8) + `style.alignment = .${alignment(textStyle.textAlign)}\n`;
    }
    if (textStyle.lineHeight != undefined) {
        code += space(8) + `style.lineHeight = ${textStyle.lineHeight}\n`;
    }
    code += space(8) + `return style
    }()`;
    return code;
}

function compareStyles(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

function space(number) {
    return ` `.repeat(number);
}

function fontName(name) {
    return name.startsWith('SFPro') ? `systemFont` : camelize(name);
}

function alignment(textAlign) {
    return textAlign == `justify` ? `justified` : textAlign;
}

function camelize(string) {
    return string.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

exports.default = {
    style,
    compareStyles,
    space
};

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5M2ZlNmEyMDExODNlZTEyM2NhYiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMuanMiXSwibmFtZXMiOlsibGF5ZXIiLCJjb250ZXh0Iiwic2VsZWN0ZWRMYXllciIsIm5hbWUiLCJzY3JlZW4iLCJzZWxlY3RlZFZlcnNpb24iLCJzZWxlY3RlZFNjcmVlbiIsImNvbXBvbmVudCIsInNlbGVjdGVkQ29tcG9uZW50Iiwic3R5bGVndWlkZUNvbG9ycyIsImNvbG9ycyIsInN0eWxlZ3VpZGVUZXh0U3R5bGVzIiwidGV4dFN0eWxlcyIsInN0eWxlcyIsIm1hcCIsInByb2plY3QiLCJ0ZXh0U3R5bGUiLCJjb2RlIiwic29ydCIsImNvbXBhcmVTdHlsZXMiLCJqb2luIiwibGFuZ3VhZ2UiLCJmaWxlbmFtZSIsImV4cG9ydFN0eWxlZ3VpZGVDb2xvcnMiLCJleHBvcnRTdHlsZWd1aWRlVGV4dFN0eWxlcyIsImNvbW1lbnQiLCJ0ZXh0Iiwic3R5bGUiLCJzcGFjZSIsImNhbWVsaXplIiwiZm9udE5hbWUiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJ3ZWlnaHRUZXh0IiwibGV0dGVyU3BhY2luZyIsInVuZGVmaW5lZCIsInByb2plY3RDb2xvciIsImZpbmRDb2xvckVxdWFsIiwiY29sb3IiLCJyIiwiZyIsImIiLCJhIiwidGV4dEFsaWduIiwiYWxpZ25tZW50IiwibGluZUhlaWdodCIsIm51bWJlciIsInJlcGVhdCIsInN0YXJ0c1dpdGgiLCJzdHJpbmciLCJyZXBsYWNlIiwid29yZCIsImluZGV4IiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNE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LEdBQXVDQSxTQUE5QztBQUNIOztBQUVELFNBQVNkLFFBQVQsQ0FBa0JvQixNQUFsQixFQUEwQjtBQUN0QixXQUFPQSxPQUFPQyxPQUFQLENBQWUscUJBQWYsRUFBc0MsVUFBU0MsSUFBVCxFQUFlQyxLQUFmLEVBQXNCO0FBQ2pFLGVBQU9BLFNBQVMsQ0FBVCxHQUFhRCxLQUFLRSxXQUFMLEVBQWIsR0FBa0NGLEtBQUtHLFdBQUwsRUFBekM7QUFDRCxLQUZNLEVBRUpKLE9BRkksQ0FFSSxNQUZKLEVBRVksRUFGWixDQUFQO0FBR0g7O2tCQUVjO0FBQ1h2QixTQURXO0FBRVhSLGlCQUZXO0FBR1hTO0FBSFcsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZXh0ZW5zaW9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImV4dGVuc2lvblwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDkzZmU2YTIwMTE4M2VlMTIzY2FiIiwiLyoqXG4gKiBFeHBvcnQgZnVuY3Rpb25zIHlvdSB3YW50IHRvIHdvcmsgd2l0aCwgc2VlIGRvY3VtZW50YXRpb24gZm9yIGRldGFpbHM6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vemVwbGluL3plcGxpbi1leHRlbnNpb24tZG9jdW1lbnRhdGlvblxuICovXG5cbiBpbXBvcnQge1xuICAgIHN0eWxlLFxuICAgIGNvbXBhcmVTdHlsZXMsXG4gICAgc3BhY2VcbiB9IGZyb20gJy4vaGVscGVycyc7XG5cbmZ1bmN0aW9uIGxheWVyKGNvbnRleHQsIHNlbGVjdGVkTGF5ZXIpIHtcbiAgICByZXR1cm4gYEhlbGxvICR7bGF5ZXIubmFtZX0uYDtcbn1cblxuZnVuY3Rpb24gc2NyZWVuKGNvbnRleHQsIHNlbGVjdGVkVmVyc2lvbiwgc2VsZWN0ZWRTY3JlZW4pIHtcblxufVxuXG5mdW5jdGlvbiBjb21wb25lbnQoY29udGV4dCwgc2VsZWN0ZWRWZXJzaW9uLCBzZWxlY3RlZENvbXBvbmVudCkge1xuXG59XG5cbmZ1bmN0aW9uIHN0eWxlZ3VpZGVDb2xvcnMoY29udGV4dCwgY29sb3JzKSB7XG4gICAgXG59XG5cbmZ1bmN0aW9uIHN0eWxlZ3VpZGVUZXh0U3R5bGVzKGNvbnRleHQsIHRleHRTdHlsZXMpIHtcbiAgICB2YXIgc3R5bGVzID0gdGV4dFN0eWxlcy5tYXAodGV4dFN0eWxlID0+IGAke3N0eWxlKGNvbnRleHQucHJvamVjdCwgdGV4dFN0eWxlKX1gKVxuICAgIHZhciBjb2RlID0gYFxuZXh0ZW5zaW9uIFRleHRTdHlsZSB7XG5cbiAgICAke3N0eWxlcy5zb3J0KGNvbXBhcmVTdHlsZXMpLmpvaW4oYFxcblxcbmAgKyBzcGFjZSg0KSl9XG59YDtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICBsYW5ndWFnZTogJ3N3aWZ0JyxcbiAgICAgICAgZmlsZW5hbWU6ICdUZXh0U3R5bGUrQXBwJyxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBleHBvcnRTdHlsZWd1aWRlQ29sb3JzKGNvbnRleHQsIGNvbG9ycykge1xuXG59XG5cbmZ1bmN0aW9uIGV4cG9ydFN0eWxlZ3VpZGVUZXh0U3R5bGVzKGNvbnRleHQsIHRleHRTdHlsZXMpIHtcbiAgICByZXR1cm4gc3R5bGVndWlkZVRleHRTdHlsZXMoY29udGV4dCwgdGV4dFN0eWxlcylcbn1cblxuZnVuY3Rpb24gY29tbWVudChjb250ZXh0LCB0ZXh0KSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGxheWVyLFxuICAgIHNjcmVlbixcbiAgICBjb21wb25lbnQsXG4gICAgc3R5bGVndWlkZUNvbG9ycyxcbiAgICBzdHlsZWd1aWRlVGV4dFN0eWxlcyxcbiAgICBleHBvcnRTdHlsZWd1aWRlQ29sb3JzLFxuICAgIGV4cG9ydFN0eWxlZ3VpZGVUZXh0U3R5bGVzLFxuICAgIGNvbW1lbnRcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJleHBvcnQgZnVuY3Rpb24gc3R5bGUocHJvamVjdCwgdGV4dFN0eWxlKSB7XG4gICAgdmFyIGNvZGUgPSBgc3RhdGljIGxldCAke2NhbWVsaXplKHRleHRTdHlsZS5uYW1lKX06IFRleHRTdHlsZSA9IHtcbiAgICAgICAgbGV0IHN0eWxlID0gVGV4dFN0eWxlKClcbiAgICAgICAgc3R5bGUuZm9udCA9IC4ke2ZvbnROYW1lKHRleHRTdHlsZS5mb250RmFtaWx5KX0ob2ZTaXplOiAke3RleHRTdHlsZS5mb250U2l6ZX0sIHdlaWdodDogLiR7dGV4dFN0eWxlLndlaWdodFRleHR9KVxcbmBcbiAgICBpZiAodGV4dFN0eWxlLmxldHRlclNwYWNpbmcgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvZGUgKz0gc3BhY2UoOCkgKyBgc3R5bGUua2VybmluZyA9ICR7dGV4dFN0eWxlLmxldHRlclNwYWNpbmd9XFxuYFxuICAgIH1cbiAgICB2YXIgcHJvamVjdENvbG9yID0gcHJvamVjdC5maW5kQ29sb3JFcXVhbCh0ZXh0U3R5bGUuY29sb3IpXG4gICAgaWYgKHByb2plY3RDb2xvciA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29kZSArPSBzcGFjZSg4KSArIGBzdHlsZS5jb2xvciA9IC5pbml0KHJlZDogJHt0ZXh0U3R5bGUuY29sb3Iucn0gLyAyNTUsIGdyZWVuOiAke3RleHRTdHlsZS5jb2xvci5nfSAvIDI1NSwgYmx1ZTogJHt0ZXh0U3R5bGUuY29sb3IuYn0gLyAyNTUsIGFscGhhOiAke3RleHRTdHlsZS5jb2xvci5hfSlcXG5gXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29kZSArPSBzcGFjZSg4KSArIGBzdHlsZS5jb2xvciA9IC4ke3Byb2plY3RDb2xvci5uYW1lfVxcbmBcbiAgICB9XG4gICAgaWYgKHRleHRTdHlsZS50ZXh0QWxpZ24gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvZGUgKz0gc3BhY2UoOCkgKyBgc3R5bGUuYWxpZ25tZW50ID0gLiR7YWxpZ25tZW50KHRleHRTdHlsZS50ZXh0QWxpZ24pfVxcbmBcbiAgICB9XG4gICAgaWYgKHRleHRTdHlsZS5saW5lSGVpZ2h0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2RlICs9IHNwYWNlKDgpICsgYHN0eWxlLmxpbmVIZWlnaHQgPSAke3RleHRTdHlsZS5saW5lSGVpZ2h0fVxcbmBcbiAgICB9XG4gICAgY29kZSArPSBzcGFjZSg4KSArIGByZXR1cm4gc3R5bGVcbiAgICB9KClgXG4gICAgcmV0dXJuIGNvZGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVTdHlsZXMoYSwgYikge1xuICAgIGlmIChhLm5hbWUgPCBiLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBpZiAoYS5uYW1lID4gYi5uYW1lKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwYWNlKG51bWJlcikge1xuICAgIHJldHVybiBgIGAucmVwZWF0KG51bWJlcilcbn1cblxuZnVuY3Rpb24gZm9udE5hbWUobmFtZSkge1xuICAgIHJldHVybiBuYW1lLnN0YXJ0c1dpdGgoJ1NGUHJvJykgPyBgc3lzdGVtRm9udGAgOiBjYW1lbGl6ZShuYW1lKVxufVxuXG5mdW5jdGlvbiBhbGlnbm1lbnQodGV4dEFsaWduKSB7XG4gICAgcmV0dXJuIHRleHRBbGlnbiA9PSBganVzdGlmeWAgPyBganVzdGlmaWVkYCA6IHRleHRBbGlnblxufVxuXG5mdW5jdGlvbiBjYW1lbGl6ZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyg/Ol5cXHd8W0EtWl18XFxiXFx3KS9nLCBmdW5jdGlvbih3b3JkLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGluZGV4ID09IDAgPyB3b3JkLnRvTG93ZXJDYXNlKCkgOiB3b3JkLnRvVXBwZXJDYXNlKCk7XG4gICAgfSkucmVwbGFjZSgvXFxzKy9nLCAnJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBzdHlsZSxcbiAgICBjb21wYXJlU3R5bGVzLFxuICAgIHNwYWNlXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWxwZXJzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==