"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { equipment, links, media, projects, studying } from "../lib/content";
import { usePreferences } from "./Preferences";

function SectionHeading({ number, eyebrow, title, intro }: { number: string; eyebrow: string; title: string; intro?: string }) {
  return <div className="section-heading"><div className="section-kicker"><span>{number} / 06</span><span>{eyebrow}</span></div><div className="section-heading-main"><h2>{title}</h2>{intro && <p>{intro}</p>}</div></div>;
}
function CaseLink({ id, children, className = "" }: { id: "vivamais" | "rpg"; children: React.ReactNode; className?: string }) {
  const router = useRouter();
  const href = `/projetos/${projects[id].slug}`;
  return <Link href={href} className={className} onClick={(event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    sessionStorage.setItem("portfolio-project-scroll", String(window.scrollY));
    const heading = event.currentTarget.querySelector<HTMLElement>("[data-case-title]");
    if (heading && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rect = heading.getBoundingClientRect();
      const clone = heading.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true"); clone.className = "transition-title";
      Object.assign(clone.style, { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, fontSize: getComputedStyle(heading).fontSize, color: getComputedStyle(heading).color });
      document.body.appendChild(clone);
      const animation = clone.animate([{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(-28px)" }], { duration: 430, easing: "ease-in-out" });
      animation.onfinish = () => clone.remove();
    }
    router.push(href);
  }}>{children}</Link>;
}
function ProjectArt({ kind }: { kind: "vivamais" | "rpg" }) {
  const { t } = usePreferences();
  const image = projects[kind].image;
  if (image) return <div className={`project-art ${kind} has-image`}><img src={image} alt="" /></div>;
  return <div className={`project-art ${kind}`} aria-hidden="true">
    {kind === "vivamais" ? <><div className="art-top"><span>VIVA+ / 01</span><span>FULL-STACK PROJECT ↗</span></div><div className="viva-art-center"><div className="viva-mark">v<span>+</span></div><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="orbit-label label-one">APP</div><div className="orbit-label label-two">API</div><div className="orbit-label label-three">PORTAL</div></div><div className="art-bottom"><span>{t.architectureNote}</span><span>01 — 03</span></div></> : <><div className="art-top"><span>RPG / 02</span><span>BACK-END PROJECT ↗</span></div><div className="rpg-art-center"><div className="rpg-diamond"><span>20</span></div><div className="rpg-lines"><span>CHARACTER</span><span>CAMPAIGN</span><span>INVITATION</span></div></div><div className="art-bottom"><span>REST API / JAVA</span><span>02 — 03</span></div></>}
  </div>;
}
function ProjectCard({ id }: { id: "vivamais" | "rpg" }) {
  const { t } = usePreferences();
  const isViva = id === "vivamais";
  return <article className={`project-card ${isViva ? "featured-card" : "secondary-card"}`}>
    <CaseLink id={id} className="project-link"><ProjectArt kind={id}/><div className="project-copy"><div className="project-meta"><span>{isViva ? t.featured : `${t.projectLabel} 02`}</span><span className="status"><i/> {isViva ? t.vivaStatus : t.rpgStatus}</span></div><div className="project-title-row"><h3 data-case-title>{isViva ? "Viva+" : "RPG Character Creator"}</h3><span className="round-arrow" aria-hidden="true">↗</span></div><p className="project-type">{isViva ? t.vivaType : t.rpgType}</p><p className="project-summary">{isViva ? t.vivaSummary : t.rpgSummary}</p><span className="text-link">{t.openCase} <span>↗</span></span></div></CaseLink>
  </article>;
}
function Setup() {
  const { t, language } = usePreferences();
  const [tab, setTab] = useState<"work" | "play">("work");
  return <div className="setup-layout"><div className="setup-tabs" role="tablist" aria-label="Setup" onKeyDown={(event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault(); const next = event.key === "Home" ? "work" : event.key === "End" ? "play" : tab === "work" ? "play" : "work"; setTab(next); document.getElementById(`tab-${next}`)?.focus();
  }}>{(["work", "play"] as const).map((value, index) => <button key={value} id={`tab-${value}`} role="tab" aria-selected={tab === value} aria-controls={`panel-${value}`} tabIndex={tab === value ? 0 : -1} onClick={() => setTab(value)}><span>0{index + 1}</span>{value === "work" ? t.workTab : t.playTab}<span>↗</span></button>)}<p>{t.setupNote}</p></div>
    <div className="setup-panel" id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} tabIndex={0}><div className="setup-panel-head"><span>{tab === "work" ? `01 / ${t.workTab}` : `02 / ${t.playTab}`}</span><span>✳</span></div>{equipment[tab].map((item, index) => <div className="equipment" key={item.title}><span className="equipment-number">0{index + 1}</span><div><h3>{item.title}</h3>{item.detail && <p>{language === "en" ? item.detail.replace("PFC ativo", "active PFC") : item.detail}</p>}</div></div>)}</div>
  </div>;
}
function Contact() {
  const { t } = usePreferences();
  const [available, setAvailable] = useState<boolean | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "invalid" | "rate" | "failed">("idle");
  useEffect(() => { fetch("/api/contact", { cache: "no-store" }).then((r) => r.json()).then((r) => setAvailable(Boolean(r.available))).catch(() => setAvailable(false)); }, []);
  const mailto = `mailto:${links.email}`;
  return <div className="contact-grid"><div className="contact-info"><p>{t.contactIntro}</p><a className="contact-email" href={mailto}>{links.email} <span>↗</span></a><div className="socials"><a href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div><a className="cv-link" href={`${mailto}?subject=${encodeURIComponent(t.cvSubject)}`}>{t.cv} <span>↗</span></a></div>
    <form className="contact-form" noValidate onSubmit={async (event) => {
      event.preventDefault(); if (!available) return;
      const form = event.currentTarget; const fields = new FormData(form);
      const name = String(fields.get("name") || "").trim();
      const email = String(fields.get("email") || "").trim();
      const message = String(fields.get("message") || "").trim();
      if (name.length < 2 || name.length > 80 || /[\r\n]/.test(name) || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || message.length > 4000) { setState("invalid"); return; }
      setState("sending");
      try {
        const result = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(fields)) });
        if (result.ok) { setState("sent"); form.reset(); }
        else if (result.status === 400) setState("invalid");
        else if (result.status === 429) setState("rate");
        else { setState("failed"); if (result.status === 503) setAvailable(false); }
      } catch { setState("failed"); }
    }}>
      <div className="form-row"><label>{t.name}<input name="name" autoComplete="name" minLength={2} maxLength={80} placeholder={t.namePlaceholder} required/></label><label>{t.email}<input name="email" type="email" autoComplete="email" maxLength={254} placeholder={t.emailPlaceholder} required/></label></div>
      <label>{t.message}<textarea name="message" minLength={10} maxLength={4000} rows={4} placeholder={t.messagePlaceholder} required/></label>
      <div className="honeypot" aria-hidden="true"><label>{t.optional}<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <p className="privacy-notice">{t.privacyLead} <Link href="/privacidade">{t.privacyLink}</Link>.</p>
      <button className="button button-solid form-submit" type="submit" disabled={!available || state === "sending"}>{state === "sending" ? t.sending : t.send}<span>↗</span></button>
      <div className="form-status" aria-live="polite">{available === false && <p>{t.unavailable} <a href={mailto}>{t.directEmail} ↗</a></p>}{state === "sent" && <p>{t.sent}</p>}{state === "invalid" && <p>{t.invalid}</p>}{state === "rate" && <p>{t.rate}</p>}{state === "failed" && <p>{t.failed} <a href={mailto}>{t.directEmail} ↗</a></p>}</div>
    </form>
  </div>;
}
export function Home() {
  const { t, language } = usePreferences();
  useEffect(() => {
    const saved = sessionStorage.getItem("portfolio-project-scroll");
    if (saved && !location.hash) { sessionStorage.removeItem("portfolio-project-scroll"); requestAnimationFrame(() => window.scrollTo({ top: Number(saved), behavior: "instant" })); }
  }, []);
  return <main id="main">
    <section id="inicio" className="hero"><div className="container hero-grid"><div className="hero-copy"><div className="hero-kicker"><span className="live-dot"/> {t.availability}</div><p className="eyebrow hero-label">{t.heroLabel} <span>© 2026</span></p><h1><span>Lucas</span><span>H. B. Silva<span className="period">.</span></span></h1><p className="hero-role">{t.role}</p><p className="hero-intro">{t.heroIntro}</p><div className="hero-actions"><a className="button button-solid" href="#projetos">{t.viewProjects}<span>↘</span></a><a className="button button-line" href="#contato">{t.talk}<span>↗</span></a></div></div><div className="hero-art">{media.portrait ? <img src={media.portrait} alt="Lucas H. B. Silva"/> : <div className="monogram-composition" aria-label={language === "pt" ? "Monograma LS" : "LS monogram"}><span className="mono-top">{t.heroAside}</span><span className="mono-lines"/><span className="mono-big">L<span>S</span></span><span className="mono-cross">✳</span><span className="mono-bottom">{t.heroIndex}</span><span className="mono-number">01 / 06</span></div>}</div><div className="hero-bottom"><span>{t.scroll} <b>↓</b></span><span>{t.heroSmall}</span></div></div></section>
    <section id="projetos" className="section projects-section"><div className="container"><SectionHeading number="02" eyebrow={t.projectsEyebrow} title={t.projectsTitle} intro={t.projectsIntro}/><div className="projects-list"><ProjectCard id="vivamais"/><ProjectCard id="rpg"/></div></div></section>
    <section id="experiencia" className="section experience-section"><div className="container"><SectionHeading number="03" eyebrow={t.experienceEyebrow} title={t.experienceTitle} intro={t.experienceIntro}/><div className="timeline"><div className="timeline-item"><div className="timeline-date">2026 — {t.now}</div><div className="timeline-content"><span className="timeline-tag">KREPIT / {t.now}</span><h3>{t.workRole}</h3><p>{t.workText}</p><p className="timeline-note">{t.workNote}</p></div></div><div className="timeline-item"><div className="timeline-date">2024 — {t.now}</div><div className="timeline-content"><span className="timeline-tag">{t.uniOrg}</span><h3>{t.uni}</h3><p>{t.uniText}</p></div></div><div className="timeline-item"><div className="timeline-date">2018 — 2020</div><div className="timeline-content"><span className="timeline-tag">{t.technicalOrg}</span><h3>{t.technical}</h3><p>{t.technicalText}</p></div></div></div></div></section>
    <section id="stack" className="section stack-section"><div className="container"><SectionHeading number="04" eyebrow={t.stackEyebrow} title={t.stackTitle} intro={t.stackIntro}/><div className="stack-grid"><div className="stack-focus"><span className="eyebrow">01 / {t.primary}</span><p>{t.primaryText}</p><div className="focus-word">Java<span>↗</span></div><div className="focus-word">Spring Boot<span>↗</span></div></div><div className="stack-applied"><span className="eyebrow">02 / {t.applied}</span><p>{t.appliedText}</p>{[[language === "pt" ? "APIs REST" : "REST APIs", t.stackBoth], ["SQL / PostgreSQL", t.stackBoth], ["Git / GitHub", t.stackBoth], ["TypeScript · React Native / Expo · Next.js", t.stackViva], ["Spring Security · Spring Data JPA · Maven", t.stackRpg]].map(([name, where]) => <div className="stack-row" key={name}><strong>{name}</strong><span>{where}</span></div>)}{studying.length > 0 && <div className="study"><span className="eyebrow">03 / {t.study}</span><p>{studying.join(" · ")}</p></div>}</div></div></div></section>
    <section id="setup" className="section setup-section"><div className="container"><SectionHeading number="05" eyebrow={t.setupEyebrow} title={t.setupTitle} intro={t.setupIntro}/><Setup/></div></section>
    <section id="contato" className="section contact-section"><div className="container"><SectionHeading number="06" eyebrow={t.contactEyebrow} title={t.contactTitle}/><Contact/></div></section>
  </main>;
}



