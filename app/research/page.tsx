import React from "react"
import { allResearch } from "content-collections"
import Link from "next/link"
import { SubPageNav } from "@/components/ui/sub-page-nav"
import { ArrowUpRight03Icon, FileDownloadIcon, Link01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

function formatDate(date: Date): string {
	return Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(date)
}

export default function ResearchPage() {
	const sortedResearch = [...allResearch]
		.filter((p: any) => !p.draft)
		.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime()
		})

	return (
		<div className="px-6 md:px-10 py-6 md:py-8">
			<section className="pb-10 border-b border-border/40 mb-10">
				<div className="flex items-center justify-between mb-8">
					<SubPageNav path={[{ label: "RESEARCH" }]} />
				</div>
				
				<div className="space-y-3">
					<h1 className="text-heading md:text-[42px] font-bold tracking-tight text-foreground">
						Research_Archive
					</h1>
					<p className="text-body text-muted-foreground max-w-xl font-mono">
						&gt; Publications, preprints, and reviews on cryptographic frameworks, zero-knowledge proofs, and digital identity structures.
					</p>
				</div>
			</section>

			<div className="space-y-4 pb-16">
				<div className="bezel bg-accent/5 divide-y divide-border/20">
					{sortedResearch.map((paper: any, index: number) => (
						<div
							key={paper._meta.path}
							className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:bg-cyan-500/[0.04] transition-all duration-300"
						>
							<div className="flex-1 flex items-start gap-4 md:gap-6 min-w-0">
								<span className="font-mono text-[10px] text-muted-foreground opacity-30 pt-1">
									#{index.toString().padStart(3, "0")}
								</span>
								<div className="space-y-2 min-w-0">
									<Link href={`/research/${paper._meta.path}`} className="block">
										<h2 className="text-item-title font-bold text-foreground group-hover:text-cyan-500 transition-colors">
											{paper.title}
										</h2>
									</Link>
									<p className="text-caption text-muted-foreground line-clamp-2 max-w-2xl leading-relaxed">
										{paper.summary}
									</p>
									<div className="flex flex-wrap items-center gap-2 pt-1">
										<div className="flex items-center gap-2 font-mono text-[9px] text-muted-foreground bg-background/50 px-1.5 py-0.5 bezel">
											<span className="opacity-40">TIMESTAMP:</span>
											<time dateTime={paper.date}>{formatDate(new Date(paper.date))}</time>
										</div>
										{paper.tags && paper.tags.map((tag: string) => (
											<span key={tag} className="px-1.5 py-0.5 bezel bg-accent/5 text-[9px] font-mono text-cyan-500">
												#{tag.toUpperCase()}
											</span>
										))}
									</div>
								</div>
							</div>
							
							<div className="flex items-center gap-3 ml-14 md:ml-0 self-start md:self-center shrink-0">
								{paper.pdf && (
									<a
										href={paper.pdf}
										target="_blank"
										rel="noopener noreferrer"
										className="bezel px-3 py-1.5 bg-background/50 text-[10px] font-mono font-bold text-muted-foreground hover:text-cyan-500 hover:border-cyan-500/50 transition-all flex items-center gap-1.5"
									>
										<HugeiconsIcon icon={FileDownloadIcon} size={12} />
										<span>PDF</span>
									</a>
								)}
								{paper.scholarUrl && (
									<a
										href={paper.scholarUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="bezel px-3 py-1.5 bg-background/50 text-[10px] font-mono font-bold text-muted-foreground hover:text-cyan-500 hover:border-cyan-500/50 transition-all flex items-center gap-1.5"
									>
										<span>SCHOLAR</span>
									</a>
								)}
								{paper.url && paper.url !== paper.pdf && (
									<a
										href={paper.url}
										target="_blank"
										rel="noopener noreferrer"
										className="bezel px-3 py-1.5 bg-background/50 text-[10px] font-mono font-bold text-muted-foreground hover:text-cyan-500 hover:border-cyan-500/50 transition-all flex items-center gap-1.5"
									>
										<HugeiconsIcon icon={Link01Icon} size={12} />
										<span>SSRN</span>
									</a>
								)}
								<Link
									href={`/research/${paper._meta.path}`}
									className="bezel p-1.5 bg-background/50 text-muted-foreground hover:text-cyan-500 hover:border-cyan-500/50 transition-all"
									title="View paper details and review"
								>
									<HugeiconsIcon icon={ArrowUpRight03Icon} size={12} className="group-hover:-translate-y-0.5 transition-transform" />
								</Link>
							</div>
						</div>
					))}
				</div>

				{sortedResearch.length === 0 && (
					<div className="bezel p-12 text-center text-muted-foreground font-mono">
						<p>QUERY_EMPTY: No research papers or preprints found in database.</p>
					</div>
				)}
			</div>
		</div>
	)
}
