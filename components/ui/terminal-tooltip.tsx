"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TerminalTooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & { 
		metadata?: Record<string, string> 
	}
>(({ className, sideOffset = 4, children, metadata, ...props }, ref) => (
	<TooltipPrimitive.Content
		ref={ref}
		sideOffset={sideOffset}
		className={cn(
			"z-[200] overflow-hidden bezel bg-background/90 backdrop-blur-xl border border-cyan-500/30 px-3 py-2 font-mono text-[9px] shadow-2xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			className
		)}
		{...props}
	>
		<div className="flex flex-col gap-1.5">
			<div className="flex items-center gap-2 border-b border-cyan-500/20 pb-1.5 mb-0.5">
				<span className="size-1 rounded-full bg-cyan-500 animate-pulse" />
				<span className="text-cyan-500 font-bold uppercase tracking-widest text-[8px]">Metadata_Dump</span>
			</div>
			{metadata ? (
				Object.entries(metadata).map(([key, value]) => (
					<div key={key} className="flex justify-between gap-4">
						<span className="text-muted-foreground uppercase">{key}:</span>
						<span className="text-foreground font-bold">{value}</span>
					</div>
				))
			) : (
				children
			)}
			<div className="mt-1 pt-1 border-t border-cyan-500/20 text-[7px] text-muted-foreground/40 italic">
				&gt; ACCESS_LEVEL: RESTRICTED
			</div>
		</div>
	</TooltipPrimitive.Content>
))
TerminalTooltipContent.displayName = TooltipPrimitive.Content.displayName

export function TerminalTooltip({ 
	children, 
	content, 
	metadata 
}: { 
	children: React.ReactNode, 
	content?: React.ReactNode,
	metadata?: Record<string, string>
}) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={200}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TerminalTooltipContent metadata={metadata}>
					{content}
				</TerminalTooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
