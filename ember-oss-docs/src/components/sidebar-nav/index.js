import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SidebarNav extends Component {
  @tracked isOpen = false;

  get orderedChildren() {
    return [...this.args.node.children].sort(comparePageChildren);
  }

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

function comparePageChildren(a, b) {
  let aPages = a.pages;
  let bPages = b.pages;

  let aIndex = findIndexPage(aPages);
  let bIndex = findIndexPage(bPages);

  let aOrder = orderOf(aIndex);
  let bOrder = orderOf(bIndex);

  return aOrder - bOrder;
}

function orderOf(page) {
  return page?.frontmatter?.categoryOrder ?? -1;
}

function findIndexPage(pages) {
  // by segemnts
  let shortestPath = Infinity;
  let shortestPathPage;

  for (let page of pages) {
    let segments = page.url.split('/').filter(Boolean);

    if (segments.length < shortestPath) {
      shortestPath = segments.length;
      shortestPathPage = page;
    }
  }

  return shortestPathPage;
}
