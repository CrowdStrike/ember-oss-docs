import type * as Toucan from './components/toucan';
import type * as Docs from './index';
import type { ComponentLike } from '@glint/template';

// Easily allow apps, which are not yet using strict mode templates, to consume your Glint types, by importing this file.
// Add all your components, helpers and modifiers to the template registry here, so apps don't have to do this.
// See https://typed-ember.gitbook.io/glint/using-glint/ember/authoring-addons

// import type MyComponent from './components/my-component';

// Remove this once entries have been added! 👇
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface Registry {
  // Logo
  CrowdStrike: typeof Docs.CrowdStrike;

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
    Blocks: { default: [] };
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
