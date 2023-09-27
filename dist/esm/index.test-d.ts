'use strict';

import markdownit from 'markdown-it';
import markdownitExternalLink from './index';

const testString = `This is an [Example](http://example.com) link, [Google](https://google.com) link, [Facebook](https://facebook.com) link, [Test Example](http://test.example.com/) link, [Test2 Example](http://test2.example.com/) link and [Relative](/docs/concept/) link.`;

const md = new markdownit();
const internalHosts = {
  'hosts': [
    'http://example.com',
    'http://test.example.com'
  ]
};

if (internalHosts) {
  md.use(markdownitExternalLink, internalHosts);
  md.render(testString);
}
