!function(){var e,t,n,r,o,i,a={3788:function(e,t,n){"use strict";function r(e,t){return new Promise(n=>{e.addEventListener("message",function r({data:o}){null!=o&&o.type===t&&(e.removeEventListener("message",r),n(o))})})}async function o(e,t,o){let i={type:"wasm_bindgen_worker_init",module:e,memory:t,receiver:o.receiver()};await Promise.all(Array.from({length:o.numThreads()},async()=>{let e=new Worker(n.tu(new URL(n.p+n.u(788),n.b)),{type:void 0});return e.postMessage(i),await r(e,"wasm_bindgen_worker_ready"),e})),o.build()}n.d(t,{Q:function(){return o}}),r(self,"wasm_bindgen_worker_init").then(async e=>{let t=await n.e(38).then(n.bind(n,9038));await t.default(e.module,e.memory),postMessage({type:"wasm_bindgen_worker_ready"}),t.wbg_rayon_start_worker(e.receiver)})},2942:function(e,t,n){"use strict";var r=n(9038);console.log("start aleo"),self.addEventListener("message",async e=>{await (0,r.default)(),await r.default();let t=new r.ProgramManager;if("ALEO_EXECUTE_PROGRAM_ON_CHAIN"===e.data.type){console.log("ALEO_EXECUTE_PROGRAM_ON_CHAIN");let{remoteProgram:n,aleoFunction:o,inputs:i,privateKey:a,fee:c,feeRecord:s,url:u}=e.data;console.log("Web worker: Creating execution...");let l=performance.now();console.log(a,o,i,c,s,u),async function(){try{let e=await t.execute(r.PrivateKey.from_string(a),n,o,i,c,r.RecordPlaintext.fromString(s),u,!0);console.log("executeTransaction"),console.log(e),console.log("Web worker: On-chain execution transaction created in ".concat(performance.now()-l," ms"));let f=e.toString();console.log(f),self.postMessage({type:"EXECUTION_TRANSACTION_COMPLETED",executeTransaction:f})}catch(e){console.log(e),self.postMessage({type:"ERROR",errorMessage:e.toString()})}}()}})}},c={};function s(e){var t=c[e];if(void 0!==t)return t.exports;var n=c[e]={id:e,loaded:!1,exports:{}},r=!0;try{a[e](n,n.exports,s),r=!1}finally{r&&delete c[e]}return n.loaded=!0,n.exports}s.m=a,s.x=function(){var e=s.O(void 0,[38],function(){return s(2942)});return s.O(e)},e=[],s.O=function(t,n,r,o){if(n){o=o||0;for(var i=e.length;i>0&&e[i-1][2]>o;i--)e[i]=e[i-1];e[i]=[n,r,o];return}for(var a=1/0,i=0;i<e.length;i++){for(var n=e[i][0],r=e[i][1],o=e[i][2],c=!0,u=0;u<n.length;u++)a>=o&&Object.keys(s.O).every(function(e){return s.O[e](n[u])})?n.splice(u--,1):(c=!1,o<a&&(a=o));if(c){e.splice(i--,1);var l=r();void 0!==l&&(t=l)}}return t},s.d=function(e,t){for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.f={},s.e=function(e){return Promise.all(Object.keys(s.f).reduce(function(t,n){return s.f[n](e,t),t},[]))},s.u=function(e){return"static/chunks/"+e+"."+({38:"3ad47710fed3ec22",788:"ce789ac2c0d5c64a"})[e]+".js"},s.miniCssF=function(e){},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.hmd=function(e){return(e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.U=function(e){var t=new URL(e,"x:/"),n={};for(var r in t)n[r]=t[r];for(var r in n.href=e,n.pathname=e.replace(/[?#].*/,""),n.origin=n.protocol="",n.toString=n.toJSON=function(){return e},n)Object.defineProperty(this,r,{enumerable:!0,configurable:!0,value:n[r]})},s.U.prototype=URL.prototype,s.tt=function(){return void 0===t&&(t={createScriptURL:function(e){return e}},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(t=trustedTypes.createPolicy("nextjs#bundler",t))),t},s.tu=function(e){return s.tt().createScriptURL(e)},s.p="/_next/",s.b=self.location+"/../../../",n={701:1,788:1},s.f.i=function(e,t){n[e]||importScripts(s.tu(s.p+s.u(e)))},o=(r=self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push.bind(r),r.push=function(e){var t=e[0],r=e[1],i=e[2];for(var a in r)s.o(r,a)&&(s.m[a]=r[a]);for(i&&i(s);t.length;)n[t.pop()]=1;o(e)},i=s.x,s.x=function(){return s.e(38).then(i)},_N_E=s.x()}();