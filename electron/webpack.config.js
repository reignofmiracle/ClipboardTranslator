module.exports = {
    mode: "production",
    target: "electron-main",
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader?modules"]
            }
        ]
    },
    entry: {
        "main/index": "./src/main/index.js",
        "renderer/app": "./src/renderer/app.jsx"
    },
    output: {
        filename: "[name].js"
    },
    devtool: "source-map"
}