const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Web platform configuration
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Resolver configuration for better web compatibility
config.resolver.alias = {
  'react-native-vector-icons': 'react-native-vector-icons/dist',
};

// Transform configuration to reduce warnings
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// Reduce warnings by enabling modern features
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  },
});

module.exports = config;
