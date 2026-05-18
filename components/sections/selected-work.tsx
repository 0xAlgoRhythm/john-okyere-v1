"use client"
import React from "react"

import { ArrowUpRight03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { allWorks } from "content-collections"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { SectionGrid, SectionTitle, SectionContent } from "@/components/ui/section-grid"

function getStatus(raw: string): { label: string; dot: string } {
	const s = (raw || "live").toLowerCase()
	if (s.includes("live"))     return { label: "LIVE",     dot: "bg-emerald-500" }
	if (s.includes("archived")) return { label: "ARCHIVED", dot: "bg-amber-500" }
	if (s.includes("wip") || s.includes("progress")) return { label: "WIP", dot: "bg-cyan-500" }
	return { label: raw.toUpperCase().replace(/\s+/g, "_"), dot: "bg-emerald-500" }
}

export function SelectedWork() {
	const sortedProjects = [...allWorks].sort((a, b) => a.sort - b.sort)
	const featuredProjects = sortedProjects.slice(0, 4)

	return (
		<SectionGrid>
			<SectionTitle
				action={
					<Link
						href="/work"
						className="text-[10px] font-mono text-muted-foreground hover:text-cyan-500 uppercase tracking-widest transition-colors flex items-center gap-1.5 group font-normal"
					>
						<span>View_All</span>
						<HugeiconsIcon icon={ArrowUpRight03Icon} size={12} className="group-hover:-translate-y-0.5 transition-transform" />
					</Link>
				}
			>
				Project_Deployment_Log
			</SectionTitle>
			<SectionContent>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{featuredProjects.map((project: any, index: number) => {
						const status = getStatus(project.status)
						const indexLabel = (index + 1).toString().padStart(2, "0")

						return (
							<motion.div
								key={project._meta.path}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								whileHover={{ y: -3 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.08, duration: 0.3 }}
								className="group"
							>
								<a
									href={project.href}
									target="_blank"
									rel="noopener noreferrer"
									className="relative block bezel overflow-hidden bg-accent/5 p-4 space-y-3 hover:border-cyan-500/40 hover:shadow-[0_8px_32px_-8px_rgba(0,255,255,0.15)] transition-all duration-300"
								>
									{/* Shimmer sweep on hover */}
									<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none z-10" />

									{/* Index badge */}
									<div className="absolute top-3 right-3 font-mono text-[9px] text-muted-foreground/30 font-bold tabular-nums z-10">
										{indexLabel}
									</div>

									<div className="flex items-start justify-between relative z-0">
										<div className="flex flex-col gap-1 flex-1 min-w-0 pr-8">
											<div className="flex items-center gap-2 font-mono text-[9px]">
												<span className="flex items-center gap-1.5">
													<span className={`size-1.5 rounded-full ${status.dot} animate-pulse`} />
													<span className="text-muted-foreground/60 tracking-widest">{status.label}</span>
												</span>
												<span className="opacity-30">•</span>
												<span className="text-cyan-500/80 font-bold tracking-widest">
													{project.date || "2024.X"}
												</span>
											</div>
											<h3 className="text-item-title font-bold text-foreground group-hover:text-cyan-500 transition-colors duration-200 truncate">
												{project.title}
											</h3>
										</div>
										<div className="size-7 bezel flex items-center justify-center bg-background/50 shrink-0 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition-all duration-200">
											<HugeiconsIcon
												icon={ArrowUpRight03Icon}
												size={14}
												className="text-muted-foreground group-hover:text-cyan-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200"
											/>
										</div>
									</div>

									{project.image && (
										<div className="relative z-[1] w-full aspect-[16/9] overflow-hidden rounded-sm">
											<Image
												src={project.image}
												alt={project.title}
												fill
												sizes="(max-width: 768px) 100vw, 50vw"
												className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500"
											/>
											<div className="absolute inset-0 z-[2] bg-gradient-to-t from-background/80 to-transparent opacity-60 pointer-events-none" />
											<div className="absolute bottom-3 left-3 z-[3] flex gap-2 flex-wrap">
												{project.stack?.slice(0, 3).map((tag: string, i: number) => (
													<span
														key={`${tag}-${i}`}
														className="px-1.5 py-0.5 bezel bg-background/80 backdrop-blur-sm text-[8px] font-mono text-foreground tracking-tighter"
													>
														{tag.toUpperCase()}
													</span>
												))}
											</div>
										</div>
									)}

									<p className="text-caption text-muted-foreground line-clamp-2 leading-relaxed">
										{project.description}
									</p>
								</a>
							</motion.div>
						)
					})}
				</div>
			</SectionContent>
		</SectionGrid>
	)
}
