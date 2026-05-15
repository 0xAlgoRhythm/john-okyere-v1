import { create } from "zustand"

interface ShellStore {
	isSSHOpen: boolean
	openSSH: () => void
	closeSSH: () => void
}

export const useShellStore = create<ShellStore>((set) => ({
	isSSHOpen: false,
	openSSH: () => set({ isSSHOpen: true }),
	closeSSH: () => set({ isSSHOpen: false }),
}))
