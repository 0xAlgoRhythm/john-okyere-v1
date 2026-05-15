"use client"
import React from "react"
import { Calendar03Icon, Mail01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { siteConfig } from "@/config/site"
import { SectionGrid, SectionContent } from "@/components/ui/section-grid"
import { CalBookingModal } from "@/components/sections/cal-booking-modal"

export function About() {
	return (
		<SectionGrid className="pt-0 pb-2">
			<SectionContent className="space-y-6">
				<div className="flex flex-col gap-6">
					<div className="text-[15px] text-muted-foreground text-pretty space-y-4 max-w-2xl leading-relaxed">
						<p>
							I design and build <span className="text-foreground font-medium">AI-powered</span> and{" "}
							<span className="text-foreground font-medium">on-chain systems</span> that solve real-world problems, with a focus on performance and scalability.
						</p>

						<div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2">
							{/* Cal.com booking modal — opens inline calendar picker on click */}
							<CalBookingModal
								trigger={
									<button
										id="book-call-trigger"
										className="group flex items-center gap-2 text-[11px] font-mono font-bold text-foreground hover:text-cyan-500 transition-all duration-300 cursor-pointer"
									>
										<div className="size-5 bezel flex items-center justify-center bg-accent/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/50 transition-all">
											<HugeiconsIcon
												icon={Calendar03Icon}
												size={12}
												strokeWidth={2}
												className="text-muted-foreground group-hover:text-cyan-500"
												aria-hidden="true"
											/>
										</div>
										<span className="border-b border-border group-hover:border-cyan-500/50 uppercase tracking-widest">
											Book_Call
										</span>
									</button>
								}
							/>

							<a
								href={siteConfig.links.email}
								className="group flex items-center gap-2 text-[11px] font-mono font-bold text-foreground hover:text-emerald-500 transition-all duration-300"
							>
								<div className="size-5 bezel flex items-center justify-center bg-accent/5 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/50 transition-all">
									<HugeiconsIcon
										icon={Mail01Icon}
										size={12}
										strokeWidth={2}
										className="text-muted-foreground group-hover:text-emerald-500"
										aria-hidden="true"
									/>
								</div>
								<span className="border-b border-border group-hover:border-emerald-500/50 uppercase tracking-widest">
									Send_Email
								</span>
							</a>
						</div>
					</div>

					<div className="bezel bg-accent/5 p-3 max-w-xl">
						<div className="flex items-center gap-2 mb-1.5 font-mono text-[9px] text-cyan-500">
							<span className="animate-pulse">●</span>
							<span>PREVIOUS_ENGAGEMENT: CREDAXIS</span>
						</div>
						<p className="text-[12px] leading-relaxed italic text-muted-foreground">
							"Built and shipped cloud and blockchain solutions across multiple domains."
						</p>
					</div>
				</div>
			</SectionContent>
		</SectionGrid>
	)
}
