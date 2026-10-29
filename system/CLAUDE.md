@AGENTS.md

# Idioma

Responda sempre em português (pt-BR) neste projeto. Comentários e nomes de código seguem o padrão do repositório (inglês). Textos da interface em pt-BR.

# O que é este projeto

Portal do Investidor Acquafy ("Água como Serviço"): o investidor acompanha purificadores Neo UP, repasses mensais em dólar, extrato, calendário, documentos, contrato, suporte e perfil. Baseado na stack do projeto Interfy.ai (`D:\Trabalhos\INTERFY\SITES\SITE INTERFY\CLAUDE - Interfy.ai`), mas é um repositório independente, separado do Site Acquafy (Tailwind 3 + Snipcart).

Referências visuais ficam na raiz desta pasta (`DASHBOARD.jpeg`, `EXTRATO FINANCEIRO.jpeg`, `CALENDÁRIO DE REPASSES.jpeg`, `MEUS PURIFICADORES*.jpeg`, e os `* - MOBILE.jpeg`). Telas sem referência desktop seguem o padrão de mercado de portais de investidor/fintech, usando a identidade visual das telas existentes (azul royal → violeta, cards brancos arredondados, fundo azul-claro).

# Arquitetura (espelha o projeto Interfy.ai)

```
app/(auth)/login/page.tsx          páginas finas: só compõem sections
app/(portal)/<rota>/page.tsx       (layout com sidebar + header global + providers)
components/layout/                 shell: Sidebar, PortalHeader, menus do header
components/sections/<Pagina><Bloco>.tsx   ORGANISMOS: um bloco de tela, prefixado pela página
                                          (DashboardHero, StatementPayments, SupportTickets…)
components/ui/                     ÁTOMOS/MOLÉCULAS reutilizáveis, sem conhecer páginas
components/providers/              contextos (moeda, perfil, toast)
config/<pagina>-page.ts            dados estáticos/mocks e textos de cada página
lib/                               regras de negócio, formatação, hooks
```

Regras:
- Página = composição de sections. Nada de marcação longa em `page.tsx`.
- Section que precisa de estado/evento é `'use client'`; as demais são Server Components.
- Átomo novo que dois ou mais blocos usam vai para `components/ui/` (nome genérico). Nunca importe uma section dentro de `ui/`.
- Dados mockados e textos vivem em `config/<pagina>-page.ts`, tipados. Regras derivadas em `lib/portal/`.

# Kit de UI disponível (`components/ui/`)

`Button`/`ButtonLink` (variants primary|outline|soft|ghost|danger, size sm|md|lg, `loading`), `IconButton` (label obrigatório), `Menu` (menu "…" de ações) e `MenuItems`, `Popover`, `Modal` (dialog nativo; `printable`), `Tabs`+`TabPanel` (pill|segment|stack), `TextField`/`TextArea`/`Select`/`SearchInput`/`Checkbox`/`Switch` (Field.tsx; label sempre obrigatório), `Card` (`container` vira @container), `KpiCard`+`IconTile`, `Badge`+`StatusBadge`, `DefinitionList`, `BarChart`, `ProgressBar`, `Pagination`, `EmptyState`, `Avatar`, `Accordion`, `Money`.
Providers/hooks: `useToast()` (aviso após cada ação), `useCurrency()`/`<Money value={usd} />` (todo valor monetário vem em USD e é exibido na moeda escolhida), `useProfile()` (perfil editável e persistido), `usePersistentState(key, initial)` (estado em localStorage para mocks: tickets, uploads, solicitações…).

# Regras de interface

- **Todo botão faz algo**: navega, abre menu/modal, altera estado ou baixa arquivo, e confirma com `toast` quando muda dados. Nunca deixe botão decorativo.
- **Layout responde à largura da coluna de conteúdo**, não da janela: `<main>` é `@container`. Use os tamanhos nomeados `@2xl:`, `@4xl:`, `@5xl:`, `@6xl:` (não `xl:`) para grids de página. Não misture tamanho nomeado e arbitrário (`@[1100px]`) na mesma propriedade: a ordem das regras gerada quebra o override. Cards filhos de `main` não encolhem (`shrink-0`).
- **Sem overflow**: nada de scroll horizontal em ≥ 1280px; valores com `whitespace-nowrap`/`<Money>`; tabelas escondem colunas secundárias por container (`hidden @xl:table-cell`) em vez de rolar; textos longos quebram dentro do card.
- Imagens: `next/image` com `width/height` reais e `sizes`; miniaturas usam `public/brand/neo-up-thumb.webp`.
- Dinheiro sempre em USD no dado; mostrar com `<Money>`/`useCurrency().money()`. Datas ISO `YYYY-MM-DD` (`lib/format.ts`), nunca `Date` entre servidor e cliente.
- Acessibilidade: semântica, `aria-label` em ícones, foco visível, tabelas com `caption` + `scope`, formulários com `label`/erro associado.
- Dados mockados: `PORTAL_MOCK_TODAY=YYYY-MM-DD` muda a "data de hoje" do portal (padrão `2026-10-28`).
- Sessão mockada por cookie (`acq-session`, `lib/auth.ts`); `proxy.ts` leva anônimos para `/login`. Para testar no navegador sem logar: `document.cookie = "acq-session=1; path=/"`.
- Sem bibliotecas de gráfico/mapa/calendário/formulário: componentes próprios.
- O desktop não tem layout mobile (a sidebar some abaixo de `lg`): o app mobile é um conjunto de telas à parte em `/m/<plataforma>/…` (seção abaixo).

# Mobile (`/m/ios/*`, `/m/android/*`)

Um conjunto de telas por plataforma; **organismos e primitivos são compartilhados**, só o "chrome" (shell, barra de abas, barra de navegação, sheets) muda. O `proxy.ts` já cuida do acesso: `bem-vindo` e `login` são públicos; o resto exige sessão e anônimos vão para `/m/<plataforma>/bem-vindo`.

```
lib/mobile/platform.ts              Platform ("ios"|"android"), mobilePath(), mobileHref() (href desktop → mobile), MobileTarget
lib/mobile/{format,useHeld}.ts      datas curtas ("01 Dez 2026"); useHeld (mantém o registro durante a animação de fechar do sheet)
components/mobile/PlatformProvider  usePlatform(), useMobileHref(); põe `data-platform` num wrapper ACIMA dos providers
components/mobile/MobileRoot.tsx    (server) PlatformProvider + PortalProviders (moeda, perfil, toast); usado por app/m/<plat>/layout.tsx
components/mobile/DeviceFrame.tsx   ≥600px: moldura de aparelho (bisel, ilha/câmera, 9:41, indicador home); <600px: tela cheia com env(safe-area-*)
components/mobile/ui/               PRIMITIVOS (tokens, sem sombra, 12–14px): MobileButton/ButtonLink, MobileCard, MobileSectionHeader, MobileListGroup+MobileListRow,
                                    MobileSegmented, MobileChip(+Row), MobileStatTile, MobileSwitch, MobileSheet, MobileActionSheet, MobileConfirmSheet, MobileEmptyState,
                                    MobileFields (TextField/TextArea/Select/SearchField/Checkbox), MobileDisclosure, MobileQuantityStepper, MobileRadioGroup, MobileLogo, MobilePurifierShowcase
components/mobile/sections/         ORGANISMOS Mobile<Tela><Bloco>.tsx (client), compostos só por primitivos; recebem dados por props (a page chama getPortalSummary())
components/mobile/ui/ios/           primitivos iOS 26 (Liquid Glass): UMA implementação por plataforma com a MESMA API; `ui/Mobile*.tsx` é só o despachante (`byPlatform`). Helpers: IosTile (ícone sólido), useOverlay (sheet/alerta)
components/mobile/ios/              chrome iOS: IosShell, IosDevice (iPhone 17 Pro), IosTabBar(+IosTabsLayout), IosNavBar, IosScreen, IosHeaderActions, IosTransition
app/m/ios.css                       tokens e utilitários do vidro, escopados em [data-platform="ios"] (`--ios-*`, `--glass-*`, `.ios-glass`, `.ios-glass-thick`, `.ios-glass-prominent`, `.ios-lens`, `.ios-press`, `.ios-row`, `.ios-sq`, `.ios-edge-*`) + keyframes `ios-*`
components/mobile/ui/android/       primitivos Android (Material 3 Expressive): MESMA API do iOS, uma implementação por plataforma (o despachante `ui/Mobile*.tsx` escolhe)
components/mobile/android/          chrome Android: AndroidShell, AndroidDevice (Pixel), AndroidBottomNav(+AndroidTabsLayout), AndroidTopBar, AndroidScreen (mesmas props do IosScreen + `fab`), AndroidHeaderActions, AndroidFab, AndroidDialog,
                                    AndroidTransition; helpers: Ripple (state layer + onda), useModalLayer (foco/Esc/saída de sheet e dialog)
app/m/android.css                   tokens M3 escopados em [data-platform="android"] (`--md-*` Dia/Noite, formas, movimento) + tipografia (`.md-title-l`, `.md-body-m`, `-em` = enfatizada) + `.md-btn`, `.md-field`, `.md-switch`, `.md-ripple`, `.md-nav-indicator`, snackbar, keyframes `md-*`
config/mobile-*.ts                  textos/dados das telas; config/mobile-navigation.ts = as 5 abas, mapa tela→aba, telas empilhadas
app/m/layout.tsx                    viewport (viewport-fit=cover) + metadata
app/m/<plat>/layout.tsx             <MobileRoot platform="…"><XxxShell>
app/m/<plat>/(tabs)/…               telas com barra de abas (home, purificadores, financeiro, documentos, perfil, perfil/[secao], calendario, contrato, solicitar, suporte)
app/m/<plat>/(flow)/…               telas sem barra (bem-vindo, login); cada grupo tem `template.tsx` (transição)
```

Regras:
- **Páginas finas**: `<IosScreen title … back?>` + organismos. Telas empilhadas passam `back={{ href, label }}`; abas raiz mostram logo + sino/avatar (iOS: `IosHeaderActions`, uma cápsula de vidro). O Android cria `AndroidScreen` com as MESMAS props (sino com badge + avatar de 32px via `AndroidHeaderActions`) e reaproveita todos os organismos.
- **Variação por plataforma**: `usePlatform()` ou as variantes Tailwind `ios:` / `android:` (definidas em `app/globals.css`). Variáveis do frame: `--m-safe-top`, `--m-safe-bottom`, `--m-frame-w/h` (já valem na moldura e no celular real); o Android ajusta as dele em `[data-platform="android"]`.
- **Links**: primitivos aceitam `href={{ route: "finance", sub?: "…" }}` (resolvido pela plataforma) ou string literal (URL externa). Nunca escreva `/m/ios/...` em organismo; use `mobilePath(platform, route)` ou `useMobileHref()`.
- **Sheets** (`MobileSheet`) vão para `overlayRoot` do frame (não cobrem a página ao redor da moldura): `onClose` + `open`; use `useHeld(registro)` para não esvaziar o conteúdo na animação de saída. Toasts continuam `useToast()` (reposicionados sob a ilha por CSS).
- Barra de abas e nav bar são `sticky` dentro do container rolável do frame (não `fixed`). Alvos de toque ≥ 44px; fonte 16px em inputs; sem `box-shadow` em blocos (borda `border-line`).
- **iOS = HIG do iOS 26 (Liquid Glass)**: vidro é só a camada FUNCIONAL de controles/navegação que flutua sobre o conteúdo; cards e listas são opacos (`bg-card`, borda `border-line/70`, raio 24–26, `ios-sq` = cantos contínuos) sobre o fundo agrupado `--ios-bg`; nunca vidro sobre vidro. Barra de abas = cápsula de vidro flutuante com "lente" deslizante, que minimiza ao rolar para baixo e expande ao rolar para cima (o conteúdo ganha `--ios-tab-space` no fim); nav bar sem fundo/linha: Large Title 34pt que colapsa no título inline 17pt, com "scroll edge effect" (`.ios-edge-top`), voltar = botão de vidro circular só com chevron, ações da raiz agrupadas numa cápsula de vidro. Botão primário = vidro prominent (brand azul→violeta), secundário = fill cinza, soft = tinted, ghost = texto; toque = escala 0.96 com mola (`.ios-press`). Listas insetGrouped (tile sólido 29×29 raio 7, hairline depois do ícone), segmented com lente, switch 51×31 verde, sheet flutuante de vidro (`size="full"` = opaco, borda a borda), action sheet com "Cancelar" separado, alertas (`MobileConfirmSheet`) centralizados. Respeita `prefers-reduced-transparency`/`prefers-contrast`. Tokens de vidro: `--glass-*` (Dia e Noite) em `app/m/ios.css`; para vidro novo use as classes `.ios-glass*`, não reescreva fill/blur. Transição: push desliza da direita, voltar (botão do nav bar chama `markIosPop`) entra da esquerda, abas fazem fade; `perfil/template.tsx` anima o Perfil→seção (o template de `(tabs)` só remonta ao trocar de segmento de topo).
- **Android = Material Design 3 Expressive** (cada primitivo em `ui/android/` e o chrome em `components/mobile/android/`; nunca copie o layout do iOS): superfícies TONAIS em vez de sombra (tela `--md-surface` plano; cards, linhas e campos usam `--md-surface-container*`; "elevação" = trocar o papel de cor, borda só `outline-variant`). Os tokens legados dos organismos (`--color-card`, `--color-ink`, `--color-brand`…) são REMAPEADOS para os papéis M3 dentro do escopo Android em `android.css`, então um organismo escrito com `bg-card`/`text-ink` já sai Material; ao criar algo só para Android use `bg-(--md-…)`/`text-(--md-on-…)` e as classes `md-*` de tipografia (escala M3, Roboto Flex/Roboto). Top app bar: raiz de aba = "large flexible" (título Headline M + subtítulo que colapsa para a barra small de 64 com troca de logo→título e cor `surface-container` ao rolar), tela empilhada = barra small com voltar + título (subtítulo vira texto no topo do conteúdo). Navigation bar 80px (`surface-container`, indicador em pílula 64×32 `secondary-container` com mola). Botões em pílula (altura 40/48/56) que morfam o raio ao pressionar, variantes M3 (primary=filled, soft=tonal, secondary=outlined, ghost=text); chips de filtro 32px com check; segmented 48px; campos filled 56px com rótulo flutuante; listas = "segmented list" (linhas separadas por 2px, cantos 4 internos/20 externos); switch 52×32; sheet = modal bottom sheet (28px, handle, título à esquerda); `MobileConfirmSheet` = dialog centrado com botões de texto; `MobileActionSheet` = sheet com lista; toast = snackbar `inverse-surface`. Todo pressável leva `<Ripple />` como primeiro filho (host `relative`). Movimento: `--md-ease-emphasized`/`--md-spring`, shared axis X nas telas empilhadas, fade through nas abas. FAB: `fab={<AndroidFab icon={<Plus />} … />}` no `AndroidScreen` (ex.: Purificadores). Variantes de forma/tipografia que o organismo fixa com utilitários (`rounded-[14px]`, `font-extrabold`, `bg-brand-gradient`) são normalizadas por regras em `android.css`.
- Dados: reutilize `getPortalSummary()`, `<Money>`, `usePersistentState` (mesmas chaves do desktop), `lib/portal/*` (novos helpers compartilhados: `statement`, `documents`, `document-upload`, `purifier-filters`, `payout-bars`, `month-grid`, `text-search`, `useContractEvents`), `lib/useDocumentActions`, `lib/avatar`.
- Teste: `document.cookie = "acq-session=1; path=/"` e abra `/m/ios/home` (≥600px mostra a moldura; use 390×844 para o modo tela cheia).

# Base (`/base`)

Hub interno, aberto (sem login; liberado no `proxy.ts`), no estilo do `/video-blocks` do Interfy: `/base` (índice com links para todas as telas desktop/iOS/Android), `/base/telas` (produção: status por plataforma, referência de design, organismos de cada tela), `/base/componentes` (exemplos ao vivo de `components/ui` + inventário) e `/base/organismos` (desktop) + `/base/organismos-mobile` (app): organismos em páginas SEPARADAS por tipo, nunca desktop e mobile misturados.
- Catálogo das telas em `config/base-registry.ts` (`SCREENS`). **Tela nova = uma linha lá.** Status (pronta/pendente) e listas de arquivos vêm do sistema de arquivos (`lib/base/inventory.ts`, `lib/base/screens.ts`), então não precisam de manutenção.
- Componente novo em `components/ui` aparece no inventário sozinho; para ganhar exemplo ao vivo, adicione um `<Demo>` em `components/base/BaseComponentDemos.tsx`.
- Organismos do hub ficam em `components/base/`; o layout é `app/(base)/layout.tsx` (sem shell do portal).
- `/base/organismos` (desktop) e `/base/organismos-mobile` (app) são, cada uma, UMA página corrida (`BaseOrganismsView`), como a biblioteca de componentes do Interfy: índice lateral fixo com scrollspy (`BaseIndexNav`), uma seção por tela na ordem de produção (`BaseSection`, grupos de `lib/base/organism-groups.ts`) e cada organismo renderizado AO VIVO logo abaixo do anterior (web na largura da coluna, app num painel de 390px com `PlatformProvider` e o `FrameContext` para os sheets). Não criar páginas/cliques por tela: tudo na mesma página. Os previews ficam em `components/base/previews/`: **organismo novo = uma entrada no mapa da sua tela** (`<Tela>Previews.tsx`, chave = nome do arquivo; props vêm de `getPortalSummary()`/`config/*`; callbacks e estado vão num wrapper `"use client"` em `<Tela>Demos.tsx`, modais e sheets via `OpenDemo`; mapa geral em `previews/index.ts`).
- Se faltar a entrada, o bloco mostra "Sem pré-visualização" em destaque (nada fica oculto); organismos que não rodam isolados usam `{ opensFrom }` (aviso "Aparece ao abrir …"). Cada preview tem error boundary (`PreviewBoundary`), então um organismo com erro não derruba a galeria.
