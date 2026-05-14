"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";

let _openMenu: (() => void) | null = null;

export function openMenu() {
  _openMenu?.();
}
import { Command } from "cmdk";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  CommandIcon as CommandHugeIcon,
  File01Icon,
  Folder01Icon,
  FileDownloadIcon,
  Mail01Icon,
  NewTwitterIcon,
  Loading03Icon,
  Github01Icon,
  Linkedin01Icon,
} from "@hugeicons/core-free-icons";
import { ThemeToggleIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import {
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Menu() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigate = async (href: string) => {
    if (!href) return;
    setLoading(true);

    if (href.includes("mailto:")) {
      window.location.href = href;
    } else if (href.includes("//")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (href === pathname) {
      router.replace(href);
    } else {
      router.push(href);
    }

    setLoading(false);
    setOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setOpen(false);
  };

  useEffect(() => {
    _openMenu = () => setOpen(true);
    return () => {
      _openMenu = null;
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Prefetch routes
    router.prefetch("/writing");
    router.prefetch("/work");

    // Toggle the menu when ⌘K or Ctrl+K is pressed
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, [mounted, router]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">System Command Interface</DialogTitle>
        <div className="flex items-center gap-2 px-4 pt-4 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
          <span className="animate-pulse">●</span>
          <span>System Command Interface</span>
        </div>
        <Command.Input placeholder="Execute command..." />
        <Command.List className="scrollbar-hide">
          {loading && (
            <Command.Loading>
              <div className="flex items-center justify-center p-8">
                <HugeiconsIcon
                  icon={Loading03Icon}
                  size={24}
                  strokeWidth={1.5}
                  className="animate-spin text-cyan-500"
                />
              </div>
            </Command.Loading>
          )}

          <Command.Empty className="py-12 text-center text-sm text-muted-foreground font-mono">
            COMMAND_NOT_FOUND: Search query returned 0 results.
          </Command.Empty>

          <Command.Group heading="Directories">
            <Command.Item onSelect={() => navigate("/")}>
              <div className="flex items-center gap-3 text-foreground font-mono text-sm">
                <span className="text-muted-foreground opacity-50">01</span>
                <HugeiconsIcon icon={Home01Icon} size={14} strokeWidth={2} />
                <span>/root</span>
              </div>
            </Command.Item>
            <Command.Item onSelect={() => navigate("/writing")}>
              <div className="flex items-center gap-3 text-foreground font-mono text-sm">
                <span className="text-muted-foreground opacity-50">02</span>
                <HugeiconsIcon icon={File01Icon} size={14} strokeWidth={2} />
                <span>/writing</span>
              </div>
            </Command.Item>
            <Command.Item onSelect={() => navigate("/work")}>
              <div className="flex items-center gap-3 text-foreground font-mono text-sm">
                <span className="text-muted-foreground opacity-50">03</span>
                <HugeiconsIcon icon={Folder01Icon} size={14} strokeWidth={2} />
                <span>/projects</span>
              </div>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Assets">
            <Command.Item onSelect={() => navigate("/resume/resume.pdf")}>
              <div className="flex items-center gap-3 text-foreground font-mono text-sm">
                <span className="text-muted-foreground opacity-50">04</span>
                <HugeiconsIcon icon={FileDownloadIcon} size={14} strokeWidth={2} />
                <span>resume.pdf</span>
              </div>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Configuration">
            <Command.Item onSelect={toggleTheme}>
              <div className="flex items-center gap-3 text-foreground font-mono text-sm">
                <span className="text-muted-foreground opacity-50">05</span>
                <ThemeToggleIcon className="size-3.5" />
                <span>set_theme({theme === "dark" ? "light" : "dark"})</span>
              </div>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Network">
            <Command.Item onSelect={() => navigate(siteConfig.links.twitter)}>
              <div className="flex items-center gap-3 text-foreground font-mono text-sm">
                <span className="text-muted-foreground opacity-50">06</span>
                <HugeiconsIcon icon={NewTwitterIcon} size={14} strokeWidth={2} />
                <span>x.com</span>
              </div>
            </Command.Item>
            <Command.Item onSelect={() => navigate(siteConfig.links.github)}>
              <div className="flex items-center gap-3 text-foreground font-mono text-sm">
                <span className="text-muted-foreground opacity-50">07</span>
                <HugeiconsIcon icon={Github01Icon} size={14} strokeWidth={2} />
                <span>github.com</span>
              </div>
            </Command.Item>
            <Command.Item onSelect={() => navigate(siteConfig.links.linkedin)}>
              <div className="flex items-center gap-3 text-foreground font-mono text-sm">
                <span className="text-muted-foreground opacity-50">08</span>
                <HugeiconsIcon icon={Linkedin01Icon} size={14} strokeWidth={2} />
                <span>linkedin.com</span>
              </div>
            </Command.Item>
            <Command.Item onSelect={() => navigate(siteConfig.links.email)}>
              <div className="flex items-center gap-3 text-foreground font-mono text-sm">
                <span className="text-muted-foreground opacity-50">09</span>
                <HugeiconsIcon icon={Mail01Icon} size={14} strokeWidth={2} />
                <span>smtp.connect()</span>
              </div>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
}
