"use client"

/**
 * CalBookingModal
 *
 * A zero-auth Cal.com booking modal using the official public iframe embed.
 * No Platform API keys required — @calcom/atoms BookerEmbed is a paid
 * Platform API product and cannot be used for a personal portfolio.
 */

import React, { useState, useCallback } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { Calendar03Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const CAL_USERNAME = "johnokyere"
const CAL_EVENT_SLUG = "15m"

// Cal.com public embed URL — no auth required
const CAL_EMBED_URL = `https://cal.com/${CAL_USERNAME}/${CAL_EVENT_SLUG}?embed=true&embedType=inline&theme=dark&layout=month_view`

interface CalBookingModalProps {
	trigger: React.ReactNode
}

export function CalBookingModal({ trigger }: CalBookingModalProps) {
	const [open, setOpen] = useState(false)
	const [iframeLoaded, setIframeLoaded] = useState(false)

	const handleOpenChange = useCallback((nextOpen: boolean) => {
		setOpen(nextOpen)
		if (!nextOpen) setIframeLoaded(false)
	}, [])

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

			<Dialog.Portal>
				{/* Backdrop */}
				<Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

				{/*
				  Modal panel
				  — w-[min(96vw,760px)]: wider on desktop to give Cal.com more room
				  — h-[90dvh]: fills 90% of the actual visible viewport (dvh handles
				    mobile browser chrome correctly, unlike vh)
				  — flex flex-col: lets children fill remaining height
				*/}
				<Dialog.Content
					aria-describedby={undefined}
					className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2
					           w-[min(96vw,760px)] h-[90dvh]
					           flex flex-col
					           data-[state=open]:animate-in data-[state=closed]:animate-out
					           data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
					           data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
					           data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
					           data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
					           duration-200"
				>
					{/*
					  Bezel shell — must also be flex + h-full so it fills the
					  Dialog.Content box and doesn't collapse to fit-content.
					*/}
					<div className="flex flex-col h-full border border-border/60 bg-background/95 backdrop-blur-md shadow-[0_0_60px_-10px_rgba(0,0,0,0.8)] overflow-hidden relative">
						{/* Subtle inner glow */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none z-0" />

						{/* ── Header bar ── */}
						<div className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-accent/5 flex-shrink-0">
							<div className="flex items-center gap-3">
								{/* Traffic-light dots */}
								<div className="flex gap-1.5">
									<span className="size-2 rounded-full bg-red-500/60" />
									<span className="size-2 rounded-full bg-yellow-500/60" />
									<span className="size-2 rounded-full bg-green-500/60" />
								</div>
								<div className="h-3 w-px bg-border/60" />
								<div className="flex items-center gap-2">
									<span className="animate-pulse text-cyan-500 text-[8px]">●</span>
									<span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
										SCHEDULE_CALL :: johnokyere/15m
									</span>
								</div>
							</div>

							<Dialog.Close asChild>
								<button
									id="cal-modal-close"
									aria-label="Close booking modal"
									className="size-7 bezel flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-cyan-500/50 transition-all duration-200"
								>
									<HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={2} />
								</button>
							</Dialog.Close>
						</div>

						{/* Accessible title */}
						<VisuallyHidden.Root>
							<Dialog.Title>Book a 15-minute call with John Okyere</Dialog.Title>
						</VisuallyHidden.Root>

						{/*
						  ── Iframe wrapper ──
						  flex-1 + min-h-0 = fills all remaining height between header & footer.
						  min-h-0 is essential: without it, a flex child won't shrink
						  below its content size and will overflow.
						*/}
						<div className="relative z-10 flex-1 min-h-0">
							{/* Skeleton shown while iframe hydrates */}
							{!iframeLoaded && (
								<div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50">
									<div className="flex flex-col items-center gap-3">
										<div className="size-10 bezel flex items-center justify-center bg-accent/5">
											<HugeiconsIcon
												icon={Calendar03Icon}
												size={20}
												strokeWidth={1.5}
												className="text-cyan-500 animate-pulse"
											/>
										</div>
										<div className="space-y-1.5 text-center">
											<p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
												Initializing_Scheduler
											</p>
											<div className="flex gap-1 justify-center">
												{[0, 1, 2].map((i) => (
													<span
														key={i}
														className="size-1 rounded-full bg-cyan-500/60 animate-pulse"
														style={{ animationDelay: `${i * 150}ms` }}
													/>
												))}
											</div>
										</div>
									</div>
								</div>
							)}

							{/* The iframe itself fills the entire wrapper box */}
							<iframe
								src={CAL_EMBED_URL}
								title="Book a call with John Okyere"
								width="100%"
								height="100%"
								className="border-0 transition-opacity duration-300 block"
								style={{ opacity: iframeLoaded ? 1 : 0 }}
								onLoad={() => setIframeLoaded(true)}
								allow="camera; microphone; payment"
								loading="lazy"
							/>
						</div>

						{/* ── Footer strip ── */}
						<div className="relative z-10 flex items-center justify-between px-4 py-2 border-t border-border/60 bg-accent/5 flex-shrink-0">
							<span className="font-mono text-[9px] text-muted-foreground/60 tracking-widest uppercase">
								Powered by Cal.com
							</span>
							<span className="font-mono text-[9px] text-cyan-500/60 tracking-widest uppercase">
								15 MIN · VIDEO CALL
							</span>
						</div>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
