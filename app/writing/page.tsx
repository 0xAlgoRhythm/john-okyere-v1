import React from "react"
import { allWritings } from "content-collections"
import Link from "next/link"
import { SubPageNav } from "@/components/ui/sub-page-nav"

function formatDate(date: Date): string {
	return Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(date)
}

export default function WritingPage() {
	const sortedPosts = allWritings.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime()
	})

	return (
		<div className="px-6 md:px-10 py-6 md:py-8">
			<section className="pb-10 border-b border-border/40 mb-10">
				<div className="flex items-center justify-between mb-8">
					<SubPageNav path={[{ label: "WRITING" }]} />
				</div>
				
				<div className="space-y-3">
					<h1 className="text-heading md:text-[42px] font-bold tracking-tight text-foreground">
						Intel_Archive
					</h1>
					<p className="text-body text-muted-foreground max-w-xl">
						Decrypted logs on AI-native architectures, cryptographic systems, and technical leadership.
					</p>
				</div>
			</section>

			<div className="space-y-4 pb-16">
				<div className="bezel bg-accent/5 divide-y divide-border/20">
					{sortedPosts.map((post, index) => (
						<Link
							key={post._meta.path}
							href={`/writing/${post._meta.path}`}
							className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:bg-emerald-500/[0.04] transition-all"
						>
							<div className="flex items-center gap-6">
								<span className="font-mono text-[10px] text-muted-foreground opacity-30">
									#{index.toString().padStart(3, "0")}
								</span>
								<div className="space-y-1">
									<h2 className="text-item-title font-bold text-foreground group-hover:text-emerald-500 transition-colors">
										{post.title}
									</h2>
									<p className="text-caption text-muted-foreground line-clamp-1 max-w-xl">
										{post.summary}
									</p>
								</div>
							</div>
							
							<div className="flex items-center gap-4 ml-12 md:ml-0">
								<div className="hidden lg:block h-px w-24 bg-border/20" />
								<div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground bg-background/50 px-2 py-1 bezel">
									<span className="opacity-40">TIMESTAMP:</span>
									<time dateTime={post.date}>{formatDate(new Date(post.date))}</time>
								</div>
							</div>
						</Link>
					))}
				</div>

				{sortedPosts.length === 0 && (
					<div className="bezel p-12 text-center text-muted-foreground font-mono">
						<p>QUERY_EMPTY: No encrypted logs found in current sector.</p>
					</div>
				)}
			</div>
		</div>
	)
}
