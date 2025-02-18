
import webpack, {Configuration, DefinePlugin} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
// import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
// import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({mode, paths}: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({ template: paths.html }),

        // new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
    ]
        // new DefinePlugin({
        //     __PLATFORM__: JSON.stringify(platform),
        //     __ENV__: JSON.stringify(mode),
        // }),

    if(isDev) {
        plugins.push(new webpack.ProgressPlugin())
        /** Выносит проверку типов в отдельный процесс: не нагружая сборку */
        // plugins.push(new ForkTsCheckerWebpackPlugin())
        // plugins.push(new ReactRefreshWebpackPlugin())
    }

    if(isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }))
        plugins.push(new BundleAnalyzerPlugin())
        // plugins.push(new CopyPlugin({
        //     patterns: [
        //         { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
        //     ],
        // }),)
    }

    // if(analyzer) {
    //     plugins.push(new BundleAnalyzerPlugin())
    // }

    return plugins;
    
}









///////////

// import webpack, {Configuration, DefinePlugin} from "webpack";
// import HtmlWebpackPlugin from "html-webpack-plugin";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import {BuildOptions} from "./types/types";
// // import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
// // import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
// // import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
// import path from "path";
// // import CopyPlugin from "copy-webpack-plugin";

// export function buildPlugins(mode: BuildOptions): Configuration['plugins'] {
//     const isDev = mode === 'development';
//     const isProd = mode === 'production';

//     return [
        
//             new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
//             isDev && new webpack.ProgressPlugin(), // показывает прогресс, но тормозит
//             isProd && new MiniCssExtractPlugin(
//                     {
//                         filename: "css/[name].[contenthash:8].css",
//                         chunkFilename: "css/name].[contenthash:8].css",
                          
//                     }
//             ),
//     ].filter(Boolean)
    
// }


