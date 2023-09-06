const TITLE="Sigmacord";window.onbeforeunload=()=>{window.__TAURI__.invoke("do_injection")};function safemodeTimer(e){setTimeout((()=>{e.classList.add("show")}),1e4);const t=e=>{if(!document.querySelector("#loadingContainer")){document.removeEventListener("keydown",t);return}if(e.code==="Space"){document.querySelector("#loadingContainer")?.remove()}if(e.code==="KeyF"){window.__TAURI__.invoke("open_themes")}};document.addEventListener("keydown",t)}(async()=>{createLocalStorage();await displayLoadingTop();const{invoke:e,event:t}=window.__TAURI__;let n={};try{n=JSON.parse(await e("read_config_file"))}catch(e){console.log("Error reading config.")}window.SigmacordConfig=n;if(!n){const t=await e("default_config");await e("write_config_file",{config:t});n=JSON.parse(t)}window.open=window.__TAURI__.shell.open;const o=await e("load_plugins");const i=await window.__TAURI__.app.getVersion();const r=document.querySelector("#midtitle");const c=document.querySelector("#subtitle");const a=document.querySelector("#safemode");const s=document.querySelector("#logContainer");safemodeTimer(a);if(c)c.innerHTML=`Made with ❤️ by SpikeHD - v${i}`;typingAnim();if(r)r.innerHTML="Localizing JS imports...";let l=[];for(const t in Object.values(o)){l=[...l,...await e("get_plugin_import_urls",{pluginJs:t})]}t.listen("loading_log",(e=>{const t=e.payload;if(!s)return;s.innerHTML=`${t}`}));const d=await e("localize_all_js",{urls:l});let u="";if(n.theme&&n.theme!=="none"){if(r)r.innerHTML="Loading theme CSS...";const t=await e("get_theme",{name:n.theme});if(r)r.innerHTML="Localizing CSS imports...";const o=await e("localize_imports",{css:t,name:n.theme});const i=cssSanitize(o)?.replaceAll('\\"',"'");u=`;(() => {\n      const ts = document.createElement('style')\n\n      ts.textContent = \`\n        ${i?.replace(/`/g,"\\`").replace(/\\8/g,"").replace(/\\9/g,"")}\n      \`\n\n      document.head.appendChild(ts)\n    })()`}if(r)r.innerHTML="Getting injection JS...";const m=await e("get_injection_js",{themeJs:u});await e("load_injection_js",{imports:d,contents:m,plugins:o});if(!n.block_telemetry)blockTelemetry();if(r)r.innerHTML="Done!";document.querySelector("#loadingContainer").style.opacity=0;setTimeout((()=>{document.querySelector("#loadingContainer")?.remove()}),200)})();async function displayLoadingTop(){const{invoke:e}=window.__TAURI__;const t=await e("get_index");const n=document.createElement("div");n.id="loadingContainer";n.innerHTML=t;n.style.zIndex=99999;n.style.position="absolute";n.style.top="0";n.style.left="0";n.style.width="100vw";n.style.height="100vh";document.body.appendChild(n)}async function typingAnim(){const e=document.querySelector("#title");if(!e)return;for(const t of TITLE.split("")){e.innerHTML=e.innerHTML.replace("|","")+t+"|";await timeout(100)}let t=true;setInterval((()=>{if(t){t=false;e.innerHTML=e.innerHTML.replace("|","&nbsp;");return}t=true;e.innerHTML=e.innerHTML.replace(/&nbsp;$/,"|")}),500)}async function timeout(e){return new Promise((t=>setTimeout(t,e)))}function cssSanitize(e){const t=document.createElement("style");t.innerHTML=e;document.head.appendChild(t);if(!t.sheet)return;const n=Array.from(t.sheet.cssRules).map((e=>e.cssText||"")).join("\n");document.head.removeChild(t);return n}function blockTelemetry(){const e=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(t,n){e.apply(this,arguments);const o=this.send;this.send=function(){const e=/\/api\/v.*\/(science|track)/g;if(!String(n).match(e)){return o.apply(this,arguments)}console.log(`[Telemetry Blocker] Blocked URL: ${n}`)}}}function _interceptEventListeners(){Element.prototype._addEventListener=Element.prototype.addEventListener;Element.prototype.addEventListener=function(){let e=[...arguments];let t=e[1];e[1]=function(){let e=[...arguments];e[0]=Object.assign({},e[0]);e[0].isTrusted=true;return t(...e)};return this._addEventListener(...e)}}function createLocalStorage(){const e=document.createElement("iframe");const t=setInterval((()=>{if(!document.head)return;document.head.append(e);const n=Object.getOwnPropertyDescriptor(e.contentWindow,"localStorage");e.remove();Object.defineProperty(window,"localStorage",n);clearInterval(t)}),50)}