import type { ComponentLike } from '@glint/template';

import type * as Docs from '@crowdstrike/ember-oss-docs';
import type * as Toucan from '@crowdstrike/tailwind-toucan-base/components/toucan';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    // Logo
    CrowdStrike: ComponentLike;

    /**
      * Docs / layout components
      */
    App: typeof Docs.App;
    ContentSection: typeof Docs.ContentSection;
    SubSection: typeof Docs.SubSection;
    TopBar: typeof Docs.TopBar;
    Hero: typeof Docs.Hero;
    Main: typeof Docs.Main;
    DocsWrapper: ComponentLike<{
      Blocks: { default: [] }
    }>;

    /**
      * Utility components
      */
    ExternalLink: typeof Docs.ExternalLink;

    /**
      * Toucan, the component library, placeholders
      */
    'Toucan::Link': typeof Toucan.Link;
    'Toucan::Icon': typeof Toucan.Icon;
    'Toucan::Input': typeof Toucan.Input;
    'Toucan::Button': typeof Toucan.Button;

  }
}
