"use client";
import { useTheme } from "next-themes";
import Dither from "./dither";

const ClientDither = () => {
  const { theme } = useTheme();

  // Theme-aware colors
	const waveColor =
		theme === "dark"
			? ([0.1, 0.4, 0.5] as [number, number, number]) // Electric Cyan-inspired
			: ([0.4, 0.4, 0.5] as [number, number, number]) // Muted slate

	const backgroundColor =
		theme === "dark"
			? ([0.04, 0.04, 0.05] as [number, number, number]) // Obsidian base
			: ([0.98, 0.98, 1.0] as [number, number, number]) // Clean white

	return (
		<div
			className="fixed left-0 top-0 h-screen w-full pointer-events-none opacity-20 dark:opacity-30"
			style={{ zIndex: -1 }}
		>
			<Dither
				waveColor={waveColor}
        backgroundColor={backgroundColor}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.15}
        colorNum={3}
        waveAmplitude={0.3}
        waveFrequency={1}
        waveSpeed={0.06}
      />
    </div>
  );
};

export default ClientDither;
