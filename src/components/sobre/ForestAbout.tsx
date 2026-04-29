"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { perfil } from "@/data/perfil";

const BIO =
  "Graduando em Desenvolvimento de Software Multiplataforma na Fatec Zona Leste com formação técnica em Informática para Internet pela Etec São Mateus. Desenvolvo softwares aplicando metodologia ágil Scrum, utilizando TypeScript, React.JS e TailwindCSS no front-end, e Node.JS, Java e Python no back-end.";

export function ForestAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const fl1 = useRef<SVGSVGElement>(null);
  const fl2 = useRef<SVGSVGElement>(null);
  const fl3 = useRef<SVGSVGElement>(null);
  const fl4 = useRef<SVGSVGElement>(null);
  const fl5 = useRef<SVGSVGElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const faPhoto = useRef<HTMLDivElement>(null);
  const faName = useRef<HTMLDivElement>(null);
  const faTitle = useRef<HTMLDivElement>(null);
  const faLine = useRef<HTMLDivElement>(null);
  const faBio = useRef<HTMLDivElement>(null);
  const faLinks = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    function onScroll() {
      if (!section) return;
      const scrolled = window.scrollY - section.offsetTop;
      const maxScroll = section.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const p = clamp(scrolled / maxScroll, 0, 1);

      if (fl1.current) fl1.current.style.transform = `scaleX(${1 + p * 0.55}) scaleY(${1 + p * 0.55}) translateY(${p * 48}px)`;
      if (fl2.current) fl2.current.style.transform = `scaleX(${1 + p * 0.38}) scaleY(${1 + p * 0.38}) translateY(${p * 32}px)`;
      if (fl3.current) fl3.current.style.transform = `scaleX(${1 + p * 0.24}) scaleY(${1 + p * 0.24}) translateY(${p * 20}px)`;
      if (fl4.current) fl4.current.style.transform = `scaleX(${1 + p * 0.14}) scaleY(${1 + p * 0.14}) translateY(${p * 10}px)`;
      if (fl5.current) fl5.current.style.transform = `scaleX(${1 + p * 0.07}) scaleY(${1 + p * 0.07}) translateY(${p * 4}px)`;

      if (moonRef.current) {
        moonRef.current.style.transform = `translateX(-50%) scale(${1 - p * 0.4}) translateY(${-p * 30}px)`;
        moonRef.current.style.opacity = String(1 - p * 1.2);
      }

      if (vignetteRef.current) {
        vignetteRef.current.style.opacity = String(Math.min(p * 1.2, 1));
      }

      const ip = Math.max(0, (p - 0.42) / 0.3);
      if (faPhoto.current) {
        faPhoto.current.style.opacity = String(ip);
        faPhoto.current.style.transform = `translateY(${20 - ip * 20}px)`;
      }
      if (faName.current) {
        faName.current.style.opacity = String(ip);
        faName.current.style.transform = `translateY(${20 - ip * 20}px)`;
      }
      if (faTitle.current) {
        faTitle.current.style.opacity = String(ip);
        faTitle.current.style.transform = `translateY(${20 - ip * 20}px)`;
      }
      if (faLine.current) {
        faLine.current.style.width = ip * 140 + "px";
      }

      const bp = Math.max(0, (p - 0.55) / 0.25);
      if (faBio.current) {
        faBio.current.style.opacity = String(bp);
        faBio.current.style.transform = `translateY(${12 - bp * 12}px)`;
      }

      const lp = Math.max(0, (p - 0.68) / 0.2);
      if (faLinks.current) {
        faLinks.current.style.opacity = String(lp);
      }
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    });
    observer.observe(section);
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="forest-about" aria-label="Sobre mim">
      <div ref={stickyRef} className="forest-about__sticky">
        <div className="forest-about__sky" aria-hidden />

        <svg className="forest-about__stars" viewBox="0 0 700 200" aria-hidden>
          <circle cx="60" cy="18" r="1" fill="white" opacity="0.7" />
          <circle cx="140" cy="42" r="1.2" fill="white" opacity="0.5" />
          <circle cx="220" cy="12" r="0.8" fill="white" opacity="0.9" />
          <circle cx="320" cy="32" r="1" fill="white" opacity="0.6" />
          <circle cx="400" cy="8" r="1.3" fill="white" opacity="0.5" />
          <circle cx="490" cy="48" r="0.9" fill="white" opacity="0.8" />
          <circle cx="570" cy="22" r="1.1" fill="white" opacity="0.6" />
          <circle cx="650" cy="38" r="1" fill="white" opacity="0.9" />
          <circle cx="110" cy="68" r="0.8" fill="white" opacity="0.5" />
          <circle cx="260" cy="58" r="1" fill="white" opacity="0.7" />
          <circle cx="440" cy="78" r="0.9" fill="white" opacity="0.6" />
          <circle cx="600" cy="62" r="1.2" fill="white" opacity="0.8" />
          <circle cx="180" cy="88" r="0.7" fill="white" opacity="0.4" />
          <circle cx="360" cy="95" r="1" fill="white" opacity="0.5" />
          <circle cx="520" cy="105" r="0.8" fill="white" opacity="0.6" />
        </svg>

        <div ref={moonRef} className="forest-about__moon" aria-hidden />

        <svg
          ref={fl5}
          className="forest-about__layer forest-about__layer--five"
          viewBox="0 0 700 140"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden
        >
          <g fill="#1a3020" opacity="0.25">
            <path d="M0,140 L0,80 Q25,45 50,80 Q70,52 90,80 Q110,62 130,80 L130,140Z" />
            <path d="M110,140 L110,72 Q145,32 180,72 Q200,48 220,72 L220,140Z" />
            <path d="M210,140 L210,85 Q235,52 260,85 Q278,62 298,85 L298,140Z" />
            <path d="M288,140 L288,68 Q325,28 362,68 Q385,48 408,68 L408,140Z" />
            <path d="M395,140 L395,78 Q420,46 445,78 Q465,56 485,78 L485,140Z" />
            <path d="M472,140 L472,70 Q508,30 544,70 Q568,46 592,70 L592,140Z" />
            <path d="M575,140 L575,80 Q608,48 640,80 Q658,60 678,80 L700,140Z" />
          </g>
        </svg>

        <svg
          ref={fl4}
          className="forest-about__layer forest-about__layer--four"
          viewBox="0 0 700 185"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden
        >
          <g fill="#122418" opacity="0.4">
            <path d="M-10,185 L-10,108 Q18,58 46,108 Q68,72 90,108 L90,185Z" />
            <path d="M75,185 L75,92 Q115,40 155,92 Q178,60 202,92 L202,185Z" />
            <path d="M190,185 L190,115 Q218,72 246,115 Q268,85 292,115 L292,185Z" />
            <path d="M280,185 L280,98 Q318,45 356,98 Q382,68 408,98 L408,185Z" />
            <path d="M395,185 L395,110 Q422,65 450,110 Q472,80 496,110 L496,185Z" />
            <path d="M484,185 L484,95 Q522,42 560,95 Q585,65 610,95 L610,185Z" />
            <path d="M598,185 L598,108 Q630,62 662,108 L710,185Z" />
          </g>
        </svg>

        <div className="forest-about__fog" aria-hidden />

        <svg
          ref={fl3}
          className="forest-about__layer forest-about__layer--three"
          viewBox="0 0 700 250"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden
        >
          <g fill="#0c1c12" opacity="0.65">
            <path d="M-20,250 L-20,145 Q12,72 44,145 Q68,95 92,145 L92,250Z" />
            <path d="M72,250 L72,125 Q115,52 158,125 Q184,80 210,125 L210,250Z" />
            <path d="M195,250 L195,155 Q225,95 255,155 Q278,118 302,155 L302,250Z" />
            <path d="M290,250 L290,132 Q330,58 370,132 Q398,90 428,132 L428,250Z" />
            <path d="M415,250 L415,148 Q445,88 475,148 Q500,112 525,148 L525,250Z" />
            <path d="M510,250 L510,128 Q552,52 594,128 Q620,85 645,128 L645,250Z" />
            <path d="M632,250 L632,142 Q662,88 692,142 L720,250Z" />
          </g>
        </svg>

        <div className="forest-about__content">
          <div ref={faPhoto} className="forest-about__photo">
            <Image
              src="/images/FotoCrachaVitor.jpg"
              alt="Foto de Vitor Dias"
              width={120}
              height={120}
              className="forest-about__photo-img"
              priority
            />
          </div>
          <div ref={faName} className="forest-about__name">
            {perfil.nome}
          </div>
          <div ref={faTitle} className="forest-about__title">
            {perfil.trabalho}
          </div>
          <div ref={faLine} className="forest-about__line" aria-hidden />
          <div ref={faBio} className="forest-about__bio">
            {BIO}
          </div>
          <div ref={faLinks} className="forest-about__links">
            <a
              className="forest-about__btn"
              href={perfil.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="forest-about__btn"
              href={perfil.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a className="forest-about__btn" href={`mailto:${perfil.email}`}>
              Email
            </a>
          </div>
        </div>

        <svg
          ref={fl2}
          className="forest-about__layer forest-about__layer--two"
          viewBox="0 0 700 320"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden
        >
          <g fill="#070f09" opacity="0.88">
            <path d="M-35,320 L-35,175 Q2,88 38,175 Q65,108 90,175 L90,320Z" />
            <path d="M68,320 L68,152 Q118,65 168,152 Q198,98 228,152 L228,320Z" />
            <path d="M212,320 L212,185 Q248,112 285,185 Q312,142 340,185 L340,320Z" />
            <path d="M328,320 L328,158 Q372,72 416,158 Q448,105 480,158 L480,320Z" />
            <path d="M465,320 L465,178 Q500,102 535,178 Q562,135 588,178 L588,320Z" />
            <path d="M575,320 L575,155 Q620,68 665,155 L715,320Z" />
          </g>
        </svg>

        <svg
          ref={fl1}
          className="forest-about__layer forest-about__layer--one"
          viewBox="0 0 700 400"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden
        >
          <g fill="#040a05">
            <path d="M-50,400 L-50,215 Q-5,105 40,215 Q72,128 102,215 L102,400Z" />
            <path d="M78,400 L78,185 Q138,82 198,185 Q232,118 265,185 L265,400Z" />
            <path d="M248,400 L248,222 Q288,138 328,222 Q358,172 388,222 L388,400Z" />
            <path d="M372,400 L372,192 Q422,95 472,192 Q508,132 545,192 L545,400Z" />
            <path d="M528,400 L528,210 Q568,118 608,210 L665,400Z" />
            <path d="M648,400 L648,198 Q682,112 716,198 L750,400Z" />
          </g>
        </svg>

        <div ref={vignetteRef} className="forest-about__vignette" aria-hidden />
      </div>
    </section>
  );
}
