"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function SSHPortal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
	const [step, setStep] = useState(0)
	const [formData, setFormData] = useState({ name: "", email: "", message: "" })
	const [logs, setLogs] = useState<string[]>(["ESTABLISHING_ENCRYPTED_TUNNEL...", "HANDSHAKE_SUCCESS", "READY_FOR_INPUT"])

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") onClose()
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setLogs(prev => [...prev, "PACKET_RECEIVED", "ENCRYPTING_MESSAGE...", "SENDING_TO_REMOTE_NODE...", "SUCCESS: MESSAGE_DISPATCHED"])
		setTimeout(() => {
			onClose()
			setStep(0)
			setLogs(["ESTABLISHING_ENCRYPTED_TUNNEL...", "HANDSHAKE_SUCCESS", "READY_FOR_INPUT"])
		}, 3000)
	}

	if (!isOpen) return null

	return (
		<div 
			className="fixed inset-0 z-[500] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
			onKeyDown={handleKeyDown}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				className="w-full max-w-lg bezel bg-background border border-cyan-500/30 overflow-hidden shadow-2xl"
			>
				<div className="bg-cyan-500/10 border-b border-cyan-500/20 px-4 py-2 flex justify-between items-center font-mono text-[10px] text-cyan-500">
					<div className="flex items-center gap-2">
						<span className="size-2 bg-cyan-500 rounded-full animate-pulse" />
						SSH_CONNECTION: 10.0.42.1 (SECURE)
					</div>
					<button onClick={onClose} className="hover:text-foreground transition-colors">[X]</button>
				</div>

				<div className="p-6 font-mono text-[11px] space-y-6">
					<div className="space-y-1 text-muted-foreground">
						{logs.map((log, i) => (
							<div key={i} className="flex gap-3">
								<span className="text-cyan-500/50">[{i.toString().padStart(2, "0")}]</span>
								<span>{log}</span>
							</div>
						))}
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<div className="flex justify-between text-[9px] uppercase tracking-widest text-cyan-500/60 font-bold">
								<span>Field: NAME</span>
								<span>Required</span>
							</div>
							<input
								autoFocus
								required
								value={formData.name}
								onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
								className="w-full bg-accent/5 border border-border/40 p-2 outline-none focus:border-cyan-500/50 transition-colors"
								placeholder="ENTER_IDENTIFIER..."
							/>
						</div>
						<div className="space-y-2">
							<div className="flex justify-between text-[9px] uppercase tracking-widest text-cyan-500/60 font-bold">
								<span>Field: EMAIL</span>
								<span>Required</span>
							</div>
							<input
								type="email"
								required
								value={formData.email}
								onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
								className="w-full bg-accent/5 border border-border/40 p-2 outline-none focus:border-cyan-500/50 transition-colors"
								placeholder="ENTER_RETURN_PATH..."
							/>
						</div>
						<div className="space-y-2">
							<div className="flex justify-between text-[9px] uppercase tracking-widest text-cyan-500/60 font-bold">
								<span>Field: MESSAGE</span>
								<span>Required</span>
							</div>
							<textarea
								required
								rows={4}
								value={formData.message}
								onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
								className="w-full bg-accent/5 border border-border/40 p-2 outline-none focus:border-cyan-500/50 transition-colors resize-none"
								placeholder="ENTER_PAYLOAD_DATA..."
							/>
						</div>

						<button 
							type="submit"
							className="w-full py-3 bezel bg-cyan-500/20 border border-cyan-500/40 text-cyan-500 font-bold uppercase tracking-[0.2em] hover:bg-cyan-500/30 transition-all active:scale-[0.98]"
						>
							EXECUTE_SEND_COMMAND
						</button>
					</form>
				</div>
				
				<div className="bg-accent/5 px-4 py-1.5 border-t border-border/20 text-[8px] text-muted-foreground/40 flex justify-between uppercase">
					<span>encryption: aes-256-gcm</span>
					<span>status: encrypted_session</span>
				</div>
			</motion.div>
		</div>
	)
}
