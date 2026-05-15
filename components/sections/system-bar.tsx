"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { openMenu } from "@/components/sections/menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandIcon as CommandHugeIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { motion } from "framer-motion"
import { TerminalTooltip } from "@/components/ui/terminal-tooltip"

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
		<div className="sticky top-0 z-[100] w-full border-b border-border/40 bg-background/80 backdrop-blur-md px-4 py-2 flex items-center justify-between font-mono text-[10px] tracking-widest text-muted-foreground uppercase overflow-x-auto no-scrollbar">
			<div className="flex items-center gap-4 shrink-0">
				<TerminalTooltip metadata={{ UID: "0", GID: "0", MODE: "755", KERNEL: "OKYERE_6.1" }}>
					<div className="flex items-center gap-2 cursor-help">
						<div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
						<span className="text-foreground font-bold">OKYERE.SYS</span>
					</div>
				</TerminalTooltip>
				<span className="opacity-40">/</span>
				<span>{getPageName()}</span>
			</div>

			<div className="flex items-center gap-6 shrink-0 ml-4">
				<div className="hidden sm:flex items-center gap-3">
					<span className="opacity-40 text-[8px]">CPU:</span>
					<div className="flex items-end gap-0.5 h-3">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<motion.div
								key={i}
								animate={{ height: ["20%", "80%", "40%", "100%", "30%"] }}
								transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "linear" }}
								className="w-0.5 bg-cyan-500/40"
							/>
						))}
					</div>
				</div>

				<div className="hidden lg:flex items-center gap-4 px-4 border-x border-border/40">
					<span className="opacity-40 text-[8px]">TX_LIVE:</span>
					<div className="flex items-end gap-0.5 h-3">
						{[1, 2, 3].map((i) => (
							<motion.div
								key={i}
								animate={{ height: ["40%", "90%", "20%", "70%", "50%"] }}
								transition={{ duration: 0.3 + Math.random(), repeat: Infinity, ease: "linear" }}
								className="w-0.5 bg-emerald-500/40"
							/>
						))}
					</div>
					<span className="text-[8px] opacity-60 tabular-nums">4.2KB/S</span>
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
