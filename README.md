# Lucas H. B. Silva — portfólio

Portfólio bilíngue em Next.js, TypeScript e App Router. O projeto é independente dos repositórios Viva+ e RPG Character Creator. As páginas de case têm URLs próprias; as preferências ficam no navegador. Nenhum currículo está incluído no projeto.

## Rodar no Windows / PowerShell

Requisitos: Node.js 22.16 ou superior e pnpm. Na pasta deste projeto:

```powershell
pnpm.cmd install
pnpm.cmd dev
```

Abra [http://127.0.0.1:3001](http://127.0.0.1:3001). Para verificar a versão de produção:

```powershell
pnpm.cmd build
pnpm.cmd start
```

Para escolher outra porta, por exemplo quando a 3001 estiver ocupada:

```powershell
pnpm.cmd exec next dev --webpack --hostname 127.0.0.1 --port 3002
```

`pnpm.cmd test` executa os testes do endpoint de contato. As dependências têm versões fixadas no `package.json`; a primeira instalação exige acesso ao registro de pacotes.

## Configurar o contato

O adaptador em `lib/resend.mjs` usa a API HTTP do Resend. Configure um domínio remetente verificado no Resend e copie o exemplo para um arquivo privado:

```powershell
Copy-Item .env.example .env.local
```

Edite `.env.local` e mantenha-o fora do Git:

| Variável | Finalidade |
| --- | --- |
| `RESEND_API_KEY` | Chave privada da API Resend. |
| `CONTACT_FROM` | Remetente de domínio verificado, por exemplo `Portfolio <contato@seudominio.com>`. |
| `CONTACT_TO` | Caixa de destino, inicialmente `lucashs2402@gmail.com`. |
| `UPSTASH_REDIS_REST_URL` | URL REST do Redis compartilhado para o limite de requisições. |
| `UPSTASH_REDIS_REST_TOKEN` | Token privado REST do Redis. |
| `TRUST_PROXY` | `true` apenas se a hospedagem substituir o cabeçalho `x-forwarded-for` por um valor confiável; caso contrário use `false`. |

Reinicie o servidor após alterar variáveis. Em produção, o formulário só aparece disponível quando Resend e Redis estão configurados. A verificação de disponibilidade confirma a presença das variáveis, não a validade das credenciais nem a conectividade; uma falha posterior apresenta erro e o link de e-mail direto. O servidor só retorna sucesso quando o Resend responde com sucesso e um ID de aceite. O e-mail informado pelo visitante é enviado como `Reply-To`.

O servidor valida os campos e a origem, limita o corpo da requisição, verifica um campo oculto e limita a cinco tentativas por dez minutos. Em produção, o limite é compartilhado via Upstash; se o Redis falhar, a requisição é recusada. Com `TRUST_PROXY=false`, todos compartilham uma mesma cota: isso evita confiar em um IP fornecido pelo cliente, mas pode limitar visitantes legítimos. Em desenvolvimento sem Redis, o limite é apenas em memória e por processo. A política em `/privacidade` descreve esse fluxo; revise retenção e termos dos provedores antes de publicar.

### Simular o provedor sem enviar e-mails

Em um terminal:

```powershell
node tests\mock-mail-server.mjs
```

Em outro terminal, somente para QA local:

```powershell
$env:RESEND_API_KEY='mock-only'
$env:CONTACT_FROM='Portfolio <local@example.test>'
$env:CONTACT_TO='local@example.test'
$env:RESEND_API_URL='http://127.0.0.1:4011/emails'
pnpm.cmd exec next dev --webpack --hostname 127.0.0.1 --port 3002
```

O adaptador aceita `RESEND_API_URL` apenas fora de produção e somente em loopback. Uma mensagem contendo `falha simulada` recebe erro do mock; outras recebem um ID simulado. Nenhuma mensagem é enviada. Essa simulação não comprova entrega real.

## Atualizar conteúdo e mídias

- **Foto:** coloque uma imagem autorizada em `public/images/` e defina `media.portrait` em `lib/content.ts`, por exemplo `"/images/lucas.jpg"`. Enquanto estiver vazio, o monograma LS é exibido.
- **Capturas:** coloque arquivos públicos e sintéticos/autorizados em `public/images/` e defina `media.vivamais` ou `media.rpg` no mesmo arquivo. Os diagramas atuais são fallbacks. Não use dados de pacientes.
- **Demo:** preencha `projects.vivamais.demo.url` ou `projects.rpg.demo.url` e mude `verified` para `true` somente depois de verificar manualmente o destino público. Com URL vazia ou `verified: false`, o link não aparece.
- **Textos, links, projetos, equipamentos e estudo:** edite `lib/content.ts`. Atualize as duas versões em `copy.pt` e `copy.en`. A categoria “Em estudo” aparece quando o array `studying` tiver itens.
- **Aparência:** os tokens de cores e temas estão no início de `app/globals.css`. Preserve o contraste nas duas paletas e temas.
- **Currículo:** o botão abre uma mensagem de solicitação; não adicione o documento ao repositório ou à pasta pública.

## Publicação e privacidade

A hospedagem precisa executar o servidor Next.js/Node, permitir saída HTTPS para Resend e Upstash e manter as variáveis como segredos de servidor. Exportação puramente estática não executa `/api/contact`. Revise o domínio, o comportamento do proxy e os limites do serviço da hospedagem antes de ativar `TRUST_PROXY`. Configure o domínio e credenciais reais e faça um envio controlado para verificar a entrega; isso não foi realizado sem credenciais. A URL de uma demo pública e as mídias definitivas permanecem pendentes até serem fornecidas e verificadas.

### Dependências nesta sessão

A rede do ambiente de execução bloqueou o registro de pacotes. Para compilar e testar nesta máquina, `node_modules` contém junções locais para pacotes já instalados em `C:\Users\lucas\vivamais\node_modules\.pnpm`, usados somente para leitura. Essas junções são ignoradas pelo Git e não fazem parte do código do portfólio. Com acesso ao registro, execute `pnpm.cmd install` para criar uma instalação independente neste projeto.

Para revisar a preferência de movimento em um navegador com ferramentas de desenvolvimento, emule `prefers-reduced-motion: reduce` na ferramenta de renderização e recarregue: as animações e a rolagem suave devem ficar praticamente instantâneas, inclusive ao abrir um case. As regras estão em `app/globals.css` e a condição da transição dos cases em `components/Home.tsx`.
