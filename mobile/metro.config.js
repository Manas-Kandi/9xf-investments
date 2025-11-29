const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, '..');

const config = getDefaultConfig(projectRoot);

// Allow importing from the parent workspace (for @shared alias)
config.watchFolders = [workspaceRoot];

// Ensure Metro can find node_modules in both locations
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Allow resolving packages from parent workspace
config.resolver.extraNodeModules = {
  '@shared': path.resolve(workspaceRoot, 'src/lib/shared'),
};

module.exports = config;
