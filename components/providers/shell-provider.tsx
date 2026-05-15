"use client"

import { useShellStore } from "@/lib/store/use-shell"
import { SSHPortal } from "@/components/ui/ssh-portal"
import { AnimatePresence } from "framer-motion"

export function ShellProvider() {
	const { isSSHOpen, closeSSH } = useShellStore()

	return (
		<AnimatePresence>
			{isSSHOpen && <SSHPortal isOpen={isSSHOpen} onClose={closeSSH} />}
		</AnimatePresence>
	)
}
