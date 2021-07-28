const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.ts',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader // 배포 환경에서는 스타일 로더가 아니다..
            : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      API_ENDPOINT: process.env.NODE_ENV === 'development' ? '' : '',
      OAUTH_URL:
        process.env.NODE_ENV === 'development'
          ? 'https://github.com/login/oauth/authorize?client_id=e009a04ee3ec22e75d33'
          : '',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '', // 빌드 환경에 따른 html 타이틀 출력 변경
      },
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
      hash: true, // 정적 파일을 불러올 때 쿼리문자열에 웹팩 해쉬 값을 추가하여 브라우져 캐쉬로 인해 배포 후 즉각 반영되지 않는 경우를 예방한다.
    }),
    new CleanWebpackPlugin(), // 이전 빌드 결과를 지우고 새롭게 빌드된 결과를 적용한다.
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: `[name].css` })] // 배포 환경에서만 별도의 css 파일을 만들어 역할을 분리한다.
      : []),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js', '.json', '.scss'],
  },
  devtool: 'source-map',
};
