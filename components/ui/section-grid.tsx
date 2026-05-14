"use client";

import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/ui/animate";
import { LinesBG } from "@/components/ui/grid-patterns";

interface SectionGridProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionGrid({ className, children }: SectionGridProps) {
  return (
    <FadeUp>
      <div className="flex flex-col pb-2 md:pb-4">
        <LinesBG className="-mx-4 sm:-mx-5 mb-1 md:mb-2" />
        <dl
          className={cn(
            "grid grid-cols-12 gap-x-8 gap-y-3 sm:gap-y-4",
            className,
          )}
        >
          {children}
        </dl>
      </div>
    </FadeUp>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function SectionTitle({ className, children, action }: SectionTitleProps) {
  return (
    <dt className={cn("col-span-12 pt-0", className)}>
      <div className="flex items-center justify-between gap-4 mb-1.5">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-cyan-500/40 font-mono text-xs">[</span>
          <h3 className="text-section-title font-title font-semibold text-muted-foreground">
            {children}
          </h3>
          <span className="text-cyan-500/40 font-mono text-xs">]</span>
          <div className="h-px bg-border/40 flex-1 ml-4" />
        </div>
        {action && (
          <div className="shrink-0">
            {action}
          </div>
        )}
      </div>
    </dt>
  );
}

interface SectionContentProps {
  children?: React.ReactNode;
  className?: string;
}

export function SectionContent({ className, children }: SectionContentProps) {
  return (
    <dd className={cn("col-span-12 pt-0", className)}>
      {children}
    </dd>
  );
}
