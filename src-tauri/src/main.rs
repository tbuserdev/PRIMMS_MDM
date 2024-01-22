// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{params, Connection, Result};
use serde::Serialize;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![db_devices, db_classes])
    .run(tauri::generate_context!())
    .expect("error while running tauri application")
}

#[derive(Debug, Serialize)]
struct DevicesTable {
  ipad_id: String,
  klasse: String,
  vorname_lehrer: String,
  nachname_lehrer: String,
  vorname_schueler: String,
  nachname_schueler: String,
}

#[derive(Debug, Serialize)]
struct Classes {
  class_id: String,
  class_number: String,
  course_id: String,
  instructor_id: String,
  instructor_id_2: String,
  instructor_id_3: String,
  instructor_id_4: String,
  instructor_id_5: String,
  instructor_id_6: String,
  location_id: String,
}


#[tauri::command]
fn db_devices(filepath: String) -> Result<Vec<DevicesTable>, String> {
  let query = "SELECT roster_id AS iPad_ID, c.course_name AS Klasse, t.first_name AS Vorname_Lehrer,
  t.last_name AS Nachname_Lehrer, s.first_name AS Vorname_Schüler, s.last_name AS Nachname_Schüler
  FROM classes
  JOIN main.courses c on c.course_id = classes.course_id
  JOIN main.locations l on classes.location_id = l.location_id
  JOIN main.staff t on classes.instructor_id = t.person_id
  JOIN main.rosters r on r.class_id = classes.class_id
  JOIN main.students s on s.person_id = r.student_id";


  let conn = Connection::open(filepath).map_err(|e| e.to_string())?;
  let mut stmt = conn.prepare(query).map_err(|e| e.to_string())?;
  let devices_iter = stmt.query_map(params![], |row| {
    Ok(DevicesTable {
      ipad_id: row.get(0).unwrap_or("".to_string()),
      klasse: row.get(1).unwrap_or("".to_string()),
      vorname_lehrer: row.get(2).unwrap_or("".to_string()),
      nachname_lehrer: row.get(3).unwrap_or("".to_string()),
      vorname_schueler: row.get(4).unwrap_or("".to_string()),
      nachname_schueler: row.get(5).unwrap_or("".to_string()),
    })
  }).map_err(|e| e.to_string())?;

  let mut devices = Vec::new();
  for device_result in devices_iter {
    let device = device_result.map_err(|e| e.to_string())?;
    devices.push(device);
  }

  Ok(devices)
}

#[tauri::command]
fn db_classes(filepath: String) -> Result<Vec<Classes>, String> {
  let query = "SELECT class_id, class_number, course_id, instructor_id, instructor_id_2, instructor_id_3, instructor_id_4, instructor_id_5, instructor_id_6, location_id FROM classes";

  let conn = Connection::open(filepath).map_err(|e| e.to_string())?;
  let mut stmt = conn.prepare(query).map_err(|e| e.to_string())?;
  let classes_iter = stmt.query_map(params![], |row| {
    Ok(Classes {
      class_id: row.get(0).unwrap_or("".to_string()),
      class_number: row.get(1).unwrap_or("".to_string()),
      course_id: row.get(2).unwrap_or("".to_string()),
      instructor_id: row.get(3).unwrap_or("".to_string()),
      instructor_id_2: row.get(4).unwrap_or("".to_string()),
      instructor_id_3: row.get(5).unwrap_or("".to_string()),
      instructor_id_4: row.get(6).unwrap_or("".to_string()),
      instructor_id_5: row.get(7).unwrap_or("".to_string()),
      instructor_id_6: row.get(8).unwrap_or("".to_string()),
      location_id: row.get(9).unwrap_or("".to_string()),
    })
  }).map_err(|e| e.to_string())?;

  let mut classes = Vec::new();
  for class_result in classes_iter {
    let class = class_result.map_err(|e| e.to_string())?;
    classes.push(class);
  }

  Ok(classes)
}