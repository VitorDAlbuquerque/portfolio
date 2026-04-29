"use client";

import { Github, Linkedin, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { perfil } from "@/data/perfil";

const links = [
  { sectionId: "inicio", label: "Início" },
  { sectionId: "sobre", label: "Sobre" },
  { sectionId: "educacao", label: "Educação" },
  { sectionId: "projetos", label: "Projetos" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("inicio");
  const [hideOnAbout, setHideOnAbout] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/projetos/")) {
        setActiveSection("projetos");
      }
      return;
    }

    const sectionIds = links.map((link) => link.sectionId);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0.15, 0.35, 0.55],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setHideOnAbout(false);
      return;
    }

    const aboutAnimationSection = document.getElementById("about");
    if (!aboutAnimationSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setHideOnAbout(!!entry?.isIntersecting && entry.intersectionRatio > 0.35);
      },
      {
        threshold: [0.2, 0.35, 0.55],
      }
    );

    observer.observe(aboutAnimationSection);
    return () => observer.disconnect();
  }, [pathname]);

  const linksWithHref = useMemo(
    () =>
      links.map((link) => ({
        ...link,
        href: pathname === "/" ? `#${link.sectionId}` : `/#${link.sectionId}`,
      })),
    [pathname]
  );

  function handleAnchorClick(sectionId: string) {
    if (pathname !== "/") return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${sectionId}`);
    setActiveSection(sectionId);
    setOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b border-frieren-border bg-frieren-base/90 backdrop-blur-md transition-all duration-300 ${
        hideOnAbout ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-display font-light tracking-[0.2em] uppercase text-frieren-text text-base"
        >
          Vitor Dias de Albuquerque
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
          {linksWithHref.map((l) => {
            const active =
              pathname === "/"
                ? activeSection === l.sectionId
                : pathname.startsWith("/projetos/") && l.sectionId === "projetos";
            return (
              <Link
                key={l.sectionId}
                href={l.href}
                onClick={() => handleAnchorClick(l.sectionId)}
                className={`text-xs tracking-widest uppercase transition-colors ${
                  active
                    ? "text-frieren-purple"
                    : "text-frieren-text-muted hover:text-frieren-purple"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="ml-2 flex items-center gap-2">
            <a
              href={perfil.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-frieren-border p-2 text-frieren-text-md hover:border-frieren-border-md hover:text-frieren-text transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={perfil.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-frieren-border p-2 text-frieren-text-md hover:border-frieren-border-md hover:text-frieren-text transition-colors"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </nav>

        <button
          type="button"
          className="rounded-sm border border-frieren-border p-2 text-frieren-text-md hover:border-frieren-border-md hover:text-frieren-text transition-colors md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Menu</span>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-frieren-border bg-frieren-base px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {linksWithHref.map((l) => {
              const mobileActive =
                pathname === "/"
                  ? activeSection === l.sectionId
                  : pathname.startsWith("/projetos/") && l.sectionId === "projetos";
              return (
                <Link
                  key={l.sectionId}
                  href={l.href}
                  onClick={() => {
                    handleAnchorClick(l.sectionId);
                    setOpen(false);
                  }}
                  className={`text-xs tracking-widest uppercase transition-colors ${
                    mobileActive
                      ? "text-frieren-purple"
                      : "text-frieren-text hover:text-frieren-purple"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <div className="mt-2 flex items-center gap-2">
              <a
                href={perfil.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-frieren-border px-3 py-2 text-sm text-frieren-text-md hover:border-frieren-border-md hover:text-frieren-text transition-colors"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
              <a
                href={perfil.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-frieren-border px-3 py-2 text-sm text-frieren-text-md hover:border-frieren-border-md hover:text-frieren-text transition-colors"
              >
                <Github className="h-4 w-4" aria-hidden />
                GitHub
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
