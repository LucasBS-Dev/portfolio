"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links } from "../lib/content";
import { usePreferences } from "./Preferences";

export const sectionIds = ["inicio", "projetos", "experiencia", "stack", "setup", "contato"];
export function Header() {
  const { t, language, setLanguage, theme, setTheme, palette, setPalette } = usePreferences();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [active, setActive] = useState(0);
  useEffect(() => { setOpen(false); setSettings(false); setActive(pathname.startsWith("/projetos") ? 1 : 0); }, [pathname]);
  useEffect(() => {
    if (pathname !== "/") return;
    const update = () => {
      const point = window.scrollY + window.innerHeight * 0.36;
      let current = 0;
      sectionIds.forEach((id, index) => { const element = document.getElementById(id); if (element && element.offsetTop <= point) current = index; });
      setActive(current);
    };
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); setSettings(false); } };
    document.addEventListener("keydown", keydown); return () => document.removeEventListener("keydown", keydown);
  }, []);
  return <>
    <a className="skip-link" href="#main">{language === "pt" ? "Pular para o conteúdo" : "Skip to content"}</a>
    <header className="header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Lucas H. B. Silva — home"><span>l<span className="brand-dot">.</span>s</span><small>PORTFOLIO<br/>© 2026</small></Link>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label={language === "pt" ? "Navegação principal" : "Main navigation"}>
          {sectionIds.map((id, index) => <Link key={id} href={pathname === "/" ? `#${id}` : `/#${id}`} onClick={() => setOpen(false)} aria-current={active === index ? "location" : undefined}><span>{String(index + 1).padStart(2, "0")}</span>{t.nav[index]}</Link>)}
        </nav>
        <div className="header-actions">
          <button className="lang-toggle" type="button" aria-label={language === "pt" ? "Idioma: Português do Brasil. Trocar para inglês" : "Language: English. Switch to Portuguese"} onClick={() => setLanguage(language === "pt" ? "en" : "pt")}><span className={language === "pt" ? "selected" : ""}>PT-BR</span><i>/</i><span className={language === "en" ? "selected" : ""}>EN</span></button>
          <div className="settings-wrap">
            <button className="icon-button settings-button" type="button" aria-label={t.appearance} aria-expanded={settings} aria-controls="appearance-panel" onClick={() => setSettings(!settings)}><span aria-hidden="true">◐</span></button>
            {settings && <div className="settings-panel" id="appearance-panel">
              <p className="eyebrow">{t.appearance}</p>
              <fieldset><legend>{t.theme}</legend><div className="choice-group">{(["light", "dark", "auto"] as const).map((mode) => <button type="button" key={mode} className={theme === mode ? "chosen" : ""} aria-pressed={theme === mode} onClick={() => setTheme(mode)}>{t[mode]}</button>)}</div></fieldset>
              <fieldset><legend>{t.palette}</legend><div className="palette-options"><button type="button" aria-pressed={palette === "petroleum"} onClick={() => setPalette("petroleum")}><span className="swatch petroleum"/>{t.petroleum}</button><button type="button" aria-pressed={palette === "indigo"} onClick={() => setPalette("indigo")}><span className="swatch indigo"/>{t.indigo}</button></div></fieldset>
            </div>}
          </div>
          <button className="menu-button" type="button" aria-label={open ? t.closeMenu : t.menu} aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/></button>
        </div>
      </div>
      <div className="mobile-progress" aria-hidden="true"><span style={{ width: `${(active + 1) / sectionIds.length * 100}%` }}/></div>
    </header>
    <aside className="side-progress" aria-label={language === "pt" ? "Progresso da página" : "Page progress"}><span className="progress-number">{String(active + 1).padStart(2, "0")}</span><span className="progress-track"><span style={{ height: `${(active + 1) / sectionIds.length * 100}%` }}/></span><span className="progress-number">06</span></aside>
  </>;
}
export function Footer() {
  const { t } = usePreferences();
  return <footer className="footer"><div className="container footer-inner"><div><Link className="footer-brand" href="/">lucas<span>.</span></Link><p>{t.footerRole}<br/>{t.footerLine}</p></div><div className="footer-links"><a href={links.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><Link href="/privacidade">{t.privacy}</Link><Link href="/#inicio">{t.footerTop} ↑</Link></div><div className="footer-bottom"><span>© 2026 LUCAS H. B. SILVA</span><span>{t.footerMeta}</span></div></div></footer>;
}


