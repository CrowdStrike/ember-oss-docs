import "@glint/environment-ember-loose";
import "@glint/environment-ember-template-imports";

import '@crowdstrike/ember-oss-docs/glint';

import type { HelperLike } from "@glint/template";

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    // Local types here
    'page-title': HelperLike;
  }
}
