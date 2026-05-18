"use client"
import React from "react"
import Link from "next/link"

interface SubPageNavProps {
	path: {
		label: string
		href?: string
	}[]
}

export function SubPageNav({ path }: SubPageNavProps) {
	return (
		<nav aria-label="Breadcrumb">
			<ol className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase list-none">
				<li>
					<span className="opacity-50" aria-hidden="true">~</span>
				</li>
				<li>
					<Link href="/" className="hover:text-foreground transition-colors">ROOT</Link>
				</li>
				{path.map((item: any, index: number) => (
					<React.Fragment key={item.label}>
						<li aria-hidden="true">
							<span className="opacity-50">/</span>
						</li>
						<li>
							{item.href ? (
								<Link href={item.href} className="hover:text-foreground transition-colors">
									{item.label}
								</Link>
							) : (
								<span className="text-foreground" aria-current="page">{item.label}</span>
							)}
						</li>
					</React.Fragment>
				))}
			</ol>
		</nav>
	)
}
