<p align="center">
    <img src=".github/stylin.png" width="528" max-width="90%" alt="Stylin" />
</p>

<p align="center">
    <a href="https://extensions.zeplin.io/artemnovichkov/stylin">
        <img src="https://img.shields.io/badge/zeplin-extension-ffbe12.svg?style=flat" alt="Zeplin Extension" />
    </a>
    <a href="https://travis-ci.org/artemnovichkov/stylin">
        <img src="https://travis-ci.org/artemnovichkov/stylin.svg?branch=master" alt="Build Status" />
    </a>
</p>

[Zeplin](https://zeplin.io) extension that generates text style snippets. Based on [Texstyle](https://github.com/rosberry/texstyle) framework.

## Getting started

Add the extension to your project from [extensions.zeplin.io](extensions.zeplin.io).

## Output

```swift
extension TextStyle {

    static let sampleTextStyle: TextStyle = {
        let style = TextStyle()
        style.font = .systemFont(ofSize: 20, weight: .regular)
        style.color = .black
        style.alignment = .left
        return style
    }()

    static let sampleTextStyleWithColor: TextStyle = {
        let style = TextStyle()
        style.font = .systemFont(ofSize: 20, weight: .regular)
        style.color = .red
        style.alignment = .left
        return style
    }()
}
```

## Development

This extension is developed using [zem](https://github.com/zeplin/zem), Zeplin Extension Manager. zem is a command line tool that lets you quickly create, test and publish extensions.

To learn more about creating Zeplin extensions, [see documentation](https://github.com/zeplin/zeplin-extension-documentation).

## Thanks

- to [Sacha](https://t.me/Yahujik) for the logo
- to [Pasha](https://t.me/l_okk) for answering my stupid JS questions

## Authors

Artem Novichkov, novichkoff93@gmail.com

[![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/artemnovichkov?utm_source=github&utm_medium=button&utm_term=artemnovichkov&utm_campaign=github)

## License

Stylin is available under the MIT license. See the LICENSE file for more info.
