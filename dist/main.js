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
        filename: 'TextStyle+App.swift'
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
        var kerning = Math.round(textStyle.letterSpacing * 100) / 100;
        code += space(8) + `style.kerning = ${kerning}\n`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhNmYwNmIwMmExOWU4ZjliNzEzMSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMuanMiXSwibmFtZXMiOlsibGF5ZXIiLCJjb250ZXh0Iiwic2VsZWN0ZWRMYXllciIsIm5hbWUiLCJzY3JlZW4iLCJzZWxlY3RlZFZlcnNpb24iLCJzZWxlY3RlZFNjcmVlbiIsImNvbXBvbmVudCIsInNlbGVjdGVkQ29tcG9uZW50Iiwic3R5bGVndWlkZUNvbG9ycyIsImNvbG9ycyIsInN0eWxlZ3VpZGVUZXh0U3R5bGVzIiwidGV4dFN0eWxlcyIsInN0eWxlcyIsIm1hcCIsInByb2plY3QiLCJ0ZXh0U3R5bGUiLCJjb2RlIiwic29ydCIsImNvbXBhcmVTdHlsZXMiLCJqb2luIiwibGFuZ3VhZ2UiLCJmaWxlbmFtZSIsImV4cG9ydFN0eWxlZ3VpZGVDb2xvcnMiLCJleHBvcnRTdHlsZWd1aWRlVGV4dFN0eWxlcyIsImNvbW1lbnQiLCJ0ZXh0Iiwic3R5bGUiLCJzcGFjZSIsImNhbWVsaXplIiwiZm9udE5hbWUiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJ3ZWlnaHRUZXh0IiwibGV0dGVyU3BhY2luZyIsInVuZGVmaW5lZCIsImtlcm5pbmciLCJNYXRoIiwicm91bmQiLCJwcm9qZWN0Q29sb3IiLCJmaW5kQ29sb3JFcXVhbCIsImNvbG9yIiwiciIsImciLCJiIiwiYSIsInRleHRBbGlnbiIsImFsaWdubWVudCIsImxpbmVIZWlnaHQiLCJudW1iZXIiLCJyZXBlYXQiLCJzdGFydHNXaXRoIiwic3RyaW5nIiwicmVwbGFjZSIsIndvcmQiLCJpbmRleCIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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MUIsSUFBVCxDQUFqRDtBQUNIOztBQUVELFNBQVM0QyxTQUFULENBQW1CRCxTQUFuQixFQUE4QjtBQUMxQixXQUFPQSxhQUFjLFNBQWQsR0FBMEIsV0FBMUIsR0FBdUNBLFNBQTlDO0FBQ0g7O0FBRUQsU0FBU2pCLFFBQVQsQ0FBa0J1QixNQUFsQixFQUEwQjtBQUN0QixXQUFPQSxPQUFPQyxPQUFQLENBQWUscUJBQWYsRUFBc0MsVUFBU0MsSUFBVCxFQUFlQyxLQUFmLEVBQXNCO0FBQ2pFLGVBQU9BLFNBQVMsQ0FBVCxHQUFhRCxLQUFLRSxXQUFMLEVBQWIsR0FBa0NGLEtBQUtHLFdBQUwsRUFBekM7QUFDRCxLQUZNLEVBRUpKLE9BRkksQ0FFSSxNQUZKLEVBRVksRUFGWixDQUFQO0FBR0g7O2tCQUVjO0FBQ1gxQixTQURXO0FBRVhSLGlCQUZXO0FBR1hTO0FBSFcsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZXh0ZW5zaW9uXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImV4dGVuc2lvblwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGE2ZjA2YjAyYTE5ZThmOWI3MTMxIiwiLyoqXG4gKiBFeHBvcnQgZnVuY3Rpb25zIHlvdSB3YW50IHRvIHdvcmsgd2l0aCwgc2VlIGRvY3VtZW50YXRpb24gZm9yIGRldGFpbHM6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vemVwbGluL3plcGxpbi1leHRlbnNpb24tZG9jdW1lbnRhdGlvblxuICovXG5cbiBpbXBvcnQge1xuICAgIHN0eWxlLFxuICAgIGNvbXBhcmVTdHlsZXMsXG4gICAgc3BhY2VcbiB9IGZyb20gJy4vaGVscGVycyc7XG5cbmZ1bmN0aW9uIGxheWVyKGNvbnRleHQsIHNlbGVjdGVkTGF5ZXIpIHtcbiAgICByZXR1cm4gYEhlbGxvICR7bGF5ZXIubmFtZX0uYDtcbn1cblxuZnVuY3Rpb24gc2NyZWVuKGNvbnRleHQsIHNlbGVjdGVkVmVyc2lvbiwgc2VsZWN0ZWRTY3JlZW4pIHtcblxufVxuXG5mdW5jdGlvbiBjb21wb25lbnQoY29udGV4dCwgc2VsZWN0ZWRWZXJzaW9uLCBzZWxlY3RlZENvbXBvbmVudCkge1xuXG59XG5cbmZ1bmN0aW9uIHN0eWxlZ3VpZGVDb2xvcnMoY29udGV4dCwgY29sb3JzKSB7XG4gICAgXG59XG5cbmZ1bmN0aW9uIHN0eWxlZ3VpZGVUZXh0U3R5bGVzKGNvbnRleHQsIHRleHRTdHlsZXMpIHtcbiAgICB2YXIgc3R5bGVzID0gdGV4dFN0eWxlcy5tYXAodGV4dFN0eWxlID0+IGAke3N0eWxlKGNvbnRleHQucHJvamVjdCwgdGV4dFN0eWxlKX1gKVxuICAgIHZhciBjb2RlID0gYFxuZXh0ZW5zaW9uIFRleHRTdHlsZSB7XG5cbiAgICAke3N0eWxlcy5zb3J0KGNvbXBhcmVTdHlsZXMpLmpvaW4oYFxcblxcbmAgKyBzcGFjZSg0KSl9XG59YDtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICBsYW5ndWFnZTogJ3N3aWZ0JyxcbiAgICAgICAgZmlsZW5hbWU6ICdUZXh0U3R5bGUrQXBwLnN3aWZ0JyxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBleHBvcnRTdHlsZWd1aWRlQ29sb3JzKGNvbnRleHQsIGNvbG9ycykge1xuXG59XG5cbmZ1bmN0aW9uIGV4cG9ydFN0eWxlZ3VpZGVUZXh0U3R5bGVzKGNvbnRleHQsIHRleHRTdHlsZXMpIHtcbiAgICByZXR1cm4gc3R5bGVndWlkZVRleHRTdHlsZXMoY29udGV4dCwgdGV4dFN0eWxlcylcbn1cblxuZnVuY3Rpb24gY29tbWVudChjb250ZXh0LCB0ZXh0KSB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGxheWVyLFxuICAgIHNjcmVlbixcbiAgICBjb21wb25lbnQsXG4gICAgc3R5bGVndWlkZUNvbG9ycyxcbiAgICBzdHlsZWd1aWRlVGV4dFN0eWxlcyxcbiAgICBleHBvcnRTdHlsZWd1aWRlQ29sb3JzLFxuICAgIGV4cG9ydFN0eWxlZ3VpZGVUZXh0U3R5bGVzLFxuICAgIGNvbW1lbnRcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJleHBvcnQgZnVuY3Rpb24gc3R5bGUocHJvamVjdCwgdGV4dFN0eWxlKSB7XG4gICAgdmFyIGNvZGUgPSBgc3RhdGljIGxldCAke2NhbWVsaXplKHRleHRTdHlsZS5uYW1lKX06IFRleHRTdHlsZSA9IHtcbiAgICAgICAgbGV0IHN0eWxlID0gVGV4dFN0eWxlKClcbiAgICAgICAgc3R5bGUuZm9udCA9IC4ke2ZvbnROYW1lKHRleHRTdHlsZS5mb250RmFtaWx5KX0ob2ZTaXplOiAke3RleHRTdHlsZS5mb250U2l6ZX0sIHdlaWdodDogLiR7dGV4dFN0eWxlLndlaWdodFRleHR9KVxcbmBcbiAgICBpZiAodGV4dFN0eWxlLmxldHRlclNwYWNpbmcgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBrZXJuaW5nID0gTWF0aC5yb3VuZCh0ZXh0U3R5bGUubGV0dGVyU3BhY2luZyAqIDEwMCkgLyAxMDBcbiAgICAgICAgY29kZSArPSBzcGFjZSg4KSArIGBzdHlsZS5rZXJuaW5nID0gJHtrZXJuaW5nfVxcbmBcbiAgICB9XG4gICAgdmFyIHByb2plY3RDb2xvciA9IHByb2plY3QuZmluZENvbG9yRXF1YWwodGV4dFN0eWxlLmNvbG9yKVxuICAgIGlmIChwcm9qZWN0Q29sb3IgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvZGUgKz0gc3BhY2UoOCkgKyBgc3R5bGUuY29sb3IgPSAuaW5pdChyZWQ6ICR7dGV4dFN0eWxlLmNvbG9yLnJ9IC8gMjU1LCBncmVlbjogJHt0ZXh0U3R5bGUuY29sb3IuZ30gLyAyNTUsIGJsdWU6ICR7dGV4dFN0eWxlLmNvbG9yLmJ9IC8gMjU1LCBhbHBoYTogJHt0ZXh0U3R5bGUuY29sb3IuYX0pXFxuYFxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvZGUgKz0gc3BhY2UoOCkgKyBgc3R5bGUuY29sb3IgPSAuJHtwcm9qZWN0Q29sb3IubmFtZX1cXG5gXG4gICAgfVxuICAgIGlmICh0ZXh0U3R5bGUudGV4dEFsaWduICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2RlICs9IHNwYWNlKDgpICsgYHN0eWxlLmFsaWdubWVudCA9IC4ke2FsaWdubWVudCh0ZXh0U3R5bGUudGV4dEFsaWduKX1cXG5gXG4gICAgfVxuICAgIGlmICh0ZXh0U3R5bGUubGluZUhlaWdodCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29kZSArPSBzcGFjZSg4KSArIGBzdHlsZS5saW5lSGVpZ2h0ID0gJHt0ZXh0U3R5bGUubGluZUhlaWdodH1cXG5gXG4gICAgfVxuICAgIGNvZGUgKz0gc3BhY2UoOCkgKyBgcmV0dXJuIHN0eWxlXG4gICAgfSgpYFxuICAgIHJldHVybiBjb2RlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlU3R5bGVzKGEsIGIpIHtcbiAgICBpZiAoYS5uYW1lIDwgYi5uYW1lKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgaWYgKGEubmFtZSA+IGIubmFtZSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGFjZShudW1iZXIpIHtcbiAgICByZXR1cm4gYCBgLnJlcGVhdChudW1iZXIpXG59XG5cbmZ1bmN0aW9uIGZvbnROYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS5zdGFydHNXaXRoKCdTRlBybycpID8gYHN5c3RlbUZvbnRgIDogY2FtZWxpemUobmFtZSlcbn1cblxuZnVuY3Rpb24gYWxpZ25tZW50KHRleHRBbGlnbikge1xuICAgIHJldHVybiB0ZXh0QWxpZ24gPT0gYGp1c3RpZnlgID8gYGp1c3RpZmllZGAgOiB0ZXh0QWxpZ25cbn1cblxuZnVuY3Rpb24gY2FtZWxpemUoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oPzpeXFx3fFtBLVpdfFxcYlxcdykvZywgZnVuY3Rpb24od29yZCwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBpbmRleCA9PSAwID8gd29yZC50b0xvd2VyQ2FzZSgpIDogd29yZC50b1VwcGVyQ2FzZSgpO1xuICAgIH0pLnJlcGxhY2UoL1xccysvZywgJycpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgc3R5bGUsXG4gICAgY29tcGFyZVN0eWxlcyxcbiAgICBzcGFjZVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGVscGVycy5qcyJdLCJzb3VyY2VSb290IjoiIn0=