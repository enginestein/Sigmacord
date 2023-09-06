pub async fn localize_js(url: String) -> String {
  if url.is_empty() {
    return String::new();
  }

  let response = match reqwest::get(&url).await {
    Ok(r) => r,
    Err(e) => {
      println!("Request failed: {}", e);
      println!("URL: {}", &url);

      return String::new();
    }
  };

  response.text().await.unwrap()
}

#[tauri::command]
pub async fn localize_all_js(urls: Vec<String>) -> Vec<String> {
  let mut localized: Vec<String> = vec![];

  for url in urls {
    localized.push(localize_js(url).await)
  }

  localized
}

pub fn eval_js_imports(window: &tauri::Window, scripts: Vec<String>) {
  for script in scripts {
    match window.eval(script.as_str()) {
      Ok(r) => r,
      Err(e) => {
        println!("Error evaluating import: {}", e)
      }
    };
  }
}
