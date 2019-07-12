const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {},
    }),
);

const servFileFallBack = () => config => {
    if (process.argv.includes("--watch-all")) {
        delete config.watchOptions;
    }
    return config;
};


