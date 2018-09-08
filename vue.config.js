var waffle = require('./waffle.config');
module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'string-replace-loader',
                    options: {
                        search: '__API_ROOT__',
                        replace: waffle.apiRoot,
                        flags: 'g'
                    }
                }
            ]
        }
    }
}
