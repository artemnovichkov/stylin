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
    return 'styleguide' in context ? context.styleguide : context.project;
} /**
   * Export functions you want to work with, see documentation for details:
   * https://github.com/zeplin/zeplin-extension-documentation
   */

function textStyles(context) {
    var containerTextStyles = container(context).textStyles;
    var styles = containerTextStyles.map(function (textStyle) {
        return `${(0, _helpers.style)(container(context), textStyle)}`;
    });
    var code = `
extension TextStyle {

    ${styles.sort(_helpers.compareStyles).join(`\n\n` + (0, _helpers.space)(4))}
}`;
    return {
        code: '123',
        language: 'swift',
        filename: 'TextStyle+App.swift'
    };
}

function exportTextStyles(context) {
    var containerTextStyles = container(context).textStyles;
    return textStyles(containerTextStyles);
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
function style(container, textStyle) {
    var code = `static let ${camelize(textStyle.name)}: TextStyle = {
        let style = TextStyle()
        style.font = .${fontName(textStyle.fontFamily)}(ofSize: ${textStyle.fontSize}, weight: .${textStyle.weightText})\n`;
    if (textStyle.letterSpacing != undefined) {
        var kerning = Math.round(textStyle.letterSpacing * 100) / 100;
        code += space(8) + `style.kerning = ${kerning}\n`;
    }
    var projectColor = container.findColorEqual(textStyle.color);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiMDExMDExYzY2OWE0YjM5MWU3ZCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMuanMiXSwibmFtZXMiOlsiY29udGFpbmVyIiwiY29udGV4dCIsInN0eWxlZ3VpZGUiLCJwcm9qZWN0IiwidGV4dFN0eWxlcyIsImNvbnRhaW5lclRleHRTdHlsZXMiLCJzdHlsZXMiLCJtYXAiLCJ0ZXh0U3R5bGUiLCJjb2RlIiwic29ydCIsImNvbXBhcmVTdHlsZXMiLCJqb2luIiwibGFuZ3VhZ2UiLCJmaWxlbmFtZSIsImV4cG9ydFRleHRTdHlsZXMiLCJzdHlsZWd1aWRlVGV4dFN0eWxlcyIsIm9sZFRleHRTdHlsZXMiLCJleHBvcnRTdHlsZWd1aWRlVGV4dFN0eWxlcyIsInN0eWxlIiwic3BhY2UiLCJjYW1lbGl6ZSIsIm5hbWUiLCJmb250TmFtZSIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsIndlaWdodFRleHQiLCJsZXR0ZXJTcGFjaW5nIiwidW5kZWZpbmVkIiwia2VybmluZyIsIk1hdGgiLCJyb3VuZCIsInByb2plY3RDb2xvciIsImZpbmRDb2xvckVxdWFsIiwiY29sb3IiLCJyIiwiZyIsImIiLCJhIiwidGV4dEFsaWduIiwiYWxpZ25tZW50IiwibGluZUhlaWdodCIsIm51bWJlciIsInJlcGVhdCIsInN0YXJ0c1dpdGgiLCJzdHJpbmciLCJyZXBsYWNlIiwid29yZCIsImluZGV4IiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN4REM7O0FBTUQ7O0FBRUEsU0FBU0EsU0FBVCxDQUFtQkMsT0FBbkIsRUFBNEI7QUFDeEIsV0FBTyxnQkFBZ0JBLE9BQWhCLEdBQTBCQSxRQUFRQyxVQUFsQyxHQUErQ0QsUUFBUUUsT0FBOUQ7QUFDRCxDLENBZkg7Ozs7O0FBaUJBLFNBQVNDLFVBQVQsQ0FBb0JILE9BQXBCLEVBQTZCO0FBQ3pCLFFBQU1JLHNCQUFzQkwsVUFBVUMsT0FBVixFQUFtQkcsVUFBL0M7QUFDQSxRQUFJRSxTQUFTRCxvQkFBb0JFLEdBQXBCLENBQXdCO0FBQUEsZUFBYyxHQUFFLG9CQUFNUCxVQUFVQyxPQUFWLENBQU4sRUFBMEJPLFNBQTFCLENBQXFDLEVBQXJEO0FBQUEsS0FBeEIsQ0FBYjtBQUNBLFFBQUlDLE9BQVE7OztNQUdWSCxPQUFPSSxJQUFQLENBQVlDLHNCQUFaLEVBQTJCQyxJQUEzQixDQUFpQyxNQUFELEdBQVMsb0JBQU0sQ0FBTixDQUF6QyxDQUFtRDtFQUhyRDtBQUtBLFdBQU87QUFDSEgsY0FBTSxLQURIO0FBRUhJLGtCQUFVLE9BRlA7QUFHSEMsa0JBQVU7QUFIUCxLQUFQO0FBS0g7O0FBRUQsU0FBU0MsZ0JBQVQsQ0FBMEJkLE9BQTFCLEVBQW1DO0FBQy9CLFFBQU1JLHNCQUFzQkwsVUFBVUMsT0FBVixFQUFtQkcsVUFBL0M7QUFDQSxXQUFPQSxXQUFXQyxtQkFBWCxDQUFQO0FBQ0g7O0FBRUQ7O0FBRUMsU0FBU1csb0JBQVQsQ0FBOEJmLE9BQTlCLEVBQXVDZ0IsYUFBdkMsRUFBc0Q7QUFDbkQsUUFBSVgsU0FBU1csY0FBY1YsR0FBZCxDQUFrQjtBQUFBLGVBQWMsR0FBRSxvQkFBTU4sUUFBUUUsT0FBZCxFQUF1QkssU0FBdkIsQ0FBa0MsRUFBbEQ7QUFBQSxLQUFsQixDQUFiO0FBQ0EsUUFBSUMsT0FBUTs7O01BR1ZILE9BQU9JLElBQVAsQ0FBWUMsc0JBQVosRUFBMkJDLElBQTNCLENBQWlDLE1BQUQsR0FBUyxvQkFBTSxDQUFOLENBQXpDLENBQW1EO0VBSHJEO0FBS0EsV0FBTztBQUNISCxjQUFNQSxJQURIO0FBRUhJLGtCQUFVLE9BRlA7QUFHSEMsa0JBQVU7QUFIUCxLQUFQO0FBS0g7O0FBRUQsU0FBU0ksMEJBQVQsQ0FBb0NqQixPQUFwQyxFQUE2Q2dCLGFBQTdDLEVBQTREO0FBQ3hELFdBQU9ELHFCQUFxQmYsT0FBckIsRUFBOEJnQixhQUE5QixDQUFQO0FBQ0g7O2tCQUVjO0FBQ1hiLGNBRFc7QUFFWFcsb0JBRlc7QUFHWEMsd0JBSFc7QUFJWEU7QUFKVyxDOzs7Ozs7Ozs7Ozs7UUN6RENDLEssR0FBQUEsSztRQXlCQVIsYSxHQUFBQSxhO1FBVUFTLEssR0FBQUEsSztBQW5DVCxTQUFTRCxLQUFULENBQWVuQixTQUFmLEVBQTBCUSxTQUExQixFQUFxQztBQUN4QyxRQUFJQyxPQUFRLGNBQWFZLFNBQVNiLFVBQVVjLElBQW5CLENBQXlCOzt3QkFFOUJDLFNBQVNmLFVBQVVnQixVQUFuQixDQUErQixZQUFXaEIsVUFBVWlCLFFBQVMsY0FBYWpCLFVBQVVrQixVQUFXLEtBRm5IO0FBR0EsUUFBSWxCLFVBQVVtQixhQUFWLElBQTJCQyxTQUEvQixFQUEwQztBQUN0QyxZQUFJQyxVQUFVQyxLQUFLQyxLQUFMLENBQVd2QixVQUFVbUIsYUFBVixHQUEwQixHQUFyQyxJQUE0QyxHQUExRDtBQUNBbEIsZ0JBQVFXLE1BQU0sQ0FBTixJQUFZLG1CQUFrQlMsT0FBUSxJQUE5QztBQUNIO0FBQ0QsUUFBSUcsZUFBZWhDLFVBQVVpQyxjQUFWLENBQXlCekIsVUFBVTBCLEtBQW5DLENBQW5CO0FBQ0EsUUFBSUYsZ0JBQWdCSixTQUFwQixFQUErQjtBQUMzQm5CLGdCQUFRVyxNQUFNLENBQU4sSUFBWSw0QkFBMkJaLFVBQVUwQixLQUFWLENBQWdCQyxDQUFFLGtCQUFpQjNCLFVBQVUwQixLQUFWLENBQWdCRSxDQUFFLGlCQUFnQjVCLFVBQVUwQixLQUFWLENBQWdCRyxDQUFFLGtCQUFpQjdCLFVBQVUwQixLQUFWLENBQWdCSSxDQUFFLEtBQXpLO0FBQ0gsS0FGRCxNQUVPO0FBQ0g3QixnQkFBUVcsTUFBTSxDQUFOLElBQVksa0JBQWlCWSxhQUFhVixJQUFLLElBQXZEO0FBQ0g7QUFDRCxRQUFJZCxVQUFVK0IsU0FBVixJQUF1QlgsU0FBM0IsRUFBc0M7QUFDbENuQixnQkFBUVcsTUFBTSxDQUFOLElBQVksc0JBQXFCb0IsVUFBVWhDLFVBQVUrQixTQUFwQixDQUErQixJQUF4RTtBQUNIO0FBQ0QsUUFBSS9CLFVBQVVpQyxVQUFWLElBQXdCYixTQUE1QixFQUF1QztBQUNuQ25CLGdCQUFRVyxNQUFNLENBQU4sSUFBWSxzQkFBcUJaLFVBQVVpQyxVQUFXLElBQTlEO0FBQ0g7QUFDRGhDLFlBQVFXLE1BQU0sQ0FBTixJQUFZO1FBQXBCO0FBRUEsV0FBT1gsSUFBUDtBQUNIOztBQUVNLFNBQVNFLGFBQVQsQ0FBdUIyQixDQUF2QixFQUEwQkQsQ0FBMUIsRUFBNkI7QUFDaEMsUUFBSUMsRUFBRWhCLElBQUYsR0FBU2UsRUFBRWYsSUFBZixFQUFxQjtBQUNqQixlQUFPLENBQUMsQ0FBUjtBQUNIO0FBQ0QsUUFBSWdCLEVBQUVoQixJQUFGLEdBQVNlLEVBQUVmLElBQWYsRUFBcUI7QUFDakIsZUFBTyxDQUFQO0FBQ0g7QUFDRCxXQUFPLENBQVA7QUFDSDs7QUFFTSxTQUFTRixLQUFULENBQWVzQixNQUFmLEVBQXVCO0FBQzFCLFdBQVEsR0FBRCxDQUFJQyxNQUFKLENBQVdELE1BQVgsQ0FBUDtBQUNIOztBQUVELFNBQVNuQixRQUFULENBQWtCRCxJQUFsQixFQUF3QjtBQUNwQixXQUFPQSxLQUFLc0IsVUFBTCxDQUFnQixPQUFoQixJQUE0QixZQUE1QixHQUEwQ3ZCLFNBQVNDLElBQVQsQ0FBakQ7QUFDSDs7QUFFRCxTQUFTa0IsU0FBVCxDQUFtQkQsU0FBbkIsRUFBOEI7QUFDMUIsV0FBT0EsYUFBYyxTQUFkLEdBQTBCLFdBQTFCLEdBQXVDQSxTQUE5QztBQUNIOztBQUVELFNBQVNsQixRQUFULENBQWtCd0IsTUFBbEIsRUFBMEI7QUFDdEIsV0FBT0EsT0FBT0MsT0FBUCxDQUFlLHFCQUFmLEVBQXNDLFVBQVNDLElBQVQsRUFBZUMsS0FBZixFQUFzQjtBQUNqRSxlQUFPQSxTQUFTLENBQVQsR0FBYUQsS0FBS0UsV0FBTCxFQUFiLEdBQWtDRixLQUFLRyxXQUFMLEVBQXpDO0FBQ0QsS0FGTSxFQUVKSixPQUZJLENBRUksTUFGSixFQUVZLEVBRlosQ0FBUDtBQUdIOztrQkFFYztBQUNYM0IsU0FEVztBQUVYUixpQkFGVztBQUdYUztBQUhXLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImV4dGVuc2lvblwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJleHRlbnNpb25cIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiMDExMDExYzY2OWE0YjM5MWU3ZCIsIi8qKlxuICogRXhwb3J0IGZ1bmN0aW9ucyB5b3Ugd2FudCB0byB3b3JrIHdpdGgsIHNlZSBkb2N1bWVudGF0aW9uIGZvciBkZXRhaWxzOlxuICogaHR0cHM6Ly9naXRodWIuY29tL3plcGxpbi96ZXBsaW4tZXh0ZW5zaW9uLWRvY3VtZW50YXRpb25cbiAqL1xuXG4gaW1wb3J0IHtcbiAgICBzdHlsZSxcbiAgICBjb21wYXJlU3R5bGVzLFxuICAgIHNwYWNlXG4gfSBmcm9tICcuL2hlbHBlcnMnO1xuXG4vLyBOZXcgQVBJXG5cbmZ1bmN0aW9uIGNvbnRhaW5lcihjb250ZXh0KSB7XG4gICAgcmV0dXJuICdzdHlsZWd1aWRlJyBpbiBjb250ZXh0ID8gY29udGV4dC5zdHlsZWd1aWRlIDogY29udGV4dC5wcm9qZWN0O1xuICB9XG5cbmZ1bmN0aW9uIHRleHRTdHlsZXMoY29udGV4dCkge1xuICAgIGNvbnN0IGNvbnRhaW5lclRleHRTdHlsZXMgPSBjb250YWluZXIoY29udGV4dCkudGV4dFN0eWxlcztcbiAgICB2YXIgc3R5bGVzID0gY29udGFpbmVyVGV4dFN0eWxlcy5tYXAodGV4dFN0eWxlID0+IGAke3N0eWxlKGNvbnRhaW5lcihjb250ZXh0KSwgdGV4dFN0eWxlKX1gKVxuICAgIHZhciBjb2RlID0gYFxuZXh0ZW5zaW9uIFRleHRTdHlsZSB7XG5cbiAgICAke3N0eWxlcy5zb3J0KGNvbXBhcmVTdHlsZXMpLmpvaW4oYFxcblxcbmAgKyBzcGFjZSg0KSl9XG59YDtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiAnMTIzJyxcbiAgICAgICAgbGFuZ3VhZ2U6ICdzd2lmdCcsXG4gICAgICAgIGZpbGVuYW1lOiAnVGV4dFN0eWxlK0FwcC5zd2lmdCcsXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZXhwb3J0VGV4dFN0eWxlcyhjb250ZXh0KSB7XG4gICAgY29uc3QgY29udGFpbmVyVGV4dFN0eWxlcyA9IGNvbnRhaW5lcihjb250ZXh0KS50ZXh0U3R5bGVzO1xuICAgIHJldHVybiB0ZXh0U3R5bGVzKGNvbnRhaW5lclRleHRTdHlsZXMpO1xufVxuXG4vLyBEZXByZWNhdGVkIEFQSVxuXG4gZnVuY3Rpb24gc3R5bGVndWlkZVRleHRTdHlsZXMoY29udGV4dCwgb2xkVGV4dFN0eWxlcykge1xuICAgIHZhciBzdHlsZXMgPSBvbGRUZXh0U3R5bGVzLm1hcCh0ZXh0U3R5bGUgPT4gYCR7c3R5bGUoY29udGV4dC5wcm9qZWN0LCB0ZXh0U3R5bGUpfWApXG4gICAgdmFyIGNvZGUgPSBgXG5leHRlbnNpb24gVGV4dFN0eWxlIHtcblxuICAgICR7c3R5bGVzLnNvcnQoY29tcGFyZVN0eWxlcykuam9pbihgXFxuXFxuYCArIHNwYWNlKDQpKX1cbn1gO1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgIGxhbmd1YWdlOiAnc3dpZnQnLFxuICAgICAgICBmaWxlbmFtZTogJ1RleHRTdHlsZStBcHAuc3dpZnQnLFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGV4cG9ydFN0eWxlZ3VpZGVUZXh0U3R5bGVzKGNvbnRleHQsIG9sZFRleHRTdHlsZXMpIHtcbiAgICByZXR1cm4gc3R5bGVndWlkZVRleHRTdHlsZXMoY29udGV4dCwgb2xkVGV4dFN0eWxlcylcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHRleHRTdHlsZXMsXG4gICAgZXhwb3J0VGV4dFN0eWxlcyxcbiAgICBzdHlsZWd1aWRlVGV4dFN0eWxlcyxcbiAgICBleHBvcnRTdHlsZWd1aWRlVGV4dFN0eWxlcyxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJleHBvcnQgZnVuY3Rpb24gc3R5bGUoY29udGFpbmVyLCB0ZXh0U3R5bGUpIHtcbiAgICB2YXIgY29kZSA9IGBzdGF0aWMgbGV0ICR7Y2FtZWxpemUodGV4dFN0eWxlLm5hbWUpfTogVGV4dFN0eWxlID0ge1xuICAgICAgICBsZXQgc3R5bGUgPSBUZXh0U3R5bGUoKVxuICAgICAgICBzdHlsZS5mb250ID0gLiR7Zm9udE5hbWUodGV4dFN0eWxlLmZvbnRGYW1pbHkpfShvZlNpemU6ICR7dGV4dFN0eWxlLmZvbnRTaXplfSwgd2VpZ2h0OiAuJHt0ZXh0U3R5bGUud2VpZ2h0VGV4dH0pXFxuYFxuICAgIGlmICh0ZXh0U3R5bGUubGV0dGVyU3BhY2luZyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIGtlcm5pbmcgPSBNYXRoLnJvdW5kKHRleHRTdHlsZS5sZXR0ZXJTcGFjaW5nICogMTAwKSAvIDEwMFxuICAgICAgICBjb2RlICs9IHNwYWNlKDgpICsgYHN0eWxlLmtlcm5pbmcgPSAke2tlcm5pbmd9XFxuYFxuICAgIH1cbiAgICB2YXIgcHJvamVjdENvbG9yID0gY29udGFpbmVyLmZpbmRDb2xvckVxdWFsKHRleHRTdHlsZS5jb2xvcilcbiAgICBpZiAocHJvamVjdENvbG9yID09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2RlICs9IHNwYWNlKDgpICsgYHN0eWxlLmNvbG9yID0gLmluaXQocmVkOiAke3RleHRTdHlsZS5jb2xvci5yfSAvIDI1NSwgZ3JlZW46ICR7dGV4dFN0eWxlLmNvbG9yLmd9IC8gMjU1LCBibHVlOiAke3RleHRTdHlsZS5jb2xvci5ifSAvIDI1NSwgYWxwaGE6ICR7dGV4dFN0eWxlLmNvbG9yLmF9KVxcbmBcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb2RlICs9IHNwYWNlKDgpICsgYHN0eWxlLmNvbG9yID0gLiR7cHJvamVjdENvbG9yLm5hbWV9XFxuYFxuICAgIH1cbiAgICBpZiAodGV4dFN0eWxlLnRleHRBbGlnbiAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29kZSArPSBzcGFjZSg4KSArIGBzdHlsZS5hbGlnbm1lbnQgPSAuJHthbGlnbm1lbnQodGV4dFN0eWxlLnRleHRBbGlnbil9XFxuYFxuICAgIH1cbiAgICBpZiAodGV4dFN0eWxlLmxpbmVIZWlnaHQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvZGUgKz0gc3BhY2UoOCkgKyBgc3R5bGUubGluZUhlaWdodCA9ICR7dGV4dFN0eWxlLmxpbmVIZWlnaHR9XFxuYFxuICAgIH1cbiAgICBjb2RlICs9IHNwYWNlKDgpICsgYHJldHVybiBzdHlsZVxuICAgIH0oKWBcbiAgICByZXR1cm4gY29kZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZVN0eWxlcyhhLCBiKSB7XG4gICAgaWYgKGEubmFtZSA8IGIubmFtZSkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGlmIChhLm5hbWUgPiBiLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHJldHVybiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BhY2UobnVtYmVyKSB7XG4gICAgcmV0dXJuIGAgYC5yZXBlYXQobnVtYmVyKVxufVxuXG5mdW5jdGlvbiBmb250TmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUuc3RhcnRzV2l0aCgnU0ZQcm8nKSA/IGBzeXN0ZW1Gb250YCA6IGNhbWVsaXplKG5hbWUpXG59XG5cbmZ1bmN0aW9uIGFsaWdubWVudCh0ZXh0QWxpZ24pIHtcbiAgICByZXR1cm4gdGV4dEFsaWduID09IGBqdXN0aWZ5YCA/IGBqdXN0aWZpZWRgIDogdGV4dEFsaWduXG59XG5cbmZ1bmN0aW9uIGNhbWVsaXplKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKD86Xlxcd3xbQS1aXXxcXGJcXHcpL2csIGZ1bmN0aW9uKHdvcmQsIGluZGV4KSB7XG4gICAgICByZXR1cm4gaW5kZXggPT0gMCA/IHdvcmQudG9Mb3dlckNhc2UoKSA6IHdvcmQudG9VcHBlckNhc2UoKTtcbiAgICB9KS5yZXBsYWNlKC9cXHMrL2csICcnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHN0eWxlLFxuICAgIGNvbXBhcmVTdHlsZXMsXG4gICAgc3BhY2Vcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hlbHBlcnMuanMiXSwic291cmNlUm9vdCI6IiJ9