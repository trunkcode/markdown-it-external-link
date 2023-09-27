import markdownit from 'markdown-it';

export default function markdownitExternalLink (md: markdownit, options: configOptions): void;

export type configOptions = {
  hosts: [];
  rel: string;
  target: string;
};
