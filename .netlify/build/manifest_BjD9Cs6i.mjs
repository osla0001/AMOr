import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_DEISSyU0.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/oscarlaursen/Desktop/AMOr/","cacheDir":"file:///Users/oscarlaursen/Desktop/AMOr/node_modules/.astro/","outDir":"file:///Users/oscarlaursen/Desktop/AMOr/dist/","srcDir":"file:///Users/oscarlaursen/Desktop/AMOr/src/","publicDir":"file:///Users/oscarlaursen/Desktop/AMOr/public/","buildClientDir":"file:///Users/oscarlaursen/Desktop/AMOr/dist/","buildServerDir":"file:///Users/oscarlaursen/Desktop/AMOr/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"api/eateries","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/eateries","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/eateries\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"eateries","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/eateries.ts","pathname":"/api/eateries","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"catalog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/catalog","isIndex":false,"type":"page","pattern":"^\\/catalog\\/?$","segments":[[{"content":"catalog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/catalog.astro","pathname":"/catalog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"experience/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/experience","isIndex":false,"type":"page","pattern":"^\\/experience\\/?$","segments":[[{"content":"experience","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/experience.astro","pathname":"/experience","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"map/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/map","isIndex":false,"type":"page","pattern":"^\\/map\\/?$","segments":[[{"content":"map","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/map.astro","pathname":"/map","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/support","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/support\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"support","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/support.ts","pathname":"/api/support","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/oscarlaursen/Desktop/AMOr/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/oscarlaursen/Desktop/AMOr/src/pages/catalog.astro",{"propagation":"none","containsHead":true}],["/Users/oscarlaursen/Desktop/AMOr/src/pages/catalog/[etr_name].astro",{"propagation":"none","containsHead":true}],["/Users/oscarlaursen/Desktop/AMOr/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/oscarlaursen/Desktop/AMOr/src/pages/experience.astro",{"propagation":"none","containsHead":true}],["/Users/oscarlaursen/Desktop/AMOr/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/oscarlaursen/Desktop/AMOr/src/pages/map.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/eateries@_@ts":"pages/api/eateries.astro.mjs","\u0000@astro-page:src/pages/api/support@_@ts":"pages/api/support.astro.mjs","\u0000@astro-page:src/pages/catalog/[etr_name]@_@astro":"pages/catalog/_etr_name_.astro.mjs","\u0000@astro-page:src/pages/catalog@_@astro":"pages/catalog.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/experience@_@astro":"pages/experience.astro.mjs","\u0000@astro-page:src/pages/map@_@astro":"pages/map.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BjD9Cs6i.mjs","/Users/oscarlaursen/Desktop/AMOr/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","/Users/oscarlaursen/Desktop/AMOr/src/pages/about.astro?astro&type=script&index=0&lang.ts":"_astro/about.astro_astro_type_script_index_0_lang.wAIg0G79.js","/Users/oscarlaursen/Desktop/AMOr/src/pages/catalog/[etr_name].astro?astro&type=script&index=0&lang.ts":"_astro/_etr_name_.astro_astro_type_script_index_0_lang.BU4EFsIu.js","/Users/oscarlaursen/Desktop/AMOr/src/pages/catalog.astro?astro&type=script&index=0&lang.ts":"_astro/catalog.astro_astro_type_script_index_0_lang.ByhTxDRd.js","/Users/oscarlaursen/Desktop/AMOr/src/pages/contact.astro?astro&type=script&index=0&lang.ts":"_astro/contact.astro_astro_type_script_index_0_lang.U70WbnU8.js","/Users/oscarlaursen/Desktop/AMOr/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.QwTFk1yn.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/oscarlaursen/Desktop/AMOr/src/pages/about.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(\".accordion-header\").forEach(e=>{e.addEventListener(\"click\",()=>{const c=e.parentElement,t=c?.classList.contains(\"active\");document.querySelectorAll(\".accordion-item\").forEach(a=>{a.classList.remove(\"active\")}),t||c?.classList.add(\"active\")})});"],["/Users/oscarlaursen/Desktop/AMOr/src/pages/catalog/[etr_name].astro?astro&type=script&index=0&lang.ts","document.getElementById(\"backLink\")?.addEventListener(\"click\",e=>{e.preventDefault(),document.referrer&&document.referrer!==window.location.href?window.history.back():window.location.href=\"/catalog\"});"],["/Users/oscarlaursen/Desktop/AMOr/src/pages/catalog.astro?astro&type=script&index=0&lang.ts","let s=[];(async()=>s=await(await fetch(new URL(\"/api/eateries\",window.location.origin))).json())();const a=document.getElementById(\"searchContainer\"),p=document.getElementById(\"searchButton\"),o=document.getElementById(\"searchInput\"),r=document.getElementById(\"catalogGrid\");p?.addEventListener(\"click\",t=>{t.preventDefault(),a?.classList.contains(\"expanded\")||(a?.classList.add(\"expanded\"),o?.focus())});document.addEventListener(\"click\",t=>{a?.contains(t.target)||(a?.classList.remove(\"expanded\"),o&&(o.value=\"\"),c(s))});o?.addEventListener(\"input\",t=>{const n=t.target.value.toLowerCase().trim();if(n===\"\"){c(s);return}const e=s.filter(i=>{const d=i.name?.toLowerCase()||\"\",l=i.cus_name?.toLowerCase()||\"\",u=i.address?.toLowerCase()||\"\";return d.includes(n)||l.includes(n)||u.includes(n)});c(e)});function c(t){if(!r)return;r.innerHTML=t.map(e=>`\n      <a \n        href=\"/catalog/${e.name.replace(/\\s+/g,\"\")}\" \n        id=\"eatery-${e.id}\" \n        class=\"catalog-card\"\n        style=\"\n          background-color: transparent;\n          padding: 10px;\n          text-decoration: none;\n          color: inherit;\n          display: flex;\n          flex-direction: column;\n          height: 100%;\n          min-height: 280px;\n          width: 100%;\n          max-width: 100%;\n          box-sizing: border-box;\n          overflow: hidden;\n        \"\n      >\n        <img \n          src=\"/eatery/${e.id}.png\" \n          alt=\"${e.name}\"\n          style=\"\n            height: 180px;\n            width: 100%;\n            max-width: 100%;\n            object-fit: cover;\n            display: block;\n          \"\n        />\n        <h5>${e.name}</h5>\n        <p style=\"font-size: 12px;\">${e.cus_name||\"Not specified\"}</p>\n        <p style=\"font-size: 12px;\">${e.address}</p>\n      </a>\n    `).join(\"\"),r.querySelectorAll(\".catalog-card\").forEach(e=>{e.addEventListener(\"mouseenter\",()=>{e.style.backgroundColor=\"rgba(0, 0, 0, 0.05)\"}),e.addEventListener(\"mouseleave\",()=>{e.style.backgroundColor=\"transparent\"})})}"],["/Users/oscarlaursen/Desktop/AMOr/src/pages/contact.astro?astro&type=script&index=0&lang.ts","document.querySelector(\".custom-select\");const t=document.querySelector(\".select-selected\"),a=document.querySelector(\".select-items\"),i=document.getElementById(\"topic\");t.addEventListener(\"click\",e=>{e.stopPropagation(),a.classList.toggle(\"select-hide\"),t.classList.toggle(\"select-arrow-active\")});const d=a.querySelectorAll(\"div\");d.forEach(e=>{e.addEventListener(\"click\",n=>{n.stopPropagation();const s=e.getAttribute(\"data-value\")||\"\",r=e.textContent||\"\";t.textContent=r,t.classList.add(\"active\"),i.value=s,d.forEach(l=>l.classList.remove(\"same-as-selected\")),e.classList.add(\"same-as-selected\"),a.classList.add(\"select-hide\"),t.classList.remove(\"select-arrow-active\")})});document.addEventListener(\"click\",()=>{a.classList.add(\"select-hide\"),t.classList.remove(\"select-arrow-active\")});const c=document.getElementById(\"contactForm\"),o=document.getElementById(\"response\");c.addEventListener(\"submit\",async e=>{e.preventDefault();const n=new FormData(c),s=c.querySelector(\"button\");s.disabled=!0,s.textContent=\"Sending...\";try{if((await fetch(\"/api/support\",{method:\"POST\",body:n})).ok)o.className=\"response-message success\",o.textContent=\"Your message has been sent! We'll get back to you as soon as possible.\",c.reset(),t.textContent=\"Topic\",t.classList.remove(\"active\"),i.value=\"\",d.forEach(l=>l.classList.remove(\"same-as-selected\"));else throw new Error(\"Submission error\")}catch{o.className=\"response-message error\",o.textContent=\"An error occurred. Please try again later.\"}finally{s.disabled=!1,s.textContent=\"Send Message\"}});"],["/Users/oscarlaursen/Desktop/AMOr/src/pages/index.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"landingVideo\");console.log(\"Landing video element:\",e),e?(e.removeAttribute(\"loop\"),e.addEventListener(\"ended\",()=>{console.log(\"Video ended, waiting 10 seconds...\"),setTimeout(()=>{console.log(\"Restarting video now\"),e.currentTime=0,e.play()},1e4)}),console.log(\"Event listener attached\")):console.error(\"Landing video not found!\")});"]],"assets":["/_astro/about.BUADunS6.css","/logo.svg","/eatery/1.png","/eatery/1_1.png","/eatery/1_2.png","/eatery/2.png","/eatery/3.png","/eatery/4.png","/eatery/5.png","/eatery/6.png","/eatery/7.png","/eatery/8.png","/eatery/9.png","/favicon/apple-touch-icon.png","/favicon/favicon-96x96.png","/favicon/favicon.ico","/favicon/favicon.svg","/favicon/site.webmanifest","/favicon/web-app-manifest-192x192.png","/favicon/web-app-manifest-512x512.png","/icons/facebook.svg","/icons/instagram.svg","/icons/linkedin.svg","/icons/pink-pin.png","/icons/x.svg","/images/about_us.png","/images/amor_mg.mp4","/images/amor_mg_red.mp4","/images/beginning.png","/images/collect.png","/images/color_background.png","/images/connect.png","/images/contact_index.png","/images/explore.png","/images/game_index.png","/images/hero_mg.mp4","/images/landing_video.mp4","/images/local.png","/images/map_index.png","/images/sign.png","/images/vision.png","/images/visit.png","/about/index.html","/api/eateries","/catalog/index.html","/contact/index.html","/experience/index.html","/map/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"DI1b0rYPsnZWqFm8nPTbO8HwHu/IzS3iH9wXwOMTFVg=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
