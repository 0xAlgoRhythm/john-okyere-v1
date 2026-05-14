import { Github01Icon, GlobalIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { allWorks } from "content-collections"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDX } from "@/components/mdx"

interface WorkPageProps {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({
	params,
}: WorkPageProps): Promise<Metadata> {
	const { slug } = await params
	const project = allWorks.find((p) => p._meta.path === slug)
	if (!project) return { title: "Work Not Found" }
	return {
		title: { absolute: project.title },
		description: project.description,
	}
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
	const { slug } = await params
	const project = allWorks.find((p) => p._meta.path === slug)
	if (!project) return notFound()

	return (
		<div className="px-6 md:px-10 py-6 md:py-8">
			<section className="pb-10 mb-10">
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
						<span className="opacity-50">~</span>
						<Link href="/work" className="hover:text-foreground transition-colors">PROJECTS</Link>
						<span className="opacity-50">/</span>
						<span>{project.title.toUpperCase().replace(/\s+/g, "_")}</span>
					</div>
				</div>

				{project.image && (
					<div className="bezel bg-accent/5 overflow-hidden mb-12">
						<div className="p-2 border-b border-border/20 bg-background/50 flex items-center gap-2">
							<div className="flex gap-1">
								<div className="size-1.5 rounded-full bg-red-500/50" />
								<div className="size-1.5 rounded-full bg-amber-500/50" />
								<div className="size-1.5 rounded-full bg-emerald-500/50" />
							</div>
							<span className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest ml-2">
								System_Preview_01.raw
							</span>
						</div>
						<Image
							src={project.image}
							alt={project.title}
							width={1200}
							height={675}
							className="w-full h-auto object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
							priority
						/>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-12 gap-10">
					<div className="md:col-span-8 space-y-8">
						<div className="space-y-4">
							<div className="flex items-center gap-3 font-mono text-[10px] text-emerald-500">
								<span className="animate-pulse">●</span>
								<span className="uppercase tracking-[0.2em]">Live_Status: {project.status}</span>
							</div>
							<h1 className="text-heading md:text-[48px] font-bold tracking-tight text-foreground leading-tight">
								{project.title}
							</h1>
							<p className="text-body text-muted-foreground leading-relaxed max-w-2xl">
								{project.description}
							</p>
						</div>

						{project.mdx && (
							<div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight">
								<MDX code={project.mdx} />
							</div>
						)}
					</div>

					<div className="md:col-span-4 space-y-10">
						<div className="bezel bg-accent/5 p-6 space-y-8">
							{project.timeline && (
								<div className="space-y-2">
									<h3 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">
										# Timeline
									</h3>
									<p className="text-body font-bold text-foreground font-mono">{project.timeline}</p>
								</div>
							)}
							
							{project.role && (
								<div className="space-y-2">
									<h3 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">
										# Capacity
									</h3>
									<p className="text-body font-bold text-foreground font-mono uppercase">{project.role}</p>
								</div>
							)}

							{project.stack && project.stack.length > 0 && (
								<div className="space-y-3">
									<h3 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">
										# Tech_Modules
									</h3>
									<div className="flex flex-wrap gap-2">
										{project.stack.map((tech) => (
											<span
												key={tech}
												className="px-2 py-0.5 bezel bg-background text-[9px] font-mono text-foreground uppercase"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							)}

							<div className="space-y-4 pt-4 border-t border-border/20">
								<h3 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">
									# Network_Links
								</h3>
								<div className="flex flex-col gap-3">
									{project.href && (
										<a
											href={project.href}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 text-[10px] font-mono text-foreground hover:text-cyan-500 transition-colors uppercase tracking-widest"
										>
											<HugeiconsIcon icon={GlobalIcon} size={14} />
											<span>Access_Deploy</span>
										</a>
									)}
									{project.source && (
										<a
											href={project.source}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 text-[10px] font-mono text-foreground hover:text-emerald-500 transition-colors uppercase tracking-widest"
										>
											<HugeiconsIcon icon={Github01Icon} size={14} />
											<span>Source_Terminal</span>
										</a>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{(project.prev || project.next) && (
				<div className="mt-16 pt-10 border-t border-border/40">
					<div className="grid grid-cols-2 gap-4">
						{project.prev ? (
							<Link
								href={`/work/${project.prev._meta.path}`}
								className="bezel bg-accent/5 p-4 hover:border-cyan-500/50 transition-all group"
							>
								<span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block mb-1 opacity-50">
									&larr; Previous_Entry
								</span>
								<span className="text-caption font-bold text-foreground group-hover:text-cyan-500 transition-colors">
									{project.prev.title}
								</span>
							</Link>
						) : <div />}
						{project.next && (
							<Link
								href={`/work/${project.next._meta.path}`}
								className="bezel bg-accent/5 p-4 hover:border-cyan-500/50 transition-all group text-right"
							>
								<span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block mb-1 opacity-50">
									Next_Entry &rarr;
								</span>
								<span className="text-caption font-bold text-foreground group-hover:text-cyan-500 transition-colors">
									{project.next.title}
								</span>
							</Link>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
