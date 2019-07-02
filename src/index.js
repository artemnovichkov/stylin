/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

 import {
    style,
    compareStyles,
    space
 } from './helpers';

// New API

function container(context) {
    return context.styleguide == undefined ? context.project : context.styleguide;
  }

function textStyles(context) {
    const containerTextStyles = container(context).textStyles;
    var styles = containerTextStyles.map(textStyle => `${style(textStyle)}`)
    var code = `
extension TextStyle {

    ${styles.sort(compareStyles).join(`\n\n` + space(4))}
}`;
    return {
        code: code,
        language: 'swift',
        filename: 'TextStyle+App.swift',
    };
}

function exportTextStyles(context) {
    return textStyles(context);
}

// Deprecated API

 function styleguideTextStyles(context, oldTextStyles) {
    var styles = oldTextStyles.map(textStyle => `${style(context.project, textStyle)}`)
    var code = `
extension TextStyle {

    ${styles.sort(compareStyles).join(`\n\n` + space(4))}
}`;
    return {
        code: code,
        language: 'swift',
        filename: 'TextStyle+App.swift',
    };
}

function exportStyleguideTextStyles(context, oldTextStyles) {
    return styleguideTextStyles(context, oldTextStyles)
}

export default {
    textStyles,
    exportTextStyles,
    styleguideTextStyles,
    exportStyleguideTextStyles,
};
