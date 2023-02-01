import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

/**
 * Disclaimer, these tests aren't worth much outside of "they don't error" (including via Glint)
 *
 * This is due to the temporary nature of some of these components, and also
 * the lack of docs (a docs app would have better tests)
 */
module('Rendering | all - loose mode', function (hooks) {
  setupRenderingTest(hooks);

  test('all components can be rendered', async function (assert) {
    this.setProperties({
      noop: () => {
        /* intentionally empty */
      },
    });

    await render(hbs`
      <App>
        <:topBar>x</:topBar>
        <:content>x</:content>
        <:footer>x</:footer>
      </App>
      <ContentSection>
        <:header>x</:header>
        <:content>x</:content>
        <:footer>x</:footer>
      </ContentSection>
      <CrowdStrike />
      <ExternalLink @href="#">x</ExternalLink>
      <Hero>x</Hero>
      <Main>x</Main>
      <SubSection>
        <:header>x</:header>
        <:content>x</:content>
        <:footer>x</:footer>
      </SubSection>
      <TopBar>
        <:logo>x</:logo>
        <:title>x</:title>
        <:links>x</:links>
      </TopBar>

      <Toucan::Button @onClick={{this.noop}}>x</Toucan::Button>
      <Toucan::Icon @path="micro/caret-right-16" />
      <Toucan::Input />
      <Toucan::Link @href="#">x</Toucan::Link>
    `);

    assert.true(true, 'we did it');
  });
});
