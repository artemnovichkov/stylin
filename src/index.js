/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

 import {
    style,
    compareStyles,
    space
 } from './helpers';

function layer(context, selectedLayer) {
    return `Hello ${layer.name}.`;
}

function screen(context, selectedVersion, selectedScreen) {

}

function component(context, selectedVersion, selectedComponent) {

}

function styleguideColors(context, colors) {
    
}

function styleguideTextStyles(context, textStyles) {
    var styles = textStyles.map(textStyle => `${style(context.project, textStyle)}`)
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

function exportStyleguideColors(context, colors) {

}

function exportStyleguideTextStyles(context, textStyles) {
    return styleguideTextStyles(context, textStyles)
}

function comment(context, text) {

}

export default {
    layer,
    screen,
    component,
    styleguideColors,
    styleguideTextStyles,
    exportStyleguideColors,
    exportStyleguideTextStyles,
    comment
};
