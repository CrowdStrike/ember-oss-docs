import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SidebarNav extends Component {
  @tracked isOpen = false;

  @action
  toggle() {
    this.isOpen = !this.isOpen;
  }

  @action
  handleSidebarClick(event) {
    if (this.isOpen) {
      const target = event.target;

      if (['A', 'svg', 'path'].includes(target.tagName)) {
        let parentElement = target;

        if (target.tagName == 'path') {
          parentElement = target.parentElement?.closest('svg')?.parentElement;
        } else if (target.tagName == 'svg') {
          parentElement = target.parentElement;
        }

        if (parentElement && parentElement.hasAttribute('data-ignore-auto-close')) {
          return;
        }

        this.toggle();
      }
    }
  }
}
