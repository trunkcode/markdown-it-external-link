import detectExternalLink from 'detect-external-link';
export default function markdownitExternalLink(md, userConfig) {
    const defaultConfig = {
        hosts: [],
        rel: 'noopener',
        target: '_blank',
    };
    const defaultOpenRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };
    const finalConfig = Object.assign({}, defaultConfig, userConfig);
    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        if (tokens[idx] && tokens[idx].attrs) {
            const linkIndex = tokens[idx].attrIndex('href');
            if (linkIndex in tokens[idx].attrs && tokens[idx].attrs[linkIndex][1]) {
                if (detectExternalLink(tokens[idx].attrs[linkIndex][1], finalConfig)) {
                    const relIndex = tokens[idx].attrIndex('rel');
                    const targetIndex = tokens[idx].attrIndex('target');
                    if (targetIndex < 0) {
                        tokens[idx].attrPush(['target', finalConfig.target]);
                    }
                    else {
                        tokens[idx].attrs[targetIndex][1] = finalConfig.target;
                    }
                    if (relIndex < 0) {
                        tokens[idx].attrPush(['rel', finalConfig.rel]);
                    }
                    else {
                        tokens[idx].attrs[relIndex][1] = finalConfig.rel;
                    }
                }
            }
        }
        return defaultOpenRender(tokens, idx, options, env, self);
    };
}
