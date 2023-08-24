import * as types from '../types/index.d';
import detectExternalLink from 'detect-external-link';
import markdownit from 'markdown-it';

export default function markdownitExternalLink (md: markdownit, userConfig: types.configOptions): void {
  const defaultConfig: types.configOptions = {
    hosts: [],
    rel: 'noopener',
    target: '_blank',
  };

  // Remember old renderer, if overridden, or proxy to default renderer.
  const defaultOpenRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  const finalConfig: types.configOptions = Object.assign({}, defaultConfig, userConfig);

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    if (tokens[idx] && tokens[idx].attrs) {
      const linkIndex = tokens[idx].attrIndex('href');

      // @ts-ignore: Object is possibly 'null'.
      if (linkIndex in tokens[idx].attrs && tokens[idx].attrs[linkIndex][1]) {
        // @ts-ignore: Object is possibly 'null'.
        if (detectExternalLink(tokens[idx].attrs[linkIndex][1], finalConfig)) {
          const relIndex = tokens[idx].attrIndex('rel');
          const targetIndex = tokens[idx].attrIndex('target');

          // Check `target` before adding it new one.
          if (targetIndex < 0) {
            tokens[idx].attrPush(['target', finalConfig.target]);
          } else {
            // @ts-ignore: Object is possibly 'null'.
            tokens[idx].attrs[targetIndex][1] = finalConfig.target;
          }

          // Check `rel` before adding it new one.
          if (relIndex < 0) {
            tokens[idx].attrPush(['rel', finalConfig.rel]);
          } else {
            // @ts-ignore: Object is possibly 'null'.
            tokens[idx].attrs[relIndex][1] = finalConfig.rel;
          }
        }
      }
    }

    // pass token to default renderer.
    return defaultOpenRender(tokens, idx, options, env, self);
  };
}
