"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { openMenu } from "@/components/sections/menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandIcon as CommandHugeIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function SystemBar() {
	const pathname = usePathname()
	const [time, setTime] = useState("")

	useEffect(() => {
		const updateTime = () => {
			const now = new Date()
			setTime(
				now.toLocaleTimeString("en-US", {
					hour12: false,
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				})
			)
		}
		updateTime()
		const interval = setInterval(updateTime, 1000)
		return () => clearInterval(interval)
	}, [])

	const getPageName = () => {
		if (pathname === "/") return "ROOT"
		return pathname.slice(1).toUpperCase()
	}

	return (
		<div className="sticky top-0 z-[100] w-full border-b border-border/40 bg-background/80 backdrop-blur-md px-4 py-2 flex items-center justify-between font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-2">
					<div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
					<span className="text-foreground font-bold">OKYERE.SYS</span>
				</div>
				<span className="opacity-40">/</span>
				<span>{getPageName()}</span>
			</div>

			<div className="flex items-center gap-6">
				<div className="hidden sm:flex items-center gap-2">
					<span className="opacity-40">STATUS:</span>
					<span className="text-emerald-500/80">ONLINE</span>
				</div>
				<div className="hidden lg:flex items-center gap-4 px-4 border-x border-border/40">
					<span className="opacity-40">LINK:</span>
					<div className="flex items-center gap-1">
						<div className="size-1 bg-cyan-500/50" />
						<div className="size-1 bg-cyan-500/20" />
						<div className="size-1 bg-cyan-500/80 animate-pulse" />
					</div>
					<span className="text-[8px] opacity-60">TX: 4.2KB/S</span>
				</div>
				<div className="flex items-center gap-2 tabular-nums">
					<span className="opacity-40">UTC:</span>
					<span>{time}</span>
				</div>
				<button
					onClick={openMenu}
					className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-border hover:bg-accent hover:text-foreground transition-colors group"
				>
					<HugeiconsIcon
						icon={CommandHugeIcon}
						size={10}
						strokeWidth={2}
						className="group-hover:rotate-12 transition-transform"
					/>
					<span>K</span>
				</button>
				<div className="flex items-center">
					<ThemeToggle />
				</div>
			</div>
		</div>
	)
}
