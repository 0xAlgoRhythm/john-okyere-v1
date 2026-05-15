"use client"

import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useShellStore } from "@/lib/store/use-shell"

export function CommandLine() {
	const [isFocused, setIsFocused] = useState(false)
	const [result, setResult] = useState<{ type: "success" | "error" | "info", message: string } | null>(null)
	const router = useRouter()
	const { openSSH } = useShellStore()
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (result) {
			const timer = setTimeout(() => setResult(null), 5000)
			return () => clearTimeout(timer)
		}
	}, [result])

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && inputRef.current) {
			const cmd = inputRef.current.value.trim().toLowerCase()
			
			if (cmd === "cd work" || cmd === "cd projects") {
				router.push("/work")
				setResult({ type: "success", message: "NAVIGATING_TO: /WORK" })
			} else if (cmd === "cd writing" || cmd === "cd blog") {
				router.push("/writing")
				setResult({ type: "success", message: "NAVIGATING_TO: /WRITING" })
			} else if (cmd === "cd home" || cmd === "cd .." || cmd === "cd /") {
				router.push("/")
				setResult({ type: "success", message: "NAVIGATING_TO: /ROOT" })
			} else if (cmd === "ls") {
				setResult({ type: "info", message: "NODES: [WORK] [WRITING] [ABOUT] [CONTACT]" })
			} else if (cmd === "help") {
				setResult({ type: "info", message: "CMDS: CD, LS, CAT, WHOAMI, CLEAR, SSH" })
			} else if (cmd === "whoami") {
				setResult({ type: "success", message: "USER: OKYERE_JAY_ROOT" })
			} else if (cmd === "clear") {
				setResult(null)
			} else if (cmd === "cd contact" || cmd === "ssh contact") {
				setResult({ type: "info", message: "ESTABLISHING_SSH: 10.0.42.1... (PORTAL_OPEN)" })
				openSSH()
			} else if (cmd.startsWith("cat ")) {
				const target = cmd.split(" ")[1]
				setResult({ type: "info", message: `READING: ${target.toUpperCase()}.MDX... [SYSTEM_RESTRICTED]` })
			} else {
				setResult({ type: "error", message: `COMMAND_NOT_FOUND: ${cmd}` })
			}
			
			inputRef.current.value = ""
		}
	}

	return (
		<div className="relative">
			<div 
				className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground/60 transition-all duration-300"
				onClick={() => inputRef.current?.focus()}
			>
				<span className="text-cyan-500 font-bold shrink-0 animate-pulse">$</span>
				<div className="relative flex items-center">
					<input
						ref={inputRef}
						type="text"
						onKeyDown={handleKeyDown}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						placeholder={isFocused ? "" : "type_command..."}
						className="bg-transparent border-none outline-none text-foreground w-32 sm:w-48 placeholder:text-muted-foreground/20 placeholder:italic"
						spellCheck={false}
						autoComplete="off"
					/>
					{isFocused && (
						<span className="absolute left-0 w-1.5 h-3.5 bg-cyan-500/50 animate-caret-blink pointer-events-none opacity-0 group-focus-within:opacity-100" 
							style={{ display: inputRef.current?.value ? 'none' : 'block' }}
						/>
					)}
				</div>
			</div>

			<AnimatePresence>
				{result && (
					<motion.div
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 5 }}
						className={cn(
							"absolute top-full left-0 mt-2 p-2 bezel border text-[9px] font-mono whitespace-nowrap z-[200]",
							result.type === "success" && "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
							result.type === "error" && "bg-red-500/10 border-red-500/30 text-red-500",
							result.type === "info" && "bg-cyan-500/10 border-cyan-500/30 text-cyan-500"
						)}
					>
						<span className="mr-2">[{result.type.toUpperCase()}]</span>
						{result.message}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
