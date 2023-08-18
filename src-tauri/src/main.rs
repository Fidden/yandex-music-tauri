// Copyright 2020-2022 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use discord_rich_presence::{
    activity::{Activity}, DiscordIpcClient, DiscordIpc,
};
use tauri::Manager;
use window_shadows::set_shadow;

fn main() {
    tauri::Builder::default()
        .setup(move |app| {
            let mut drpc = DiscordIpcClient::new("978250588540272651").expect("failed to create client");
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");
            drpc
                .connect()
                .expect("failed to connect to Discord, please try again or relaunch Discord app");
            app.manage(std::sync::Mutex::new(drpc));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![set_discord_rpc])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command(async)]
fn set_discord_rpc(
    drpc: tauri::State<std::sync::Mutex<DiscordIpcClient>>,
    state: String,
    details: String,
    large_image: String,
    small_image: String,
) {
    let mut drpc = drpc.lock().unwrap();
    let activity: Activity = Activity::new().details(&details);

    drpc.set_activity(activity)
        .expect("client set activity");
}
