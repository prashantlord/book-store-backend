import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));

export const getVersion = (req, res) => {
  res.status(200).json({
    node_version: process.version,
    express_version: packageJson.dependencies.express || 'unknown',
    app_version: packageJson.version
  });
};
