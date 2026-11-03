import type { Metadata } from "next";
import { PreferencesProvider } from "../components/Preferences";
import { Header, Footer } from "../components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lucas H. B. Silva — Desenvolvedor Back-end Java",
  description: "Portfólio de Lucas H. B. Silva: desenvolvimento back-end Java, projetos full-stack e tecnologia aplicada a problemas reais.",
  icons: { icon: "/favicon.svg" },
};
const boot = `(function(){try{var l=localStorage.getItem('portfolio-language'),t=localStorage.getItem('portfolio-theme'),p=localStorage.getItem('portfolio-palette');document.documentElement.lang=l==='en'?'en':'pt-BR';document.documentElement.dataset.theme=['light','dark','auto'].includes(t)?t:'auto';document.documentElement.dataset.palette=['petroleum','indigo'].includes(p)?p:'petroleum'}catch(e){}})()`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" data-scroll-behavior="smooth" data-theme="auto" data-palette="petroleum" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: boot }} /></head><body><PreferencesProvider><Header/>{children}<Footer/></PreferencesProvider></body></html>;
}

