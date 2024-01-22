"use client"

import { Separator } from "@/components/ui/separator";
import * as React from "react";
import FilePathContext from "@/lib/FilePathContext";
import { invoke } from '@tauri-apps/api/tauri'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

interface Device {
    ipad_id: String,
    klasse: String,
    vorname_lehrer: String,
    nachname_lehrer: String,
    vorname_schueler: String,
    nachname_schueler: String,
}

export default function DevicesPage() {
    const { filepath } = React.useContext(FilePathContext)
    const [data, setData] = React.useState<Device[]>([]) // Update the initial state to be an empty array of type Device[]

    React.useEffect(() => {
        if (filepath != "") {
            invoke<Device[]>("db_devices", { filepath }).then((result) => {
                setData(result)
            })
        }
    }, [filepath])

    return (
        <section className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Geräte</h2>
                    <p className="text-muted-foreground">Verwalte alle Geräte auf einen Blick, passe die Klassenzugehörigkeit, sowie andere Aspekte an</p>
                </div>
            </div>
            <Separator />

            {filepath === "" ? (
                <p>Please select a database.</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Geräte-ID</TableHead>
                            <TableHead>Klasse</TableHead>
                            <TableHead>Vorname Lehrer</TableHead>
                            <TableHead>Nachname Lehrer</TableHead>
                            <TableHead>Vorname Schüler</TableHead>
                            <TableHead>Nachname Schüler</TableHead>
                        </TableRow>
                    </TableHeader>
                    {data.map((device) => (
                        <TableRow>
                            <TableCell>{device.ipad_id}</TableCell>
                            <TableCell>{device.klasse}</TableCell>
                            <TableCell>{device.vorname_lehrer}</TableCell>
                            <TableCell>{device.nachname_lehrer}</TableCell>
                            <TableCell>{device.vorname_schueler}</TableCell>
                            <TableCell>{device.nachname_schueler}</TableCell>
                        </TableRow>
                    ))}
                </Table>
            )}
        </section>
    )
};