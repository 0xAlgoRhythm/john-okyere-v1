"use client"

import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import React, { useState } from "react"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel"
import { useImageStore } from "@/lib/store/use-image"
import { cn } from "@/lib/utils"
import { SectionGrid, SectionTitle, SectionContent } from "@/components/ui/section-grid"

const HIGHLIGHTS = [
	{
		title: "African Builder Stories — Ethiopia Feature",
		image: "/images/highlights/african-builder-eth.jpg",
	},
	{
		title: "Builder in Residence at ETHiopia Builder Residency",
		image: "/images/highlights/ETHiopia-residency.jpg",
	},
	{
		title: "Competing at ETHiopia Builder Hackathon",
		image: "/images/highlights/ETHiopia-hackathon.jpg",
	},
	{
		title: "Entrepreneurship & Innovation at WeVentures Ethiopia",
		image: "/images/highlights/weventures-1.jpg",
	},
	{
		title: "Keynote Pitch at UEW Innovation Hub — British Council",
		image: "/images/highlights/british-council-uew.jpg",
	},
	{
		title: "Roundtable Speaker at Sui Ghana × UEW Roadshow",
		image: "/images/highlights/roundtable-sui.jpg",
	},
	{
		title: "Lead Instructor — 3-Day ICP Smart Contracts Bootcamp at UCC",
		image: "/images/highlights/bootcamp-ucc.JPG",
	},
	{
		title: "ICP Community Meetup Facilitator at UCC",
		image: "/images/highlights/ucc-meetup.JPG",
	},
	{
		title: "Pitch Showcase at AyaHQ × UEW Roadshow",
		image: "/images/highlights/aya-roadshow-uew.jpg",
	},
	{
		title: "Instructor — Rust & Motoko Smart Contract Development at UEW",
		image: "/images/highlights/motoko-uew.jpg",
	},
	{
		title: "ICP Community Meetup Host at UEW",
		image: "/images/highlights/uew-meetup-icp.jpg",
	},
	{
		title: "Startup Incubation Workshop Facilitator at UEW Innovation Hub — British Council",
		image: "/images/highlights/incubation-workshop.jpg",
	},
	{
		title: "Speaker & Organizer at Sui Overflow UEW Summit",
		image: "/images/highlights/sui-overflow-meetup.jpg",
	},
	{
		title: "Sharing My Journey as a Dev3pack Fellow & AOC Scholar at Devconnect",
		image: "/images/highlights/devconnect-experience.jpg",
	},
	{
		title: "Speaking on ZK & Web3 Engineering at ETH Enugu",
		image: "/images/highlights/eth-enugu-1.jpg",
	},
	{
		title: "Web3 & Blockchain Education Session at GI-KACE",
		image: "/images/highlights/gi-kace.jpg",
	},
	{
		title: "Mentorship Dinner with Celo Founder Marek Olszewski — Buenos Aires",
		image: "/images/highlights/dinner-celo.jpg",
	},
	{
		title: "Demo Day — Hackathon Project Showcase at ETHGlobal Argentina",
		image: "/images/highlights/demo-day-ethglobal.jpg",
	},
	{
		title: "MOU Signing Ceremony — Aya × UEW Partnership with Prof. Dake & Eric Annan",
		image: "/images/highlights/aya-mou-1.jpg",
	},
	{
		title: "Networking with AyaHQ Founders Eric Annan & Michael Lawal at Devconnect Argentina",
		image: "/images/highlights/aya-founders-1.jpg",
	},
	{
		title: "Pitching SuiVerify at Sui 3-Day Developer Bootcamp at AyaHQ",
		image: "/images/highlights/pitch-suiverify.jpg",
	},
	{
		title: "Lisk Founders Hangout at Aleph Hub — Buenos Aires, Argentina",
		image: "/images/highlights/lisk-hangout.jpg",
	},
	{
		title: "ZK Summit & Governance Day at Universidad Católica Argentina",
		image: "/images/highlights/uca-visit.jpg",
	},
	{
		title: "Panelist at Africa Blockchain Summit — Engaging Government Leaders & Ministers in Johannesburg",
		image: "/images/highlights/africa-summit.jpg",
	},
	{
		title: "Keynote: Positioning African Builders to Create Impactful Solutions — ETH Enugu Nigeria",
		image: "/images/highlights/speaker-eth-enugu.jpg",
	},
	{
		title: "African Scholars Cohort at Devconnect Argentina",
		image: "/images/highlights/devcon-scholars.jpg",
	},
	{
		title: "Hacking & Building at ETH Enugu Hackathon — Nigeria",
		image: "/images/highlights/hack-ethenugu.jpg",
	},
	{
		title: "Representing Ghana at ETH Enugu Conference 2025",
		image: "/images/highlights/ghana-rep.jpg",
	},
	{
		title: "Networking with Kotani Pay Founders, VISA Executives & BlocksFi at Africa Blockchain Summit",
		image: "/images/highlights/kotanipay.jpg",
	},
	{
		title: "Google Cloud Roadshow 2025 — Google Accra",
		image: "/images/highlights/cloud-roadshow.jpg",
	},
	{
		title: "Builders & Residents Hangout at ETHiopia",
		image: "/images/highlights/eth-hangout.jpg",
	},
	{
		title: "Technical Deep-Dive with Blockradar Founder Stanley Morgan on Blockchain Infrastructure",
		image: "/images/highlights/blockradar.jpg",
	},
]

const HighlightImage = React.memo(function HighlightImage({ 
	src, 
	alt, 
	index 
}: { 
	src: string; 
	alt: string; 
	index: number 
}) {
	const [isLoading, setIsLoading] = useState(true)
	// Use selective selectors to prevent re-rendering when other store values change
	const setSelectedImage = useImageStore((state) => state.setSelectedImage)
	const setDialogOpen = useImageStore((state) => state.setDialogOpen)
	const [isPending, startTransition] = React.useTransition()

	function handleClick() {
		// Use startTransition to defer the heavy Dialog opening logic
		startTransition(() => {
			setSelectedImage(src)
			setDialogOpen(true)
		})
	}

	return (
		<button
			type="button"
			className={cn(
				"w-full bezel group/img bg-background/50 overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-colors duration-300 outline-none",
				isPending && "opacity-70"
			)}
			onClick={handleClick}
			aria-label={`View ${alt}`}
		>
			<div className="absolute top-2 right-2 z-10 font-mono text-[8px] text-foreground/80 bg-background px-1 py-0.5 bezel shadow-sm">
				IMG_{index.toString().padStart(3, "0")}
			</div>
			<div className="relative w-full h-auto aspect-[4/3] overflow-hidden">
				<Image
					src={src}
					alt={alt}
					width={600} // Reduced from 800 for better performance in grid/carousel
					height={450}
					className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-700"
					style={{
						WebkitFilter: isLoading ? "blur(8px)" : "none",
					}}
					onLoad={() => setIsLoading(false)}
				/>
			</div>
		</button>
	)
})

export const Highlights = React.memo(function Highlights() {
	// Limit to top 32 items to maintain performance and avoid INP bottlenecks
	const displayHighlights = HIGHLIGHTS.slice(0, 32)

	return (
		<SectionGrid>
			<SectionTitle>Visual_Telemetry_Feed</SectionTitle>
			<SectionContent>
				<div className="bezel bg-accent/5 p-3 sm:p-4">
					<Carousel
						opts={{ align: "start", loop: true }}
						plugins={[Autoplay({ delay: 4000 })]}
					>
						<CarouselContent className="-ml-4">
							{displayHighlights.map((item: any, index: number) => (
								<CarouselItem
									key={`${item.image}-${index}`}
									className="pl-4 basis-[85%] sm:basis-[60%]"
								>
									<div className="space-y-3">
										<HighlightImage src={item.image} alt={item.title} index={index} />
										<div className="flex items-start gap-2">
											<span className="font-mono text-[9px] text-cyan-500 mt-1">
												[LOG]
											</span>
											<p className="text-[11px] font-mono leading-relaxed text-muted-foreground line-clamp-2">
												{item.title.toUpperCase()}
											</p>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</SectionContent>
		</SectionGrid>
	)
})
