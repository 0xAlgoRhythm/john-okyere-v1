"use client"
import React from "react"
import { motion } from "framer-motion"


import { GithubIcon, NewTwitterIcon, Linkedin01Icon, TelegramIcon, Mail01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { siteConfig } from "@/config/site"
import { CommandLine } from "@/components/ui/command-line"

interface HeaderProps {
	name: string
	title: string
	isActive: boolean
}

const SOCIAL_LINKS = [
	{ icon: GithubIcon, href: siteConfig.links.github, label: "GitHub" },
	{ icon: NewTwitterIcon, href: siteConfig.links.twitter, label: "X" },
	{ icon: Linkedin01Icon, href: siteConfig.links.linkedin, label: "LinkedIn" },
	{ icon: TelegramIcon, href: siteConfig.links.telegram, label: "Telegram" },
	{ icon: Mail01Icon, href: siteConfig.links.email, label: "Email" },
]

export function Header({ name, title, isActive }: HeaderProps) {
	return (
		<header className="flex flex-col items-start gap-1 pb-2">
			<div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase mb-2">
				<span className="opacity-50">NODE_ID:</span>
				<span className="text-foreground font-bold">ALPHA_7</span>
				<span className="opacity-50 ml-2">VERSION:</span>
				<span className="text-foreground font-bold">1.0.4</span>
			</div>

			<motion.div 
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				className="flex flex-col items-start gap-2 relative"
			>
				<div className="absolute -left-6 top-0 bottom-0 w-0.5 bg-cyan-500/20 rounded-full hidden lg:block" />
				<h1 className="text-heading md:text-[42px] lg:text-[48px] tracking-tight font-bold text-foreground glitch-text transition-all duration-300 leading-none">
					{name}
				</h1>
				<div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
					<motion.p 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="text-[14px] text-muted-foreground max-w-md leading-relaxed font-mono"
					>
						<span className="text-cyan-500 mr-2">&gt;</span>
						{title}
					</motion.p>

					{isActive && (
						<div className="bezel px-2 py-0.5 flex items-center gap-2 bg-emerald-500/5 border-emerald-500/20 scale-90 sm:scale-100 origin-left">
							<div className="size-1 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_var(--emerald)]" />
							<span className="text-[9px] font-mono font-bold tracking-widest text-emerald-500 uppercase">
								System Active
							</span>
						</div>
					)}
				</div>

				<div className="mt-2 pl-4 border-l border-border/20">
					<CommandLine />
				</div>
			</motion.div>

			<div className="flex items-center gap-3 mt-4">
				{SOCIAL_LINKS.map((link: any, index: number) => (
					<motion.a
						key={link.label}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 + index * 0.05 }}
						className="size-7 bezel flex items-center justify-center bg-background/50 text-muted-foreground hover:text-cyan-500 hover:border-cyan-500/50 transition-all duration-300 group"
						title={link.label}
					>
						<HugeiconsIcon icon={link.icon} size={14} strokeWidth={2} />
					</motion.a>
				))}
			</div>
		</header>
	)
}
