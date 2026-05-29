import React from "react"
import { allResearch } from "content-collections"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { readingTime } from "reading-time-estimator"
import { MDX } from "@/components/mdx"
import { SubPageNav } from "@/components/ui/sub-page-nav"
import { FileDownloadIcon, Link01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

interface ResearchPageProps {
	params: Promise<{ slug: string }>
}

function formatDate(date: Date): string {
	return Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(date)
}

export async function generateMetadata({
	params,
}: ResearchPageProps): Promise<Metadata> {
	const { slug } = await params
	const paper = allResearch.find((p: any) => p._meta.path === slug)
	if (!paper) return { title: "Research Not Found" }
	return {
		title: { absolute: paper.title },
		description: paper.summary,
	}
}

export default async function ResearchDetailPage({ params }: ResearchPageProps) {
	const { slug } = await params

	const sorted = [...allResearch]
		.filter((p: any) => !p.draft)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	const index = sorted.findIndex((p) => p._meta.path === slug)
	if (index === -1) return notFound()

	const paper = sorted[index]
	const prev = index < sorted.length - 1 ? sorted[index + 1] : null
	const next = index > 0 ? sorted[index - 1] : null

	const readingTimeMinutes = readingTime(paper.content).minutes

	return (
		<div className="px-6 md:px-10 py-6 md:py-8">
			<section className="pb-10 mb-10">
				<div className="flex items-center justify-between mb-8">
					<SubPageNav 
						path={[
							{ label: "RESEARCH", href: "/research" },
							{ label: paper.title.slice(0, 15).toUpperCase().replace(/\s+/g, "_") + "..." }
						]} 
					/>
				</div>

				<header className="space-y-6 mb-12">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-3 font-mono text-[9px] text-cyan-500">
							<span className="animate-pulse">●</span>
							<span className="uppercase tracking-[0.2em]">Research_Attestation: Verified_Log</span>
						</div>
						<h1 className="text-heading md:text-[40px] font-bold tracking-tight text-foreground leading-tight">
							{paper.title}
						</h1>
						{paper.summary && (
							<p className="text-body text-muted-foreground max-w-2xl leading-relaxed font-mono text-[13px] border-l-2 border-cyan-500/20 pl-4 py-1 bg-cyan-500/[0.01]">
								&gt; {paper.summary}
							</p>
						)}
					</div>

					<div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border/20">
						<div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
							<span className="opacity-40">TIMESTAMP:</span>
							<time dateTime={paper.date}>{formatDate(new Date(paper.date))}</time>
						</div>
						<div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
							<span className="opacity-40">READ_TIME:</span>
							<span>{readingTimeMinutes} MIN</span>
						</div>
						{paper.tags && paper.tags.length > 0 && (
							<div className="flex gap-2">
								{paper.tags.map((tag: string) => (
									<span key={tag} className="px-1.5 py-0.5 bezel bg-accent/5 text-[9px] font-mono text-cyan-500">
										#{tag.toUpperCase()}
									</span>
								))}
							</div>
						)}
					</div>

					{/* External publication and PDF action buttons */}
					<div className="flex flex-wrap items-center gap-3 pt-4">
						{paper.pdf && (
							<a
								href={paper.pdf}
								target="_blank"
								rel="noopener noreferrer"
								className="bezel px-4 py-2 bg-cyan-500 text-black text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors flex items-center gap-2"
							>
								<HugeiconsIcon icon={FileDownloadIcon} size={13} />
								<span>Download_PDF</span>
							</a>
						)}
						{paper.scholarUrl && (
							<a
								href={paper.scholarUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="bezel px-4 py-2 border border-border hover:border-cyan-500/50 text-[10px] font-mono font-bold uppercase tracking-widest hover:text-cyan-500 transition-colors flex items-center gap-2"
							>
								<span>Google_Scholar</span>
							</a>
						)}
						{paper.url && paper.url !== paper.pdf && (
							<a
								href={paper.url}
								target="_blank"
								rel="noopener noreferrer"
								className="bezel px-4 py-2 border border-border hover:border-cyan-500/50 text-[10px] font-mono font-bold uppercase tracking-widest hover:text-cyan-500 transition-colors flex items-center gap-2"
							>
								<HugeiconsIcon icon={Link01Icon} size={13} />
								<span>SSRN_Publication</span>
							</a>
						)}
					</div>
				</header>

				{paper.image && (
					<div className="bezel bg-accent/5 overflow-hidden mb-12">
						<Image
							src={paper.image}
							alt={paper.title}
							width={1200}
							height={675}
							className="w-full h-auto object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
							priority
						/>
					</div>
				)}

				<div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-muted-foreground prose-a:text-cyan-500 hover:prose-a:text-cyan-400">
					<MDX code={paper.mdx} />
				</div>
			</section>

			{(prev || next) && (
				<div className="mt-16 pt-10 border-t border-border/40">
					<div className="grid grid-cols-2 gap-4">
						{prev ? (
							<Link
								href={`/research/${prev._meta.path}`}
								className="bezel bg-accent/5 p-4 hover:border-cyan-500/50 transition-all group"
							>
								<span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block mb-1 opacity-50">
									&larr; Previous_Research
								</span>
								<span className="text-caption font-bold text-foreground group-hover:text-cyan-500 transition-colors">
									{prev.title}
								</span>
							</Link>
						) : <div />}
						{next && (
							<Link
								href={`/research/${next._meta.path}`}
								className="bezel bg-accent/5 p-4 hover:border-cyan-500/50 transition-all group text-right"
							>
								<span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block mb-1 opacity-50">
									Next_Research &rarr;
								</span>
								<span className="text-caption font-bold text-foreground group-hover:text-cyan-500 transition-colors">
									{next.title}
								</span>
							</Link>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
