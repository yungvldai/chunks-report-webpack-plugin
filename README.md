# collect-chunks-webpack-plugin

The plugin generates a report that contains all the assets of specific entrypoints.
This report can be used to render the page on the server 
(to include only the necessary styles and scripts).

**Report example**:

```js
{
    index: {
        js: [ 'vendor.js', 'index.build.js' ],
        css: [ 'index.build.css' ]
    },
    office: {
        js: [ 'vendor.js', 'office.build.js' ],
        css: [ 'office.build.css' ]
    },
}
```

## Getting started

```console
npm i -D collect-chunks-webpack-plugin
```

## Usage

```js
const CollectChunksPlugin = require('collect-chunks-webpack-plugin');

/** @type {webpack.Configuration} */
const config = {
    ...
    plugins: [
        ...
        new CollectChunksWebpackPlugin({
            outputPath: 'build/chunks.json',
            assetTypes: {
                js: /\.js$/,
                css: /\.css$/,
            },
        }),
        ...
    ],
    ...
};
```

## Options

### `outputPath`

**Type**: `string`

**Default**: `'chunks.json'`

**Description**: Allows you to specify the path to the file that will contain the report.

### `assetTypes`

**Type**: `{ [type: string]: RegExp }`

**Default**: 
```js
{
    js: /\.js$/,
    css: /\.css$/,
},
```

**Description**: 
Allows you to specify the types of assets that should be included in the report.