import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

const VALID_VARIANTS = ['destructive', 'link', 'primary', 'quiet', 'secondary'] as const;

type Variant = typeof VALID_VARIANTS[number];

const STYLES = {
  /**
   * base is defined for the styling that every button has
   */
  base: [
    'focusable',
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-sm',
    'transition',
    'truncate',
    'type-md-medium',
  ],
  variants: {
    destructive: ['focusable-destructive', 'interactive-destructive'],
    link: ['font-normal', 'interactive-link', 'underline'],
    primary: ['interactive-primary'],
    quiet: ['font-normal', 'interactive-quiet'],
    secondary: ['interactive-normal'],
  },
};

export default class Button extends Component<{
  Args: {
    variant?: Variant;
    isDisabled?: boolean;
    onClick: (event: Event) => void;
  };
  Blocks: {
    default: [];
  };
}> {
  get variant() {
    let { variant } = this.args;

    assert(
      `Invalid variant for FalconButton: '${variant}' (allowed values: [${VALID_VARIANTS.join(
        ', '
      )}]`,
      VALID_VARIANTS.includes(variant ?? 'secondary')
    );

    return variant || 'secondary';
  }

  get styles() {
    let buttonStyles = [...STYLES.base, ...STYLES.variants[this.variant]];
    let disabledStyles = ['interactive-disabled', 'focus:outline-none'];

    if (this.variant !== 'link') {
      buttonStyles.push('px-4', 'py-1');
    }

    return this.args.isDisabled
      ? [...buttonStyles, ...disabledStyles].join(' ')
      : buttonStyles.join(' ');
  }

  @action
  onClick(event: Event) {
    if (this.args.isDisabled) {
      event.stopImmediatePropagation();

      return;
    }

    if (this.args.onClick) {
      return this.args.onClick(event);
    }
  }
}
