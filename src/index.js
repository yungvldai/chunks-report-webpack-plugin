const { writeFileSync, existsSync, mkdirSync } = require('fs');
const { dirname } = require('path');

class ChunksReportPlugin {
    static defaultOptions = {
        outputPath: 'chunks-report.json',
        assetTypes: {
            js: /\.js$/,
            css: /\.css$/,
        },
    };

    constructor(options = {}) {
        this.options = {
            ...ChunksReportPlugin.defaultOptions,
            ...options,
        };
    }

    apply(compiler) {
        compiler.hooks.emit.tap('ChunksReportPlugin', (compilation) => {
            const entrypoints = {};

            for (const [name, entrypoint] of compilation.entrypoints) {
                entrypoints[name] = {};

                const assets = entrypoint.chunks.reduce((acc, chunk) => {
                    return acc.concat(
                        Array.from(chunk.files).filter((file) => acc.indexOf(file) < 0)
                    );
                }, []);

                for (const [type, regex] of Object.entries(this.options.assetTypes)) {
                    entrypoints[name][type] = assets.filter((asset) => regex.test(asset));
                }
            }

            const stringifyArgs = [entrypoints];

            if (compiler.options.mode === 'development') {
                stringifyArgs.push(null, 4);
            }

            const dir = dirname(this.options.outputPath);

            if (!existsSync(dir)) {
                mkdirSync(dir, { recursive: true });
            }

            writeFileSync(this.options.outputPath, JSON.stringify.apply(null, stringifyArgs));
        });
    }
}

module.exports = ChunksReportPlugin;
