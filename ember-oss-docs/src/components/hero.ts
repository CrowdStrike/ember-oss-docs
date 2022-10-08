import templateOnly from '@ember/component/template-only';

export default templateOnly<{
  Element: HTMLDivElement;
  Args: {
    image?: string;
  };
  Blocks: { default: [] };
}>();
