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
	"SYNCING_ARCHIVE_DATA...",
	"PATCHING_KERNEL_VULNERABILITIES...",
	"VERIFYING_SYSTEM_INTEGRITY...",
	"OPTIMIZING_NEURAL_ENGINES...",
	"BYPASSING_BIOMETRIC_LOCKS...",
	"GRANTING_ROOT_ACCESS...",
	"CLEANING_TRACE_FILES...",
	"PREPARING_SHELL_INTERFACE...",
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
	"DATA_SYNC_STREAM_ACTIVE",
	"NODE_7_CONNECTED",
]

export function SystemLoader() {
	const [isVisible, setIsVisible] = useState(false)
	const [isMounted, setIsMounted] = useState(false)
	const [currentLog, setCurrentLog] = useState(0)
	const [logs, setLogs] = useState<string[]>([])
	const [matrixText, setMatrixText] = useState("")
	const [processPercentages, setProcessPercentages] = useState<number[]>([0, 0, 0])
	const [visitorInfo, setVisitorInfo] = useState<any>(null)

	useEffect(() => {
		setIsMounted(true)
		setIsVisible(true)
		setProcessPercentages([
			Math.floor(Math.random() * 100),
			Math.floor(Math.random() * 100),
			Math.floor(Math.random() * 100)
		])

		// Fetch visitor intelligence
		fetch("https://ipapi.co/json/")
			.then(res => res.json())
			.then(data => setVisitorInfo(data))
			.catch(() => setVisitorInfo({ ip: "127.0.0.1", org: "UNKNOWN_ISP", country_name: "LOCAL_HOST" }))
	}, [])

	useEffect(() => {
		if (!isVisible) return

		// Main Log Stream
		if (currentLog < BOOT_LOGS.length) {
			const timeout = setTimeout(() => {
				let log = BOOT_LOGS[currentLog]
				
				// Dynamic injection of visitor info
				if (log.includes("SCANNING_USER_CREDENTIALS") && visitorInfo) {
					log = `NETWORK_INTEL: [IP:${visitorInfo.ip}] [ISP:${visitorInfo.org?.toUpperCase()}]`
				} else if (log.includes("TARGET_LOCKED") && visitorInfo) {
					log = `LOCATION_LOCKED: [${visitorInfo.city?.toUpperCase()}, ${visitorInfo.country_name?.toUpperCase()}]`
				}
				
				setLogs((prev) => [...prev, log])
				setCurrentLog((prev) => prev + 1)
			}, 850 + Math.random() * 500)
			return () => clearTimeout(timeout)
		} else {
			const finishTimeout = setTimeout(() => {
				setIsVisible(false)
			}, 2000)
			return () => clearTimeout(finishTimeout)
		}
	}, [currentLog, isVisible, visitorInfo])

	useEffect(() => {
		if (!isVisible) return

		// Concurrent Matrix Stream
		const interval = setInterval(() => {
			const randomLine = CONCURRENT_DATA[Math.floor(Math.random() * CONCURRENT_DATA.length)]
			setMatrixText((prev) => (prev + "\n" + randomLine).split("\n").slice(-20).join("\n"))
		}, 100)
		return () => clearInterval(interval)
	}, [isVisible])

	if (!isMounted) return null

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
					transition={{ duration: 1.5, ease: "easeInOut" }}
					className="fixed inset-0 z-[1000] bg-background flex flex-col font-mono overflow-hidden"
				>
					{/* Background Matrix/Data Stream */}
					<div className="absolute inset-0 opacity-[0.07] pointer-events-none select-none overflow-hidden flex justify-end p-4">
						<pre className="text-[10px] md:text-[14px] leading-tight text-cyan-500 text-right whitespace-pre">
							{matrixText}
						</pre>
					</div>

					{/* Bypass Button */}
					<button 
						onClick={() => setIsVisible(false)}
						className="absolute top-4 right-4 sm:top-8 sm:right-8 z-[1002] flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bezel bg-red-500/10 border-red-500/30 text-red-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all group"
					>
						<span className="size-1 sm:size-1.5 rounded-full bg-red-500 animate-pulse" />
						<span className="hidden xs:inline">Bypass_</span>Firewall
						<span className="opacity-40 group-hover:opacity-100 transition-opacity ml-1 sm:ml-2">[ESC]</span>
					</button>

					<div className="flex-1 flex flex-col justify-center p-8 md:p-24 relative z-10">
						<div className="max-w-4xl w-full mx-auto space-y-8">
							<div className="space-y-2">
								<motion.div 
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="text-cyan-500 font-bold text-[9px] md:text-sm tracking-[0.2em] md:tracking-[0.6em] mb-4 flex items-center gap-2 overflow-hidden"
								>
									<span className="size-2 bg-cyan-500 animate-ping rounded-full shrink-0" />
									<span className="truncate">SYSTEM_CRITICAL_BOOT_SEQUENCE</span>
								</motion.div>
								<div className="text-[36px] md:text-[72px] font-bold text-foreground leading-none tracking-tighter uppercase mb-8">
									Okyere<span className="text-cyan-500">.Sys</span>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
								<div className="flex flex-col gap-1 min-h-[350px] overflow-y-auto">
									{logs.map((log: string, i: number) => (
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

								<div className="hidden md:flex flex-col gap-6 bezel bg-cyan-500/[0.03] p-8 border-cyan-500/20">
									<div className="text-[10px] text-cyan-500 font-bold mb-2 uppercase tracking-widest flex justify-between">
										<span>Active_Processes</span>
										<span className="animate-pulse">Loading_Logic...</span>
									</div>
									<div className="space-y-6">
										{[0, 1, 2].map((i: number) => (
											<div key={i} className="space-y-2">
												<div className="flex justify-between text-[9px] text-muted-foreground uppercase font-bold">
													<span>Process_Handle_0x{i + 42}</span>
													<span className="text-cyan-500">{processPercentages[i]}%</span>
												</div>
												<div className="h-1 bg-border/20 overflow-hidden rounded-full">
													<motion.div 
														initial={{ width: 0 }}
														animate={{ width: "100%" }}
														transition={{ duration: 18 + i * 2, ease: "linear" }}
														className="h-full bg-cyan-500 shadow-[0_0_10px_var(--cyan-500)]"
													/>
												</div>
											</div>
										))}
									</div>
									<div className="mt-auto pt-6 border-t border-border/20 text-[10px] text-muted-foreground italic leading-relaxed">
										&gt; IP_ORIGIN: {visitorInfo?.ip || "DETECTING..."}<br/>
										&gt; ISP_HANDSHAKE: {visitorInfo?.org || "ANALYZING..."}<br/>
										&gt; VPN_STATUS: {visitorInfo?.vpn ? "ENCRYPTED" : "UNSECURED"}
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<div className="w-full bg-border/10 h-1.5 relative overflow-hidden bezel rounded-full">
									<motion.div
										initial={{ width: "0%" }}
										animate={{ width: "100%" }}
										transition={{ duration: 20, ease: "linear" }}
										className="absolute inset-0 bg-cyan-500 shadow-[0_0_25px_var(--cyan-500)]"
									/>
								</div>
								<div className="flex items-center justify-between w-full text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-[0.1em] sm:tracking-[0.3em] font-bold gap-2 overflow-hidden">
									<span className="flex items-center gap-1.5 shrink-0">
										<span className="animate-spin size-2 border-t-2 border-cyan-500 rounded-full" />
										initializing_v1.0.4
									</span>
									<span className="text-cyan-500 truncate text-right">Peak_Access_Required</span>
								</div>
							</div>
						</div>
					</div>

					{/* Scanline Overlay */}
					<div className="absolute inset-0 pointer-events-none z-[1001] scanline-effect opacity-60" />
				</motion.div>
			)}
		</AnimatePresence>
	)
}
