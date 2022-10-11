import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

import * as OSS from '@crowdstrike/ember-oss-docs';

/**
 * Disclaimer, these tests aren't worth much outside of "they don't error" (including via Glint)
 *
 * This is due to the temporary nature of some of these components, and also
 * the lack of docs (a docs app would have better tests)
 */
module('Rendering | all - strict mode', function(hooks) {
  setupRenderingTest(hooks);

  test('all components can be rendered', async function (assert) {
    const noop = () => {};

    await render(
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
        <OSS.CrowdStrike />
        <OSS.ExternalLink @href="#">x</OSS.ExternalLink>
        <OSS.Hero>x</OSS.Hero>
        <OSS.Main>x</OSS.Main>
        <OSS.SubSection>
          <:header>x</:header>
          <:content>x</:content>
          <:footer>x</:footer>
        </OSS.SubSection>
        <OSS.TopBar>
          <:logo>x</:logo>
          <:title>x</:title>
          <:links>x</:links>
        </OSS.TopBar>

        <OSS.Button @onClick={{noop}}>x</OSS.Button>
        <OSS.Icon @path="micro/caret-right-16" />
        <OSS.Input />
        <OSS.Link @href="#">x</OSS.Link>

      </template>
    );

    assert.true(true, 'we did it');
  });
})
