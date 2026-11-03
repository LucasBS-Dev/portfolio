"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projects } from "../lib/content";
import { usePreferences } from "./Preferences";

export function CaseDetail({ kind }: { kind: "vivamais" | "rpg" }) {
  const { t } = usePreferences();
  const router = useRouter();
  const isViva = kind === "vivamais";
  const project = projects[kind];
  const title = isViva ? "Viva+" : "RPG Character Creator";
  const contributions = isViva ? t.vivaContrib : t.rpgContrib;
  return <main id="main" className="case-page"><div className="container">
    <Link href="/" className="back-link" onClick={(event) => { event.preventDefault(); router.push(sessionStorage.getItem("portfolio-project-scroll") ? "/" : "/#projetos"); }}>← {t.back}</Link>
    <div className="case-hero"><div className="case-meta"><span>{t.projectLabel} / {project.number}</span><span>{isViva ? t.vivaType : t.rpgType}</span><span className="status"><i/> {isViva ? t.vivaStatus : t.rpgStatus}</span></div><h1>{title}<span className="period">.</span></h1><p>{isViva ? t.vivaSummary : t.rpgSummary}</p><div className="case-actions"><a className="button button-solid" href={project.code} target="_blank" rel="noreferrer">{t.code} <span>↗</span></a>{isViva && <a className="button button-line" href={projects.vivamais.contribution} target="_blank" rel="noreferrer">{t.contribution} <span>↗</span></a>}{project.demo.verified && project.demo.url && <a className="button button-line" href={project.demo.url} target="_blank" rel="noreferrer">{t.demo} <span>↗</span></a>}</div></div>
    {project.image ? <div className="case-image"><img src={project.image} alt=""/></div> : isViva ? <div className="architecture"><div className="architecture-top"><span>{t.architecture}</span><span>VIVA+ / 01</span></div><div className="architecture-flow"><div className="architecture-clients"><span>{t.app}<small>REACT NATIVE / EXPO</small></span><span>{t.portal}<small>NEXT.JS</small></span></div><div className="flow-arrow">→</div><div className="architecture-node">{t.api}<small>JAVA / SPRING BOOT</small></div><div className="flow-arrow">→</div><div className="architecture-node">{t.database}<small>POSTGRESQL / FLYWAY</small></div></div><div className="architecture-bottom">{t.architectureNote}</div></div> : <div className="case-rpg-art"><span>REST API / JAVA</span><div className="rpg-diamond"><span>20</span></div><span>CHARACTER · CAMPAIGN · INVITATION</span></div>}
    <div className="case-body"><aside className="case-aside"><span className="eyebrow">{isViva ? t.sharedStack : t.personalStack}</span><div className="case-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></aside><div className="case-content"><section><span className="case-section-number">01 / {t.overview}</span><h2>{t.problem}</h2><p>{isViva ? t.vivaProblem : t.rpgProblem}</p></section><section><span className="case-section-number">02 / {t.myContribution}</span><h2>{t.myContribution}</h2><div className="contribution-list">{contributions.map((item) => <div key={item.title}><span>{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section><section><span className="case-section-number">03 / {t.decisions}</span><h2>{t.decisions}</h2><p>{isViva ? t.vivaDecisions : t.rpgDecisions}</p></section><section><span className="case-section-number">04 / {t.current}</span><h2>{t.current}</h2><p>{isViva ? t.vivaCurrent : t.rpgCurrent}</p>{!isViva && !project.image && <div className="evidence-placeholder"><span>＋</span><div><strong>{t.evidence}</strong><p>{t.evidenceText}</p></div></div>}</section></div></div>
    <div className="case-end"><Link href="/" onClick={(event) => { event.preventDefault(); router.push(sessionStorage.getItem("portfolio-project-scroll") ? "/" : "/#projetos"); }}>← {t.back}</Link><a href={project.code} target="_blank" rel="noreferrer">{t.code} ↗</a></div>
  </div></main>;
}


