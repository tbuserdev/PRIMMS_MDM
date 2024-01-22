"use client"
import { Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from "@/components/theme-provider"
import * as React from "react"
import { NavBar } from "@/components/nav-bar"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { usePathname } from 'next/navigation'
import FilePathContext  from "@/lib/FilePathContext"

const inter = Inter({ subsets: ['latin'] })

interface HomepageProps {
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  children: React.ReactNode
}

export default function RootLayout({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
  children,
}: HomepageProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [filepath, setFilepath] = React.useState("")
  const routerpath = usePathname()

  return (
    <html lang="en">
      <body className={inter.className}>
        <FilePathContext.Provider value={{filepath, setFilepath}}>
        <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
        >
          <div className="flex flex-col h-screen">
            <TooltipProvider delayDuration={0}>
              <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`}}
                className="h-full max-h-[800px] items-stretch">

                {/* NAV SIDE BAR */}
                <ResizablePanel
                  defaultSize={defaultLayout[0]}
                  collapsedSize={navCollapsedSize}
                  collapsible={true}
                  minSize={15}
                  maxSize={30}
                  onCollapse={() => {
                    setIsCollapsed(true)
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                      [navCollapsedSize, defaultLayout[1], defaultLayout[2]]
                    )}`
                  }}
                  onExpand={() => {
                    setIsCollapsed(false)
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                      defaultLayout
                    )}`
                  }}
                  className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}>
                  <Separator />
                  <NavBar isCollapsed={isCollapsed} routerpath={routerpath}/>
                </ResizablePanel>
                <ResizableHandle withHandle />

                {/* PAGE CONTENT */}
                <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                  {children}
                </ResizablePanel>

              </ResizablePanelGroup>
            </TooltipProvider>
          </div>
        </ThemeProvider>
        </FilePathContext.Provider>
      </body>
    </html>
  )
}
