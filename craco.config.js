module.exports = {
  plugins: [
    {
      plugin: require('craco-less'),
      options: {
        cssLoaderOptions: {
          modules: { localIdentName: '[local]_[hash:base64:5]' },
        },
      },
    },
  ],
};