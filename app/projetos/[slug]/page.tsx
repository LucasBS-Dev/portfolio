import { notFound } from "next/navigation";
import { CaseDetail } from "../../../components/CaseDetail";
export function generateStaticParams() { return [{ slug: "vivamais" }, { slug: "rpg-character-creator" }]; }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== "vivamais" && slug !== "rpg-character-creator") notFound();
  return <CaseDetail kind={slug === "vivamais" ? "vivamais" : "rpg"}/>;
}
