import { version, name } from '../package.json';

import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

(async () => {
    addons.setConfig({
        theme: create({
            base: 'light',
            brandTitle: `${name} - ${version}`
        })
    });
})();
