"use client"

import { siteConfig } from "@/config/site"

export function Footer() {
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
					<div className="flex items-center gap-2 text-[9px] opacity-60">
						<span>ENCRYPTION: AES-256</span>
						<span className="opacity-30">•</span>
						<span>PROTOCOL: SECURE_SHELL</span>
					</div>
				</div>

				<div className="flex flex-col md:items-end gap-2">
					<div className="flex items-center gap-2">
						<span className="opacity-40">BUILT_BY:</span>
						<a
							href={siteConfig.links.twitter}
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground hover:text-cyan-500 transition-colors"
						>
							JOHN_OKYERE
						</a>
					</div>
					<div className="text-[9px] opacity-60">
						LAST_UPDATE: {new Date().toISOString().split("T")[0].replace(/-/g, ".")}
					</div>
				</div>
			</div>
		</footer>
	)
}
