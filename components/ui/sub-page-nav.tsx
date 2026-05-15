"use client"
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface SubPageNavProps {
	path: {
		label: string
		href?: string
	}[]
}

export function SubPageNav({ path }: SubPageNavProps) {
	return (
		<div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
			<span className="opacity-50">~</span>
			<Link href="/" className="hover:text-foreground transition-colors">ROOT</Link>
			{path.map((item: any, index: number) => (
				<React.Fragment key={item.label}>
					<span className="opacity-50">/</span>
					{item.href ? (
						<Link href={item.href} className="hover:text-foreground transition-colors">
							{item.label}
						</Link>
					) : (
						<span className="text-foreground">{item.label}</span>
					)}
				</React.Fragment>
			))}
		</div>
	)
}
