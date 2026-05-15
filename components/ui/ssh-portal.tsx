"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function SSHPortal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
	const [logs, setLogs] = useState<string[]>(["ESTABLISHING_ENCRYPTED_TUNNEL...", "HANDSHAKE_SUCCESS", "READY_FOR_INPUT"])
	const formRef = useRef<HTMLFormElement>(null)

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") onClose()
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLogs(prev => [...prev, "PACKET_RECEIVED", "ENCRYPTING_MESSAGE...", "SENDING_TO_REMOTE_NODE..."])
		
		const formData = new FormData(e.currentTarget)
		const name = formData.get("name") || "Remote_Operator"
		const commId = Math.random().toString(36).substring(7).toUpperCase()

		formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "")
		formData.append("subject", `[Okyere.Sys] SSH_ENCRYPTED_MESSAGE: ${name} (ID_${commId})`)
		formData.append("from_name", "Okyere.Sys SSH_Bridge")
		formData.append("replyto", "hello@johnokyere.xyz")

		try {
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				body: formData
			})

			const data = await response.json()
			if (data.success) {
				setLogs(prev => [...prev, "SUCCESS: MESSAGE_DISPATCHED", "CONNECTION_TERMINATED"])
				setTimeout(() => {
					onClose()
					setLogs(["ESTABLISHING_ENCRYPTED_TUNNEL...", "HANDSHAKE_SUCCESS", "READY_FOR_INPUT"])
					formRef.current?.reset()
				}, 2000)
			} else {
				setLogs(prev => [...prev, "ERROR: DISPATCH_FAILED", "RETRY_REQUIRED"])
			}
		} catch (error) {
			setLogs(prev => [...prev, "ERROR: NODE_UNREACHABLE"])
		}
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
						{logs.map((log: string, i: number) => (
							<div key={i} className="flex gap-3">
								<span className="text-cyan-500/50">[{i.toString().padStart(2, "0")}]</span>
								<span>{log}</span>
							</div>
						))}
					</div>

					<form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<div className="flex justify-between text-[9px] uppercase tracking-widest text-cyan-500/60 font-bold">
								<span>Field: NAME</span>
								<span>Required</span>
							</div>
							<input
								name="name"
								autoFocus
								required
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
								name="email"
								type="email"
								required
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
								name="message"
								required
								rows={4}
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
