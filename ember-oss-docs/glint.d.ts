import type { ComponentLike } from '@glint/template';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    App: ComponentLike<{
      Blocks: {
        topBar?: [];
        content: [];
        footer?: [];
      }
    }>;
    TopBar: ComponentLike<{
      Blocks: {
        logo?: [];
        title: [];
        links?: [];
      }
    }>;
    ExternalLink: ComponentLike<{
      Element: HTMLAnchorElement;
      Args: {
        href: string;
      };
      Blocks: { default: [] }
    }>;
    Hero: ComponentLike<{
      Element: HTMLDivElement;
      Args: {
        image?: string;
      }
      Blocks: { default: [] }
    }>;
    Main: ComponentLike<{
      Blocks: { default: [] }
    }>;
  }
}
