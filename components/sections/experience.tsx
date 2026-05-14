"use client"

import { ArrowUpRight03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { allExperiences } from "content-collections"
import { cn } from "@/lib/utils"
import { SectionGrid, SectionTitle, SectionContent } from "@/components/ui/section-grid"

const COMPANY_ICONS: Record<string, string> = {
	Necta: "/icons/necta-icon.svg",
}

function CompanyIcon({ company, href }: { company: string; href?: string }) {
	const iconSrc = COMPANY_ICONS[company]

	const content = iconSrc ? (
		<Image
			src={iconSrc}
			alt={company}
			width={20}
			height={20}
			className="size-4 rounded-sm object-contain"
		/>
	) : (
		<span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">
			{company.charAt(0)}
		</span>
	)

	const containerClass =
		"size-7 bezel flex items-center justify-center bg-background/50 shrink-0 transition-colors duration-200"

	if (href) {
		return (
			<Link
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={cn(containerClass, "hover:border-cyan-500/50")}
				onClick={(e) => e.stopPropagation()}
			>
				{content}
			</Link>
		)
	}

	return <div className={containerClass}>{content}</div>
}

interface ExperienceCardProps {
	role: string
	company: string
	companyHref?: string
	year: string
	bullets?: string[]
	isFirst: boolean
	isLast: boolean
}

const ExperienceCard = React.memo(function ExperienceCard({
	role,
	company,
	companyHref,
	year,
	bullets,
	isFirst,
	isLast,
}: ExperienceCardProps) {
	const hasBullets = Boolean(bullets && bullets.length > 0)
	const [isOpen, setIsOpen] = useState<boolean>(!!isFirst && !!hasBullets)

	return (
		<div className="flex gap-4 group/card py-1">
			<div className="flex flex-col items-center">
				<CompanyIcon company={company} href={companyHref} />
				{!isLast && <div className="w-px bg-border/40 flex-1 min-h-[1.5rem] mt-2" />}
			</div>

			<div className="flex-1 flex flex-col min-w-0">
				<button
					type="button"
					disabled={!hasBullets}
					className={cn(
						"flex flex-col gap-1 text-left w-full transition-opacity pb-2", 
						hasBullets ? "cursor-pointer hover:opacity-80" : "cursor-default"
					)}
					onClick={(e) => {
						if (!hasBullets) return
						e.preventDefault()
						setIsOpen((prev) => !prev)
					}}
				>
					<div className="flex items-center gap-2 font-mono text-[9px] text-cyan-500 uppercase tracking-[0.2em]">
						<span className="opacity-50">[ENTRY_POINT]</span>
						<span>{year}</span>
					</div>
					<div className="flex items-baseline justify-between gap-4">
						<h3 className="text-item-title font-bold text-foreground truncate">
							{company}
						</h3>
						<span className="text-[10px] font-mono text-muted-foreground uppercase shrink-0">
							{role}
						</span>
					</div>
				</button>

				<AnimatePresence initial={false}>
					{isOpen && hasBullets && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
							className="overflow-hidden"
						>
							<ul className="mt-1 mb-4 space-y-1.5 bezel bg-accent/5 p-3">
								{bullets?.map((bullet: string, i: number) => (
									<li
										key={`${bullet.slice(0, 20)}-${i}`}
										className="text-caption text-muted-foreground leading-relaxed flex gap-3"
									>
										<span className="text-cyan-500 font-mono text-[10px] mt-0.5 opacity-50">
											→
										</span>
										{bullet}
									</li>
								))}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
})

export function Experience() {
	const experiences = [...allExperiences].sort((a, b) => {
		const ay = Number(a.year.split(" - ")[0])
		const by = Number(b.year.split(" - ")[0])
		if (Number.isFinite(ay) && Number.isFinite(by)) return by - ay
		return b.year.localeCompare(a.year)
	})

	return (
		<SectionGrid>
			<SectionTitle>Experience_Chronology</SectionTitle>
			<SectionContent>
				<div className="flex flex-col">
					{experiences.map((experience, index) => (
						<ExperienceCard
							key={`${experience.year}-${experience.company}`}
							role={experience.role}
							company={experience.company}
							companyHref={experience.companyHref || undefined}
							year={experience.year}
							bullets={experience.bullets}
							isFirst={index === 0}
							isLast={index === experiences.length - 1}
						/>
					))}
				</div>
			</SectionContent>
		</SectionGrid>
	)
}
