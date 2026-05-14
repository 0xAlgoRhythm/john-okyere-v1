import { ArrowUpRight03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { allAwards } from "content-collections"
import { SectionGrid, SectionTitle, SectionContent } from "@/components/ui/section-grid"

export function Awards() {
	const sortedAwards = [...allAwards].sort((a, b) => a.sort - b.sort)

	if (sortedAwards.length === 0) {
		return null
	}

	return (
		<SectionGrid>
			<SectionTitle>Recognition_Archive</SectionTitle>
			<SectionContent>
				<div className="flex flex-col bezel bg-cyan-500/[0.02] divide-y divide-border/40">
					{sortedAwards.map((award) => (
						<div
							key={`${award.year}-${award.title}`}
							className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 hover:bg-cyan-500/[0.03] transition-colors"
						>
							<div className="flex flex-col gap-1">
								<div className="flex items-center gap-2 font-mono text-[9px] text-cyan-500 uppercase tracking-widest">
									<span className="opacity-50">[AWARD]</span>
									<span>{award.year}</span>
								</div>
								{award.href ? (
									<a
										href={award.href}
										target="_blank"
										rel="noopener noreferrer"
										className="group flex items-center gap-2"
									>
										<h3 className="text-item-title font-bold text-foreground group-hover:text-cyan-500 transition-colors">
											{award.title}
										</h3>
										<HugeiconsIcon
											icon={ArrowUpRight03Icon}
											size={12}
											className="text-muted-foreground group-hover:text-cyan-500 transition-transform group-hover:-translate-y-0.5"
										/>
									</a>
								) : (
									<h3 className="text-item-title font-bold text-foreground">
										{award.title}
									</h3>
								)}
							</div>
							<p className="text-caption text-muted-foreground font-mono italic text-[11px]">
								{award.description}
							</p>
						</div>
					))}
				</div>
			</SectionContent>
		</SectionGrid>
	);
}
