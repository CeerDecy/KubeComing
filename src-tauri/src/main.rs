// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file;

use futures::executor::block_on;
use file::*;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            load_kube_config,
            get_home_path,
            pick_file,
            write_to_file
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
