"use client"
import React from "react"

import { ArrowUpRight03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { allWritings } from "content-collections"
import Link from "next/link"
import { SectionGrid, SectionTitle, SectionContent } from "@/components/ui/section-grid"

function formatDate(date: Date): string {
	return Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(date)
}

export function Writing() {
	const sortedPosts = [...allWritings]
		.filter((p: any) => !p.draft)
		.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		)
	const recentPosts = sortedPosts.slice(0, 5)

	if (recentPosts.length === 0) return null

	return (
		<SectionGrid>
			<SectionTitle
				action={
					<Link
						href="/writing"
						className="text-[10px] font-mono text-muted-foreground hover:text-emerald-500 uppercase tracking-widest transition-colors flex items-center gap-1.5 group font-normal"
					>
						<span>Full_Database</span>
						<HugeiconsIcon icon={ArrowUpRight03Icon} size={12} className="group-hover:-translate-y-0.5 transition-transform" />
					</Link>
				}
			>
				Transmission_Buffer
			</SectionTitle>
			<SectionContent>
				<div className="flex flex-col bezel bg-emerald-500/[0.02] divide-y divide-border/40">
					{recentPosts.map((post: any) => (
						<Link
							key={post._meta.path}
							href={`/writing/${post._meta.path}`}
							className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 hover:bg-emerald-500/[0.04] hover:translate-x-0.5 transition-all duration-200"
						>
							<div className="flex items-center gap-4">
								<span className="hidden sm:block font-mono text-[10px] text-muted-foreground opacity-30">
									FILE_ID: {post._meta.path.slice(0, 4).toUpperCase()}
								</span>
								<h3 className="text-item-title font-bold text-foreground group-hover:text-emerald-500 transition-colors">
									{post.title}
								</h3>
							</div>
							<div className="flex items-center gap-4">
								<div className="flex-1 sm:hidden border-b border-dashed border-border/30" />
								{/* Date as a boxed pill */}
								<div className="flex items-center gap-1 font-mono text-[9px] text-muted-foreground bezel px-1.5 py-0.5 bg-background/50">
									<span className="opacity-40">[</span>
									<time dateTime={post.date}>{formatDate(new Date(post.date))}</time>
									<span className="opacity-40">]</span>
								</div>
								<HugeiconsIcon
									icon={ArrowUpRight03Icon}
									size={12}
									className="text-muted-foreground group-hover:text-emerald-500 transition-transform group-hover:-translate-y-0.5 shrink-0"
								/>
							</div>
						</Link>
					))}
				</div>
			</SectionContent>
		</SectionGrid>
	)
}
