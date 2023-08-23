ember-oss-docs
==============================================================================

Generally not for usage in non-CrowdStrike projects,
as documentation for this addon may be light,
and is highly coupled to the Toucan design system.

This library does not provide any semver guarantees.

## Using Tailwind

Use this guide to setup Tailwind: https://discuss.emberjs.com/t/ember-modern-css/19614

```js
// tailwind.config.js
'use strict';

const { tailwindConfig } = require('@crowdstrike/ember-oss-docs/tailwind');

module.exports = tailwindConfig(__dirname);
```

Includes:
- watches addons' files for JIT
- preconfigured to handle html/js/ts/gjs/gts/hbs files
- preconfigured theme safelist
- uses the [`@crowdstrike/tailwind-toucan-base`](https://github.com/CrowdStrike/tailwind-toucan-base) preset


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.28 or above
* Embroider or ember-auto-import v2


Installation
------------------------------------------------------------------------------

```
ember install @crowdstrike/ember-oss-docs
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
