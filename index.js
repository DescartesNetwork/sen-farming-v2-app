var sen_farming_v2;(()=>{"use strict";var e={57253:(e,_,r)=>{var t={"./bootstrap":()=>Promise.all([r.e("vendors-node_modules_project-serum_anchor_dist_browser_index_js-node_modules_senswap_sen-js_d-1f3395"),r.e("vendors-node_modules_moment_moment_js-node_modules_babel_runtime_helpers_esm_defineProperty_js"),r.e("vendors-node_modules_sen-use_app_dist_hooks_useAccountBalance_js-node_modules_sen-use_compone-9f6947"),r.e("webpack_sharing_consume_default_react_react"),r.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479"),r.e("webpack_sharing_consume_default_sentre_senhub_sentre_senhub"),r.e("src_bootstrap_app_tsx-src_static_images_banner_png-webpack_sharing_consume_default_sentre_sen-20d9d7")]).then((()=>()=>r(26865)))},s=(e,_)=>(r.R=_,_=r.o(t,e)?t[e]():Promise.resolve().then((()=>{throw new Error('Module "'+e+'" does not exist in container.')})),r.R=void 0,_),o=(e,_)=>{if(r.S){var t="default",s=r.S[t];if(s&&s!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return r.S[t]=e,r.I(t,_)}};r.d(_,{get:()=>s,init:()=>o})}},_={};function r(t){var s=_[t];if(void 0!==s)return s.exports;var o=_[t]={id:t,loaded:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}r.m=e,r.c=_,r.amdO={},r.n=e=>{var _=e&&e.__esModule?()=>e.default:()=>e;return r.d(_,{a:_}),_},(()=>{var e,_=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;r.t=function(t,s){if(1&s&&(t=this(t)),8&s)return t;if("object"===typeof t&&t){if(4&s&&t.__esModule)return t;if(16&s&&"function"===typeof t.then)return t}var o=Object.create(null);r.r(o);var n={};e=e||[null,_({}),_([]),_(_)];for(var a=2&s&&t;"object"==typeof a&&!~e.indexOf(a);a=_(a))Object.getOwnPropertyNames(a).forEach((e=>n[e]=()=>t[e]));return n.default=()=>t,r.d(o,n),o}})(),r.d=(e,_)=>{for(var t in _)r.o(_,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:_[t]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((_,t)=>(r.f[t](e,_),_)),[])),r.u=e=>"static/js/"+e+"."+{"vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js":"fa36cc78","vendors-node_modules_react-router_esm_react-router_js":"3c7c6a48","vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140":"8efdd5ad","vendors-node_modules_project-serum_anchor_dist_browser_index_js-node_modules_senswap_sen-js_d-1f3395":"b78653bb","webpack_sharing_consume_default_react-dom_react-dom":"8d6445db",webpack_sharing_consume_default_react_react:"5720d677","webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479":"8220f480","node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-node_modules_react_jsx-r-7486bc":"a7b45442","vendors-node_modules_moment_moment_js-node_modules_babel_runtime_helpers_esm_defineProperty_js":"03b01651","vendors-node_modules_antd_es_index_js":"ab40c860","node_modules_copy-to-clipboard_index_js":"9d634da5","vendors-node_modules_react-dom_index_js":"4d8336fe","vendors-node_modules_react-redux_es_index_js":"4b73506e","node_modules_prop-types_index_js-node_modules_react-router-dom_esm_react-router-dom_js":"4d20460a",node_modules_react_index_js:"993277c0","vendors-node_modules_sen-use_app_dist_hooks_useAccountBalance_js-node_modules_sen-use_compone-9f6947":"bf94d0ff",webpack_sharing_consume_default_sentre_senhub_sentre_senhub:"30ea3d9c","src_bootstrap_app_tsx-src_static_images_banner_png-webpack_sharing_consume_default_sentre_sen-20d9d7":"39468492","node_modules_react-router-dom_esm_react-router-dom_js":"ae37719c","node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-_5aae-_18f2-_0b7d-_25ed--0c400a":"17c436ab","node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-_5aae-_18f2-_0b7d-_25ed--5e313a":"74a54473"}[e]+".chunk.js",r.miniCssF=e=>"static/css/"+e+"."+{"vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140":"357fd0a0","src_bootstrap_app_tsx-src_static_images_banner_png-webpack_sharing_consume_default_sentre_sen-20d9d7":"cc8885e6"}[e]+".chunk.css",r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),r.o=(e,_)=>Object.prototype.hasOwnProperty.call(e,_),(()=>{var e={},_="sen_farming_v2:";r.l=(t,s,o,n)=>{if(e[t])e[t].push(s);else{var a,d;if(void 0!==o)for(var u=document.getElementsByTagName("script"),i=0;i<u.length;i++){var c=u[i];if(c.getAttribute("src")==t||c.getAttribute("data-webpack")==_+o){a=c;break}}a||(d=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",_+o),a.src=t),e[t]=[s];var l=(_,r)=>{a.onerror=a.onload=null,clearTimeout(m);var s=e[t];if(delete e[t],a.parentNode&&a.parentNode.removeChild(a),s&&s.forEach((e=>e(r))),_)return _(r)},m=setTimeout(l.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=l.bind(null,a.onerror),a.onload=l.bind(null,a.onload),d&&document.head.appendChild(a)}}})(),r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{r.S={};var e={},_={};r.I=(t,s)=>{s||(s=[]);var o=_[t];if(o||(o=_[t]={}),!(s.indexOf(o)>=0)){if(s.push(o),e[t])return e[t];r.o(r.S,t)||(r.S[t]={});var n=r.S[t],a="sen_farming_v2",d=(e,_,r,t)=>{var s=n[e]=n[e]||{},o=s[_];(!o||!o.loaded&&(!t!=!o.eager?t:a>o.from))&&(s[_]={get:r,from:a,eager:!!t})},u=[];if("default"===t)d("@reduxjs/toolkit","1.8.4",(()=>r.e("vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js").then((()=>()=>r(57853))))),d("@sentre/senhub","3.2.8",(()=>Promise.all([r.e("vendors-node_modules_react-router_esm_react-router_js"),r.e("vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140"),r.e("vendors-node_modules_project-serum_anchor_dist_browser_index_js-node_modules_senswap_sen-js_d-1f3395"),r.e("webpack_sharing_consume_default_react-dom_react-dom"),r.e("webpack_sharing_consume_default_react_react"),r.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479"),r.e("node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-node_modules_react_jsx-r-7486bc")]).then((()=>()=>r(85647))))),d("antd","4.22.4",(()=>Promise.all([r.e("vendors-node_modules_moment_moment_js-node_modules_babel_runtime_helpers_esm_defineProperty_js"),r.e("vendors-node_modules_antd_es_index_js"),r.e("webpack_sharing_consume_default_react-dom_react-dom"),r.e("webpack_sharing_consume_default_react_react"),r.e("node_modules_copy-to-clipboard_index_js")]).then((()=>()=>r(89262))))),d("react-dom","17.0.2",(()=>Promise.all([r.e("vendors-node_modules_react-dom_index_js"),r.e("webpack_sharing_consume_default_react_react")]).then((()=>()=>r(81108))))),d("react-redux","7.2.8",(()=>Promise.all([r.e("vendors-node_modules_react-redux_es_index_js"),r.e("webpack_sharing_consume_default_react-dom_react-dom"),r.e("webpack_sharing_consume_default_react_react")]).then((()=>()=>r(59771))))),d("react-router-dom","5.3.3",(()=>Promise.all([r.e("vendors-node_modules_react-router_esm_react-router_js"),r.e("webpack_sharing_consume_default_react_react"),r.e("node_modules_prop-types_index_js-node_modules_react-router-dom_esm_react-router-dom_js")]).then((()=>()=>r(9402))))),d("react","17.0.2",(()=>r.e("node_modules_react_index_js").then((()=>()=>r(7276)))));return u.length?e[t]=Promise.all(u).then((()=>e[t]=1)):e[t]=1}}})(),(()=>{var e;r.g.importScripts&&(e=r.g.location+"");var _=r.g.document;if(!e&&_&&(_.currentScript&&(e=_.currentScript.src),!e)){var t=_.getElementsByTagName("script");t.length&&(e=t[t.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e})(),(()=>{var e=e=>{var _=e=>e.split(".").map((e=>+e==e?+e:e)),r=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),t=r[1]?_(r[1]):[];return r[2]&&(t.length++,t.push.apply(t,_(r[2]))),r[3]&&(t.push([]),t.push.apply(t,_(r[3]))),t},_=(_,r)=>{_=e(_),r=e(r);for(var t=0;;){if(t>=_.length)return t<r.length&&"u"!=(typeof r[t])[0];var s=_[t],o=(typeof s)[0];if(t>=r.length)return"u"==o;var n=r[t],a=(typeof n)[0];if(o!=a)return"o"==o&&"n"==a||"s"==a||"u"==o;if("o"!=o&&"u"!=o&&s!=n)return s<n;t++}},t=e=>{var _=e[0],r="";if(1===e.length)return"*";if(_+.5){r+=0==_?">=":-1==_?"<":1==_?"^":2==_?"~":_>0?"=":"!=";for(var s=1,o=1;o<e.length;o++)s--,r+="u"==(typeof(a=e[o]))[0]?"-":(s>0?".":"")+(s=2,a);return r}var n=[];for(o=1;o<e.length;o++){var a=e[o];n.push(0===a?"not("+d()+")":1===a?"("+d()+" || "+d()+")":2===a?n.pop()+" "+n.pop():t(a))}return d();function d(){return n.pop().replace(/^\((.+)\)$/,"$1")}},s=(_,r)=>{if(0 in _){r=e(r);var t=_[0],o=t<0;o&&(t=-t-1);for(var n=0,a=1,d=!0;;a++,n++){var u,i,c=a<_.length?(typeof _[a])[0]:"";if(n>=r.length||"o"==(i=(typeof(u=r[n]))[0]))return!d||("u"==c?a>t&&!o:""==c!=o);if("u"==i){if(!d||"u"!=c)return!1}else if(d)if(c==i)if(a<=t){if(u!=_[a])return!1}else{if(o?u>_[a]:u<_[a])return!1;u!=_[a]&&(d=!1)}else if("s"!=c&&"n"!=c){if(o||a<=t)return!1;d=!1,a--}else{if(a<=t||i<c!=o)return!1;d=!1}else"s"!=c&&"n"!=c&&(d=!1,a--)}}var l=[],m=l.pop.bind(l);for(n=1;n<_.length;n++){var p=_[n];l.push(1==p?m()|m():2==p?m()&m():p?s(p,r):!m())}return!!m()},o=(e,r)=>{var t=e[r];return Object.keys(t).reduce(((e,r)=>!e||!t[e].loaded&&_(e,r)?r:e),0)},n=(e,_,r,s)=>"Unsatisfied version "+r+" from "+(r&&e[_][r].from)+" of shared singleton module "+_+" (required "+t(s)+")",a=(e,_,r,t)=>{var a=o(e,r);return s(t,a)||"undefined"!==typeof console&&console.warn&&console.warn(n(e,r,a,t)),d(e[r][a])},d=e=>(e.loaded=1,e.get()),u=e=>function(_,t,s,o){var n=r.I(_);return n&&n.then?n.then(e.bind(e,_,r.S[_],t,s,o)):e(_,r.S[_],t,s,o)},i=u(((e,_,t,s,o)=>_&&r.o(_,t)?a(_,0,t,s):o())),c={},l={12181:()=>i("default","react-dom",[1,17,0,2],(()=>r.e("vendors-node_modules_react-dom_index_js").then((()=>()=>r(81108))))),92950:()=>i("default","react",[1,17,0,2],(()=>r.e("node_modules_react_index_js").then((()=>()=>r(7276))))),19289:()=>i("default","@reduxjs/toolkit",[1,1,6,2],(()=>r.e("vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js").then((()=>()=>r(57853))))),94751:()=>i("default","antd",[1,4,21,0],(()=>Promise.all([r.e("vendors-node_modules_moment_moment_js-node_modules_babel_runtime_helpers_esm_defineProperty_js"),r.e("vendors-node_modules_antd_es_index_js"),r.e("webpack_sharing_consume_default_react-dom_react-dom")]).then((()=>()=>r(89262))))),55754:()=>i("default","react-redux",[1,7,2,5],(()=>Promise.all([r.e("vendors-node_modules_react-redux_es_index_js"),r.e("webpack_sharing_consume_default_react-dom_react-dom")]).then((()=>()=>r(59771))))),45055:()=>i("default","react-router-dom",[1,5,3,0],(()=>Promise.all([r.e("vendors-node_modules_react-router_esm_react-router_js"),r.e("node_modules_react-router-dom_esm_react-router-dom_js")]).then((()=>()=>r(9402))))),77147:()=>i("default","@sentre/senhub",[1,3,2,8],(()=>Promise.all([r.e("vendors-node_modules_react-router_esm_react-router_js"),r.e("vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140"),r.e("vendors-node_modules_project-serum_anchor_dist_browser_index_js-node_modules_senswap_sen-js_d-1f3395"),r.e("webpack_sharing_consume_default_react-dom_react-dom"),r.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479"),r.e("node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-_5aae-_18f2-_0b7d-_25ed--0c400a")]).then((()=>()=>r(85647))))),60258:()=>i("default","@sentre/senhub",[1,3,2,3],(()=>Promise.all([r.e("vendors-node_modules_react-router_esm_react-router_js"),r.e("vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140"),r.e("webpack_sharing_consume_default_react-dom_react-dom"),r.e("node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-_5aae-_18f2-_0b7d-_25ed--5e313a")]).then((()=>()=>r(85647)))))},m={"webpack_sharing_consume_default_react-dom_react-dom":[12181],webpack_sharing_consume_default_react_react:[92950],"webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479":[19289,94751,55754,45055],webpack_sharing_consume_default_sentre_senhub_sentre_senhub:[77147],"src_bootstrap_app_tsx-src_static_images_banner_png-webpack_sharing_consume_default_sentre_sen-20d9d7":[60258]};r.f.consumes=(e,_)=>{r.o(m,e)&&m[e].forEach((e=>{if(r.o(c,e))return _.push(c[e]);var t=_=>{c[e]=0,r.m[e]=t=>{delete r.c[e],t.exports=_()}},s=_=>{delete c[e],r.m[e]=t=>{throw delete r.c[e],_}};try{var o=l[e]();o.then?_.push(c[e]=o.then(t).catch(s)):t(o)}catch(n){s(n)}}))}})(),(()=>{var e=e=>new Promise(((_,t)=>{var s=r.miniCssF(e),o=r.p+s;if(((e,_)=>{for(var r=document.getElementsByTagName("link"),t=0;t<r.length;t++){var s=(n=r[t]).getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(s===e||s===_))return n}var o=document.getElementsByTagName("style");for(t=0;t<o.length;t++){var n;if((s=(n=o[t]).getAttribute("data-href"))===e||s===_)return n}})(s,o))return _();((e,_,r,t)=>{var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onerror=s.onload=o=>{if(s.onerror=s.onload=null,"load"===o.type)r();else{var n=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.href||_,d=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");d.code="CSS_CHUNK_LOAD_FAILED",d.type=n,d.request=a,s.parentNode.removeChild(s),t(d)}},s.href=_,document.head.appendChild(s)})(e,o,_,t)})),_={sen_farming_v2:0};r.f.miniCss=(r,t)=>{_[r]?t.push(_[r]):0!==_[r]&&{"vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140":1,"src_bootstrap_app_tsx-src_static_images_banner_png-webpack_sharing_consume_default_sentre_sen-20d9d7":1}[r]&&t.push(_[r]=e(r).then((()=>{_[r]=0}),(e=>{throw delete _[r],e})))}})(),(()=>{var e={sen_farming_v2:0};r.f.j=(_,t)=>{var s=r.o(e,_)?e[_]:void 0;if(0!==s)if(s)t.push(s[2]);else if(/^webpack_sharing_consume_default_(re(act(\-dom_react\-dom|_react)|duxjs_toolkit_reduxjs_toolkit\-webpack_sharing_consume_defau\-e4c479)|sentre_senhub_sentre_senhub)$/.test(_))e[_]=0;else{var o=new Promise(((r,t)=>s=e[_]=[r,t]));t.push(s[2]=o);var n=r.p+r.u(_),a=new Error;r.l(n,(t=>{if(r.o(e,_)&&(0!==(s=e[_])&&(e[_]=void 0),s)){var o=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;a.message="Loading chunk "+_+" failed.\n("+o+": "+n+")",a.name="ChunkLoadError",a.type=o,a.request=n,s[1](a)}}),"chunk-"+_,_)}};var _=(_,t)=>{var s,o,[n,a,d]=t,u=0;if(n.some((_=>0!==e[_]))){for(s in a)r.o(a,s)&&(r.m[s]=a[s]);if(d)d(r)}for(_&&_(t);u<n.length;u++)o=n[u],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0},t=globalThis.webpackChunksen_farming_v2=globalThis.webpackChunksen_farming_v2||[];t.forEach(_.bind(null,0)),t.push=_.bind(null,t.push.bind(t))})();var t=r(57253);sen_farming_v2=t})();
//# sourceMappingURL=index.js.map