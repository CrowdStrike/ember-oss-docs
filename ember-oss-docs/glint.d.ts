import type { ComponentLike } from '@glint/template';

import type {
  App, Main, Hero, ExternalLink,
  ContentSection, SubSection, TopBar
} from '@crowdstrike/ember-oss-docs';

import type * as Toucan from '@crowdstrike/tailwind-toucan-base/components/toucan';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    // Logo
    CrowdStrike: ComponentLike;

    /**
      * Docs / layout components
      */
    App: typeof App;
    ContentSection: typeof ContentSection;
    SubSection: typeof SubSection;
    TopBar: typeof TopBar;
    Hero: typeof Hero;
    Main: typeof Main;
    DocsWrapper: ComponentLike<{
      Blocks: { default: [] }
    }>;

    /**
      * Utility components
      */
    ExternalLink: typeof ExternalLink;

    /**
      * Toucan, the component library, placeholders
      */
    'Toucan::Link': typeof Toucan.Link;
    'Toucan::Icon': typeof Toucan.Icon;
    'Toucan::Input': typeof Toucan.Input;
    'Toucan::Button': typeof Toucan.Button;

  }
}
