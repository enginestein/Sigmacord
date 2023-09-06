pub fn register_deep_link_handler(win: tauri::Window) {
  tauri_plugin_deep_link::register("sigmacord", move |_| {
    win.show().unwrap();
    win.set_focus().unwrap();
    win.unminimize().unwrap();
  })
  .unwrap_or_default();
}
