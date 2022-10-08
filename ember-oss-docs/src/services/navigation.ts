import { assert } from '@ember/debug';
import { action } from '@ember/object';
import Service, { inject as service } from '@ember/service';

import { scrollToHash } from 'ember-url-hash-polyfill';

import type RouteInfo from '@ember/routing/route-info';
import type RouterService from '@ember/routing/router-service';
import type { WindowService } from 'ember-browser-services/types';

// TODO: https://github.com/emberjs/rfcs/issues/657
//   maybe eventually natively on RouteInfo?
function getParams(currentRouteInfo: RouteInfo) {
  let params: Record<string, unknown>[] = [];

  while (currentRouteInfo.parent) {
    params = [currentRouteInfo.params, ...params];
    currentRouteInfo = currentRouteInfo.parent;
  }

  return params.map(Object.values).flat();
}

/**
 * This class exists as a bit of a rough polyfill for supporting
 * native hrefs with anchor tags.
 *
 * Ember had planned to do this long ago, but there have been so many problems
 * with the routing layer, that most new features for routing have been put on hold
 * until the whole thing can be re-designed and migration plan from old to new figured out.
 *
 * A standalone and slightly simpler implementation may be seen here:
 *  https://codesandbox.io/s/custom-link-component-dgbxl?file=/app/components/link.hbs
 */
export default class NavigationService extends Service {
  @service declare router: RouterService;
  @service('browser/window') declare window: WindowService;

  @action
  handleAnchorClick(event: Event) {
    event.preventDefault();

    let a = event.currentTarget;

    assert(`handleAnchorClick may only be used on anchor tags`, a instanceof HTMLAnchorElement);

    let isOpeningInNewTab = false;
    let href = a.href.replace(new RegExp(`^${document.location.origin}`), '');
    let isAlwaysNewTab = a.target === '_blank';

    // metaKey for MacOS / ctrlKey for Windows
    if (event instanceof MouseEvent || event instanceof KeyboardEvent) {
      let { metaKey, ctrlKey } = event;

      isOpeningInNewTab = metaKey || ctrlKey;
    }

    if (isAlwaysNewTab || isOpeningInNewTab) {
      this.window.open(a.href, '_blank', 'noopener,noreferrer');

      return;
    }

    this.navigateTo(href);
  }

  isRouteActive(route: string) {
    return this.router.isActive(route);
  }

  isLinkActive(link: string) {
    let routeInfo = this.router.recognize(link);

    // early return when the routes are no where close to similar
    if (this.router.currentRouteName !== routeInfo?.name) {
      return false;
    }

    let modelData = getParams(routeInfo);

    return this.router.isActive(routeInfo.name, ...modelData, {
      queryParams: routeInfo.queryParams,
    });
  }

  navigateTo(url: string) {
    let rootUrl = this.router.rootURL;

    if (url.startsWith(rootUrl)) {
      let routeInfo = this.router.recognize(url);

      if (routeInfo && routeInfo.name !== 'error-404') {
        if (!rootUrl.endsWith('/')) {
          rootUrl = `${rootUrl}/`;
        }

        let nextUrl = url.replace(rootUrl, '/');
        let [appUrl = '', hash] = nextUrl.split('#');
        /**
         * We must discard the hash part of the router, because if you change the hash
         * a bunch outside of ember router (which doesn't work anyway, see issue below),
         * the _original_ hash is still present on the currentURL
         */
        let [currentUrl = ''] = this.router.currentURL.split('#');

        if (hash && appUrl === currentUrl && hash !== this.window.location.hash) {
          return scrollToHash(hash);
        }

        /**
         * For QP-only transitions, do *not* call enableBodyScroll, because enableBodyScroll does two things:
         *  - removes the body styles
         *  - scrolls to the top of the page
         *
         *  Enabling body scroll should only remove the styles, and re-setting
         *  the scroll should *only* happen when the page changes
         */
        let [appPath, qps] = appUrl.split('?');
        let [currentPath, currentQPs] = currentUrl.split('?');

        if (appPath === currentPath && qps === currentQPs) {
          // no-op, extraneous transition, save the cpu
          return;
        }

        if (appPath === currentPath && qps !== currentQPs) {
          /**
           * QP-Only transition
           */
          clearBodyStyles();
          this.router.transitionTo(nextUrl);

          return;
        }

        this.router.transitionTo(nextUrl);

        return;
      }
    }

    (this.window.top || this.window).location.href = url;
  }
}

function clearBodyStyles() {
  document.body.style.overflow = '';
  document.body.style.top = '';
}
