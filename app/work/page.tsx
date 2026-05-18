import React from "react"
import {
	ArrowRight02Icon,
	Github01Icon,
	Link01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { allWorks } from "content-collections"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { SubPageNav } from "@/components/ui/sub-page-nav"

export default function WorkPage() {
	const sortedProjects = [...allWorks]
		.filter(project => project._meta.path === "credaxis" || project._meta.path === "sui-copilot")
		.sort((a, b) => a.sort - b.sort)

	return (
		<div className="px-6 md:px-10 py-6 md:py-8">
			<section className="pb-10 border-b border-border/40 mb-10">
				<div className="flex items-center justify-between mb-8">
					<SubPageNav path={[{ label: "PROJECTS" }]} />
				</div>
				
				<div className="space-y-3">
					<h1 className="text-heading md:text-[42px] font-bold tracking-tight text-foreground">
						Production_Record
					</h1>
					<p className="text-body text-muted-foreground max-w-xl">
						A high-density archive of engineered systems, cloud infrastructure, and blockchain protocol research.
					</p>
				</div>
			</section>

			<div className="space-y-12 pb-16">
				{sortedProjects.map((project: any, index: number) => (
					<div
						key={project._meta.path}
						className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
					>
						<div className="md:col-span-1 hidden md:flex flex-col items-center gap-2 pt-1 font-mono text-[10px] text-muted-foreground opacity-30">
							<span>{index.toString().padStart(2, "0")}</span>
							<div className="w-px bg-border/40 flex-1 min-h-[100px]" />
						</div>

						<div className="md:col-span-11 grid grid-cols-1 lg:grid-cols-2 gap-8">
							{project.image && (
								<Link
									href={`/work/${project._meta.path}`}
									className="block bezel bg-accent/5 overflow-hidden hover:border-cyan-500/50 hover:shadow-glow-cyan transition-all duration-500 group/image"
								>
									<Image
										src={project.image}
										alt={project.title}
										width={600}
										height={400}
										className="w-full aspect-video object-cover grayscale group-hover/image:grayscale-0 group-hover/image:scale-105 transition-all duration-700"
									/>
									<div className="p-3 border-t border-border/20 bg-background/50 flex justify-between items-center">
										<span className="font-mono text-[9px] text-cyan-500 uppercase tracking-widest">
											[PREVIEW_ACTIVE]
										</span>
										<HugeiconsIcon icon={ArrowRight02Icon} size={12} className="text-muted-foreground group-hover/image:text-cyan-500 transition-colors" />
									</div>
								</Link>
							)}

							<div className="flex flex-col space-y-4">
								<div className="space-y-2">
									<div className="flex items-center gap-2 font-mono text-[9px] text-emerald-500 uppercase">
										<span>STATUS:</span>
										<span className="font-bold tracking-widest">{project.status}</span>
									</div>
									<h2 className="text-heading font-bold text-foreground leading-tight">
										{project.title}
									</h2>
								</div>

								<p className="text-body text-muted-foreground leading-relaxed">
									{project.description}
								</p>

								<div className="flex flex-wrap gap-2">
									{project.stack?.map((tech: string, i: number) => (
										<span
											key={`${tech}-${i}`}
											className="px-2 py-0.5 bezel bg-accent/5 text-[9px] font-mono text-foreground uppercase tracking-tight"
										>
											{tech}
										</span>
									))}
								</div>

								<div className="flex items-center gap-4 pt-2">
									<a
										href={project.href}
										target="_blank"
										rel="noopener noreferrer"
										className="bezel px-4 py-1.5 bg-foreground text-background text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-cyan-500 transition-colors"
									>
										Live_Deploy
									</a>
									{project.source && (
										<a
											href={project.source}
											target="_blank"
											rel="noopener noreferrer"
											className="bezel px-4 py-1.5 text-foreground text-[10px] font-mono font-bold uppercase tracking-widest hover:border-emerald-500 transition-colors"
										>
											Source_Code
										</a>
									)}
								</div>
							</div>
						</div>
					</div>
				))}

				{sortedProjects.length === 0 && (
					<div className="bezel p-12 text-center text-muted-foreground font-mono">
						<p>QUERY_EMPTY: No production records found in current database.</p>
					</div>
				)}
			</div>
		</div>
	)
}
