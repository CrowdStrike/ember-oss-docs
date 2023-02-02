'use strict';

const path = require('path');
const merge = require('lodash.merge');

module.exports = {
  tailwindConfig(appRoot, overrides = {}) {
    const appEntry = path.join(appRoot, 'app');
    const relevantFilesGlob = '**/*.{html,js,ts,hbs,gjs,gts}';

    const packageJson = require(path.join(appRoot, 'package.json'));
    const appPath = path.join(appEntry, relevantFilesGlob);

    const contentPaths = [
      appPath,

      /**
       * Also check if addons/libraries contain any tailwind classes
       * that we need to include
       */
      ...Object.keys(packageJson.dependencies).map((depName) => {
        const packagePath = path.dirname(require.resolve(depName, { paths: [appRoot] }));

        return `${packagePath}/${relevantFilesGlob}`;
      }),
    ];

    const base = {
      theme: {
        extend: {
          screens: {
            xs: '480px',
            sm: '768px',
            md: '1024px',
          },
        },
      },
      // This rule seems forever incorrect -- should probably be removed
      // eslint-disable-next-line n/no-missing-require
      presets: [require('@crowdstrike/tailwind-toucan-base')],
      safelist: ['theme-dark', 'theme-light', 'theme-mezzanine'],
      // eslint-disable-next-line n/no-missing-require
      plugins: [require('@tailwindcss/typography')],
    };

    return merge(base, overrides, {
      /**
       * Array merging is goofy, so we manage this ourselves
       */
      content: [...contentPaths, ...(overrides?.content ?? [])],
    });
  },
};
