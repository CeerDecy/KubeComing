use std::env;
use std::fs;
use tauri::api::dialog::FileDialogBuilder;
// use tauri::api::dialog::blocking::FileDialogBuilder;

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

#[tauri::command]
pub async fn pick_file() -> Option<String> {
    let (sender, receiver) = std::sync::mpsc::channel();
    FileDialogBuilder::new()
        .set_title("选择一个文件")
        .pick_file(move |path| {
            if let Some(p) = path {
                sender.send(Some(p.to_string_lossy().to_string())).expect("Failed to send file path");
            } else {
                sender.send(None).expect("Failed to send None");
            }
        });
    receiver.recv().unwrap()
}