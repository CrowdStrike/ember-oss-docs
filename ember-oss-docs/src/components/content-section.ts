import templateOnly from '@ember/component/template-only';

export default templateOnly<{
  Element: HTMLElement;
  Blocks: {
    header?: [];
    content: [];
    footer?: [];
  };
}>();
