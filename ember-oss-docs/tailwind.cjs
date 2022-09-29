'use strict';

const path = require('path');

module.exports = {
  tailwindConfig(appRoot, overrides = {}) {
    const appEntry = path.join(appRoot, 'app');
    const relevantFilesGlob = '**/*.{html,js,ts,hbs,gjs,gts}';

    const packageJson = require(path.join(appRoot, 'package.json'));

    return {
      content: [
        path.join(appEntry, relevantFilesGlob),
        /**
         * Also check if addons/libraries contain any tailwind classes
         * that we need to include
         */
        ...Object.keys(packageJson.dependencies).map((depName) => {
          const packagePath = path.dirname(require.resolve(depName, { paths: [appRoot] }));

          return `${packagePath}/${relevantFilesGlob}`;
        }),
        ...overrides.content,
      ],
      theme: {
        extend: {
          screens: {
            sm: '768px',
            md: '1024px',
          },
        },
      },
      // This rule seems forever incorrect -- should probably be removed
      // eslint-disable-next-line node/no-missing-require
      presets: [require('@crowdstrike/tailwind-toucan-base')],
      safelist: ['theme-dark', 'theme-light', 'theme-mezzanine'],
      // eslint-disable-next-line node/no-missing-require
      plugins: [require('@tailwindcss/typography')],
    };
  },
};
