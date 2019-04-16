/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

function layer(context, selectedLayer) {

}

function screen(context, selectedVersion, selectedScreen) {

}

function component(context, selectedVersion, selectedComponent) {

}

function styleguideColors(context, colors) {

}

function styleguideTextStyles(context, textStyles) {

}

function exportStyleguideColors(context, colors) {

}

function exportStyleguideTextStyles(context, textStyles) {
    const { code: textStyleCode, language } = styleguideTextStyles(context, textStyles);
    const code = `${comment(context, COPYRIGHT)}\n\n${textStyleCode}`;

    return {
        code: "Hello, World!",
        filename: "Styles.swift",
        language: "swift"
    };
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
