module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Keep this line
    ['module:react-native-dotenv', {
      moduleName: 'react-native-dotenv',
      path: '.env',
    }],
  ],
};
