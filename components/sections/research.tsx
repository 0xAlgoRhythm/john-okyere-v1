"use client"
import React from "react"

import { ArrowUpRight03Icon, FileDownloadIcon, Link01Icon, File01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { allResearch } from "content-collections"
import Link from "next/link"
import { SectionGrid, SectionTitle, SectionContent } from "@/components/ui/section-grid"

function formatDate(date: Date): string {
	return Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(date)
}

export function Research() {
	const sortedResearch = [...allResearch]
		.filter((p: any) => !p.draft)
		.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		)
	const recentResearch = sortedResearch.slice(0, 3)

	if (recentResearch.length === 0) return null

	return (
		<SectionGrid>
			<SectionTitle
				action={
					<Link
						href="/research"
						className="text-[10px] font-mono text-muted-foreground hover:text-cyan-500 uppercase tracking-widest transition-colors flex items-center gap-1.5 group font-normal"
					>
						<span>All_Research</span>
						<HugeiconsIcon icon={ArrowUpRight03Icon} size={12} className="group-hover:-translate-y-0.5 transition-transform" />
					</Link>
				}
			>
				Research_Publications
			</SectionTitle>
			<SectionContent>
				<div className="flex flex-col bezel bg-cyan-500/[0.02] divide-y divide-border/40">
					{recentResearch.map((paper: any) => (
						<div
							key={paper._meta.path}
							className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-cyan-500/[0.04] hover:translate-x-0.5 transition-all duration-200"
						>
							<div className="flex-1 min-w-0">
								<div className="flex flex-wrap items-center gap-2 mb-1.5">
									<span className="font-mono text-[9px] text-muted-foreground opacity-30">
										PUB_ID: {paper._meta.path.slice(0, 5).toUpperCase()}
									</span>
									<span className="opacity-30 text-[9px]">•</span>
									<div className="flex items-center gap-1 font-mono text-[9px] text-muted-foreground bg-background/50 px-1.5 py-0.5 bezel">
										<time dateTime={paper.date}>{formatDate(new Date(paper.date))}</time>
									</div>
									{paper.tags && paper.tags.slice(0, 2).map((tag: string) => (
										<span key={tag} className="px-1 py-0.5 border border-border/40 bg-background/30 text-[8px] font-mono text-cyan-500">
											{tag.toUpperCase()}
										</span>
									))}
								</div>
								<Link
									href={`/research/${paper._meta.path}`}
									className="block"
								>
									<h3 className="text-item-title font-bold text-foreground group-hover:text-cyan-500 transition-colors leading-snug">
										{paper.title}
									</h3>
									<p className="text-caption text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
										{paper.summary}
									</p>
								</Link>
							</div>

							<div className="flex items-center gap-2 sm:self-center">
								{paper.pdf && (
									<a
										href={paper.pdf}
										target="_blank"
										rel="noopener noreferrer"
										className="bezel p-1.5 bg-background/50 text-muted-foreground hover:text-cyan-500 hover:border-cyan-500/50 transition-colors flex items-center justify-center"
										title="View PDF Document"
									>
										<HugeiconsIcon icon={FileDownloadIcon} size={12} />
									</a>
								)}
								{paper.scholarUrl && (
									<a
										href={paper.scholarUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="bezel p-1.5 bg-background/50 text-muted-foreground hover:text-cyan-500 hover:border-cyan-500/50 transition-colors flex items-center justify-center font-mono text-[9px]"
										title="View Google Scholar Profile"
									>
										<span className="font-bold tracking-tight">GS</span>
									</a>
								)}
								{paper.url && paper.url !== paper.pdf && (
									<a
										href={paper.url}
										target="_blank"
										rel="noopener noreferrer"
										className="bezel p-1.5 bg-background/50 text-muted-foreground hover:text-cyan-500 hover:border-cyan-500/50 transition-colors flex items-center justify-center"
										title="View Publication page"
									>
										<HugeiconsIcon icon={Link01Icon} size={12} />
									</a>
								)}
								<Link
									href={`/research/${paper._meta.path}`}
									className="bezel p-1.5 bg-background/50 text-muted-foreground hover:text-cyan-500 hover:border-cyan-500/50 transition-colors flex items-center justify-center ml-1"
									title="View Paper Review / Details"
								>
									<HugeiconsIcon
										icon={ArrowUpRight03Icon}
										size={12}
										className="group-hover:-translate-y-0.5 transition-transform"
									/>
								</Link>
							</div>
						</div>
					))}
				</div>
			</SectionContent>
		</SectionGrid>
	)
}
