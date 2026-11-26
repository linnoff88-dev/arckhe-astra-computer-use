// Trilha 1 — Fundamentos e contrato (emerald)
import { c, svg } from './lib.mjs';

const link = (href, txt) => `<a href="${href}" target="_blank" class="text-sky-400 hover:text-sky-300 underline decoration-dotted">${txt}</a>`;
const VIDEO = 'https://www.youtube.com/watch?v=tU-fO6cADvQ';
const ASTRA = 'https://openai.com/index/gpt-6-astra/';

export const T1 = {
  modules: [
    // ================= 1.1 =================
    {
      id: '1-1', emoji: '🖱️', title: 'O que é computer use e por que agora', punch: 'A IA no mouse, onde não há botão de integração', minutes: 40, level: 'Básico', kind: 'Fundamento',
      lead: 'Computer use existe há mais de um ano. O que mudou com o GPT-6 Astra é que ele ficou bom o bastante para virar rotina: testar apps, editar vídeo, mexer no celular pelo computador. Este módulo define os termos e explica onde essa capacidade entra.',
      topics: [
        {
          emoji: '🧠', title: 'O que é computer use, em termos exatos', sub: 'Um agente que vê a tela, move o mouse e digita',
          what: 'A capacidade de um modelo de IA operar um computador como uma pessoa: tirar uma imagem da tela, decidir onde clicar, clicar, digitar e repetir até terminar a tarefa.',
          why: 'Sem esse vocabulário, você confunde computer use com automação por script ou com integração por API, e escolhe a ferramenta errada.',
          keys: 'Agente, ferramenta, computer use, navegador interno, ciclo ver-decidir-agir.',
          body: (t) => [
            c.p('Quando você pede a um modelo de IA que "abra o Descript e suba este vídeo", ele não tem um botão mágico para isso. O que ele tem é um <strong class="text-emerald-400">ciclo</strong>: captura a tela, olha, decide a próxima ação (clicar em tal coordenada, digitar tal texto, rolar), executa, captura de novo. Esse ciclo repetido, com um objetivo declarado no início, é o que se chama de <strong class="text-emerald-400">computer use</strong>.'),
            c.glossary(t, [
              ['Modelo', 'A rede neural que raciocina e escreve. Sozinha, só produz texto. O GPT-6 Astra é um modelo.'],
              ['Agente', 'Um modelo rodando num ciclo com ferramentas: ele age, observa o resultado e decide o próximo passo, sem que você digite cada instrução.'],
              ['Ferramenta', 'Uma ação que o agente pode disparar: rodar um comando, ler um arquivo, buscar na web, ou, no caso deste curso, controlar mouse, teclado e tela.'],
              ['Computer use', 'O conjunto de ferramentas que dá ao agente olhos (captura de tela) e mãos (mouse e teclado) sobre um computador real ou virtual.'],
              ['Navegador interno', 'Um navegador que o próprio app do Codex abre e controla, separado do seu Chrome. É o alvo mais previsível para computer use.'],
            ]),
            c.figure(t, svg.flow(t, { label: 'O ciclo de computer use: capturar a tela, interpretar, decidir a ação, executar e capturar de novo até o objetivo ser atingido', steps: [
              { title: 'Capturar', sub: 'imagem da tela' }, { title: 'Interpretar', sub: 'onde estão os controles' }, { title: 'Decidir', sub: 'clicar, digitar, rolar' }, { title: 'Executar', sub: 'mouse e teclado' }, { title: 'Verificar', sub: 'a tela mudou como esperado?' },
            ] }), 'A última caixa volta para a primeira. Um agente bom em computer use gasta mais tempo verificando do que clicando. Um agente ruim clica rápido e erra a janela.'),
            c.concept(t, { title: 'O que computer use não é', emoji: '🚫', bullets: [
              'Não é um <strong>script</strong> gravado: um script repete coordenadas fixas e quebra quando a tela muda; o agente lê a tela a cada passo.',
              'Não é uma <strong>API</strong>: a API conversa com o sistema por trás da tela; computer use conversa com a tela em si.',
              'Não é um <strong>MCP</strong>: um servidor MCP expõe funções nomeadas para o modelo chamar; computer use é o que você usa quando ninguém escreveu esse servidor.',
            ] }),
          ],
        },
        {
          emoji: '🚀', title: 'Por que o Astra mudou a conversa', sub: 'De demonstração frágil a rotina de trabalho',
          what: 'O GPT-6 Astra, lançado pela OpenAI em setembro de 2026, elevou a precisão de encontrar controles na tela e de completar tarefas longas num computador.',
          why: 'A diferença entre "funciona na demo" e "confio para rodar de madrugada" é exatamente o salto que os números abaixo descrevem.',
          keys: 'ScreenSpot Pro, OSWorld 2.0, modo high, modo fast, tarefas longas.',
          body: (t) => [
            c.p(`Computer use não é novidade. O que mudou é o modelo por trás. A ${link(ASTRA, 'página de lançamento do GPT-6 Astra')} publica dois testes que importam diretamente para este curso: um mede se o modelo <strong class="text-emerald-400">acha o controle certo na tela</strong> (ScreenSpot Pro) e outro mede se ele <strong class="text-emerald-400">termina tarefas reais num computador</strong> (OSWorld 2.0). Nos dois, a comparação é com o modelo anterior, o GPT-5.6, chamado de Sol.`),
            c.figure(t, svg.bars(t, { label: 'Dois testes de computer use, modelo anterior (Sol) contra Astra: achar o controle na tela e concluir tarefas no computador', aLabel: 'Sol (GPT-5.6)', bLabel: 'Astra (GPT-6)', items: [
              { label: 'ScreenSpot Pro (achar na tela)', a: 76.9, b: 92.7, aText: '76,9%', bText: '92,7%' },
              { label: 'OSWorld 2.0 (tarefas no computador)', a: 65.7, b: 72.6, aText: '65,7%', bText: '72,6%' },
            ], max: 100 }), 'O salto maior é em achar o controle certo: de 3 erros em 13 para menos de 1 em 13. É o que faz o agente parar de clicar no botão errado.'),
            c.data({ title: 'O que esses números não dizem', items: [
              'Não medem o <strong>seu</strong> app nem o <strong>seu</strong> fluxo. São tarefas de benchmark, não o Descript nem o espelhamento do iPhone.',
              'Não garantem que o navegador ou o controle de tela esteja <strong>habilitado na sua conta</strong>. O nome do modelo não liga a ferramenta.',
              'Não substituem a prova de conclusão. Um agente com 92% de acerto ainda erra 1 em 13 cliques; o fluxo precisa verificar.',
            ] }),
            c.cards(t, [
              { emoji: '🎚️', h: 'Modo high', text: 'Mais raciocínio por passo. No vídeo-fonte, é o modo recomendado para computer use: menos cliques errados, mais verificação.' },
              { emoji: '⚡', h: 'Modo fast', text: 'Menos latência por ação. Útil quando a tarefa é repetitiva e a interface é estável, como uma busca já mapeada.' },
              { emoji: '⏳', h: 'Tarefas longas', text: 'O Astra aguenta horas numa tarefa com muitos passos. É o que permite "manda e volta depois", como o polling de render a cada 30 minutos.' },
            ]),
          ],
        },
        {
          emoji: '🔌', title: 'A tese: onde não existe API, conector nem MCP', sub: 'O caminho de menor resistência para software fechado',
          what: 'Computer use é a ponte para todo software que não oferece um jeito programático de ser usado: apps de desktop, apps de celular, sites sem API.',
          why: 'Se você tenta usar computer use onde já existe uma API, paga caro por nada. Se tenta usar API onde não existe, trava. Saber a fronteira é a decisão central.',
          keys: 'API, conector, MCP, software fechado, custo por passo.',
          body: (t) => [
            c.p('A frase que resume o vídeo-fonte é simples: dominar computer use "permite destravar fluxos que não têm coisas como conectores ou APIs". Toda decisão deste curso parte daí. Antes de mandar um agente clicar, pergunte: <strong class="text-emerald-400">existe um caminho por trás da tela?</strong> Se existe, use-o. Se não existe, computer use é o caminho.'),
            c.figure(t, svg.split(t, { label: 'Dois caminhos até o mesmo software: por trás da tela (API, conector, MCP) ou pela frente da tela (computer use)', bridge: 'mesmo resultado', left: { title: 'POR TRÁS DA TELA', items: ['API pública', 'Conector do produto', 'Servidor MCP', 'Rápido, barato, estável'] }, right: { title: 'PELA FRENTE DA TELA', items: ['App de desktop sem API', 'App de celular', 'Site que só existe na interface', 'Lento, frágil, universal'] } }), 'A coluna da direita cobre tudo. A da esquerda é melhor quando existe. O erro comum é escolher a direita por preguiça de procurar a esquerda.'),
            c.grid2(t, { okTitle: 'Computer use é a escolha certa quando', ok: ['O app é de desktop ou celular e não expõe nada programático (Descript na parte da interface, Instagram nas configurações).', 'O site tem interface mas não tem API, e você precisa dele repetidamente (Google Flights).', 'Você quer testar a <strong>experiência real do usuário</strong>, não a função por trás (instalar um MCP e usá-lo como cliente novo).', 'A tarefa é fazer o primeiro mapeamento de uma interface para depois transformá-la em ferramenta.'], badTitle: 'Computer use é a escolha errada quando', bad: ['Existe API documentada: cada clique custa segundos e uma chamada custa milissegundos.', 'Existe um MCP ou conector pronto para o mesmo serviço.', 'A tarefa envolve pagamento, envio de mensagem ou alteração irreversível sem revisão humana.', 'Você não consegue definir como vai verificar o resultado (sem prova, não há fluxo).'] }),
            c.alert({ title: 'O custo escondido', text: 'Cada passo de computer use é uma captura de tela, uma rodada de raciocínio e uma ação. Uma busca de voo pode levar 50 a 80 segundos por esse caminho. É por isso que o primeiro fluxo da Trilha 2 ensina a usar computer use uma vez para mapear a interface e depois gerar uma ferramenta de linha de comando que roda com modelo mais barato.' }),
          ],
        },
        {
          emoji: '🖥️', title: 'Três superfícies: navegador, desktop e celular espelhado', sub: 'Onde o agente pode colocar as mãos',
          what: 'O agente pode operar um navegador interno, os apps do seu computador e, por espelhamento, o seu celular. Cada superfície tem pré-requisitos e riscos diferentes.',
          why: 'Os cinco fluxos do curso se distribuem nessas três superfícies. Saber qual é qual evita pedir ao agente algo que a sessão não consegue alcançar.',
          keys: 'Navegador interno do Codex, apps de desktop, iPhone Mirroring, janela alvo, permissões.',
          body: (t) => [
            c.figure(t, svg.fanout(t, { label: 'Um agente, três superfícies (navegador interno, apps do computador, celular espelhado) e um resultado verificável', center: 'Agente|GPT-6 Astra|no Codex', groups: [
              { n: 1, title: 'Navegador interno', sub: 'Google Flights, sites sem API' },
              { n: 1, title: 'Apps do computador', sub: 'Descript, Claude Desktop, seu app' },
              { n: 1, title: 'Celular espelhado', sub: 'Instagram via iPhone Mirroring' },
            ] }), 'As três setas saem do mesmo agente. O que muda é o que você precisa abrir e autenticar antes: o navegador interno vem pronto; o app de desktop e o celular você prepara.'),
            c.table(t, { headers: ['Superfície', 'Exemplo no vídeo-fonte', 'O que você prepara antes', 'Risco típico'], rows: [
              ['Navegador interno', 'Busca de voo Montreal → Sydney', 'Nada além de dizer "use o navegador interno"', 'O agente escolher seu Chrome em vez do interno e mexer nas suas sessões'],
              ['App de desktop', 'Abrir o Claude Desktop e testar um MCP; abrir o Descript e subir um vídeo', 'App instalado, conta logada, janela visível', 'Login ou segredo no meio do caminho; janela errada'],
              ['Celular espelhado', 'Configurar o Instagram novo pelo iPhone Mirroring no Mac', 'Espelhamento aberto e autenticado por você', 'Mexer na conta errada; tocar em configuração de privacidade ou pagamento'],
            ], caption: 'O vídeo explicita: "para garantir que ele use o navegador interno, eu chamo isso explicitamente, senão de vez em quando ele usa o Chrome".' }),
            c.cards(t, [
              { emoji: '🌐', h: 'Navegador interno', text: 'Previsível e isolado. Comece por aqui. É onde o fluxo 01 (busca vira ferramenta) roda inteiro.' },
              { emoji: '💻', h: 'Desktop', text: 'Alcança tudo que está instalado. Fluxos 02, 03 e 04. Exige que você deixe o app aberto e logado.' },
              { emoji: '📱', h: 'Celular espelhado', text: 'O mais surpreendente do vídeo: o agente "assume o telefone" pela janela de espelhamento. Fluxo 05.' },
            ]),
          ],
        },
        {
          emoji: '🛡️', title: 'Limites e segurança antes da primeira execução', sub: 'O que você faz e o que o agente nunca faz',
          what: 'Um conjunto curto de regras operacionais: você faz login, você fornece segredos, o agente trabalha em cópia de teste e para diante de qualquer ação irreversível.',
          why: 'Computer use tem acesso ao que a tela mostra. Sem esses limites, um erro de janela vira um e-mail enviado ou uma compra feita.',
          keys: 'Login manual, cópia de teste, parar em segredos, não comprar, não enviar mensagem, blocker exato.',
          body: (t) => [
            c.p('O guia de campo que acompanha o kit de prompts tem uma seção chamada "antes da primeira execução". Ela cabe em cinco regras, e todas aparecem, com variações, nos cinco prompts da Trilha 2.'),
            c.steps(t, { title: 'As cinco regras antes de rodar', items: [
              { h: 'Use uma sessão que realmente exponha as ferramentas', text: 'O nome do modelo não garante navegador, controle de desktop ou de celular. Confirme que a tarefa do Codex tem a ferramenta habilitada antes de escrever o prompt.' },
              { h: 'Faça login você mesmo', text: 'Entre nos apps-alvo com a sua conta antes de começar. O agente não deve digitar senha nem passar por desafio de autenticação.' },
              { h: 'Troque todos os marcadores', text: 'Cada <code>&lt;PLACEHOLDER&gt;</code> vira o seu app, arquivo, rota ou conta. Um marcador esquecido é um agente adivinhando.' },
              { h: 'Trabalhe em cópia de teste', text: 'Para qualquer mudança (configuração, edição de vídeo, código), use uma cópia. O original permanece intocado até você comparar.' },
              { h: 'Segredos e desafios são seus', text: 'Quando aparecer um campo de senha, um código de dois fatores ou um captcha, o agente para, você resolve, a tarefa continua.' },
            ] }),
            c.grid2(t, { okTitle: 'O agente pode', ok: ['Navegar, ler, comparar, exportar dados para arquivo.', 'Preencher formulários com dados de teste claramente marcados.', 'Alterar configurações que você listou explicitamente, e reportar antes/depois.', 'Parar e descrever o bloqueio exato quando algo faltar.'], badTitle: 'O agente nunca faz sozinho', bad: ['Comprar, reservar ou digitar dados de pagamento ("search only; do not book").', 'Enviar mensagem, e-mail ou DM para outra pessoa.', 'Alterar privacidade, segurança, recuperação de conta ou recursos pagos.', 'Publicar, fazer deploy ou apagar trabalho não relacionado.'] }),
            c.alert({ title: 'A resposta útil quando algo dá errado', text: 'O guia é direto: "estes são modelos práticos, não resultados garantidos. Mudança de interface, acesso à conta e ferramenta ausente podem bloquear uma execução. A resposta útil é um bloqueio exato com evidência." Um agente que inventa que terminou é pior do que um que para na tela certa e diz o que falta.' }),
          ],
        },
        {
          emoji: '🗺️', title: 'Os cinco fluxos num mapa', sub: 'Escolha um trabalho real e delimitado',
          what: 'Os cinco fluxos do curso, com o app de cada um, o resultado esperado e a prova de conclusão, lado a lado.',
          why: 'O guia recomenda começar por uma tarefa delimitada e só expandir depois de conseguir verificar o resultado. Este mapa ajuda a escolher a primeira.',
          keys: 'Fluxo delimitado, app explícito, resultado, prova, expandir depois.',
          body: (t) => [
            c.p('Cada fluxo da Trilha 2 é um módulo. Todos seguem a mesma anatomia: um app nomeado, entradas explícitas, um resultado observável e uma prova de que terminou. Escolha pelo que dói no seu trabalho hoje, não pelo que parece mais impressionante.'),
            c.table(t, { headers: ['#', 'Fluxo', 'Superfície', 'Resultado', 'Prova de conclusão'], rows: [
              ['01', 'Busca vira ferramenta', 'Navegador interno', 'Uma ferramenta de linha de comando reutilizável para buscar voos', 'Dois pares de datas produzem execuções separadas; ao menos uma tarifa exportada bate com a tela'],
              ['02', 'Testar ferramentas dentro do app', 'Desktop (Claude Desktop, Codex)', 'Relatório da jornada de um usuário novo com seu MCP ou skill', 'O app invoca a ferramenta certa; follow-ups mantêm contexto; uma afirmação confere com a fonte'],
              ['03', 'Um agente testa outro', 'Desktop (seu app)', 'Falha reproduzida, ligada ao código e retestada', 'O app testado executa as próprias ações; a falha fica registrada; o reparo passa no mesmo teste'],
              ['04', 'Entrega da edição', 'Desktop (Descript) + Drive', 'Vídeo limpo de forma conservadora, exportado e conferido', 'Original intacto; conteúdo único sobrevive; o arquivo exportado decodifica e tem imagem e som'],
              ['05', 'Celular pelo computador', 'iPhone Mirroring', 'Configuração específica aplicada no app do celular', 'Conta certa visível; valor alvo atingido; persiste ao reabrir a tela'],
            ] }),
            c.figure(t, svg.flow(t, { label: 'A anatomia comum aos cinco fluxos: app nomeado, entradas explícitas, escopo do que pode mudar, execução e prova de conclusão', steps: [
              { title: 'App', sub: 'nomeado, aberto, logado' }, { title: 'Entradas', sub: 'arquivos, rota, conta' }, { title: 'Escopo', sub: 'o que pode mudar' }, { title: 'Executar', sub: 'com verificação a cada passo' }, { title: 'Prova', sub: 'evidência que você abre' },
            ] }), 'Os cinco módulos da Trilha 2 preenchem essas cinco caixas com conteúdo diferente. A forma não muda. É isso que o módulo 1.2 chama de contrato.'),
            c.tip({ title: 'Por onde começar', text: 'Se você nunca rodou computer use, comece pelo fluxo 01 no navegador interno: é isolado, não toca em conta sua e produz um arquivo que você abre. Se você publica MCPs ou skills, o fluxo 02 paga o curso sozinho. Os fluxos 04 e 05 dependem de apps específicos (Descript, iPhone) e ficam para quando os dois primeiros estiverem confortáveis.' }),
          ],
        },
      ],
      quiz: [
        { q: 'Qual frase descreve computer use com precisão?', options: ['Um script que repete coordenadas gravadas de mouse.', 'Um ciclo em que o agente captura a tela, decide a ação, executa e verifica, até atingir o objetivo.', 'Uma API que expõe as funções internas do app para o modelo chamar.'], answer: 1, why: 'Script repete coordenadas fixas e quebra quando a tela muda; API conversa por trás da tela. Computer use é o ciclo ver-decidir-agir-verificar sobre a tela real.' },
        { q: 'Existe uma API documentada para o serviço que você quer automatizar. O que fazer?', options: ['Usar computer use mesmo assim, porque é mais universal.', 'Usar a API: cada passo de computer use custa segundos e a chamada custa milissegundos.', 'Usar os dois ao mesmo tempo para garantir.'], answer: 1, why: 'Computer use é o caminho para software fechado. Onde existe API, conector ou MCP, o caminho por trás da tela é mais rápido, mais barato e mais estável.' },
        { q: 'O agente chegou a um campo de senha no meio de um fluxo. Qual é o comportamento correto?', options: ['Digitar a senha que você deixou num arquivo de texto.', 'Parar naquela tela, descrever a ação necessária e esperar você resolver.', 'Tentar recuperar a senha pelo "esqueci minha senha".'], answer: 1, why: 'Login, segredos e desafios de autenticação são sempre seus. O agente para com o bloqueio exato e a tarefa continua depois que você agir.' },
      ],
      summary: [
        ['Computer use é um ciclo', 'capturar a tela, interpretar, decidir, executar, verificar. Não é script nem API.'],
        ['O Astra mudou a precisão', 'ScreenSpot Pro de 76,9% para 92,7%; OSWorld 2.0 de 65,7% para 72,6%. Benchmarks, não o seu app.'],
        ['A tese', 'computer use é para onde não existe API, conector nem MCP. Onde existe, use o caminho por trás da tela.'],
        ['Três superfícies', 'navegador interno (previsível), apps de desktop (você prepara) e celular espelhado (você autentica).'],
        ['Cinco regras antes de rodar', 'sessão com ferramenta habilitada, login seu, marcadores trocados, cópia de teste, segredos seus. Sem comprar, sem enviar mensagem.'],
      ],
    },

    // ================= 1.2 =================
    {
      id: '1-2', emoji: '📐', title: 'O contrato de prompt em quatro partes', punch: 'App, resultado, escopo, prova', minutes: 45, level: 'Básico', kind: 'Prática',
      lead: 'Os cinco prompts do kit parecem longos, mas têm a mesma espinha: nomear o app, descrever o resultado, delimitar o que pode mudar e dizer como provar que terminou. Este módulo ensina a espinha e entrega o modelo reutilizável para qualquer trabalho seu.',
      topics: [
        {
          emoji: '🧱', title: 'APP · RESULTADO · ESCOPO · PROVA', sub: 'As quatro partes que todo prompt de computer use carrega',
          what: 'O contrato de quatro partes do guia de campo: nomear o app exato, descrever o resultado útil, declarar o que pode mudar e dizer como o agente deve verificar a conclusão.',
          why: 'Prompts de computer use falham quase sempre por uma parte ausente: app vago, resultado implícito, escopo aberto ou prova esquecida.',
          keys: 'App exato, resultado observável, escopo de mudança, prova de conclusão.',
          body: (t) => [
            c.p('O guia de campo resume o que faz um prompt de computer use funcionar em quatro linhas. <strong class="text-emerald-400">APP</strong>: nomeie o app, workspace ou navegador exato. <strong class="text-emerald-400">RESULTADO</strong>: descreva a coisa útil que você quer no fim. <strong class="text-emerald-400">ESCOPO</strong>: diga quais arquivos ou configurações podem mudar. <strong class="text-emerald-400">PROVA</strong>: diga como o agente deve verificar que terminou.'),
            c.glossary(t, [
              ['Marcador (placeholder)', 'Um trecho entre sinais de menor e maior, como <code>&lt;SOURCE_VIDEO_PATH&gt;</code>, que você substitui pelo seu valor antes de rodar. Nunca fica no prompt final.'],
              ['Escopo', 'A lista do que o agente tem permissão de alterar. Tudo fora dela é intocável, mesmo que pareça útil.'],
              ['Prova de conclusão', 'A evidência concreta de que a tarefa terminou: um arquivo que abre, um valor que persiste, uma comparação com a fonte. Não é a frase "concluído".'],
              ['Bloqueio (blocker)', 'A resposta correta quando algo impede a tarefa: a tela exata onde parou, o que falta e a ação necessária de quem opera.'],
            ]),
            c.figure(t, svg.stack(t, { label: 'As quatro camadas do contrato, de cima para baixo: app, resultado, escopo e prova. A prova é a base que sustenta as outras', layers: [
              { title: 'APP', sub: 'nome exato do app, workspace ou navegador' },
              { title: 'RESULTADO', sub: 'a coisa útil que existe no fim' },
              { title: 'ESCOPO', sub: 'o que pode mudar; o resto é intocável' },
              { title: 'PROVA', sub: 'como verificar que terminou' },
            ] }), 'Leia de baixo para cima quando revisar um prompt seu: se a prova não existe, o resultado é uma promessa; se o escopo não existe, o app inteiro está em risco.'),
            c.table(t, { headers: ['Parte', 'Como aparece no prompt 04 (edição de vídeo)', 'O que acontece se faltar'], rows: [
              ['APP', 'Descript, instalado e autenticado; Drive opcional', 'O agente escolhe outro editor ou abre o navegador'],
              ['RESULTADO', 'Arquivo exportado no novo nome, na resolução da fonte', 'Ele "limpa" e não exporta, ou exporta em 720p'],
              ['ESCOPO', 'Preservar o original; criar projeto novo; não enviar a ninguém', 'O original é sobrescrito'],
              ['PROVA', 'O exportado decodifica, tem imagem e som, duração comparada sem tratar "mais curto" como "melhor"', 'Você recebe "pronto" e descobre o problema ao abrir o arquivo'],
            ] }),
          ],
        },
        {
          emoji: '🔤', title: 'Marcadores: o que você troca e o que preserva', sub: 'Substituir tudo entre &lt; &gt;, e nada além disso',
          what: 'Os marcadores dos cinco prompts, agrupados por tipo: entradas, destinos, contas, critérios e orçamentos.',
          why: 'Um marcador esquecido faz o agente adivinhar. Um trecho fixo alterado por engano remove uma proteção que estava lá por motivo.',
          keys: 'Entradas, destino, conta, critério de sucesso, orçamento de tentativas.',
          body: (t) => [
            c.p('Os prompts do kit vêm em arquivos de texto separados justamente para copiar sem perder nada. A regra é mecânica: tudo que está entre <code>&lt;</code> e <code>&gt;</code> é seu para preencher; o resto é o contrato e fica como está até você entender por que cada frase existe.'),
            c.table(t, { headers: ['Tipo de marcador', 'Exemplos nos prompts', 'Como preencher'], rows: [
              ['Entrada', '<code>&lt;ORIGIN_AIRPORT&gt;</code>, <code>&lt;SOURCE_VIDEO_PATH&gt;</code>, <code>&lt;REPO_PATH&gt;</code>', 'Caminho ou valor exato. Datas com ano completo. Nada relativo como "amanhã".'],
              ['Destino', '<code>&lt;OUTPUT_FOLDER&gt;</code>, <code>&lt;FOLDER_URL_OR_NONE&gt;</code>', 'Pasta nova e vazia por execução. "NONE" é resposta válida e evita upload indesejado.'],
              ['Conta e app', '<code>&lt;APP_AND_WORKSPACE&gt;</code>, <code>&lt;ACCOUNT_HANDLE&gt;</code>', 'Nome exato do app e o identificador visível da conta. O agente confirma na tela antes de agir.'],
              ['Critério', '<code>&lt;EXPECTED_RESULT&gt;</code>, <code>&lt;OBSERVABLE_PASS_CONDITIONS&gt;</code>', 'Condição que dá para ver: "a resposta cita o título e o link da aula", não "funciona bem".'],
              ['Orçamento', '<code>&lt;SEARCH_BUDGET&gt;</code>, <code>&lt;TIME_OR_ATTEMPT_LIMIT&gt;</code>, "três tentativas de reparo"', 'Número. É o freio do agente autônomo: sem ele, uma falha vira uma noite de tentativas.'],
            ] }),
            c.grid2(t, { okTitle: 'Preserve sem mexer', ok: ['"Search only; do not book" e equivalentes: são os limites de dano.', '"Stop at any login or secret entry that needs me."', '"Do not invent timing breakdowns" e "missing data must not become zero".', 'As instruções de comparar com a tela ou com a fonte antes de reportar.'], badTitle: 'Erros de preenchimento comuns', bad: ['Deixar <code>&lt;YYYY-MM-DD&gt;</code> no prompt: o agente escolhe uma data.', 'Usar uma pasta de saída já cheia: capturas antigas se misturam às novas.', 'Escrever o critério como adjetivo ("rápido", "bom").', 'Apagar a linha de orçamento porque "quero que ele termine".'] }),
            c.tip({ title: 'Regra prática', text: 'Antes de colar, procure o sinal de menor no seu prompt final. Se ainda houver algum, você não terminou de preencher. Depois, leia as frases que começam com "Do not" e confirme que todas continuam lá.' }),
          ],
        },
        {
          emoji: '✅', title: 'Prova de conclusão não é screenshot', sub: 'O que conta como evidência e o que só parece',
          what: 'A distinção entre evidência que prova (arquivo que decodifica, valor que persiste, comparação com a fonte) e sinais que apenas sugerem (uma captura de tela, um nome de arquivo, a frase "concluído").',
          why: 'Todo prompt do kit termina com uma linha de prova. Sem entender o que ela exige, você aceita uma tarefa como pronta quando ela não está.',
          keys: 'Evidência verificável, persistência, comparação com a fonte, sinal fraco.',
          body: (t) => [
            c.p('O guia é explícito num ponto que a maioria dos tutoriais ignora: "uma captura de tela ou um nome de arquivo sozinho não prova conclusão". Cada fluxo define a própria prova, mas todas cabem em três famílias: <strong class="text-emerald-400">o artefato funciona</strong>, <strong class="text-emerald-400">o estado persiste</strong> e <strong class="text-emerald-400">a afirmação bate com a fonte</strong>.'),
            c.figure(t, svg.split(t, { label: 'Sinais fracos contra provas fortes: à esquerda o que só parece conclusão, à direita o que de fato prova', bridge: 'exija a direita', left: { title: 'SINAL FRACO', items: ['Captura de tela do "sucesso"', 'Nome do arquivo na pasta', 'A frase "concluído"', 'Duração menor que a original'] }, right: { title: 'PROVA', items: ['Arquivo decodifica, tem imagem e som', 'Valor persiste ao reabrir a tela', 'Um dado exportado bate com a página', 'Afirmação conferida na fonte pública'] } }), 'Cada item da esquerda tem um par na direita. Quando o agente entrega o da esquerda, peça o da direita antes de aceitar.'),
            c.cards(t, [
              { emoji: '📦', h: 'O artefato funciona', text: 'Fluxo 04: o vídeo exportado precisa decodificar, conter imagem e som e estar na resolução da fonte. Fluxo 01: o JSON exportado tem os campos preenchidos, e o que falta está marcado "unknown", nunca zero.' },
              { emoji: '🔁', h: 'O estado persiste', text: 'Fluxo 05: sair da tela de configurações, reabrir e ver o mesmo valor. Fluxo 03: fechar e reabrir a conversa do app e confirmar que o contexto sobreviveu.' },
              { emoji: '🔎', h: 'Bate com a fonte', text: 'Fluxo 02: uma resposta material do MCP conferida contra a fonte de onde veio. Fluxo 01: ao menos uma tarifa exportada comparada com o que está visível na página.' },
            ]),
            c.alert({ title: 'A frase que parece prova e não é', text: '"Comparei a duração: a edição ficou 3 minutos mais curta." O prompt 04 manda reportar a duração antes e depois "sem tratar uma edição mais curta como prova de qualidade". Cortar demais também encurta. A prova é ouvir os cortes e confirmar que o conteúdo único sobreviveu.' }),
          ],
        },
        {
          emoji: '🧱', title: 'O bloqueio exato com evidência', sub: 'Quando parar é o resultado certo',
          what: 'O comportamento esperado quando a tarefa não pode continuar: parar na tela exata, descrever o que falta e a ação necessária, sem inventar progresso.',
          why: 'Um agente que para bem economiza horas. Um agente que finge terminar custa a confiança no fluxo inteiro.',
          keys: 'Tela exata, o que falta, ação necessária, itens separados por status.',
          body: (t) => [
            c.p('Os cinco prompts repetem a mesma instrução com palavras diferentes: "stop with the exact blocker", "stop at that screen and tell me the exact action needed", "return the evidence and next diagnostic step". O bloqueio não é falha do fluxo. É uma das saídas previstas.'),
            c.steps(t, { title: 'Anatomia de um bloqueio bem reportado', items: [
              { h: 'Onde parou', text: 'A tela, janela ou etapa exata. "Na tela de login do Descript" e não "não consegui abrir".' },
              { h: 'O que falta', text: 'A condição ausente: credencial, controle que não existe nesta versão do app, ferramenta não habilitada na sessão, arquivo que não decodifica.' },
              { h: 'Evidência', text: 'A captura daquela tela ou a mensagem de erro literal. Aqui a captura serve: ela documenta o bloqueio, não prova conclusão.' },
              { h: 'A ação de quem opera', text: 'O que você precisa fazer para destravar: fazer login, abrir o espelhamento, habilitar a ferramenta, fornecer o caminho certo.' },
              { h: 'O que já está feito e o que não foi tocado', text: 'Separar concluído, já-correto e bloqueado, como o prompt 05 exige. Nada fica ambíguo.' },
            ] }),
            c.grid2(t, { okTitle: 'Bloqueio bem reportado', ok: ['"O controle Upload at highest quality não existe nesta versão do app. Captura anexa. Os outros dois ajustes foram aplicados e verificados."', '"O arquivo não decodifica (erro do ffprobe colado). Original preservado. Nada foi exportado."', '"A sessão não tem o navegador interno habilitado. Plano gerado, busca não executada."'], badTitle: 'Falso progresso', bad: ['"Não achei o controle, mas provavelmente já está ativado."', '"Exportei, deve estar na pasta."', '"Fiz a busca de memória: o voo mais barato costuma ser da Air Canada."'] }),
            c.tip({ title: 'Peça isso por escrito', text: 'Inclua no seu prompt a frase "se algo bloquear, pare naquela tela e me diga a ação exata necessária; separe concluído, já-correto e bloqueado". É a linha que transforma uma sessão perdida numa lista de pendências.' }),
          ],
        },
        {
          emoji: '🔁', title: 'O modelo reutilizável para qualquer trabalho', sub: 'O prompt 09 do kit, traduzido e pronto',
          what: 'O prompt genérico do kit ("adapte o padrão ao seu trabalho"): app, resultado, entradas, escopo, sucesso, entregáveis e orçamento, seguidos de inspecionar, agir, verificar e reportar.',
          why: 'É o que você usa quando o seu caso não é nenhum dos cinco. Cobre o contrato inteiro em doze linhas.',
          keys: 'Inspecionar antes de agir, escopo, verificação no artefato, relatório com o que ficou sem verificar.',
          body: (t) => [
            c.p('O kit fecha com um prompt curto para qualquer tarefa que não seja um dos cinco fluxos. Ele é o contrato de quatro partes em forma de formulário. Abaixo, traduzido e com os marcadores preservados.'),
            c.code(t, { objective: 'Rodar uma tarefa de computer use qualquer com app, escopo, sucesso e orçamento explícitos (Codex com a ferramenta de computer use habilitada)', lang: 'text', code: `Use <APP_OU_NAVEGADOR_EXATO> para concluir <RESULTADO_OBSERVAVEL>.

Entradas: <ARQUIVOS, ENDERECOS, CONTA_OU_WORKSPACE>
Escopo: <O_QUE_PODE_MUDAR>
Sucesso: <VERIFICACOES_VISIVEIS_DE_ACEITE>
Entregáveis: <ARQUIVOS_E_RELATORIO>
Orçamento: <LIMITE_DE_TEMPO_OU_TENTATIVAS>

Inspecione o estado atual e a documentação ativa da ferramenta antes de agir. Use as capacidades do próprio app quando for isso que estamos testando. Mantenha o material de origem e o trabalho não relacionado intactos. Tome decisões razoáveis dentro do escopo pedido; pergunte só o que faltar e mudar materialmente o resultado.

Depois do trabalho, verifique o resultado na interface ou no artefato exportado. Se falhar, reproduza o problema e devolva a evidência. Reporte o que foi concluído, o que ficou sem verificar e o próximo passo exato.`, verify: 'O relatório final tem três seções distintas (concluído, sem verificar, próximo passo). O artefato entregue abre e corresponde ao "Sucesso" que você escreveu. Nada fora do "Escopo" foi alterado.' }),
            c.figure(t, svg.flow(t, { label: 'O ciclo que o modelo reutilizável impõe: inspecionar, agir dentro do escopo, verificar no artefato, e reportar ou reproduzir a falha', steps: [
              { title: 'Inspecionar', sub: 'estado atual + docs da ferramenta' }, { title: 'Agir', sub: 'só dentro do escopo' }, { title: 'Verificar', sub: 'na interface ou no artefato' }, { title: 'Reproduzir', sub: 'se falhou, com evidência' }, { title: 'Reportar', sub: 'feito · sem verificar · próximo passo' },
            ] }), 'A caixa "inspecionar" vem antes de qualquer clique. É o que evita o agente agir com base num menu que lembrava de outra versão do app.'),
            c.tip({ title: 'Exemplo preenchido', text: 'App: o navegador interno do Codex. Resultado: a lista de todos os cursos publicados em ARCKHÉ AI com título e link, exportada em CSV. Entradas: a URL da home. Escopo: nada muda no site, só leitura. Sucesso: o CSV tem ao menos 200 linhas e 3 títulos escolhidos por mim aparecem nele. Entregáveis: o CSV e uma captura da última página visitada. Orçamento: 15 minutos.' }),
          ],
        },
        {
          emoji: '🔧', title: '"Make it yours": adaptar cada fluxo ao seu caso', sub: 'O que trocar e o que preservar em cada um dos cinco',
          what: 'As instruções de adaptação que o guia dá para cada fluxo, condensadas numa tabela: o que substituir, o que manter, e o exemplo de variação sugerido.',
          why: 'Os cinco fluxos são padrões, não receitas. Quem entende o que é estrutura e o que é exemplo consegue aplicá-los a qualquer app.',
          keys: 'Estrutura contra exemplo, verificação preservada, variação sugerida.',
          body: (t) => [
            c.p('Cada página do guia termina com um parágrafo "make it yours". Juntos, eles formam a regra de adaptação: <strong class="text-emerald-400">troque o app e a condição de sucesso, preserve as checagens de evidência</strong>.'),
            c.table(t, { headers: ['Fluxo', 'Troque', 'Preserve', 'Variação sugerida pelo guia'], rows: [
              ['01 Busca vira ferramenta', 'O site e as entradas da busca', 'Inspecionar a interface uma vez, salvar uma rota suportada, verificar cada resultado', 'Qualquer busca repetida: imóveis, peças, vagas'],
              ['02 Testar dentro do app', 'O app hospedeiro e a condição de sucesso', 'Inspecionar a chamada da ferramenta, follow-ups, caso sem resultado, conferência com a fonte', 'MCP, recurso por API, skill ou plugin'],
              ['03 Um agente testa outro', 'A tarefa de navegador por uma jornada de usuário concreta', 'O app faz as próprias ações; falha registrada; reparo passa no mesmo teste', 'App sem agente: criar rascunho, salvar, reabrir'],
              ['04 Entrega da edição', 'O vídeo e o destino', 'Estabilidade do arquivo, decodificação, original intacto', 'Render não terminado: pedir acompanhamento agendado'],
              ['05 Celular pelo computador', 'O app móvel, a conta e a configuração alvo', 'Antes/depois e verificação de persistência', 'Qualquer app que só existe no celular'],
            ] }),
            c.code(t, { objective: 'Adaptar o fluxo 02 para testar uma skill sua no Claude Code, mantendo as checagens de evidência (Codex com computer use e o Claude Code instalado)', lang: 'text', code: `Use computer use para testar minha skill existente dentro do app real.

App hospedeiro e workspace: Claude Code, na pasta <CAMINHO_DO_PROJETO>
Ferramenta / skill: /<NOME_DA_SKILL>
Tema seguro de teste: <TEMA_SEM_DADOS_PRIVADOS>
Resultado esperado: <O_QUE_A_SKILL_DEVE_PRODUZIR, VISIVEL>
Código-fonte opcional: <CAMINHO_DA_SKILL_OU_NONE>

Confirme que está no app e na pasta certos. Verifique se a skill aparece. Não reinstale nem reescreva o que já existe.
Rode um pedido realista e só de leitura. Inspecione as chamadas de ferramenta, não só a resposta final. Faça dois follow-ups naturais que dependam da primeira resposta. Inclua um caso sem resultado para ver se ela admite incerteza.
Confira uma afirmação material contra a fonte. Registre entradas, saída, erros e tempo decorrido; separe tempo do modelo e tempo da ferramenta só quando a evidência permitir.
Devolva: checagens que passaram, falhas reproduzidas, evidência e a correção de maior valor. Se houver código, aponte o local provável sem alterar nada. Não envie mensagens a ninguém.`, verify: 'O relatório mostra a chamada da skill (não só o texto final), os dois follow-ups mantêm o contexto, o caso sem resultado não inventa resposta e a correção sugerida aponta um arquivo e uma linha.' }),
            c.tip({ title: 'Teste de estrutura', text: 'Se ao adaptar um prompt você apagou uma frase que começa com "verify", "confirm", "compare" ou "do not", pare. Essas são as checagens de evidência. O guia manda preservá-las em todas as variações.' }),
          ],
        },
      ],
      quiz: [
        { q: 'Qual das quatro partes do contrato está faltando em "Abra o Descript e limpe o meu vídeo da pasta Vídeos"?', options: ['APP', 'RESULTADO', 'ESCOPO e PROVA'], answer: 2, why: 'O app está nomeado e o resultado está implícito. Não há escopo (o original pode mudar? exporta em que nome?) nem prova (como saber que a limpeza não cortou conteúdo único?).' },
        { q: 'O agente reportou: "exportei o vídeo, ele ficou 3 minutos mais curto, sucesso". O que está errado?', options: ['Nada, mais curto é o objetivo da limpeza.', 'Duração menor não prova qualidade; a prova é o arquivo decodificar e o conteúdo único ter sobrevivido nos cortes.', 'Ele deveria ter enviado a captura de tela do Descript.'], answer: 1, why: 'O prompt 04 é explícito: reporte duração antes e depois sem tratar edição mais curta como prova de qualidade. Captura de tela também não prova.' },
        { q: 'Ao adaptar o fluxo 02 para testar um plugin, o que você preserva obrigatoriamente?', options: ['O nome "Claude Desktop" como app hospedeiro.', 'As checagens de evidência: inspecionar a chamada da ferramenta, follow-ups, caso sem resultado, conferência com a fonte.', 'O tema de teste original.'], answer: 1, why: 'A regra de adaptação é trocar app e condição de sucesso e preservar as checagens de evidência. Elas são a estrutura; o resto é exemplo.' },
      ],
      summary: [
        ['Quatro partes', 'APP exato, RESULTADO útil, ESCOPO do que pode mudar, PROVA de conclusão. Revise de baixo para cima.'],
        ['Marcadores', 'tudo entre < e > é seu; as frases com "do not", "verify" e "compare" ficam.'],
        ['Prova de conclusão', 'o artefato funciona, o estado persiste, a afirmação bate com a fonte. Screenshot e nome de arquivo não provam.'],
        ['Bloqueio exato', 'tela onde parou, o que falta, evidência, ação de quem opera, itens separados por status.'],
        ['Modelo reutilizável', 'inspecionar, agir no escopo, verificar no artefato, reportar concluído / sem verificar / próximo passo.'],
      ],
    },
  ],
};
