import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    entries: ['src/index.ts'],
    clean: true,
    declaration: 'compatible',
    rollup: {
        emitCJS: true,
        esbuild: {
            minify: true,
        },
    },
});
