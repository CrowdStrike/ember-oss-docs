import { assert } from '@ember/debug';

import { modifier } from 'ember-modifier';

import highlightCodeBlocks from '../utils/hljs';

interface Signature {
  Args: {
    Named: {
      /**
       * Override the HTML in the DOM
       */
      code?: string;
    };
  };
}

export default modifier<Signature>(
  (element, _positional, named) => {
    assert(`{{higlight}} may only be used on HTML elements`, element instanceof HTMLElement);

    highlightCodeBlocks(element, named);
  },
  { eager: false }
);
