import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BjD9Cs6i.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/eateries.astro.mjs');
const _page3 = () => import('./pages/api/support.astro.mjs');
const _page4 = () => import('./pages/catalog/_etr_name_.astro.mjs');
const _page5 = () => import('./pages/catalog.astro.mjs');
const _page6 = () => import('./pages/contact.astro.mjs');
const _page7 = () => import('./pages/experience.astro.mjs');
const _page8 = () => import('./pages/map.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/eateries.ts", _page2],
    ["src/pages/api/support.ts", _page3],
    ["src/pages/catalog/[etr_name].astro", _page4],
    ["src/pages/catalog.astro", _page5],
    ["src/pages/contact.astro", _page6],
    ["src/pages/experience.astro", _page7],
    ["src/pages/map.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "ccb635a1-121a-49b0-aa46-79ccf0d13bc2"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
