const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        admin: './assets/src/js/admin.js',
        'dashboard-widget': './assets/src/js/dashboard-widget.js',
        script: './assets/src/js/script.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'assets/dist/js')
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: [/\/node_modules\//],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-react",
                                ['@babel/preset-env', {
                                    targets: '> 0.2%, last 2 versions, not dead, Firefox ESR'
                                }]
                            ]
                        }
                    }
            },
            {
                test: /\.s?[ca]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
                ]
    },
    externals: {
        moment: 'moment',
        '@wordpress/i18n': 'wp.i18n',
        react: 'window.React',
        'react-dom': 'window.ReactDOM',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './assets/src/img', to: path.resolve(__dirname, './assets/dist/img') }
            ]
        })
    ],

}
