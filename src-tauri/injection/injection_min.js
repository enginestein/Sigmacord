// Ensure we don't fire more than we have to
window.__TAURI__.invoke("is_injected");
// Create URL opener which will open links in the default system browser
// TODO: Don't resort to using this yet
// window.openURL = (url) => {
//   window.ipc.postMessage(JSON.stringify({
//     cmd: 'open_url',
//     callback: 0,
//     error: 0,
//     inner: {
//       url
//     }
//   }));
// }
window.sigmacord=true;let loaded=false
/**
 * Observer that lets us know when Discord is loaded
 */;let observer=new MutationObserver((()=>{const e=document?.querySelector('div[class*="app"]')?.querySelector('div[class*="app"]');const o=Array.from(e?.children||[]).length===2;if(o&&!loaded){console.log("Discord is loaded!");
// This needs to render after discord is loaded
if(!window.SigmacordConfig.use_native_titlebar)createTopBar();onClientLoad();
// The comments ahead are read by tauri and used to insert plugin/theme injection code
/* __THEMES__ */}else{console.log("Discord not loaded...")}}));observer.observe(document,{childList:true,subtree:true});function close(){window.__TAURI__.invoke("close")}function minimize(){window.__TAURI__.invoke("minimize")}function maximize(){window.__TAURI__.invoke("maximize")}async function createTopBar(){const e=document.createElement("div");const o=await window.__TAURI__.invoke("get_top_bar");
// If the top bar failed to load, stick to the default
if(!o)return;e.innerHTML=o;const t=document.querySelector("#app-mount");if(!t)return;t.prepend(e);
// Set version displayed in top bar
window.sigmacordVersion=await window.__TAURI__.app.getVersion();const n=document.querySelector("#sigmacord_version");if(n)n.innerHTML=`Sigmacord - v${window.sigmacordVersion}`;
// Once done, remove original top bar
window.__TAURI__.invoke("remove_top_bar");initTopBarEvents()}
/**
 * Run when the client is "loaded"
 */function onClientLoad(){observer.disconnect();
// Notifcation watcher
notifGetter();
// Assign notification count
applyNotificationCount();
// Load up our extra css
applyExtraCSS();
// Check for updates
console.log("Checking for updates...");checkForUpdates()}
/**
 * Show notification
 */async function showNotification(e,o){const{invoke:t}=window.__TAURI__;const n=await t("get_notif");const i=document.createElement("div");i.innerHTML=n;const c=i.querySelector("#sigmacord_notif");c.style.top="-100%";c.style.transition="all 0.5s ease-in-out";c.querySelector("#notif_title").innerHTML=e;c.querySelector("#notif_body").innerHTML=o;const r=document.body.appendChild(i);
// Move into view
setTimeout((()=>{c.style.top="5%"}),100);
// After 4 seconds, move out of view and remove
setTimeout((()=>{c.style.top="-100%";setTimeout((()=>{r.remove()}),500)}),4e3)}
/**
 * Check for updates
 */async function checkForUpdates(){const{invoke:e,app:o}=window.__TAURI__;const t=await o.getVersion();const n=await e("get_latest_release");
// remove letters from latest release
const i="1.0.0";if(t!==i){showNotification("Update Available",`<a target="_blank" href="${n.link}">Sigmacord v${i}</a> is now available!`)}}
/**
 * Give events to the top bar buttons
 */function initTopBarEvents(){document.querySelector("#topclose").onclick=close;document.querySelector("#topmin").onclick=minimize;document.querySelector("#topmax").onclick=maximize}function applyNotificationCount(){const{invoke:e}=window.__TAURI__;const o=document.querySelector("title");const t=o.innerHTML.match(/\((.*)\)/);if(!t){e("notif_count",{amount:0});return}e("notif_count",{amount:Number(t[1])})}function notifGetter(){const e=new MutationObserver(applyNotificationCount);e.observe(document.querySelector("title"),{subtree:true,childList:true,attributes:true,characterData:true})}function applyExtraCSS(){const{invoke:e}=window.__TAURI__;e("get_extra_css").then((e=>{const o=document.createElement("style");o.innerHTML=e;document.head.appendChild(o)}))}