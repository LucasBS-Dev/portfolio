"use client";
import Link from "next/link";
import { links } from "../../lib/content";
import { usePreferences } from "../../components/Preferences";
export default function PrivacyPage() {
  const { t } = usePreferences();
  return <main id="main" className="privacy-page"><div className="container privacy-container"><Link href="/" className="back-link">← {t.privacyBack}</Link><span className="eyebrow">LUCAS H. B. SILVA / PORTFOLIO</span><h1>{t.privacyTitle}<span className="period">.</span></h1><p className="privacy-updated">{t.privacyUpdated}</p>{t.privacySections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}<a className="text-link" href={`mailto:${links.email}`}>{links.email} ↗</a></div></main>;
}
