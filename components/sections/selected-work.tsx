"use client"
import React from "react"

import { ArrowUpRight03Icon, Folder01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { allWorks } from "content-collections"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { SectionGrid, SectionTitle, SectionContent } from "@/components/ui/section-grid"

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
					{featuredProjects.map((project: any, index: number) => (
						<motion.div
							key={project._meta.path}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="group"
						>
							<a
								href={project.href}
								target="_blank"
								rel="noopener noreferrer"
								className="block bezel bg-accent/5 p-4 space-y-3 hover:border-cyan-500/50 hover:shadow-glow-cyan transition-all duration-300"
							>
								<div className="flex items-start justify-between">
									<div className="flex flex-col gap-1">
										<div className="flex items-center gap-2 font-mono text-[9px] text-cyan-500">
											<span className="opacity-70">[MODULE]</span>
											<span className="font-bold tracking-widest text-cyan-500/90">
												{project.date || "2024.X"}
											</span>
										</div>
										<h3 className="text-item-title font-bold text-foreground">
											{project.title}
										</h3>
									</div>
									<div className="size-8 bezel flex items-center justify-center bg-background/50">
										<HugeiconsIcon
											icon={ArrowUpRight03Icon}
											size={16}
											className="text-muted-foreground group-hover:text-cyan-500 transition-colors"
										/>
									</div>
								</div>

								{project.image && (
									<div className="relative aspect-[16/9] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
										<Image
											src={project.image}
											alt={project.title}
											fill
											sizes="(max-width: 768px) 100vw, 50vw"
											className="object-cover"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
										<div className="absolute bottom-3 left-3 flex gap-2">
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
					))}
				</div>
			</SectionContent>
		</SectionGrid>
	)
}
