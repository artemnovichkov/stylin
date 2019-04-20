export function style(project, textStyle) {
    var code = `static let ${camelize(textStyle.name)}: TextStyle = {
        let style = TextStyle()
        style.font = .${fontName(textStyle.fontFamily)}(ofSize: ${textStyle.fontSize}, weight: .${textStyle.weightText})\n`
    if (textStyle.letterSpacing != undefined) {
        var kerning = Math.round(textStyle.letterSpacing * 100) / 100
        code += space(8) + `style.kerning = ${kerning}\n`
    }
    var projectColor = project.findColorEqual(textStyle.color)
    if (projectColor == undefined) {
        code += space(8) + `style.color = .init(red: ${textStyle.color.r} / 255, green: ${textStyle.color.g} / 255, blue: ${textStyle.color.b} / 255, alpha: ${textStyle.color.a})\n`
    } else {
        code += space(8) + `style.color = .${projectColor.name}\n`
    }
    if (textStyle.textAlign != undefined) {
        code += space(8) + `style.alignment = .${alignment(textStyle.textAlign)}\n`
    }
    if (textStyle.lineHeight != undefined) {
        code += space(8) + `style.lineHeight = ${textStyle.lineHeight}\n`
    }
    code += space(8) + `return style
    }()`
    return code
}

export function compareStyles(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

export function space(number) {
    return ` `.repeat(number)
}

function fontName(name) {
    return name.startsWith('SFPro') ? `systemFont` : camelize(name)
}

function alignment(textAlign) {
    return textAlign == `justify` ? `justified` : textAlign
}

function camelize(string) {
    return string.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export default {
    style,
    compareStyles,
    space
};