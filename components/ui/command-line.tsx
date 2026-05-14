"use client"

import React, { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

export function CommandLine() {
	const [input, setInput] = useState("")
	const [isFocused, setIsFocused] = useState(false)
	const router = useRouter()
	const inputRef = useRef<HTMLInputElement>(null)

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const cmd = input.trim().toLowerCase()
			
			if (cmd === "cd work" || cmd === "cd projects") {
				router.push("/work")
			} else if (cmd === "cd writing" || cmd === "cd blog") {
				router.push("/writing")
			} else if (cmd === "cd home" || cmd === "cd .." || cmd === "cd /") {
				router.push("/")
			} else if (cmd === "ls") {
				alert("Available directories: work, writing, home")
			} else if (cmd === "help") {
				alert("Commands: cd [work|writing|home], ls, help, clear")
			}
			
			setInput("")
		}
	}

	return (
		<div 
			className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground/60 transition-all duration-300"
			onClick={() => inputRef.current?.focus()}
		>
			<span className="text-cyan-500 font-bold shrink-0 animate-pulse">$</span>
			<div className="relative flex items-center">
				<input
					ref={inputRef}
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					placeholder={isFocused ? "" : "type_command..."}
					className="bg-transparent border-none outline-none text-foreground w-32 sm:w-48 placeholder:text-muted-foreground/20 placeholder:italic"
					spellCheck={false}
					autoComplete="off"
				/>
				{isFocused && input === "" && (
					<span className="absolute left-0 w-1.5 h-3.5 bg-cyan-500/50 animate-caret-blink" />
				)}
			</div>
		</div>
	)
}
