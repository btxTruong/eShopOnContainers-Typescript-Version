import { doNothing } from '@utils/general';

import { migrator } from './umzug';

(async () => {
  await migrator.runAsCLI();
})().finally(doNothing);
