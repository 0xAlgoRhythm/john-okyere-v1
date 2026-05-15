"use client"
import React, { useEffect } from "react"
import { ArrowUpRight03Icon, Calendar03Icon, Mail01Icon, GithubIcon, Linkedin01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import { siteConfig } from "@/config/site"

import { SectionGrid, SectionTitle, SectionContent } from "@/components/ui/section-grid"

export function About() {
	useEffect(() => {
		const initCal = async () => {
			const { getCalApi } = await import("@calcom/embed-react").catch(() => ({ getCalApi: null }));
			if (getCalApi) {
				const cal = await getCalApi({ namespace: "15m" });
				cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
			} else {
				// Fallback to script injection if package is missing
				(function (C, A, L) {
					let p = (function (ar, v) { return ar[v]; })(L, 0);
					let q = (function (ar, v) { return ar[v]; })(L, 1);
					// @ts-ignore
					C.cal = C.cal || function () { (C.cal.q = C.cal.q || []).push(arguments); };
					// @ts-ignore
					let s = A.createElement("script"); s.async = true; s.src = p + "/embed/embed.js";
					// @ts-ignore
					let x = A.getElementsByTagName("script")[0]; x.parentNode.insertBefore(s, x);
					// @ts-ignore
					C.cal("init", q, { origin: p });
					// @ts-ignore
					C.cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
				})(window, document, ["https://cal.com", "15m"]);
			}
		};
		initCal();
	}, []);

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
							<button
								data-cal-namespace="15m"
								data-cal-link="johnokyere/15m"
								data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
								className="group flex items-center gap-2 text-[11px] font-mono font-bold text-foreground hover:text-cyan-500 transition-all duration-300 cursor-pointer"
							>
								<div className="size-5 bezel flex items-center justify-center bg-accent/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/50 transition-all">
									<HugeiconsIcon icon={Calendar03Icon} size={12} strokeWidth={2} className="text-muted-foreground group-hover:text-cyan-500" />
								</div>
								<span className="border-b border-border group-hover:border-cyan-500/50 uppercase tracking-widest">Book_Call</span>
							</button>
							<a
								href={siteConfig.links.email}
								className="group flex items-center gap-2 text-[11px] font-mono font-bold text-foreground hover:text-emerald-500 transition-all duration-300"
							>
								<div className="size-5 bezel flex items-center justify-center bg-accent/5 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/50 transition-all">
									<HugeiconsIcon icon={Mail01Icon} size={12} strokeWidth={2} className="text-muted-foreground group-hover:text-emerald-500" />
								</div>
								<span className="border-b border-border group-hover:border-emerald-500/50 uppercase tracking-widest">Send_Email</span>
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
