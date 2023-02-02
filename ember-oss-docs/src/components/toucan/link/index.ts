import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { service } from '@ember/service';

import type NavigationService from '../../../services/navigation';

const VALID_VARIANTS = ['destructive', 'normal', 'primary', 'quiet', 'brand'] as const;

type Variant = (typeof VALID_VARIANTS)[number];

const INTERACTIVE_VARIANT = {
  destructive: 'interactive-destructive',
  normal: 'interactive-normal',
  primary: 'interactive-primary',
  quiet: 'interactive-quiet',
  brand: 'interactive-brand',
};

const FOCUSABLE_VARIANT = {
  destructive: 'focusable-destructive',
  normal: 'focusable-normal',
  primary: 'focusable-primary',
  quiet: 'focusable-quiet',
  brand: 'focusable-brand',
};

const baseButtonStyles = [
  'duration-150',
  'ease-out',
  'inline-flex',
  'items-center',
  'justify-center',
  'px-2',
  'py-1',
  'rounded-sm',
  'transition',
  'type-md-medium',
];

const baseLinkStyles = ['inline-block', 'relative', 'underline'];

const baseLinkInteractions = [
  'focusable-outer',
  'focus:text-primary-hover',
  'hover:text-primary-hover',
  'active:text-primary-pressed',
  'text-primary-idle',
];

export default class ToucanLink extends Component<{
  Element: HTMLAnchorElement;
  Args: {
    href: string;
    variant?: Variant;
    onClick?: (event: Event) => void;
  };
  Blocks: { default: [] };
}> {
  @service declare navigation: NavigationService;

  get href() {
    assert(`a <Link /> must have a valid @href argument`, this.args.href);

    let { href } = this.args;

    return href;
  }

  get disabledStyle() {
    let { variant } = this;

    if (variant) {
      return [
        ...baseButtonStyles,
        `focus:outline-none`,
        INTERACTIVE_VARIANT[variant],
        'interactive-disabled',
      ].join(' ');
    }

    return [...baseLinkStyles, 'focus:outline-none', 'text-disabled'].join(' ');
  }

  get style() {
    let { variant } = this;

    if (variant) {
      return [
        ...baseButtonStyles,
        'focusable',
        FOCUSABLE_VARIANT[variant],
        INTERACTIVE_VARIANT[variant],
      ].join(' ');
    }

    return [...baseLinkStyles, ...baseLinkInteractions].join(' ');
  }

  get variant() {
    let { variant } = this.args;

    assert(
      `Invalid variant for Toucan::Link: '${variant}' (allowed values: [${VALID_VARIANTS.join(
        ', '
      )}]`,
      VALID_VARIANTS.includes(variant ?? 'quiet')
    );

    return variant;
  }

  navigate = (event: Event) => {
    if (this.href.startsWith('#')) {
      // Link is an internal anchor in the current page, so allow default navigation
      this.args.onClick?.(event);

      return;
    }

    this.navigation.handleAnchorClick(event);
  };
}
