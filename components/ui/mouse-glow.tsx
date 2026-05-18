"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function MouseGlow() {
	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)

	// Lagging inner glow for depth
	const lagX = useMotionValue(0)
	const lagY = useMotionValue(0)

	const springFast = { damping: 25, stiffness: 150 }
	const springSlow = { damping: 40, stiffness: 80 }

	const x = useSpring(mouseX, springFast)
	const y = useSpring(mouseY, springFast)
	const lx = useSpring(lagX, springSlow)
	const ly = useSpring(lagY, springSlow)

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX)
			mouseY.set(e.clientY)
			// Slight delay for the inner spot
			setTimeout(() => {
				lagX.set(e.clientX)
				lagY.set(e.clientY)
			}, 80)
		}

		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [mouseX, mouseY, lagX, lagY])

	return (
		<>
			{/* Outer wide glow */}
			<motion.div
				className="pointer-events-none fixed inset-0 z-0 hidden md:block"
				style={{
					opacity: 0.55,
					background: `radial-gradient(circle 650px at ${x}px ${y}px, rgba(0, 210, 220, 0.12), transparent 80%)`,
				}}
			/>
			{/* Inner tight spot — lags slightly for depth */}
			<motion.div
				className="pointer-events-none fixed inset-0 z-0 hidden md:block"
				style={{
					opacity: 0.4,
					background: `radial-gradient(circle 200px at ${lx}px ${ly}px, rgba(0, 255, 255, 0.1), transparent 80%)`,
				}}
			/>
		</>
	)
}
