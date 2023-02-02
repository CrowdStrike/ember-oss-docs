import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type EmberOssDocs from '@crowdstrike/ember-oss-docs/template-registry';
import type { HelperLike } from '@glint/template';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberOssDocs {
    // Local types here
    'page-title': HelperLike;
  }
}
