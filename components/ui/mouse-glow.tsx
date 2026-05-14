"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function MouseGlow() {
	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)

	const springConfig = { damping: 25, stiffness: 150 }
	const x = useSpring(mouseX, springConfig)
	const y = useSpring(mouseY, springConfig)

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX)
			mouseY.set(e.clientY)
		}

		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [mouseX, mouseY])

	return (
		<motion.div
			className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-soft-light hidden md:block"
			style={{
				background: `radial-gradient(circle 400px at ${x}px ${y}px, rgba(0, 255, 255, 0.15), transparent 80%)`,
			}}
		/>
	)
}
