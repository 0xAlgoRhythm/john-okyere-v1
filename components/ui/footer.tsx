"use client"

import React, { useState, useEffect } from "react"
import { siteConfig } from "@/config/site"

// Fixed "deploy" timestamp — update this when you ship a new version
const DEPLOY_TIMESTAMP = new Date("2026-05-18T00:00:00Z").getTime()

function formatUptime(ms: number) {
	const totalSeconds = Math.floor(ms / 1000)
	const days    = Math.floor(totalSeconds / 86400)
	const hours   = Math.floor((totalSeconds % 86400) / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60
	return `${String(days).padStart(2, "0")}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`
}

export function Footer() {
	const [uptime, setUptime] = useState("")

	useEffect(() => {
		const tick = () => setUptime(formatUptime(Date.now() - DEPLOY_TIMESTAMP))
		tick()
		const id = setInterval(tick, 1000)
		return () => clearInterval(id)
	}, [])

	return (
		<footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm px-6 md:px-10 py-10">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<span className="opacity-50">&copy;</span>
						<span className="text-foreground font-bold">2026 OKYERE.SYS</span>
						<span className="opacity-30">|</span>
						<span>ALL_RIGHTS_RESERVED</span>
					</div>
					<div className="flex items-center gap-2 text-[9px] opacity-80">
						<span>ENCRYPTION: AES-256</span>
						<span className="opacity-40">•</span>
						<span>PROTOCOL: SECURE_SHELL</span>
					</div>
				</div>

				<div className="flex flex-col md:items-end gap-2">
					<div className="flex items-center gap-2">
						<span className="opacity-70">BUILT_BY:</span>
						<a
							href={siteConfig.links.twitter}
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground hover:text-cyan-500 transition-colors"
						>
							JOHN_OKYERE
						</a>
					</div>
					{/* Live uptime counter */}
					{uptime && (
						<div className="flex items-center gap-2 text-[9px]">
							<span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
							<span className="text-emerald-500/80 font-bold">UPTIME:</span>
							<span className="tabular-nums text-foreground/60">{uptime}</span>
						</div>
					)}
					<div className="text-[9px] opacity-80">
						LAST_UPDATE: {new Date().toISOString().split("T")[0].replace(/-/g, ".")}
					</div>
				</div>
			</div>
		</footer>
	)
}
