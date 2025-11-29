const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, '..');

const config = getDefaultConfig(projectRoot);

// Watch the shared lib folder for changes (not the entire parent workspace)
config.watchFolders = [path.resolve(workspaceRoot, 'src/lib/shared')];

// Allow resolving @shared alias to parent workspace
config.resolver.extraNodeModules = {
  '@shared': path.resolve(workspaceRoot, 'src/lib/shared'),
};

module.exports = config;
