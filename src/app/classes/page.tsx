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

interface Class {
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

export default function DevicesPage() {
    const { filepath } = React.useContext(FilePathContext)
    const [data, setData] = React.useState<Class[]>([]) // Update the initial state to be an empty array of type Device[]

    React.useEffect(() => {
        if (filepath != "") {
            invoke<Class[]>("db_classes", { filepath }).then((result) => {
                setData(result)
            })
        }
    }, [filepath])

    return (
        <section className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Klassen</h2>
                </div>
            </div>
            <Separator />

            {filepath === "" ? (
                <p>Please select a database.</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Klassen-ID</TableHead>
                            <TableHead>Klassennummer</TableHead>
                            <TableHead>Kurs-ID</TableHead>
                            <TableHead>Lehrer-ID</TableHead>
                            <TableHead>Lehrer-ID 2</TableHead>
                            <TableHead>Lehrer-ID 3</TableHead>
                            <TableHead>Lehrer-ID 4</TableHead>
                            <TableHead>Lehrer-ID 5</TableHead>
                            <TableHead>Lehrer-ID 6</TableHead>
                            <TableHead>Orts-ID</TableHead>
                        </TableRow>
                    </TableHeader>
                    {data.map((classes) => (
                        <TableRow>
                            <TableCell>{classes.class_id}</TableCell>
                            <TableCell>{classes.class_number}</TableCell>
                            <TableCell>{classes.course_id}</TableCell>
                            <TableCell>{classes.instructor_id}</TableCell>
                            <TableCell>{classes.instructor_id_2}</TableCell>
                            <TableCell>{classes.instructor_id_3}</TableCell>
                            <TableCell>{classes.instructor_id_4}</TableCell>
                            <TableCell>{classes.instructor_id_5}</TableCell>
                            <TableCell>{classes.instructor_id_6}</TableCell>
                            <TableCell>{classes.location_id}</TableCell>
                        </TableRow>
                    ))}
                </Table>
            )}
        </section>
    )
};