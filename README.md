# markdown-it-external-link

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![AppVeyor Build Status][appveyor-image]][appveyor-url]

[markdown-it](https://www.npmjs.com/package/markdown-it) plugin that adds `target` and `rel` attributes on external links.

## Install

Via `npm`

```bash
npm install markdown-it-external-link
```

Via Yarn

```bash
yarn add markdown-it-external-link
```

## Usage

```javascript
const markdownit = require('markdown-it');
const markdownitExternalLink = require('../index').default;
const md = markdownit();

const testString = 'This is an [Example](http://example.com) link, [Google](https://google.com) link, [Facebook](https://facebook.com) link, [Test Example](http://test.example.com/) link, [Test2 Example](http://test2.example.com/) link and [Relative](/docs/concept/) link.';

// Mark http://example.com and http://test.example.com as internal domain.
md.use(markdownitExternalLink, {
  'hosts': [
    'http://example.com',
    'http://test.example.com'
  ]
});

console.log(md.render(testString));
```

## Parameters

|   Attributes   |  Type  | Required |   Default  |                                    Description                                   |
|:--------------:|:------:|:--------:|:----------:|:--------------------------------------------------------------------------------:|
|      hosts     |  Array |    Yes   |     []     | Site hostname(s) to detect external links.                                       |
|     target     | String |    No    |  `_blank`  | Specifies where to open the linked document.                                     |
|       rel      | String |    No    | `noopener` | Specifies the relationship between the current document and the linked document. |

[npm-image]: https://img.shields.io/npm/v/markdown-it-external-link.svg
[npm-url]: https://www.npmjs.com/package/markdown-it-external-link
[downloads-image]: https://img.shields.io/npm/dm/markdown-it-external-link.svg

[appveyor-url]: https://ci.appveyor.com/project/trunkcode/markdown-it-external-link
[appveyor-image]: https://img.shields.io/appveyor/ci/trunkcode/markdown-it-external-link.svg?label=appveyor
