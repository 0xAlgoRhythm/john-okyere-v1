import { allWritings } from "content-collections"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { readingTime } from "reading-time-estimator"
import { MDX } from "@/components/mdx"

import { SubPageNav } from "@/components/ui/sub-page-nav"

interface WritingPageProps {
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
}: WritingPageProps): Promise<Metadata> {
	const { slug } = await params
	const post = allWritings.find((p) => p._meta.path === slug)
	if (!post) return { title: "Writing Not Found" }
	return {
		title: { absolute: post.title },
		description: post.summary,
	}
}

export default async function WritingDetailPage({ params }: WritingPageProps) {
	const { slug } = await params
	const post = allWritings.find((p) => p._meta.path === slug)
	if (!post) return notFound()

	const readingTimeMinutes = readingTime(post.content).minutes

	return (
		<div className="px-6 md:px-10 py-6 md:py-8">
			<section className="pb-10 mb-10">
				<div className="flex items-center justify-between mb-8">
					<SubPageNav 
						path={[
							{ label: "WRITING", href: "/writing" },
							{ label: post.title.toUpperCase().replace(/\s+/g, "_") }
						]} 
					/>
				</div>

				<header className="space-y-6 mb-12">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-3 font-mono text-[9px] text-emerald-500">
							<span className="animate-pulse">●</span>
							<span className="uppercase tracking-[0.2em]">Intel_Verified: Decrypted_Log</span>
						</div>
						<h1 className="text-heading md:text-[48px] font-bold tracking-tight text-foreground leading-tight">
							{post.title}
						</h1>
						{post.summary && (
							<p className="text-body text-muted-foreground max-w-2xl leading-relaxed">
								{post.summary}
							</p>
						)}
					</div>

					<div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border/20">
						<div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
							<span className="opacity-40">TIMESTAMP:</span>
							<time dateTime={post.date}>{formatDate(new Date(post.date))}</time>
						</div>
						<div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
							<span className="opacity-40">READ_TIME:</span>
							<span>{readingTimeMinutes} MIN</span>
						</div>
						{post.tags && post.tags.length > 0 && (
							<div className="flex gap-2">
								{post.tags.map((tag) => (
									<span key={tag} className="px-1.5 py-0.5 bezel bg-accent/5 text-[9px] font-mono text-cyan-500">
										#{tag.toUpperCase()}
									</span>
								))}
							</div>
						)}
					</div>
				</header>

				{post.image && (
					<div className="bezel bg-accent/5 overflow-hidden mb-12">
						<Image
							src={post.image}
							alt={post.title}
							width={1200}
							height={675}
							className="w-full h-auto object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
							priority
						/>
					</div>
				)}

				<div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-muted-foreground">
					<MDX code={post.mdx} />
				</div>
			</section>

			{(post.prev || post.next) && (
				<div className="mt-16 pt-10 border-t border-border/40">
					<div className="grid grid-cols-2 gap-4">
						{post.prev ? (
							<Link
								href={`/writing/${post.prev._meta.path}`}
								className="bezel bg-accent/5 p-4 hover:border-emerald-500/50 transition-all group"
							>
								<span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block mb-1 opacity-50">
									&larr; Previous_Intel
								</span>
								<span className="text-caption font-bold text-foreground group-hover:text-emerald-500 transition-colors">
									{post.prev.title}
								</span>
							</Link>
						) : <div />}
						{post.next && (
							<Link
								href={`/writing/${post.next._meta.path}`}
								className="bezel bg-accent/5 p-4 hover:border-emerald-500/50 transition-all group text-right"
							>
								<span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block mb-1 opacity-50">
									Next_Intel &rarr;
								</span>
								<span className="text-caption font-bold text-foreground group-hover:text-emerald-500 transition-colors">
									{post.next.title}
								</span>
							</Link>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
