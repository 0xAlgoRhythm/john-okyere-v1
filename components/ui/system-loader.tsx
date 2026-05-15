"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const BOOT_LOGS = [
	"MAPPING_HARDWARE_RESOURCES...",
	"KERNEL_INIT_SUCCESS: [0x882A_1102]",
	"VIRTUAL_MACHINE_INSTANCE_STARTED...",
	"NETWORK_STACK_UP: 10.0.42.1",
	"BYPASSING_RESTRICTED_PROTOCOL_7...",
	"DECRYPTING_LOCAL_STORAGE_SHARDS...",
	"INJECTING_PAYLOAD_X86_64...",
	"OVERRIDING_SECURITY_POLICIES...",
	"ESTABLISHING_ENCRYPTED_TUNNEL...",
	"SCANNING_USER_CREDENTIALS...",
	"TARGET_LOCKED: [JOHN_OKYERE]",
	"GRANTING_ROOT_ACCESS...",
	"CLEANING_TRACE_FILES...",
	"ENVIRONMENT_READY_FOR_BOOT",
]

const CONCURRENT_DATA = [
	"0x00A1 FF 42 E1",
	"TCP_SYNC_REQUEST",
	"UDP_LISTEN: 8080",
	"SHA-256_HASH_VALID",
	"AES_DECRYPT_OK",
	"RSA_KEY_ACCEPTED",
	"MEM_FLUSH_START",
	"BUFFER_OVERFLOW_0",
]

export function SystemLoader() {
	const [isVisible, setIsVisible] = useState(false)
	const [isMounted, setIsMounted] = useState(false)
	const [currentLog, setCurrentLog] = useState(0)
	const [logs, setLogs] = useState<string[]>([])
	const [matrixText, setMatrixText] = useState("")
	const [processPercentages, setProcessPercentages] = useState<number[]>([0, 0, 0])

	useEffect(() => {
		setIsMounted(true)
		const isLoaded = sessionStorage.getItem("system_loaded")
		if (!isLoaded) {
			setIsVisible(true)
			setProcessPercentages([
				Math.floor(Math.random() * 100),
				Math.floor(Math.random() * 100),
				Math.floor(Math.random() * 100)
			])
		}
	}, [])

	useEffect(() => {
		if (!isVisible) return

		// Main Log Stream
		if (currentLog < BOOT_LOGS.length) {
			const timeout = setTimeout(() => {
				setLogs((prev) => [...prev, BOOT_LOGS[currentLog]])
				setCurrentLog((prev) => prev + 1)
			}, 600 + Math.random() * 400)
			return () => clearTimeout(timeout)
		} else {
			const finishTimeout = setTimeout(() => {
				setIsVisible(false)
				sessionStorage.setItem("system_loaded", "true")
			}, 1500)
			return () => clearTimeout(finishTimeout)
		}
	}, [currentLog, isVisible])

	useEffect(() => {
		if (!isVisible) return

		// Concurrent Matrix Stream
		const interval = setInterval(() => {
			const randomLine = CONCURRENT_DATA[Math.floor(Math.random() * CONCURRENT_DATA.length)]
			setMatrixText((prev) => (prev + "\n" + randomLine).split("\n").slice(-15).join("\n"))
		}, 150)
		return () => clearInterval(interval)
	}, [isVisible])

	if (!isMounted) return null

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0, scale: 1.1 }}
					transition={{ duration: 1, ease: "easeInOut" }}
					className="fixed inset-0 z-[1000] bg-background flex flex-col font-mono overflow-hidden"
				>
					{/* Background Matrix/Data Stream */}
					<div className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden flex justify-end p-4">
						<pre className="text-[10px] md:text-[14px] leading-tight text-cyan-500 text-right whitespace-pre">
							{matrixText}
						</pre>
					</div>

					<div className="flex-1 flex flex-col justify-center p-8 md:p-24 relative z-10">
						<div className="max-w-4xl w-full mx-auto space-y-8">
							<div className="space-y-2">
								<motion.div 
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="text-cyan-500 font-bold text-xs md:text-sm tracking-[0.5em] mb-4"
								>
									[ SYSTEM_PENETRATION_MODE ]
								</motion.div>
								<div className="text-[32px] md:text-[64px] font-bold text-foreground leading-none tracking-tighter uppercase mb-8">
									Okyere<span className="text-cyan-500">.Sys</span>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div className="flex flex-col gap-1 min-h-[300px]">
									{logs.map((log, i) => (
										<motion.div
											key={i}
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											className="flex items-center gap-3 text-[10px] md:text-[11px]"
										>
											<span className="text-cyan-500/50 shrink-0">
												[{i.toString().padStart(2, "0")}]
											</span>
											<span className={i === BOOT_LOGS.length - 1 ? "text-emerald-500 font-bold" : "text-muted-foreground"}>
												{log}
											</span>
										</motion.div>
									))}
									{currentLog < BOOT_LOGS.length && (
										<div className="flex items-center gap-3">
											<span className="text-cyan-500/50">[{currentLog.toString().padStart(2, "0")}]</span>
											<span className="w-1.5 h-3 bg-cyan-500 animate-pulse" />
										</div>
									)}
								</div>

								<div className="hidden md:flex flex-col gap-4 bezel bg-accent/5 p-6 border-cyan-500/20">
									<div className="text-[10px] text-cyan-500 opacity-60 font-bold mb-2 uppercase">Thread_Concurrency_Visualizer</div>
									<div className="space-y-4">
										{[0, 1, 2].map((i) => (
											<div key={i} className="space-y-1">
												<div className="flex justify-between text-[8px] text-muted-foreground uppercase">
													<span>Process_{i + 1}</span>
													<span>{processPercentages[i]}%</span>
												</div>
												<div className="h-1 bg-border/20 overflow-hidden">
													<motion.div 
														initial={{ width: 0 }}
														animate={{ width: "100%" }}
														transition={{ duration: 10 + i * 2, ease: "linear" }}
														className="h-full bg-cyan-500/50"
													/>
												</div>
											</div>
										))}
									</div>
									<div className="mt-auto pt-4 border-t border-border/20 text-[9px] text-muted-foreground italic">
										* CAUTION: Unauthorized access to Okyere.Sys core is prohibited.
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<div className="w-full bg-border/20 h-1 relative overflow-hidden bezel">
									<motion.div
										initial={{ width: "0%" }}
										animate={{ width: "100%" }}
										transition={{ duration: 12, ease: "linear" }}
										className="absolute inset-0 bg-cyan-500 shadow-[0_0_20px_var(--cyan-500)]"
									/>
								</div>
								<div className="flex justify-between w-full text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
									<span>initializing_environment_v1.0.4</span>
									<span className="text-cyan-500 animate-pulse">Establishing_secure_link...</span>
								</div>
							</div>
						</div>
					</div>

					{/* Scanline Overlay */}
					<div className="absolute inset-0 pointer-events-none z-[1001] scanline-effect opacity-50" />
				</motion.div>
			)}
		</AnimatePresence>
	)
}
