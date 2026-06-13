import { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import { allWorks, allWritings, allResearch } from "content-collections"

export default function sitemap(): MetadataRoute.Sitemap {
	const works = allWorks
		.filter((work) => !work.draft)
		.map((work) => ({
			url: `${siteConfig.url}/work/${work._meta.path}`,
			lastModified: new Date().toISOString().split("T")[0],
		}))

	const writings = allWritings
		.filter((writing) => !writing.draft)
		.map((writing) => ({
			url: `${siteConfig.url}/writing/${writing._meta.path}`,
			lastModified: new Date(writing.date).toISOString().split("T")[0],
		}))

	const researches = allResearch
		.filter((research) => !research.draft)
		.map((research) => ({
			url: `${siteConfig.url}/research/${research._meta.path}`,
			lastModified: new Date(research.date).toISOString().split("T")[0],
		}))

	const routes = ["", "/work", "/writing", "/research", "/contact"].map((route) => ({
		url: `${siteConfig.url}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}))

	return [...routes, ...works, ...writings, ...researches]
}
