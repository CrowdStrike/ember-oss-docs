import templateOnly from '@ember/component/template-only';

export default templateOnly<{
  Element: HTMLAnchorElement;
  Args: {
    href: string;
  };
  Blocks: { default: [] };
}>();
