"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SubPageNav } from "@/components/ui/sub-page-nav"

export default function ContactPage() {
	const [formData, setFormData] = useState({ name: "", email: "", message: "" })
	const [logs, setLogs] = useState<string[]>(["SYSTEM_READY", "AWAITING_INPUT_PAYLOAD..."])
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setLogs(prev => [...prev, "ENCRYPTING_MESSAGE...", "ESTABLISHING_SECURE_TUNNEL...", "DISPATCHING_PACKETS..."])
		
		// Simulate submission
		setTimeout(() => {
			setLogs(prev => [...prev, "SUCCESS: MESSAGE_RECEIVED", "TERMINATING_CONNECTION"])
			setIsSubmitting(false)
			setFormData({ name: "", email: "", message: "" })
		}, 3000)
	}

	return (
		<div className="px-6 md:px-10 space-y-12 pb-20">
			<SubPageNav title="CONTACT_PORTAL" />

			<div className="max-w-2xl mx-auto space-y-8">
				<div className="space-y-2">
					<div className="text-cyan-500 font-bold text-[10px] tracking-[0.5em] flex items-center gap-2">
						<span className="size-1.5 bg-cyan-500 animate-pulse rounded-full" />
						SECURE_MESSAGE_SERVICE_v1.0
					</div>
					<h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
						Establish_Connection<span className="text-cyan-500">.</span>
					</h1>
					<p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
						Use the following terminal interface to send an encrypted message directly to my node. All data is sanitized and dispatched over a secure tunnel.
					</p>
				</div>

				<div className="bezel bg-accent/5 border border-border/40 p-1">
					<div className="bg-background border border-border/40 p-6 md:p-8 space-y-8 font-mono">
						<div className="space-y-1 text-[10px] text-muted-foreground/60 border-b border-border/20 pb-6">
							{logs.map((log, i) => (
								<div key={i} className="flex gap-4">
									<span className="text-cyan-500/40">[{i.toString().padStart(2, "0")}]</span>
									<span>{log}</span>
								</div>
							))}
						</div>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="text-[9px] uppercase tracking-widest text-cyan-500/60 font-bold">Identifier (Name)</label>
									<input
										required
										value={formData.name}
										onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
										className="w-full bg-accent/5 border border-border/40 p-3 text-xs outline-none focus:border-cyan-500/50 transition-colors"
										placeholder="ENTER_NAME..."
									/>
								</div>
								<div className="space-y-2">
									<label className="text-[9px] uppercase tracking-widest text-cyan-500/60 font-bold">Return_Path (Email)</label>
									<input
										type="email"
										required
										value={formData.email}
										onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
										className="w-full bg-accent/5 border border-border/40 p-3 text-xs outline-none focus:border-cyan-500/50 transition-colors"
										placeholder="ENTER_EMAIL..."
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label className="text-[9px] uppercase tracking-widest text-cyan-500/60 font-bold">Payload (Message)</label>
								<textarea
									required
									rows={5}
									value={formData.message}
									onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
									className="w-full bg-accent/5 border border-border/40 p-3 text-xs outline-none focus:border-cyan-500/50 transition-colors resize-none"
									placeholder="ENTER_MESSAGE_DATA..."
								/>
							</div>

							<button
								disabled={isSubmitting}
								className="w-full py-4 bezel bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
							>
								{isSubmitting ? "PROCESSING_PACKETS..." : "EXECUTE_DISPATCH_COMMAND"}
							</button>
						</form>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
					{[
						{ label: "GITHUB", value: "okyerejay", href: "https://github.com/okyerejay" },
						{ label: "X_TWITTER", value: "@okyerejay", href: "https://x.com/okyerejay" },
						{ label: "LINKEDIN", value: "john-okyere", href: "https://linkedin.com/in/john-okyere" }
					].map((social) => (
						<a 
							key={social.label}
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							className="bezel bg-accent/5 border border-border/40 p-4 hover:border-cyan-500/50 transition-colors group"
						>
							<div className="text-[8px] text-muted-foreground uppercase mb-1">{social.label}</div>
							<div className="text-[11px] font-mono font-bold group-hover:text-cyan-500 transition-colors">{social.value}</div>
						</a>
					))}
				</div>
			</div>
		</div>
	)
}
