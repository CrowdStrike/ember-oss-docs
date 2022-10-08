import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

import * as OSS from '@crowdstrike/ember-oss-docs';

module('Rendering | all - strict mode', function(hooks) {
  setupRenderingTest(hooks);

  test('all components can be rendered', async function (assert) {
    await render(
      // @ts-ignore
      <template>
        <OSS.App>
          <:topBar>x</:topBar>
          <:content></:content>
          <:footer></:footer>
        </OSS.App>
        <OSS.ContentSection>
          <:header>x</:header>
          <:content>x</:content>
          <:footer>x</:footer>
        </OSS.ContentSection>
      </template>
    );

    assert.true(true, 'we did it');
  });
})
