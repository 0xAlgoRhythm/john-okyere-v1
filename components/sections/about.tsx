"use client"
import React, { useEffect } from "react"
import { Calendar03Icon, Mail01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { siteConfig } from "@/config/site"

import { SectionGrid, SectionContent } from "@/components/ui/section-grid"

declare global {
	interface Window {
		Cal?: any;
	}
}

// Cal.com standard stub — must run before embed.js processes the instruction queue.
// This mirrors the snippet Cal provides: creates a queuing function so that
// Cal("init", ...) calls are buffered and replayed once embed.js hydrates.
function initCalStub() {
	if (typeof window === "undefined" || window.Cal) return;
	(function (C: Window & typeof globalThis, A: string, L: string) {
		const p = (a: any, ar: IArguments | any[]) => { a.q.push(ar); };
		const d = C.document;
		C.Cal = function (...args: any[]) {
			const cal = C.Cal as any;
			if (!cal.loaded) {
				cal.ns = {};
				cal.q = cal.q || [];
				const s = d.createElement("script");
				s.src = A;
				d.head.appendChild(s);
				cal.loaded = true;
			}
			if (args[0] === L) {
				const api: any = function (...a: any[]) { p(api, a); };
				const namespace = args[1];
				api.q = api.q || [];
				if (typeof namespace === "string") {
					cal.ns[namespace] = cal.ns[namespace] || api;
					p(cal.ns[namespace], args);
					p(cal, ["initNamespace", namespace]);
				} else {
					p(cal, args);
				}
				return;
			}
			p(cal, args);
		} as any;
	})(window, "https://cal.com/embed/embed.js", "init");

	window.Cal!("init", "15m", { origin: "https://cal.com" });
	window.Cal!.ns["15m"]("ui", {
		styles: { branding: { brandColor: "#06b6d4" } },
		hideEventTypeDetails: false,
		layout: "month_view",
	});
}

export function About() {
	useEffect(() => {
		initCalStub();
	}, []);

	return (
		<>
			<SectionGrid className="pt-0 pb-2">
				<SectionContent className="space-y-6">
					<div className="flex flex-col gap-6">
						<div className="text-[15px] text-muted-foreground text-pretty space-y-4 max-w-2xl leading-relaxed">
							<p>
								I design and build <span className="text-foreground font-medium">AI-powered</span> and{" "}
								<span className="text-foreground font-medium">on-chain systems</span> that solve real-world problems, with a focus on performance and scalability.
							</p>

							<div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2">
								{/* data-cal-* attributes let Cal.com handle clicks automatically — no custom onClick needed */}
								<button
									data-cal-namespace="15m"
									data-cal-link="johnokyere/15m"
									data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":true}'
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
		</>
	)
}
