import type { HLJSApi } from 'highlight.js';

interface Options {
  /**
   * Optionally, provide the code to highlight with at the target element
   */
  code?: string;
}

export default async function highlightCodeBlocks(element: HTMLElement, options?: Options) {
  if (options?.code) {
    return highlightWith(element, options.code);
  }

  let elements: HTMLElement[] = [];

  if (element.tagName.toLowerCase() === 'code') {
    elements.push(element);
  } else {
    elements = [...element.querySelectorAll('pre > code')] as HTMLElement[];
  }

  for (let element of elements) {
    let hljs = await getHighlighter();

    hljs.highlightElement(element);
  }
}

async function highlightWith(element: HTMLElement, code: string) {
  let target = element.querySelector('code');

  if (!target) return;

  let [hljs, purify] = await Promise.all([getHighlighter(), getPurifier()]);

  let { value } = hljs.highlight(code, { language: target.classList[0] });

  target.innerHTML = purify.sanitize(value);
}

/**
 * Browsers cache imports, but this is an easy way to
 * let us only do the glimmer part below once
 */
let HIGHLIGHT: HLJSApi;

export async function getHighlighter(): Promise<HLJSApi> {
  if (HIGHLIGHT) return HIGHLIGHT;

  /**
   * highlight.js is 282kb in total,
   * since we now use hljs on initial page load, eagerly, we want to load
   * as little as possible
   */
  let [hljs, glimmer, javascript, json, typescript, css, bash, shell, powershell, markdown] =
    await Promise.all([
      import('highlight.js/lib/core'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      import('highlightjs-glimmer'),
      import('highlight.js/lib/languages/javascript'),
      import('highlight.js/lib/languages/json'),
      import('highlight.js/lib/languages/typescript'),
      import('highlight.js/lib/languages/css'),
      import('highlight.js/lib/languages/bash'),
      import('highlight.js/lib/languages/shell'),
      import('highlight.js/lib/languages/powershell'),
      import('highlight.js/lib/languages/markdown'),
    ]);

  HIGHLIGHT = hljs.default;
  HIGHLIGHT.registerLanguage('javascript', javascript.default);
  HIGHLIGHT.registerLanguage('typescript', typescript.default);
  HIGHLIGHT.registerLanguage('markdown', markdown.default);
  HIGHLIGHT.registerLanguage('json', json.default);
  HIGHLIGHT.registerLanguage('css', css.default);
  HIGHLIGHT.registerLanguage('bash', bash.default);
  HIGHLIGHT.registerLanguage('shell', shell.default);
  HIGHLIGHT.registerLanguage('powershell', powershell.default);

  glimmer.setup(HIGHLIGHT);

  HIGHLIGHT.registerAliases('gjs', { languageName: 'javascript' });
  HIGHLIGHT.registerAliases('gts', { languageName: 'typescript' });
  HIGHLIGHT.registerAliases('glimdown', { languageName: 'markdown' });

  return HIGHLIGHT;
}

async function getPurifier() {
  return (await import('dompurify')).default;
}
