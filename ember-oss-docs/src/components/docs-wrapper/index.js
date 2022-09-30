import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import IntersectHeadings from './intersect-headings';

export default class Docs extends Component {
  @tracked currentHeadingId;

  intersectHeadings = IntersectHeadings;

  @action
  setCurrentHeadingId(id) {
    this.currentHeadingId = id;
  }
}
