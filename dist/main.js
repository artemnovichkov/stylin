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

// New API

function container(context) {
    return context.styleguide == undefined ? context.project : context.styleguide;
} /**
   * Export functions you want to work with, see documentation for details:
   * https://github.com/zeplin/zeplin-extension-documentation
   */

function textStyles(context) {
    var textStylesContainer = container(context);
    var containerTextStyles = textStylesContainer.textStyles;
    var styles = containerTextStyles.map(function (textStyle) {
        return `${(0, _helpers.style)(textStyle, textStylesContainer)}`;
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

function exportTextStyles(context) {
    return textStyles(context);
}

// Deprecated API

function styleguideTextStyles(context, oldTextStyles) {
    var styles = oldTextStyles.map(function (textStyle) {
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

function exportStyleguideTextStyles(context, oldTextStyles) {
    return styleguideTextStyles(context, oldTextStyles);
}

exports.default = {
    textStyles,
    exportTextStyles,
    styleguideTextStyles,
    exportStyleguideTextStyles
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
function style(textStyle, container) {
    var code = `static let ${camelize(textStyle.name)}: TextStyle = {
        let style = TextStyle()
        style.font = .${fontName(textStyle.fontFamily)}(ofSize: ${textStyle.fontSize}, weight: .${textStyle.weightText})\n`;
    if (textStyle.letterSpacing != undefined) {
        var kerning = Math.round(textStyle.letterSpacing * 100) / 100;
        code += space(8) + `style.kerning = ${kerning}\n`;
    }
    var color = container.findColorEqual(textStyle.color);
    if (color == undefined) {
        code += space(8) + `style.color = .init(red: ${textStyle.color.r} / 255, green: ${textStyle.color.g} / 255, blue: ${textStyle.color.b} / 255, alpha: ${textStyle.color.a})\n`;
    } else {
        code += space(8) + `style.color = .${color.name}\n`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkMzdkZDM2YzIxODU2ZGI4YzZiYiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMuanMiXSwibmFtZXMiOlsiY29udGFpbmVyIiwiY29udGV4dCIsInN0eWxlZ3VpZGUiLCJ1bmRlZmluZWQiLCJwcm9qZWN0IiwidGV4dFN0eWxlcyIsInRleHRTdHlsZXNDb250YWluZXIiLCJjb250YWluZXJUZXh0U3R5bGVzIiwic3R5bGVzIiwibWFwIiwidGV4dFN0eWxlIiwiY29kZSIsInNvcnQiLCJjb21wYXJlU3R5bGVzIiwiam9pbiIsImxhbmd1YWdlIiwiZmlsZW5hbWUiLCJleHBvcnRUZXh0U3R5bGVzIiwic3R5bGVndWlkZVRleHRTdHlsZXMiLCJvbGRUZXh0U3R5bGVzIiwiZXhwb3J0U3R5bGVndWlkZVRleHRTdHlsZXMiLCJzdHlsZSIsInNwYWNlIiwiY2FtZWxpemUiLCJuYW1lIiwiZm9udE5hbWUiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJ3ZWlnaHRUZXh0IiwibGV0dGVyU3BhY2luZyIsImtlcm5pbmciLCJNYXRoIiwicm91bmQiLCJjb2xvciIsImZpbmRDb2xvckVxdWFsIiwiciIsImciLCJiIiwiYSIsInRleHRBbGlnbiIsImFsaWdubWVudCIsImxpbmVIZWlnaHQiLCJudW1iZXIiLCJyZXBlYXQiLCJzdGFydHNXaXRoIiwic3RyaW5nIiwicmVwbGFjZSIsIndvcmQiLCJpbmRleCIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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d0I7QUFDcEIsV0FBT0EsS0FBS29CLFVBQUwsQ0FBZ0IsT0FBaEIsSUFBNEIsWUFBNUIsR0FBMENyQixTQUFTQyxJQUFULENBQWpEO0FBQ0g7O0FBRUQsU0FBU2dCLFNBQVQsQ0FBbUJELFNBQW5CLEVBQThCO0FBQzFCLFdBQU9BLGFBQWMsU0FBZCxHQUEwQixXQUExQixHQUF1Q0EsU0FBOUM7QUFDSDs7QUFFRCxTQUFTaEIsUUFBVCxDQUFrQnNCLE1BQWxCLEVBQTBCO0FBQ3RCLFdBQU9BLE9BQU9DLE9BQVAsQ0FBZSxxQkFBZixFQUFzQyxVQUFTQyxJQUFULEVBQWVDLEtBQWYsRUFBc0I7QUFDakUsZUFBT0EsU0FBUyxDQUFULEdBQWFELEtBQUtFLFdBQUwsRUFBYixHQUFrQ0YsS0FBS0csV0FBTCxFQUF6QztBQUNELEtBRk0sRUFFSkosT0FGSSxDQUVJLE1BRkosRUFFWSxFQUZaLENBQVA7QUFHSDs7a0JBRWM7QUFDWHpCLFNBRFc7QUFFWFIsaUJBRlc7QUFHWFM7QUFIVyxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJleHRlbnNpb25cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZXh0ZW5zaW9uXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDM3ZGQzNmMyMTg1NmRiOGM2YmIiLCIvKipcbiAqIEV4cG9ydCBmdW5jdGlvbnMgeW91IHdhbnQgdG8gd29yayB3aXRoLCBzZWUgZG9jdW1lbnRhdGlvbiBmb3IgZGV0YWlsczpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS96ZXBsaW4vemVwbGluLWV4dGVuc2lvbi1kb2N1bWVudGF0aW9uXG4gKi9cblxuIGltcG9ydCB7XG4gICAgc3R5bGUsXG4gICAgY29tcGFyZVN0eWxlcyxcbiAgICBzcGFjZVxuIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuLy8gTmV3IEFQSVxuXG5mdW5jdGlvbiBjb250YWluZXIoY29udGV4dCkge1xuICAgIHJldHVybiBjb250ZXh0LnN0eWxlZ3VpZGUgPT0gdW5kZWZpbmVkID8gY29udGV4dC5wcm9qZWN0IDogY29udGV4dC5zdHlsZWd1aWRlO1xuICB9XG5cbmZ1bmN0aW9uIHRleHRTdHlsZXMoY29udGV4dCkge1xuICAgIGNvbnN0IHRleHRTdHlsZXNDb250YWluZXIgPSBjb250YWluZXIoY29udGV4dCk7XG4gICAgY29uc3QgY29udGFpbmVyVGV4dFN0eWxlcyA9IHRleHRTdHlsZXNDb250YWluZXIudGV4dFN0eWxlcztcbiAgICB2YXIgc3R5bGVzID0gY29udGFpbmVyVGV4dFN0eWxlcy5tYXAodGV4dFN0eWxlID0+IGAke3N0eWxlKHRleHRTdHlsZSwgdGV4dFN0eWxlc0NvbnRhaW5lcil9YClcbiAgICB2YXIgY29kZSA9IGBcbmV4dGVuc2lvbiBUZXh0U3R5bGUge1xuXG4gICAgJHtzdHlsZXMuc29ydChjb21wYXJlU3R5bGVzKS5qb2luKGBcXG5cXG5gICsgc3BhY2UoNCkpfVxufWA7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgbGFuZ3VhZ2U6ICdzd2lmdCcsXG4gICAgICAgIGZpbGVuYW1lOiAnVGV4dFN0eWxlK0FwcC5zd2lmdCcsXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZXhwb3J0VGV4dFN0eWxlcyhjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRleHRTdHlsZXMoY29udGV4dCk7XG59XG5cbi8vIERlcHJlY2F0ZWQgQVBJXG5cbiBmdW5jdGlvbiBzdHlsZWd1aWRlVGV4dFN0eWxlcyhjb250ZXh0LCBvbGRUZXh0U3R5bGVzKSB7XG4gICAgdmFyIHN0eWxlcyA9IG9sZFRleHRTdHlsZXMubWFwKHRleHRTdHlsZSA9PiBgJHtzdHlsZShjb250ZXh0LnByb2plY3QsIHRleHRTdHlsZSl9YClcbiAgICB2YXIgY29kZSA9IGBcbmV4dGVuc2lvbiBUZXh0U3R5bGUge1xuXG4gICAgJHtzdHlsZXMuc29ydChjb21wYXJlU3R5bGVzKS5qb2luKGBcXG5cXG5gICsgc3BhY2UoNCkpfVxufWA7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgbGFuZ3VhZ2U6ICdzd2lmdCcsXG4gICAgICAgIGZpbGVuYW1lOiAnVGV4dFN0eWxlK0FwcC5zd2lmdCcsXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZXhwb3J0U3R5bGVndWlkZVRleHRTdHlsZXMoY29udGV4dCwgb2xkVGV4dFN0eWxlcykge1xuICAgIHJldHVybiBzdHlsZWd1aWRlVGV4dFN0eWxlcyhjb250ZXh0LCBvbGRUZXh0U3R5bGVzKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgdGV4dFN0eWxlcyxcbiAgICBleHBvcnRUZXh0U3R5bGVzLFxuICAgIHN0eWxlZ3VpZGVUZXh0U3R5bGVzLFxuICAgIGV4cG9ydFN0eWxlZ3VpZGVUZXh0U3R5bGVzLFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImV4cG9ydCBmdW5jdGlvbiBzdHlsZSh0ZXh0U3R5bGUsIGNvbnRhaW5lcikge1xuICAgIHZhciBjb2RlID0gYHN0YXRpYyBsZXQgJHtjYW1lbGl6ZSh0ZXh0U3R5bGUubmFtZSl9OiBUZXh0U3R5bGUgPSB7XG4gICAgICAgIGxldCBzdHlsZSA9IFRleHRTdHlsZSgpXG4gICAgICAgIHN0eWxlLmZvbnQgPSAuJHtmb250TmFtZSh0ZXh0U3R5bGUuZm9udEZhbWlseSl9KG9mU2l6ZTogJHt0ZXh0U3R5bGUuZm9udFNpemV9LCB3ZWlnaHQ6IC4ke3RleHRTdHlsZS53ZWlnaHRUZXh0fSlcXG5gXG4gICAgaWYgKHRleHRTdHlsZS5sZXR0ZXJTcGFjaW5nICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIga2VybmluZyA9IE1hdGgucm91bmQodGV4dFN0eWxlLmxldHRlclNwYWNpbmcgKiAxMDApIC8gMTAwXG4gICAgICAgIGNvZGUgKz0gc3BhY2UoOCkgKyBgc3R5bGUua2VybmluZyA9ICR7a2VybmluZ31cXG5gXG4gICAgfVxuICAgIHZhciBjb2xvciA9IGNvbnRhaW5lci5maW5kQ29sb3JFcXVhbCh0ZXh0U3R5bGUuY29sb3IpXG4gICAgaWYgKGNvbG9yID09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2RlICs9IHNwYWNlKDgpICsgYHN0eWxlLmNvbG9yID0gLmluaXQocmVkOiAke3RleHRTdHlsZS5jb2xvci5yfSAvIDI1NSwgZ3JlZW46ICR7dGV4dFN0eWxlLmNvbG9yLmd9IC8gMjU1LCBibHVlOiAke3RleHRTdHlsZS5jb2xvci5ifSAvIDI1NSwgYWxwaGE6ICR7dGV4dFN0eWxlLmNvbG9yLmF9KVxcbmBcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb2RlICs9IHNwYWNlKDgpICsgYHN0eWxlLmNvbG9yID0gLiR7Y29sb3IubmFtZX1cXG5gXG4gICAgfVxuICAgIGlmICh0ZXh0U3R5bGUudGV4dEFsaWduICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2RlICs9IHNwYWNlKDgpICsgYHN0eWxlLmFsaWdubWVudCA9IC4ke2FsaWdubWVudCh0ZXh0U3R5bGUudGV4dEFsaWduKX1cXG5gXG4gICAgfVxuICAgIGlmICh0ZXh0U3R5bGUubGluZUhlaWdodCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29kZSArPSBzcGFjZSg4KSArIGBzdHlsZS5saW5lSGVpZ2h0ID0gJHt0ZXh0U3R5bGUubGluZUhlaWdodH1cXG5gXG4gICAgfVxuICAgIGNvZGUgKz0gc3BhY2UoOCkgKyBgcmV0dXJuIHN0eWxlXG4gICAgfSgpYFxuICAgIHJldHVybiBjb2RlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlU3R5bGVzKGEsIGIpIHtcbiAgICBpZiAoYS5uYW1lIDwgYi5uYW1lKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgaWYgKGEubmFtZSA+IGIubmFtZSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGFjZShudW1iZXIpIHtcbiAgICByZXR1cm4gYCBgLnJlcGVhdChudW1iZXIpXG59XG5cbmZ1bmN0aW9uIGZvbnROYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS5zdGFydHNXaXRoKCdTRlBybycpID8gYHN5c3RlbUZvbnRgIDogY2FtZWxpemUobmFtZSlcbn1cblxuZnVuY3Rpb24gYWxpZ25tZW50KHRleHRBbGlnbikge1xuICAgIHJldHVybiB0ZXh0QWxpZ24gPT0gYGp1c3RpZnlgID8gYGp1c3RpZmllZGAgOiB0ZXh0QWxpZ25cbn1cblxuZnVuY3Rpb24gY2FtZWxpemUoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oPzpeXFx3fFtBLVpdfFxcYlxcdykvZywgZnVuY3Rpb24od29yZCwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBpbmRleCA9PSAwID8gd29yZC50b0xvd2VyQ2FzZSgpIDogd29yZC50b1VwcGVyQ2FzZSgpO1xuICAgIH0pLnJlcGxhY2UoL1xccysvZywgJycpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgc3R5bGUsXG4gICAgY29tcGFyZVN0eWxlcyxcbiAgICBzcGFjZVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGVscGVycy5qcyJdLCJzb3VyY2VSb290IjoiIn0=