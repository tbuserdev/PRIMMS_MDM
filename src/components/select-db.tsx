"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { open } from '@tauri-apps/api/dialog';
import FilePathContext from "@/lib/FilePathContext";

interface SelectDBProps {
    isCollapsed: boolean
}

export function SelectDB({
    isCollapsed
}: SelectDBProps) {
    const [filename, setFilename] = React.useState("")
    const { filepath, setFilepath } = React.useContext(FilePathContext)

    const openFile = async () => {
        const filepath = await open({
            multiple: false,
            directory: false,
            filters: [{
                name: "SQLite",
                extensions: ["sqlite"]
            }]
        })
        
        if (filepath) {
            setFilepath(filepath.toString())
            const filename = filepath.toString().split("/").pop()?.split(".")[0]
            setFilename("DB: " + filename?.toString() || "")
        }
    }

    const closeFile = () => {
        setFilepath("")
        setFilename("")
    }

    return (
        <div className="w-full">
            { isCollapsed ? (
                 <code onClick={closeFile} className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold flex justify-center">
                 DB
               </code>
            ) : (
                <>
                    { filepath === "" ? (
                    <Button className="w-full" variant={"outline"} onClick={openFile}>Select DB...</Button> 
                    ) : (
                        <code onClick={closeFile} className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                        {filename}
                      </code>
                    )}
                </>
            )}
        </div>
    )
}