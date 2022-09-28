import Component from '@glimmer/component';
import { assert } from '@ember/debug';

const VALID_VARIANTS = ['destructive', 'normal', 'primary', 'quiet', 'brand'];

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

export default class ToucanLink extends Component {
  get disabledStyle() {
    let { variant } = this;

    if (variant) {
      return [
        ...this.baseButtonStyles,
        `focus:outline-none`,
        INTERACTIVE_VARIANT[variant],
        'interactive-disabled',
      ].join(' ');
    }

    return [...this.baseLinkStyles, 'focus:outline-none', 'text-disabled'].join(' ');
  }

  get style() {
    let { variant } = this;

    if (variant) {
      return [
        ...this.baseButtonStyles,
        'focusable',
        FOCUSABLE_VARIANT[variant],
        INTERACTIVE_VARIANT[variant],
      ].join(' ');
    }

    return [
      ...this.baseLinkStyles,
      'focusable-outer',
      'focus:text-primary-hover',
      'hover:text-primary-hover',
      'active:text-primary-pressed',
      'text-primary-idle',
    ].join(' ');
  }

  get baseButtonStyles() {
    return [
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
  }

  get baseLinkStyles() {
    return ['inline-block', 'relative', 'underline'];
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
}
