// Copyright 2020-2022 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use discord_rpc_client::Client;
use tauri::Manager;
use window_shadows::set_shadow;

fn main() {
    let mut drpc = Client::new(978250588540272651);
    drpc.start();
    tauri::Builder::default()
        .setup(move |app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");
            app.manage(std::sync::Mutex::new(drpc));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![set_discord_rpc])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command(async)]
fn set_discord_rpc(
    drpc: tauri::State<std::sync::Mutex<discord_rpc_client::Client>>,
    state: String,
    details: String,
    large_image: String,
    small_image: String,
) {
    let mut drpc = drpc.lock().unwrap();
    drpc.set_activity(|act| {
        act
            .state(state)
            .details(details)
            .assets(|a| a
                .large_image(large_image)
                .small_image(small_image)
            )
    })
        .expect("Failed to set activity");
}
