import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { hydrateStudy } from "@/lib/patchgauge/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Study" },
  { to: "/patches", label: "Patches" },
  { to: "/compare", label: "Compare" },
  { to: "/workbench", label: "Bench" },
  { to: "/export", label: "Export" },
] as const;

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
      <rect width="32" height="32" rx="6" className="fill-surface-2" />
      <path d="M6 22a10 10 0 0 1 20 0" className="stroke-brass" fill="none" strokeWidth="2" />
      <path d="M16 22 23 11" className="stroke-fg" fill="none" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16" cy="22" r="1.7" className="fill-brass" />
    </svg>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    hydrateStudy();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="border-b border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Mark />
              <div>
                <p className="font-mono text-sm tracking-wide">PatchGauge</p>
                <p className="font-mono text-xs text-muted">Research instrument · model 1.0</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-brass">fixture-py-2026</p>
              <p className="text-xs text-muted">Python · offline replay</p>
            </div>
          </div>
          <nav className="-mx-4 flex gap-1 overflow-x-auto px-4" aria-label="Sections">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 shrink-0 items-center rounded-md px-3 font-mono text-xs tracking-wide",
                    active ? "bg-surface-2 text-fg" : "text-muted",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
