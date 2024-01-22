"use client"

import { 
  LucidePlus,
  LucideTablet,
  LucideIcon,
  LucideUsers,
  LucideTabletSmartphone,
  LucideGraduationCap,
  LucideBookCopy,
  LucideMapPin,
  LucideBookUser
} from "lucide-react"
import { NavList } from "@/components/nav-list"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { SelectDB } from "./select-db"

interface NavComponentProps {
  isCollapsed: boolean
  routerpath: string
}

interface NavItemProps {
  title: string
  href: string
  label?: string
  variant: "default" | "ghost"
  icon: LucideIcon
}

type NavProps = NavItemProps[]

const smartnavs: NavProps = [
    {
      title: "Devices",
      href: "/",
      label: "1",
      variant: "ghost",
      icon: LucideTabletSmartphone,
    },
    {
      title: "Teachers",
      href: "/teachers",
      label: "15",
      variant: "ghost",
      icon: LucideUsers,
    }
]

const othernavs: NavProps = [
  {
    title: "classes",
    href: "/classes",
    label: "45",
    variant: "ghost",
    icon: LucideGraduationCap,
  },
  {
    title: "courses",
    href: "/courses",
    label: "45",
    variant: "ghost",
    icon: LucideBookCopy,
  },
  {
    title: "locations",
    href: "/locations",
    label: "1",
    variant: "ghost",
    icon: LucideMapPin,
  },
  {
    title: "rosters",
    href: "/rosters",
    label: "549",
    variant: "ghost",
    icon: LucideTablet,
  },
  {
    title: "staff",
    href: "/staff",
    label: "191",
    variant: "ghost",
    icon: LucideBookUser,
  },
  {
    title: "students",
    href: "/students",
    label: "606",
    variant: "ghost",
    icon: LucideBookUser,
  },
]


export function NavBar({ isCollapsed, routerpath }: NavComponentProps) {
  return (
    <div className="flex flex-col h-screen">
      <div className="px-2 py-2">
        <SelectDB isCollapsed={isCollapsed}/>
      </div>
      <Separator />
      <div className="flex-grow">
        <NavList isCollapsed={isCollapsed} links={smartnavs} routerpath={routerpath}/>
        <Separator />
        <NavList isCollapsed={isCollapsed} links={othernavs} routerpath={routerpath} />
      </div>
      <div className="flex gap-1 px-2 py-2">
        <div className="flex flex-col w-full gap-2 ">
          <ModeToggle/>
          <Button variant="default" size="icon" className="w-full h-10">
            <LucidePlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}