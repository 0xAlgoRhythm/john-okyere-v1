import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Menu } from "@/components/sections/menu"
import { SystemBar } from "@/components/sections/system-bar"
import { ImageViewer } from "@/components/shells/image-viewer"
import { siteConfig } from "@/config/site"
import { Footer } from "@/components/ui/footer"
import { MouseGlow } from "@/components/ui/mouse-glow"
import { SystemLoader } from "@/components/ui/system-loader"
import { ShellProvider } from "@/components/providers/shell-provider"
import ClientDither from "@/components/dither/client-dither"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
})

const mono = JetBrains_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: `${siteConfig.name} | ${siteConfig.title}`,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [
		"John Okyere",
		"Full-Stack Engineer",
		"AI Engineer",
		"Web3 Engineer",
		"Software Engineer",
		"johnokyere",
		"johnokyere.xyz",
		"johnokyere portfolio",
		"tech",
		"technology",
		"react",
		"next.js",
		"artificial intelligence",
		"machine learning",
		"hire software engineer",
		"freelance software developer",
		"tech jobs",
		"contract software engineer",
		"frontend developer",
		"backend developer",
		"full stack web developer",
		"blockchain developer",
		"smart contract engineer",
		"solidity developer",
		"python engineer",
		"typescript developer",
		"javascript expert",
		"node.js developer",
		"cloud architect",
		"AWS expert",
		"devops engineer",
		"software architecture",
		"system design",
		"web development agency",
		"software development services",
		"B2B software consulting",
		"startup CTO",
		"technical co-founder",
		"AI automation consultant",
		"LLM integration expert",
		"custom software solutions",
		"agile development",
		"open source contributor",
		"web app developer",
		"mobile app developer",
		"react native expert",
		"vue.js",
		"angular",
		"golang developer",
		"rust developer",
		"database optimization",
		"postgres",
		"mongodb",
		"tech influencer",
		"coding",
		"programming",
		"developer for hire",
	],
	authors: [{ name: "John Okyere", url: siteConfig.url }],
	creator: "John Okyere",
	publisher: "John Okyere",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: "@0xmhiskall",
		site: "@0xmhiskall",
	},
	icons: {
		icon: "/icon.svg",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: siteConfig.url,
	},
	appleWebApp: {
		capable: true,
		title: siteConfig.name,
		statusBarStyle: "black-translucent",
	},
}

export const viewport: Viewport = {
	colorScheme: "dark light",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.variable} ${mono.variable} ${spaceGrotesk.variable} min-h-screen antialiased font-sans noise-overlay selection:bg-cyan-500/30`}
			>
				<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								"@context": "https://schema.org",
								"@type": "Person",
								name: siteConfig.name,
								url: siteConfig.url,
								image: siteConfig.ogImage,
								sameAs: [
									siteConfig.links.github,
									siteConfig.links.twitter,
									siteConfig.links.linkedin,
								],
								jobTitle: "Software Engineer & AI Engineer",
								worksFor: {
									"@type": "Organization",
									name: "Self-Employed",
								},
								description: siteConfig.description,
							}),
						}}
					/>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								"@context": "https://schema.org",
								"@type": "WebSite",
								name: siteConfig.name,
								url: siteConfig.url,
								description: siteConfig.description,
							}),
						}}
					/>
					<SystemLoader />
					<div className="scanline-effect" />
					<div className="vignette" />
					<MouseGlow />
					<ClientDither />
					<Menu />
					<ShellProvider />
					<div className="max-w-[52rem] mx-auto min-h-screen border-x border-border/40 bg-background/50 relative shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
						<SystemBar />
						<main className="w-full flex-1 pt-4 pb-4 sm:pt-6 sm:pb-6">{children}</main>
						<Footer />
					</div>
					<ImageViewer />
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	)
}
