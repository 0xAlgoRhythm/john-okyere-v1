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
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
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
		default: siteConfig.name,
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
		"johnokyere github",
		"johnokyere twitter",
		"johnokyere linkedin",
	],
	authors: [{ name: "John Okyere", url: "https://johnokyere.xyz" }],
	creator: "johnokyere",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: "@0xmhiskall",
		site: "@0xmhiskall	",	
	},
	icons: {
		icon: "/icon.svg",
	},
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
					<div className="scanline-effect" />
					<div className="vignette" />
					<MouseGlow />
					<ClientDither />
					<ProgressiveBlur
						className="pointer-events-none z-[500] fixed bottom-0 w-full h-20 hidden md:block"
						direction="bottom"
						blurIntensity={0.6}
					/>
					<Menu />
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
