import React from "react"
import { Awards } from "@/components/sections/awards"
import { Experience } from "@/components/sections/experience"
import { Header } from "@/components/sections/header"
import { About } from "@/components/sections/about"
import { Highlights } from "@/components/sections/highlights"
import { SelectedWork } from "@/components/sections/selected-work"
import { Writing } from "@/components/sections/writing"
import { Research } from "@/components/sections/research"
import { siteConfig } from "@/config/site"

export default function Home() {
	return (
		<div className="px-6 md:px-10 space-y-4 md:space-y-6">
			<Header
				name={siteConfig.name}
				title={siteConfig.title}
				isActive={true}
			/>
			<About />
			<SelectedWork />
			<Experience />
			<Writing />
			<Research />
			<Awards />
			<Highlights />
		</div>
	)
}
