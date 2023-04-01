# chunks-report-webpack-plugin ![npm](https://img.shields.io/npm/v/chunks-report-webpack-plugin?style=plastic)

The plugin generates a report that contains all the assets of specific entrypoints.
This report can be used to render the page on the server 
(to include only the necessary styles and scripts).

**Report example**:

```js
{
    "index": {
        "js": ["vendor.js", "index.build.js"],
        "css": ["index.build.css"]
    },
    "office": {
        "js": ["vendor.js", "office.build.js"],
        "css": ["office.build.css"]
    }
}
```

## Getting started

```console
npm i -D chunks-report-webpack-plugin
```

## Usage

```js
const ChunksReportPlugin = require('chunks-report-webpack-plugin');

/** @type {webpack.Configuration} */
const config = {
    ...
    plugins: [
        ...
        new ChunksReportPlugin({
            outputPath: 'build/chunks-report.json',
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

**Default**: `'chunks-report.json'`

**Description**: Allows you to specify the path to the file that will contain the report.

### `assetTypes`

**Type**: 
```ts
{ 
    [type: string]: RegExp 
}
```

**Default**: 
```js
{
    js: /\.js$/,
    css: /\.css$/,
}
```

**Description**: 
Allows you to specify the types of assets that should be included in the report.
