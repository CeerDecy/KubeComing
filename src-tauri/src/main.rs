// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use sea_orm::{Database, DbErr, DatabaseConnection};
use futures::executor::block_on;
use std::sync::Arc;
use once_cell::sync::OnceCell;
use std::env;
use std::fs;

const DATABASE_URL: &str = "sqlite://db.sqlite?mode=rwc";

static DB_CONN: OnceCell<Arc<DatabaseConnection>> = OnceCell::new();

async fn connect() -> Result<Arc<DatabaseConnection>, DbErr> {
    let db = Database::connect(DATABASE_URL).await?;
    Ok(Arc::new(db))
}

fn get_home_path() -> String {
    if let Some(home_dir) = env::home_dir() {
        return home_dir.to_string_lossy().into_owned();
    }

    String::new()
}

#[tauri::command]
fn load_kube_config() -> String {
    let kube_config_path = get_home_path() + "/.kube/config";

    match fs::read_to_string(kube_config_path.clone()) {
            Ok(content) => content,
            Err(e) => format!("Error reading {} file: {}",kube_config_path, e),
        }
}

fn main() {
    if let Err(err) = block_on(async {
        let db_conn = connect().await?;
        DB_CONN.set(db_conn).map_err(|_| DbErr::Custom("Failed to set DB_CONN".to_string()))
    }) {
        panic!("{}", err);
    }
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![load_kube_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
