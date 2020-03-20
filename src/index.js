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

function contextTextStyles(context) {
    let textStyles = []
    let container = null
    if (context.styleguide == undefined) {
        textStyles = textStyles.concat(context.project.textStyles)
        if (context.project.linkedStyleguide != undefined) {
            textStyles = textStyles.concat(context.project.linkedStyleguide.textStyles)
        }
        container = context.project
    }
    else {
        container = context.styleguide
        textStyles = textStyles.concat(context.styleguide.textStyles)
    }
    return { container, textStyles }
  }

function textStyles(context) {
    const { container, textStyles } = contextTextStyles(context)
    var styles = textStyles.map(textStyle => `${style(textStyle, container)}`)
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
