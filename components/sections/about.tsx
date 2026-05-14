"use client"
import React from "react"
import { ArrowUpRight03Icon, Calendar03Icon, Mail01Icon, GithubIcon, Linkedin01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import { siteConfig } from "@/config/site"

import { SectionGrid, SectionTitle, SectionContent } from "@/components/ui/section-grid"

export function About() {
	return (
		<SectionGrid className="pt-4 pb-4">
			<SectionTitle>Core_Briefing</SectionTitle>
			<SectionContent className="space-y-4">
				<div className="text-body text-muted-foreground text-pretty space-y-4 max-w-2xl">
					<p>
						I design and build <span className="text-foreground font-medium">AI-powered</span> and{" "}
						<span className="text-foreground font-medium">on-chain systems</span> that solve real-world problems, with a focus on performance, usability, and scalability.
					</p>
					<p>
						Currently focused on developing intelligent spend control layers and programmable financial protocols for the emerging agentic economy.
					</p>
					
					<div className="bezel bg-accent/5 p-4 mt-4">
						<div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-cyan-500">
							<span className="animate-pulse">●</span>
							<span>PREVIOUS_ENGAGEMENT: CREDAXIS</span>
						</div>
						<p className="text-caption leading-relaxed italic">
							"Built and shipped cloud and blockchain solutions across multiple domains."
						</p>
					</div>
				</div>
			</SectionContent>

			<SectionTitle className="mt-12">Network_Ports</SectionTitle>
			<SectionContent className="space-y-4">
				<div className="flex flex-wrap items-center gap-x-6 gap-y-3">
					<a
						href={siteConfig.links.cal}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 text-caption font-medium text-foreground hover:text-cyan-500 transition-colors"
					>
						<HugeiconsIcon
							icon={Calendar03Icon}
							size={14}
							strokeWidth={2}
							className="text-muted-foreground group-hover:text-cyan-500"
						/>
						<span className="border-b border-border group-hover:border-cyan-500/50 transition-colors">
							Book a call
						</span>
					</a>
					<a
						href={siteConfig.links.email}
						className="group flex items-center gap-2 text-caption font-medium text-foreground hover:text-emerald-500 transition-colors"
					>
						<HugeiconsIcon
							icon={Mail01Icon}
							size={14}
							strokeWidth={2}
							className="text-muted-foreground group-hover:text-emerald-500"
						/>
						<span className="border-b border-border group-hover:border-emerald-500/50 transition-colors">
							Send an email
						</span>
					</a>
					<a
						href={siteConfig.links.github}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 text-caption font-medium text-foreground hover:text-cyan-500 transition-colors"
					>
						<HugeiconsIcon
							icon={GithubIcon}
							size={14}
							strokeWidth={2}
							className="text-muted-foreground group-hover:text-cyan-500"
						/>
						<span className="border-b border-border group-hover:border-cyan-500/50 transition-colors">
							GitHub
						</span>
					</a>
					<a
						href={siteConfig.links.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 text-caption font-medium text-foreground hover:text-cyan-500 transition-colors"
					>
						<HugeiconsIcon
							icon={Linkedin01Icon}
							size={14}
							strokeWidth={2}
							className="text-muted-foreground group-hover:text-cyan-500"
						/>
						<span className="border-b border-border group-hover:border-cyan-500/50 transition-colors">
							LinkedIn
						</span>
					</a>
				</div>
			</SectionContent>
		</SectionGrid>
	)
}
