// Ensure we don't fire more than we have to
window.__TAURI__.invoke('is_injected')

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
window.sigmacord = true

let loaded = false

/**
 * Observer that lets us know when Discord is loaded
 */
let observer = new MutationObserver(() => {
  const innerApp = document?.querySelector('div[class*="app"]')?.querySelector('div[class*="app"]')
  const loading = Array.from(
    innerApp?.children || []
  ).length === 2

  if (loading && !loaded) {
    console.log('Discord is loaded!')

    // This needs to render after discord is loaded
    if (!window.SigmacordConfig.use_native_titlebar) createTopBar()

    onClientLoad()

    // The comments ahead are read by tauri and used to insert plugin/theme injection code
    
    /* __THEMES__ */
  } else {
    console.log('Discord not loaded...')
  }
});

observer.observe(document, {
  childList: true,
  subtree: true
});

function close() {
  window.__TAURI__.invoke('close')
}

function minimize() {
  window.__TAURI__.invoke('minimize')
}

function maximize() {
  window.__TAURI__.invoke('maximize')
}


async function createTopBar() {
  const topbar = document.createElement("div");
  const content = await window.__TAURI__.invoke('get_top_bar');

  // If the top bar failed to load, stick to the default
  if (!content) return;

  topbar.innerHTML = content

  const appMount = document.querySelector('#app-mount')

  if (!appMount) return

  appMount.prepend(topbar);

  // Set version displayed in top bar
  window.sigmacordVersion = await window.__TAURI__.app.getVersion()
  const versionElm = document.querySelector('#sigmacord_version')
  if (versionElm) versionElm.innerHTML = `Sigmacord - v${window.sigmacordVersion}`

  // Once done, remove original top bar
  window.__TAURI__.invoke('remove_top_bar')

  initTopBarEvents()
}


/**
 * Run when the client is "loaded"
 */
function onClientLoad() {
  observer.disconnect()

  // Notifcation watcher
  notifGetter()

  // Assign notification count
  applyNotificationCount()

  // Load up our extra css
  applyExtraCSS()

  // Check for updates
  console.log('Checking for updates...')
  checkForUpdates()
}

/**
 * Show notification
 */
async function showNotification(title, body) {
  const { invoke } = window.__TAURI__
  const notifHtml = await invoke('get_notif')
  const notif = document.createElement('div')
  notif.innerHTML = notifHtml

  const inner = notif.querySelector('#sigmacord_notif')

  inner.style.top = '-100%'
  inner.style.transition = 'all 0.5s ease-in-out'

  inner.querySelector('#notif_title').innerHTML = title
  inner.querySelector('#notif_body').innerHTML = body

  const inst = document.body.appendChild(notif)

  // Move into view
  setTimeout(() => {
    inner.style.top = '5%'
  }, 100)

  // After 4 seconds, move out of view and remove
  setTimeout(() => {
    inner.style.top = '-100%'
    setTimeout(() => {
      inst.remove()
    }, 500)
  }, 4000)
}

/**
 * Check for updates
 */
async function checkForUpdates() {
  const { invoke, app } = window.__TAURI__
  const version = await app.getVersion()
  const latest = await invoke('get_latest_release')

  // remove letters from latest release
  const latestNum = '1.0.0'

  if (version !== latestNum) {
    showNotification('Update Available', `<a target="_blank" href="${latest.link}">Sigmacord v${latestNum}</a> is now available!`)
  }
}

/**
 * Give events to the top bar buttons
 */
function initTopBarEvents() {
  document.querySelector('#topclose').onclick = close
  document.querySelector('#topmin').onclick = minimize
  document.querySelector('#topmax').onclick = maximize
}

function applyNotificationCount() {
  const { invoke } = window.__TAURI__
  const title = document.querySelector('title')
  const notifs = title.innerHTML.match(/\((.*)\)/)

  if (!notifs) {
    invoke('notif_count', {
      amount: 0
    })

    return
  }

  invoke('notif_count', {
    amount: Number(notifs[1])
  })
}

function notifGetter() {
  const notifObserver = new MutationObserver(applyNotificationCount)

  notifObserver.observe(document.querySelector('title'), {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true
  })
}

function applyExtraCSS() {
  const { invoke } = window.__TAURI__
  invoke('get_extra_css').then(css => {
    const style = document.createElement('style')
    style.innerHTML = css
    document.head.appendChild(style)
  })
}