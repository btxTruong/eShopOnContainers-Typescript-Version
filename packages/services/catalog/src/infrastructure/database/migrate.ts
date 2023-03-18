import { migrator } from './umzug';

(async () => {
  await migrator.runAsCLI();
})();
