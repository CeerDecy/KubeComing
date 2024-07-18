use std::env;
use std::fs;

#[tauri::command]
pub fn get_home_path() -> String {
    if let Some(home_dir) = env::home_dir() {
        return home_dir.to_string_lossy().into_owned();
    }

    String::new()
}

#[tauri::command]
pub fn load_kube_config(path: &str) -> String {
//     let kube_config_path = get_home_path() + path;
    let kube_config_path = path;

    match fs::read_to_string(kube_config_path.clone()) {
            Ok(content) => content,
            Err(e) => format!("Error reading {} file: {}",kube_config_path, e),
        }
}