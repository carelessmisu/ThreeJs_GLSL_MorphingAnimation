// パス操作を行うためのpathモジュールをインポート
// Node.jsに標準搭載されている
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// モジュールの作成
module.exports = {
    // モジュールバンドルを行うファイルの指定
    // entry内のプロパティ名がアウトプットファイル名になる（今回の場合main.jsとなる）
    entry: {
        main: './src/ts/client.ts',
    },
    // ちなみにwebpackは標準でmain.jsというファイル名でアウトプットを行うため、以下のように書き換えることも可能
    // entry: './src/ts/index.ts',

    // アウトプットディレクトリの指定
    output: {
        path: path.join(__dirname, 'public/dist'),
    },

    // モジュール解決方法の設定
    resolve: {
        // モジュールとして扱いたいファイルの拡張子を省略する。
        // import { hoge } from 'Hoge'; とあった場合、Hoge.tsを読み込む。なければHoge.jsを読み込む。
        extensions: ['.ts', '.js'],
    },

    // モジュールに適用するルールの設定
    module: {
        // 拡張子が.tsで終わるファイルに対して、ts-loaderを適用している
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
            {
                test: /\.(scss|sass|css)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(frag|vert|glsl)$/,
                exclude: '/node_modules/',
                use: [
                    'raw-loader',
                    'glslify-loader'
                ]
            },
        ],
    },

    // webpackの機能拡張
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css', // アウトプットCSSファイル
        }),
    ],

    // webpack-dev-serverの設定
    devServer: {
        static: {
            // 公開ディレクトリの指定
            directory: path.join(__dirname, 'public/dist'),
        },
        // ポート番号の指定
        port: 9000,
    },

    // 監視除外ファイルの指定
    watchOptions: {
        ignored: /node_modules/,
    },
};
