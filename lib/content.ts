export const links = {
  github: "https://github.com/LucasBS-Dev",
  linkedin: "https://www.linkedin.com/in/lucas-hb-silva",
  email: "lucashs2402@gmail.com",
};

// Substitua por caminhos em /public quando houver mídias autorizadas.
// Uma demo só deve ser preenchida após seu destino público ser verificado.
export const media = {
  portrait: "" as string,
  vivamais: "" as string,
  rpg: "" as string,
};
export const projects = {
  vivamais: {
    slug: "vivamais",
    number: "01",
    code: "https://github.com/LucasBS-Dev/vivamais",
    contribution: "https://github.com/joaosoares03/vivamais/pull/1",
    demo: { url: "" as string, verified: false },
    image: media.vivamais,
    stack: ["Java 21", "Spring Boot", "PostgreSQL 17", "Flyway", "TypeScript", "React Native / Expo", "Next.js"],
  },
  rpg: {
    slug: "rpg-character-creator",
    number: "02",
    code: "https://github.com/LucasBS-Dev/character-creator",
    demo: { url: "" as string, verified: false },
    image: media.rpg,
    stack: ["Java", "Spring Boot", "Spring Security", "Spring Data JPA", "PostgreSQL", "Maven"],
  },
};

export const equipment = {
  work: [
    { title: "Samsung Galaxy Book6", detail: "Intel Core Ultra 5 325 · 16 GB RAM · SSD NVMe 512 GB" },
    { title: "Samsung Galaxy S26 5G", detail: "256 GB" },
    { title: "Samsung Galaxy Buds4", detail: "" },
  ],
  play: [
    { title: "Desktop", detail: "AMD Ryzen 5 5600X · NVIDIA GeForce RTX 4060 8 GB · 16 GB DDR4 (2 × 8 GB) · SSD NVMe M.2 500 GB · 600 W 80 Plus / PFC ativo" },
    { title: "Logitech G515 LIGHTSPEED TKL", detail: "" },
    { title: "Attack Shark X3", detail: "Sensor PAW3395" },
  ],
};
// Adicione itens para publicar a categoria “Em estudo”.
export const studying: string[] = [];

export type Language = "pt" | "en";
export const copy = {
  pt: {
    nav: ["Início", "Projetos", "Experiência", "Stack", "Setup", "Contato"],
    menu: "Abrir menu", closeMenu: "Fechar menu", appearance: "Aparência", language: "Idioma", theme: "Tema", palette: "Paleta",
    light: "Claro", dark: "Escuro", auto: "Automático", petroleum: "Petróleo e Cobre", indigo: "Índigo e Areia",
    availability: "Disponível para oportunidades", role: "Desenvolvedor Back-end Java",
    heroIntro: "Sou Lucas H. B. Silva, desenvolvedor back-end com foco em Java e Spring Boot. Gosto de partir de um problema real e entender como transformá-lo em software, das regras de negócio à experiência de quem vai usar.",
    heroLabel: "PORTFÓLIO / DESENVOLVIMENTO", heroAside: "DA IDEIA À IMPLEMENTAÇÃO", heroIndex: "DESENVOLVIMENTO / 2026",
    viewProjects: "Ver projetos", talk: "Fale comigo", scroll: "Role para explorar", heroSmall: "Código com propósito.\nDetalhes que fazem diferença.",
    projectsEyebrow: "TRABALHOS SELECIONADOS", projectsTitle: "Projetos que\ncontam histórias.", projectsIntro: "Do contexto à implementação: uma seleção do que venho construindo e aprendendo.",
    featured: "EM DESTAQUE", openCase: "Explorar case", projectLabel: "PROJETO", vivaType: "Projeto colaborativo full-stack", vivaStatus: "Em desenvolvimento",
    vivaSummary: "Tecnologia para apoiar o autocuidado, com atenção às pessoas e às decisões por trás de cada fluxo.",
    rpgType: "Projeto pessoal back-end", rpgStatus: "Pausado", rpgSummary: "Uma API para dar estrutura às histórias, personagens e campanhas de RPG.",
    experienceEyebrow: "CAMINHO ATÉ AQUI", experienceTitle: "Aprender fazendo.\nE continuar fazendo.", experienceIntro: "Minha trajetória em tecnologia começou na eletrônica e ganhou forma no desenvolvimento de software.",
    now: "ATUAL", workRole: "Estagiário em Infraestrutura e Soluções de IA", workText: "Suporte a ambientes corporativos e de desenvolvimento, servidores físicos e cloud, redes e backups. Participação em iniciativas de automação e IA integradas ao WhatsApp e a serviços da Meta.",
    workNote: "Experiência profissional em infraestrutura e soluções de IA; meus projetos de desenvolvimento estão apresentados acima.",
    uni: "Ciência da Computação", uniOrg: "Universidade São Judas Tadeu", uniText: "Em andamento desde 2024. Aprofundamento em fundamentos de computação e desenvolvimento de software.",
    technical: "Técnico em Eletrônica", technicalOrg: "ETEC Professor Aprígio Gonzaga", technicalText: "Foi aqui que comecei a programar e a enxergar como lógica e tecnologia resolvem problemas concretos.",
    stackEyebrow: "FERRAMENTAS & PRÁTICA", stackTitle: "Tecnologia é meio.\nResolver é o objetivo.", stackIntro: "Escolhas orientadas pelo problema, construídas com curiosidade e atenção às bases.",
    primary: "FOCO PRINCIPAL", primaryText: "Minha base para projetar e construir serviços back-end.", applied: "APLICADA EM PROJETOS", appliedText: "Tecnologias e práticas presentes nos cases deste portfólio.", study: "EM ESTUDO",
    stackViva: "Viva+ · app, portal e API", stackRpg: "RPG Character Creator · API", stackBoth: "Viva+ e RPG Character Creator",
    setupEyebrow: "NOS BASTIDORES", setupTitle: "Meu espaço\nde trabalho.", setupIntro: "As ferramentas que me acompanham no desenvolvimento — e também fora dele.", workTab: "Trabalho", playTab: "Jogos", setupNote: "CONFIGURAÇÃO ATUAL / 2026",
    contactEyebrow: "VAMOS CONVERSAR", contactTitle: "Boas ideias\ncomeçam com\numa conversa.", contactIntro: "Aberto a estágios em desenvolvimento, vagas júnior e projetos freelance. Conte-me um pouco sobre o que você está construindo.",
    name: "Nome", email: "E-mail", message: "Mensagem", send: "Enviar mensagem", sending: "Enviando...", namePlaceholder: "Seu nome", emailPlaceholder: "voce@exemplo.com", messagePlaceholder: "Como posso ajudar?",
    unavailable: "O formulário está indisponível no momento. Você pode escrever diretamente por e-mail.", sent: "Mensagem enviada. Obrigado pelo contato!", failed: "Não foi possível enviar agora. Tente novamente ou escreva diretamente por e-mail.", invalid: "Confira os campos: nome, e-mail válido e mensagem com pelo menos 10 caracteres.", rate: "Muitas tentativas. Aguarde alguns minutos ou use o e-mail direto.",
    directEmail: "Enviar e-mail direto", cv: "Solicitar currículo por e-mail", cvSubject: "Solicitação de currículo — Lucas H. B. Silva", privacyLead: "Ao enviar, você concorda com a", privacyLink: "política de privacidade", optional: "Não preencha este campo",
    footerLine: "Feito com intenção e café.", footerMeta: "DESENVOLVIDO COM INTENÇÃO / FEITO COM CUIDADO", footerRole: "Desenvolvedor Back-end Java", footerTop: "Voltar ao topo", privacy: "Privacidade",
    back: "Voltar aos projetos", code: "Ver código", contribution: "Ver minha contribuição", demo: "Ver demo", overview: "VISÃO GERAL", problem: "Problema", myContribution: "Minha contribuição", decisions: "Decisões técnicas", current: "Estado atual", sharedStack: "STACK COMPARTILHADA DA EQUIPE", personalStack: "STACK DO PROJETO", visit: "Abrir link externo",
    vivaProblem: "O Viva+ é um projeto acadêmico colaborativo para apoiar o acompanhamento de rotinas de autocuidado de pessoas idosas com hipertensão. Um app para pacientes, um portal para profissionais e uma API compartilham o mesmo contexto de cuidado.",
    vivaContrib: [
      { title: "Atividade física e segurança", text: "Arquitetura e integração de um catálogo de 10 exercícios e 50 ativos em WebP, GIF e MP4, com orientações multimídia. O roteiro considera o grupo definido pelo profissional e bloqueia o fluxo ativo quando faltam dados, há restrições ou alertas, ou a pressão não foi confirmada. O catálogo é educativo, não uma prescrição.", tag: "01 / EXPERIÊNCIA E REGRAS" },
      { title: "Visão computacional e OCR", text: "Integração do Tesseract para ler visores de pressão, apoiada por um corpus sintético. Leituras incompletas, anômalas ou de baixa confiança são tratadas; mesmo um resultado reconhecido exige conferência humana antes do registro.", tag: "02 / LEITURA E REVISÃO" },
      { title: "Análise alimentar educativa", text: "Integração de um adaptador de IA para retorno em semáforo educativo, com não utilização dos dados para treinamento como requisito da integração. Migrações persistem metadados de rastreabilidade. O adaptador existe; um fornecedor externo ainda depende de configuração e aprovação.", tag: "03 / ADAPTADOR E RASTREABILIDADE" },
    ],
    vivaDecisions: "A API usa Java 21, Spring Boot, PostgreSQL 17 e Flyway. As interfaces usam TypeScript, React Native/Expo e Next.js. Essa é a stack compartilhada da equipe; minha contribuição está nas três frentes descritas acima. A separação entre app, portal e API ajuda a manter responsabilidades claras.",
    vivaCurrent: "Demonstração acadêmica em desenvolvimento, com execução local documentada. O resultado de OCR requer confirmação, e a análise alimentar permanece indisponível sem um fornecedor aprovado e configurado.",
    rpgProblem: "Organizar usuários, fichas, campanhas e convites em uma API REST que dê suporte às relações de uma mesa de RPG.",
    rpgContrib: [{ title: "Uma API para o domínio", text: "Projeto pessoal de back-end para modelar os recursos e as relações entre participantes, campanhas e personagens.", tag: "01 / MODELAGEM" }, { title: "Acesso com contexto", text: "Uma regra de autorização limita a edição pelo mestre aos personagens das campanhas que ele gerencia.", tag: "02 / AUTORIZAÇÃO" }],
    rpgDecisions: "Controllers recebem as requisições, serviços concentram as regras de negócio e repositórios cuidam da persistência. A separação torna cada responsabilidade mais fácil de compreender e evoluir. Spring Security, Spring Data JPA e PostgreSQL compõem a base da API, gerenciada com Maven.",
    rpgCurrent: "Projeto pessoal pausado. O repositório está disponível para leitura; este espaço pode receber capturas do Swagger e outras evidências quando estiverem prontas.",
    architecture: "ARQUITETURA / VISÃO CONCEITUAL", app: "App do paciente", portal: "Portal profissional", api: "API compartilhada", database: "Banco de dados", architectureNote: "Diagrama conceitual · sem dados reais", evidence: "ESPAÇO PARA EVIDÊNCIAS", evidenceText: "Capturas da API poderão ser adicionadas aqui.",
    privacyTitle: "Política de privacidade", privacyUpdated: "Última atualização: novembro de 2026", privacyBack: "Voltar ao início",
    privacySections: [
      { title: "Contato", text: "Quando o formulário está configurado, nome, e-mail e mensagem são enviados ao serviço Resend para entrega na caixa de entrada de Lucas. Seu e-mail é usado como Reply-To para que a resposta chegue até você. Não há banco de dados de mensagens neste site. A retenção depende da caixa de entrada e das políticas do provedor. Evite enviar informações sensíveis." },
      { title: "Proteção contra abuso", text: "O formulário valida os campos no servidor e usa um campo oculto contra spam e um limite de requisições. Em produção, uma chave derivada do endereço IP é armazenada temporariamente no Upstash Redis para aplicar esse limite; o conteúdo da mensagem não é armazenado ali. Solicitações podem ser recusadas quando a proteção estiver indisponível." },
      { title: "Preferências locais", text: "Idioma, tema e paleta são guardados no armazenamento local do navegador. A posição da lista de projetos é guardada temporariamente na sessão para permitir o retorno ao ponto anterior. Você pode remover esses dados nas configurações do navegador." },
      { title: "Seus dados", text: "Para solicitar acesso, correção ou exclusão de uma mensagem recebida, entre em contato pelo endereço abaixo. A entrega por e-mail também está sujeita às políticas dos provedores envolvidos." },
    ],
  },
  en: {
    nav: ["Home", "Projects", "Experience", "Stack", "Setup", "Contact"],
    menu: "Open menu", closeMenu: "Close menu", appearance: "Appearance", language: "Language", theme: "Theme", palette: "Palette",
    light: "Light", dark: "Dark", auto: "Automatic", petroleum: "Petroleum & Copper", indigo: "Indigo & Sand",
    availability: "Open to opportunities", role: "Java Back-end Developer",
    heroIntro: "I’m Lucas H. B. Silva, a back-end developer focused on Java and Spring Boot. I like to start with a real problem and work out how to turn it into software, from business rules to the experience of the people who use it.",
    heroLabel: "PORTFOLIO / DEVELOPMENT", heroAside: "FROM IDEA TO IMPLEMENTATION", heroIndex: "DEVELOPMENT / 2026",
    viewProjects: "View projects", talk: "Get in touch", scroll: "Scroll to explore", heroSmall: "Purposeful code.\nDetails that make a difference.",
    projectsEyebrow: "SELECTED WORK", projectsTitle: "Projects that\ntell a story.", projectsIntro: "From context to implementation: a selection of what I’ve been building and learning.",
    featured: "FEATURED", openCase: "Explore case", projectLabel: "PROJECT", vivaType: "Collaborative full-stack project", vivaStatus: "In development",
    vivaSummary: "Technology to support self-care, with attention to people and the decisions behind each flow.",
    rpgType: "Personal back-end project", rpgStatus: "Paused", rpgSummary: "An API that gives structure to RPG stories, characters and campaigns.",
    experienceEyebrow: "THE PATH SO FAR", experienceTitle: "Learning by doing.\nAnd doing it again.", experienceIntro: "My path in technology began with electronics and took shape through software development.",
    now: "CURRENT", workRole: "Infrastructure and AI Solutions Intern", workText: "Supporting corporate and development environments, physical and cloud servers, networks and backups. Contributing to automation and AI initiatives integrated with WhatsApp and Meta services.",
    workNote: "Professional experience in infrastructure and AI solutions; my development projects are presented above.",
    uni: "Computer Science", uniOrg: "Universidade São Judas Tadeu", uniText: "In progress since 2024, deepening my understanding of computing fundamentals and software development.",
    technical: "Technical degree in Electronics", technicalOrg: "ETEC Professor Aprígio Gonzaga", technicalText: "This is where I started programming and saw how logic and technology can solve practical problems.",
    stackEyebrow: "TOOLS & PRACTICE", stackTitle: "Technology is the means.\nSolving is the goal.", stackIntro: "Choices guided by the problem, built on curiosity and attention to the fundamentals.",
    primary: "PRIMARY FOCUS", primaryText: "My foundation for designing and building back-end services.", applied: "APPLIED IN PROJECTS", appliedText: "Technologies and practices used in the cases in this portfolio.", study: "CURRENTLY LEARNING",
    stackViva: "Viva+ · app, portal and API", stackRpg: "RPG Character Creator · API", stackBoth: "Viva+ and RPG Character Creator",
    setupEyebrow: "BEHIND THE SCENES", setupTitle: "My working\nspace.", setupIntro: "The tools that support my development work — and the time away from it.", workTab: "Work", playTab: "Play", setupNote: "CURRENT SETUP / 2026",
    contactEyebrow: "LET’S TALK", contactTitle: "Good ideas\nstart with a\nconversation.", contactIntro: "Open to development internships, junior roles and freelance projects. Tell me a little about what you’re building.",
    name: "Name", email: "Email", message: "Message", send: "Send message", sending: "Sending...", namePlaceholder: "Your name", emailPlaceholder: "you@example.com", messagePlaceholder: "How can I help?",
    unavailable: "The form is currently unavailable. You can email me directly instead.", sent: "Message sent. Thanks for getting in touch!", failed: "Your message could not be sent. Please try again or email me directly.", invalid: "Check the fields: name, a valid email address and a message of at least 10 characters.", rate: "Too many attempts. Please wait a few minutes or email me directly.",
    directEmail: "Send an email", cv: "Request résumé by email", cvSubject: "Résumé request — Lucas H. B. Silva", privacyLead: "By sending, you agree to the", privacyLink: "privacy policy", optional: "Do not fill in this field",
    footerLine: "Made with intention and coffee.", footerMeta: "DESIGNED WITH PURPOSE / BUILT WITH CARE", footerRole: "Java Back-end Developer", footerTop: "Back to top", privacy: "Privacy",
    back: "Back to projects", code: "View code", contribution: "View my contribution", demo: "View demo", overview: "OVERVIEW", problem: "Problem", myContribution: "My contribution", decisions: "Technical decisions", current: "Current state", sharedStack: "TEAM’S SHARED STACK", personalStack: "PROJECT STACK", visit: "Open external link",
    vivaProblem: "Viva+ is a collaborative academic project designed to support self-care routines for older adults living with hypertension. A patient app, a professional portal and an API share the same care context.",
    vivaContrib: [
      { title: "Physical activity and safety", text: "Architecture and integration of a catalogue of 10 exercises and 50 WebP, GIF and MP4 assets, with multimedia guidance. The flow considers the group selected by a professional and blocks the active flow when data is missing, restrictions or alerts exist, or blood pressure has not been confirmed. The catalogue is educational, not a prescription.", tag: "01 / EXPERIENCE AND RULES" },
      { title: "Computer vision and OCR", text: "Tesseract integration to read blood-pressure displays, supported by a synthetic corpus. Incomplete, anomalous or low-confidence readings are handled; even a recognized result requires human review before it is saved.", tag: "02 / READING AND REVIEW" },
      { title: "Educational food analysis", text: "Integration of an AI adapter for educational traffic-light feedback, with no use of data for training as an integration requirement. Database migrations persist traceability metadata. The adapter exists; an external provider still requires configuration and approval.", tag: "03 / ADAPTER AND TRACEABILITY" },
    ],
    vivaDecisions: "The API uses Java 21, Spring Boot, PostgreSQL 17 and Flyway. The interfaces use TypeScript, React Native/Expo and Next.js. This is the team’s shared stack; my contribution is in the three areas described above. Separating the app, portal and API helps keep responsibilities clear.",
    vivaCurrent: "An academic demonstration in development, with documented local setup. OCR results require confirmation, and food analysis remains unavailable without an approved, configured provider.",
    rpgProblem: "Organize users, character sheets, campaigns and invitations in a REST API that supports the relationships around a tabletop RPG.",
    rpgContrib: [{ title: "An API for the domain", text: "A personal back-end project modelling resources and relationships between participants, campaigns and characters.", tag: "01 / MODELLING" }, { title: "Context-aware access", text: "One authorization rule limits a game master’s edits to characters in campaigns they manage.", tag: "02 / AUTHORIZATION" }],
    rpgDecisions: "Controllers receive requests, services hold business rules and repositories handle persistence. This separation makes each responsibility easier to understand and evolve. Spring Security, Spring Data JPA and PostgreSQL form the API’s foundation, managed with Maven.",
    rpgCurrent: "A personal project currently paused. The repository is available to explore; Swagger screenshots and other evidence can be added here when ready.",
    architecture: "ARCHITECTURE / CONCEPTUAL VIEW", app: "Patient app", portal: "Professional portal", api: "Shared API", database: "Database", architectureNote: "Conceptual diagram · no real data", evidence: "SPACE FOR EVIDENCE", evidenceText: "API screenshots can be added here.",
    privacyTitle: "Privacy policy", privacyUpdated: "Last updated: November 2026", privacyBack: "Back to home",
    privacySections: [
      { title: "Contact", text: "When the form is configured, your name, email and message are sent to Resend for delivery to Lucas’s inbox. Your email is used as Reply-To so he can respond. This site does not maintain a message database. Retention depends on the inbox and provider policies. Please avoid sending sensitive information." },
      { title: "Abuse prevention", text: "The form validates fields on the server and uses a hidden anti-spam field and a request limit. In production, a key derived from the IP address is stored temporarily in Upstash Redis to apply the limit; message content is not stored there. Requests may be refused if this protection is unavailable." },
      { title: "Local preferences", text: "Language, theme and palette are stored in your browser’s local storage. The project list position is stored temporarily for the session so you can return to the same point. You can remove these through your browser settings." },
      { title: "Your data", text: "To request access, correction or deletion of a received message, contact the address below. Email delivery is also subject to the policies of the providers involved." },
    ],
  },
} as const;



