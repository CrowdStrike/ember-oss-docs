import Component from '@glimmer/component';
import { action } from '@ember/object';

import { scrollToElement } from './scroll-to';

export default class PageHeadings extends Component {
  eq = (a, b) => a === b;

  @action
  onClick(evt) {
    const href = evt.target.getAttribute('href');

    if (href) {
      const toElement = document.querySelector(href);

      scrollToElement(toElement);
    }
  }
}
