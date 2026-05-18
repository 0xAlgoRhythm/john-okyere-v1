import React from "react"
import { ArrowUpRight03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { allAwards } from "content-collections"
import { SectionGrid, SectionTitle, SectionContent } from "@/components/ui/section-grid"

export function Awards() {
	const sortedAwards = [...allAwards]
		.filter((a: any) => !a.draft)
		.sort((a, b) => a.sort - b.sort)

	if (sortedAwards.length === 0) {
		return null
	}

	return (
		<SectionGrid>
			<SectionTitle>Recognition_Archive</SectionTitle>
			<SectionContent>
				<div className="flex flex-col bezel bg-cyan-500/[0.02] divide-y divide-border/40">
					{sortedAwards.map((award: any) => {
						const isFirst = award.sort === 1
						return (
							<div
								key={`${award.year}-${award.title}`}
								className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 transition-colors ${
									isFirst
										? "hover:bg-amber-500/[0.04] animate-gold-pulse"
										: "hover:bg-cyan-500/[0.03]"
								}`}
							>
								<div className="flex flex-col gap-1">
									<div className={`flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest ${isFirst ? "text-amber-400" : "text-cyan-500"}`}>
										{isFirst ? (
											<>
												<span className="opacity-60">[GOLD]</span>
												<span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
											</>
										) : (
											<span className="opacity-50">[AWARD]</span>
										)}
										<span>{award.year}</span>
									</div>
									{award.href ? (
										<a
											href={award.href}
											target="_blank"
											rel="noopener noreferrer"
											className="group flex items-center gap-2"
										>
											<h3 className={`text-item-title font-bold transition-colors ${
												isFirst
													? "text-amber-300 group-hover:text-amber-200"
													: "text-foreground group-hover:text-cyan-500"
											}`}>
												{award.title}
											</h3>
											<HugeiconsIcon
												icon={ArrowUpRight03Icon}
												size={12}
												className={`transition-transform group-hover:-translate-y-0.5 ${
													isFirst ? "text-amber-400/60 group-hover:text-amber-300" : "text-muted-foreground group-hover:text-cyan-500"
												}`}
											/>
										</a>
									) : (
										<h3 className={`text-item-title font-bold ${isFirst ? "text-amber-300" : "text-foreground"}`}>
											{award.title}
										</h3>
									)}
								</div>
								<p className={`text-caption italic text-[11px] font-mono ${isFirst ? "text-amber-400/70" : "text-muted-foreground"}`}>
									{award.description}
								</p>
							</div>
						)
					})}
				</div>
			</SectionContent>
		</SectionGrid>
	);
}
