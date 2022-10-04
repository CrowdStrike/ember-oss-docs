import type { ComponentLike } from '@glint/template';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    // Logo
    CrowdStrike: ComponentLike;

    /**
      * Docs / layout components
      */
    App: ComponentLike<{
      Blocks: {
        topBar?: [];
        content: [];
        footer?: [];
      }
    }>;
    ContentSection: ComponentLike<{
      Blocks: {
        header?: [];
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
    DocsWrapper: ComponentLike<{
      Blocks: { default: [] }
    }>;

    /**
      * Utility components
      */
    ExternalLink: ComponentLike<{
      Element: HTMLAnchorElement;
      Args: {
        href: string;
      };
      Blocks: { default: [] }
    }>;

    /**
      * Toucan, the component library, placeholders
      */
    'Toucan::Link': ComponentLike<{
      Element: HTMLAnchorElement;
      Args: {
        href: string;
        variant?: string;
      };
      Blocks: { default: [] }
    }>

  }
}
