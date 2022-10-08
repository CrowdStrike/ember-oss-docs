import '@glint/environment-ember-loose';
import '@crowdstrike/ember-oss-docs/glint';

import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Rendering | all - loose mode', function (hooks) {
  setupRenderingTest(hooks);

  test('all components can be rendered', async function (assert) {
    await render(hbs`
        <App>
          <:topBar>x</:topBar>
          <:content></:content>
          <:footer></:footer>
        </App>
        <ContentSection>
          <:header>x</:header>
          <:content>x</:content>
          <:footer>x</:footer>
        </ContentSection>
      `);

    assert.true(true, 'we did it');
  });
});
