# Vereinfachte Verwaltung von Mobilgeräten für eine Primarschule

An einer Primarschule gibt es viele unterschiedliche Bereiche in der IT-Verwaltung. Einer davon ist die Verwaltung von iPads für die Schülerinnen und Schüler.

## Das Problem

Aktuell werden die iPads von Hand mithilfe einer grafischen Benutzeroberfläche verwaltet. Dieser fehlen viele Abläufe, die automatisiert ausgeführt werden könnten. Zum Beispiel das Hinzufügen neuer iPads in das System. Oder das Filtern nach Lehrpersonen oder Klassen.

## Lösungsansätze

In die aktuell verwendete Benutzeroberfläche können Daten mithilfe von CSV-Dateien eingefügt werden. Diese werden im Moment mit Excel bearbeitet. Die CSV-Dateien scheinen direkte Exporte aus einer SQL-Datenbank zu sein. Somit habe ich die verschiedenen Dateien lokal zu einer SQLite-Datenbank zusammengefügt und habe eine funktionsfähige lokale Datenbank erhalten. Auf dieser Grundlage habe ich mit Tauri (Electron Alternative) eine Benutzeroberfläche erstellt, mit der man einfacher Informationen aus der Datenbank herauslesen kann. Zudem habe ich zusammen mit dem IT-Beauftragten der Schule Arbeitsabläufe und Funktionen definiert, um seine Arbeit zu erleichtern.

## Tech-Stack

- Frontend: NextJS 14 mit ShadcnUi (React & Tailwindcss)
- Backend: Tauri Desktop Applikation mit Rust
- Datenbank: SQLite
