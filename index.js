var sen_farming_v2;(()=>{"use strict";var e={57253:(e,r,t)=>{var _={"./bootstrap":()=>Promise.all([t.e("vendors-node_modules_react-router_esm_react-router_js"),t.e("vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140"),t.e("vendors-node_modules_moment_moment_js-node_modules_babel_runtime_helpers_esm_defineProperty_js"),t.e("vendors-node_modules_sen-use_app_dist_hooks_useAccountBalance_js-node_modules_sen-use_compone-8ae23b"),t.e("webpack_sharing_consume_default_react_react"),t.e("webpack_sharing_consume_default_react-dom_react-dom"),t.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479"),t.e("webpack_sharing_consume_default_sentre_senhub_sentre_senhub"),t.e("node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-src_bootstrap_app_tsx-sr-49b12f")]).then((()=>()=>t(79486)))},o=(e,r)=>(t.R=r,r=t.o(_,e)?_[e]():Promise.resolve().then((()=>{throw new Error('Module "'+e+'" does not exist in container.')})),t.R=void 0,r),s=(e,r)=>{if(t.S){var _="default",o=t.S[_];if(o&&o!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return t.S[_]=e,t.I(_,r)}};t.d(r,{get:()=>o,init:()=>s})}},r={};function t(_){var o=r[_];if(void 0!==o)return o.exports;var s=r[_]={id:_,loaded:!1,exports:{}};return e[_].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}t.m=e,t.c=r,t.amdO={},t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},(()=>{var e,r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;t.t=function(_,o){if(1&o&&(_=this(_)),8&o)return _;if("object"===typeof _&&_){if(4&o&&_.__esModule)return _;if(16&o&&"function"===typeof _.then)return _}var s=Object.create(null);t.r(s);var n={};e=e||[null,r({}),r([]),r(r)];for(var d=2&o&&_;"object"==typeof d&&!~e.indexOf(d);d=r(d))Object.getOwnPropertyNames(d).forEach((e=>n[e]=()=>_[e]));return n.default=()=>_,t.d(s,n),s}})(),t.d=(e,r)=>{for(var _ in r)t.o(r,_)&&!t.o(e,_)&&Object.defineProperty(e,_,{enumerable:!0,get:r[_]})},t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce(((r,_)=>(t.f[_](e,r),r)),[])),t.u=e=>"static/js/"+e+"."+{"vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js":"fa36cc78","vendors-node_modules_react-router_esm_react-router_js":"c7415f77","vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140":"882dd80f",webpack_sharing_consume_default_react_react:"5720d677","webpack_sharing_consume_default_react-dom_react-dom":"8d6445db","webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479":"8220f480","node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-node_modules_react_jsx-r-7486bc":"fb7eeac6","vendors-node_modules_moment_moment_js-node_modules_babel_runtime_helpers_esm_defineProperty_js":"03b01651","vendors-node_modules_antd_es_index_js":"327425c4","node_modules_copy-to-clipboard_index_js-node_modules_react-is_index_js-node_modules_babel_run-43d171":"bc85e89b","vendors-node_modules_react-dom_index_js":"4d8336fe","vendors-node_modules_react-redux_es_index_js":"2d0b8c8c","node_modules_hoist-non-react-statics_dist_hoist-non-react-statics_cjs_js-node_modules_babel_r-e54863":"dbfc204e","node_modules_react-router-dom_esm_react-router-dom_js-_d6f00":"4af96bdc",node_modules_react_index_js:"993277c0","vendors-node_modules_sen-use_app_dist_hooks_useAccountBalance_js-node_modules_sen-use_compone-8ae23b":"d8912c33",webpack_sharing_consume_default_sentre_senhub_sentre_senhub:"30ea3d9c","node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-src_bootstrap_app_tsx-sr-49b12f":"bc97aa16","node_modules_react-router-dom_esm_react-router-dom_js-_d6f01":"8cea4f74",node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive:"f16b9afc"}[e]+".chunk.js",t.miniCssF=e=>"static/css/"+e+"."+{"vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140":"357fd0a0","node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-src_bootstrap_app_tsx-sr-49b12f":"fb555d3f"}[e]+".chunk.css",t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={},r="sen_farming_v2:";t.l=(_,o,s,n)=>{if(e[_])e[_].push(o);else{var d,a;if(void 0!==s)for(var u=document.getElementsByTagName("script"),i=0;i<u.length;i++){var c=u[i];if(c.getAttribute("src")==_||c.getAttribute("data-webpack")==r+s){d=c;break}}d||(a=!0,(d=document.createElement("script")).charset="utf-8",d.timeout=120,t.nc&&d.setAttribute("nonce",t.nc),d.setAttribute("data-webpack",r+s),d.src=_),e[_]=[o];var l=(r,t)=>{d.onerror=d.onload=null,clearTimeout(m);var o=e[_];if(delete e[_],d.parentNode&&d.parentNode.removeChild(d),o&&o.forEach((e=>e(t))),r)return r(t)},m=setTimeout(l.bind(null,void 0,{type:"timeout",target:d}),12e4);d.onerror=l.bind(null,d.onerror),d.onload=l.bind(null,d.onload),a&&document.head.appendChild(d)}}})(),t.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{t.S={};var e={},r={};t.I=(_,o)=>{o||(o=[]);var s=r[_];if(s||(s=r[_]={}),!(o.indexOf(s)>=0)){if(o.push(s),e[_])return e[_];t.o(t.S,_)||(t.S[_]={});var n=t.S[_],d="sen_farming_v2",a=(e,r,t,_)=>{var o=n[e]=n[e]||{},s=o[r];(!s||!s.loaded&&(!_!=!s.eager?_:d>s.from))&&(o[r]={get:t,from:d,eager:!!_})},u=[];if("default"===_)a("@reduxjs/toolkit","1.8.4",(()=>t.e("vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js").then((()=>()=>t(57853))))),a("@sentre/senhub","3.2.8",(()=>Promise.all([t.e("vendors-node_modules_react-router_esm_react-router_js"),t.e("vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140"),t.e("webpack_sharing_consume_default_react_react"),t.e("webpack_sharing_consume_default_react-dom_react-dom"),t.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479"),t.e("node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-node_modules_react_jsx-r-7486bc")]).then((()=>()=>t(85647))))),a("antd","4.22.4",(()=>Promise.all([t.e("vendors-node_modules_moment_moment_js-node_modules_babel_runtime_helpers_esm_defineProperty_js"),t.e("vendors-node_modules_antd_es_index_js"),t.e("webpack_sharing_consume_default_react_react"),t.e("webpack_sharing_consume_default_react-dom_react-dom"),t.e("node_modules_copy-to-clipboard_index_js-node_modules_react-is_index_js-node_modules_babel_run-43d171")]).then((()=>()=>t(89262))))),a("react-dom","17.0.2",(()=>Promise.all([t.e("vendors-node_modules_react-dom_index_js"),t.e("webpack_sharing_consume_default_react_react")]).then((()=>()=>t(81108))))),a("react-redux","7.2.8",(()=>Promise.all([t.e("vendors-node_modules_react-redux_es_index_js"),t.e("webpack_sharing_consume_default_react_react"),t.e("webpack_sharing_consume_default_react-dom_react-dom"),t.e("node_modules_hoist-non-react-statics_dist_hoist-non-react-statics_cjs_js-node_modules_babel_r-e54863")]).then((()=>()=>t(59771))))),a("react-router-dom","5.3.3",(()=>Promise.all([t.e("vendors-node_modules_react-router_esm_react-router_js"),t.e("webpack_sharing_consume_default_react_react"),t.e("node_modules_react-router-dom_esm_react-router-dom_js-_d6f00")]).then((()=>()=>t(9402))))),a("react","17.0.2",(()=>t.e("node_modules_react_index_js").then((()=>()=>t(7276)))));return u.length?e[_]=Promise.all(u).then((()=>e[_]=1)):e[_]=1}}})(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var r=t.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var _=r.getElementsByTagName("script");_.length&&(e=_[_.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),(()=>{var e=e=>{var r=e=>e.split(".").map((e=>+e==e?+e:e)),t=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),_=t[1]?r(t[1]):[];return t[2]&&(_.length++,_.push.apply(_,r(t[2]))),t[3]&&(_.push([]),_.push.apply(_,r(t[3]))),_},r=(r,t)=>{r=e(r),t=e(t);for(var _=0;;){if(_>=r.length)return _<t.length&&"u"!=(typeof t[_])[0];var o=r[_],s=(typeof o)[0];if(_>=t.length)return"u"==s;var n=t[_],d=(typeof n)[0];if(s!=d)return"o"==s&&"n"==d||"s"==d||"u"==s;if("o"!=s&&"u"!=s&&o!=n)return o<n;_++}},_=e=>{var r=e[0],t="";if(1===e.length)return"*";if(r+.5){t+=0==r?">=":-1==r?"<":1==r?"^":2==r?"~":r>0?"=":"!=";for(var o=1,s=1;s<e.length;s++)o--,t+="u"==(typeof(d=e[s]))[0]?"-":(o>0?".":"")+(o=2,d);return t}var n=[];for(s=1;s<e.length;s++){var d=e[s];n.push(0===d?"not("+a()+")":1===d?"("+a()+" || "+a()+")":2===d?n.pop()+" "+n.pop():_(d))}return a();function a(){return n.pop().replace(/^\((.+)\)$/,"$1")}},o=(r,t)=>{if(0 in r){t=e(t);var _=r[0],s=_<0;s&&(_=-_-1);for(var n=0,d=1,a=!0;;d++,n++){var u,i,c=d<r.length?(typeof r[d])[0]:"";if(n>=t.length||"o"==(i=(typeof(u=t[n]))[0]))return!a||("u"==c?d>_&&!s:""==c!=s);if("u"==i){if(!a||"u"!=c)return!1}else if(a)if(c==i)if(d<=_){if(u!=r[d])return!1}else{if(s?u>r[d]:u<r[d])return!1;u!=r[d]&&(a=!1)}else if("s"!=c&&"n"!=c){if(s||d<=_)return!1;a=!1,d--}else{if(d<=_||i<c!=s)return!1;a=!1}else"s"!=c&&"n"!=c&&(a=!1,d--)}}var l=[],m=l.pop.bind(l);for(n=1;n<r.length;n++){var f=r[n];l.push(1==f?m()|m():2==f?m()&m():f?o(f,t):!m())}return!!m()},s=(e,t)=>{var _=e[t];return Object.keys(_).reduce(((e,t)=>!e||!_[e].loaded&&r(e,t)?t:e),0)},n=(e,r,t,o)=>"Unsatisfied version "+t+" from "+(t&&e[r][t].from)+" of shared singleton module "+r+" (required "+_(o)+")",d=(e,r,t,_)=>{var d=s(e,t);return o(_,d)||"undefined"!==typeof console&&console.warn&&console.warn(n(e,t,d,_)),a(e[t][d])},a=e=>(e.loaded=1,e.get()),u=e=>function(r,_,o,s){var n=t.I(r);return n&&n.then?n.then(e.bind(e,r,t.S[r],_,o,s)):e(r,t.S[r],_,o,s)},i=u(((e,r,_,o,s)=>r&&t.o(r,_)?d(r,0,_,o):s())),c={},l={92950:()=>i("default","react",[1,17,0,2],(()=>t.e("node_modules_react_index_js").then((()=>()=>t(7276))))),12181:()=>i("default","react-dom",[1,17,0,2],(()=>t.e("vendors-node_modules_react-dom_index_js").then((()=>()=>t(81108))))),19289:()=>i("default","@reduxjs/toolkit",[1,1,6,2],(()=>t.e("vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js").then((()=>()=>t(57853))))),94751:()=>i("default","antd",[1,4,21,0],(()=>Promise.all([t.e("vendors-node_modules_moment_moment_js-node_modules_babel_runtime_helpers_esm_defineProperty_js"),t.e("vendors-node_modules_antd_es_index_js")]).then((()=>()=>t(89262))))),55754:()=>i("default","react-redux",[1,7,2,5],(()=>t.e("vendors-node_modules_react-redux_es_index_js").then((()=>()=>t(59771))))),45055:()=>i("default","react-router-dom",[1,5,3,0],(()=>t.e("node_modules_react-router-dom_esm_react-router-dom_js-_d6f01").then((()=>()=>t(9402))))),77147:()=>i("default","@sentre/senhub",[1,3,2,8],(()=>Promise.all([t.e("vendors-node_modules_react-router_esm_react-router_js"),t.e("vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140"),t.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479"),t.e("node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive")]).then((()=>()=>t(85647))))),60258:()=>i("default","@sentre/senhub",[1,3,2,3],(()=>()=>t(85647)))},m={webpack_sharing_consume_default_react_react:[92950],"webpack_sharing_consume_default_react-dom_react-dom":[12181],"webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479":[19289,94751,55754,45055],webpack_sharing_consume_default_sentre_senhub_sentre_senhub:[77147],"node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-src_bootstrap_app_tsx-sr-49b12f":[60258]};t.f.consumes=(e,r)=>{t.o(m,e)&&m[e].forEach((e=>{if(t.o(c,e))return r.push(c[e]);var _=r=>{c[e]=0,t.m[e]=_=>{delete t.c[e],_.exports=r()}},o=r=>{delete c[e],t.m[e]=_=>{throw delete t.c[e],r}};try{var s=l[e]();s.then?r.push(c[e]=s.then(_).catch(o)):_(s)}catch(n){o(n)}}))}})(),(()=>{var e=e=>new Promise(((r,_)=>{var o=t.miniCssF(e),s=t.p+o;if(((e,r)=>{for(var t=document.getElementsByTagName("link"),_=0;_<t.length;_++){var o=(n=t[_]).getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(o===e||o===r))return n}var s=document.getElementsByTagName("style");for(_=0;_<s.length;_++){var n;if((o=(n=s[_]).getAttribute("data-href"))===e||o===r)return n}})(o,s))return r();((e,r,t,_)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=s=>{if(o.onerror=o.onload=null,"load"===s.type)t();else{var n=s&&("load"===s.type?"missing":s.type),d=s&&s.target&&s.target.href||r,a=new Error("Loading CSS chunk "+e+" failed.\n("+d+")");a.code="CSS_CHUNK_LOAD_FAILED",a.type=n,a.request=d,o.parentNode.removeChild(o),_(a)}},o.href=r,document.head.appendChild(o)})(e,s,r,_)})),r={sen_farming_v2:0};t.f.miniCss=(t,_)=>{r[t]?_.push(r[t]):0!==r[t]&&{"vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140":1,"node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-src_bootstrap_app_tsx-sr-49b12f":1}[t]&&_.push(r[t]=e(t).then((()=>{r[t]=0}),(e=>{throw delete r[t],e})))}})(),(()=>{var e={sen_farming_v2:0};t.f.j=(r,_)=>{var o=t.o(e,r)?e[r]:void 0;if(0!==o)if(o)_.push(o[2]);else if(/^webpack_sharing_consume_default_(re(act(\-dom_react\-dom|_react)|duxjs_toolkit_reduxjs_toolkit\-webpack_sharing_consume_defau\-e4c479)|sentre_senhub_sentre_senhub)$/.test(r))e[r]=0;else{var s=new Promise(((t,_)=>o=e[r]=[t,_]));_.push(o[2]=s);var n=t.p+t.u(r),d=new Error;t.l(n,(_=>{if(t.o(e,r)&&(0!==(o=e[r])&&(e[r]=void 0),o)){var s=_&&("load"===_.type?"missing":_.type),n=_&&_.target&&_.target.src;d.message="Loading chunk "+r+" failed.\n("+s+": "+n+")",d.name="ChunkLoadError",d.type=s,d.request=n,o[1](d)}}),"chunk-"+r,r)}};var r=(r,_)=>{var o,s,[n,d,a]=_,u=0;if(n.some((r=>0!==e[r]))){for(o in d)t.o(d,o)&&(t.m[o]=d[o]);if(a)a(t)}for(r&&r(_);u<n.length;u++)s=n[u],t.o(e,s)&&e[s]&&e[s][0](),e[s]=0},_=globalThis.webpackChunksen_farming_v2=globalThis.webpackChunksen_farming_v2||[];_.forEach(r.bind(null,0)),_.push=r.bind(null,_.push.bind(_))})();var _=t(57253);sen_farming_v2=_})();
//# sourceMappingURL=index.js.map