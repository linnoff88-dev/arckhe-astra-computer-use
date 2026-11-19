// Trilha 2 — Os cinco fluxos (blue) — módulos 2.1 a 2.3 (2.4 e 2.5 em content-t2b.mjs)
import { c, svg } from './lib.mjs';
import { T2B } from './content-t2b.mjs';

const link = (href, txt) => `<a href="${href}" target="_blank" class="text-sky-400 hover:text-sky-300 underline decoration-dotted">${txt}</a>`;
const CLI = 'https://github.com/promptadvisers/google-flights-cli';

const M21 = {
  id: '2-1', emoji: '🔧', title: 'Busca vira ferramenta', punch: 'Mapear o site uma vez, rodar para sempre', minutes: 50, level: 'Intermediário', kind: 'Prática',
  lead: 'Google Flights não tem API. Com computer use você faz a busca uma vez, o agente entende como chegou lá e gera uma ferramenta de linha de comando que qualquer agente, com qualquer modelo, roda depois. É o fluxo que mais rende porque transforma um custo repetido em custo único.',
  topics: [
    {
      emoji: '🎯', title: 'O problema: um site que você consulta toda semana e não tem API', sub: 'Repetir computer use é caro; mapear uma vez é barato',
      what: 'O caso de uso: uma busca repetida num site fechado (voos, imóveis, peças) que hoje exige uma pessoa ou uma sessão inteira de computer use a cada vez.',
      why: 'Cada execução de computer use custa dezenas de segundos e capturas de tela. Se a busca se repete, o custo certo é o de construir a ferramenta, não o de repetir a navegação.',
      keys: 'Busca repetida, site fechado, ferramenta reutilizável, custo único contra custo recorrente.',
      body: (t) => [
        c.p('No vídeo-fonte, o autor lembra que no ensino médio vendia acesso a scripts em Python que caçavam promoções de passagem. "Naquela época isso era ciência de foguete; hoje você faz com um prompt." A ideia não é fazer a busca com computer use. É usar computer use <strong class="text-blue-400">uma vez</strong> para que o agente aprenda a interface e escreva uma ferramenta que faça o resto.'),
        c.glossary(t, [
          ['CLI', 'Ferramenta de linha de comando: um programa que você chama no terminal com parâmetros (origem, destino, datas) e que devolve um resultado em arquivo.'],
          ['JSON e CSV', 'Dois formatos de arquivo para dados estruturados. JSON para outros programas lerem; CSV para abrir em planilha.'],
          ['Planejador (planner)', 'A parte da ferramenta que roda no seu terminal: monta a busca, valida datas, organiza pastas de saída, lê capturas antigas.'],
          ['Adaptador de navegador', 'A parte que precisa de um navegador de verdade para buscar tarifa nova. No kit, só existe dentro do Codex desktop.'],
          ['Captura (capture)', 'O registro do que a página mostrou num dado momento, com carimbo de tempo. É a evidência da busca.'],
        ]),
        c.figure(t, svg.split(t, { label: 'Dois modos de repetir uma busca: navegar com computer use a cada vez, ou navegar uma vez, gerar a ferramenta e rodar a ferramenta depois', bridge: 'mesma tarifa', left: { title: 'A CADA VEZ', items: ['Sessão de computer use', '50 a 80 segundos por busca', 'Modelo caro em cada execução', 'Frágil a cada mudança de tela'] }, right: { title: 'UMA VEZ + FERRAMENTA', items: ['Mapeia a interface uma vez', 'Gera CLI com entradas explícitas', 'Roda com modelo menor ou sem modelo', '23 a 25 segundos por busca no vídeo'] } }), 'A coluna da direita tem um custo inicial maior e um custo por execução menor. O ponto de equilíbrio chega na segunda ou terceira busca.'),
        c.concept(t, { title: 'A vantagem que o vídeo destaca', emoji: '💡', paras: ['"Você faz o Astra fazer o trabalho pesado na primeira vez, e depois executa o fluxo com um modelo de nível mais baixo." A ferramenta gerada é código comum: não depende do modelo que a escreveu. Um agente local, um Codex de plano menor ou você mesmo no terminal rodam a mesma coisa.'] }),
      ],
    },
    {
      emoji: '📝', title: 'O prompt 01, traduzido', sub: 'Construa uma CLI de busca de voos apoiada no navegador',
      what: 'O prompt do kit para o primeiro fluxo: entradas explícitas, inspeção da interface pelo navegador interno, separação planejador/adaptador, exportação em JSON e CSV, duas execuções de verificação.',
      why: 'É o prompt mais longo dos cinco e o mais instrutivo: cada frase corresponde a uma falha que aconteceu antes.',
      keys: 'Navegador interno explícito, entradas nomeadas, exportação, verificação em duas datas, "search only".',
      body: (t) => [
        c.p('Antes de colar, prepare: uma sessão do Codex desktop com o navegador interno habilitado, duas datas futuras (com ano) e uma pasta de saída vazia. O vídeo insiste em nomear o navegador interno no prompt, senão "de vez em quando ele usa o Chrome e aproveita as suas sessões".'),
        c.code(t, { objective: 'Gerar a ferramenta de busca de voos a partir de uma inspeção real do Google Flights (Codex desktop com navegador interno)', lang: 'text', code: `Construa uma CLI reutilizável de busca de voos, apoiada no navegador, para este pedido:

Origem: <AEROPORTO_ORIGEM>
Destino: <AEROPORTO_DESTINO>
Ida / volta: <AAAA-MM-DD> / <AAAA-MM-DD>
Adultos: <QUANTIDADE>
Cabine / moeda: <executiva ou econômica> / <BRL, CAD, USD>
Pasta de saída: <PASTA_DO_PROJETO>

Primeiro inspecione o Google Flights usando o navegador interno do Codex. Leia a documentação da ferramenta ativa e observe os controles reais da página. Separe o planejador/parser local do adaptador de navegador e diga exatamente quais partes exigem o Codex. Não afirme que um comando de terminal busca tarifa ao vivo se ele não busca.

Crie entradas explícitas para rota e datas. Exporte companhia, total exibido para todo o grupo, paradas e duração da ida, avisos, link de origem, escopo do preço e hora da coleta, em JSON e CSV. Mantenha detalhes de volta não verificados e checagens de cabine por trecho marcados como desconhecidos. Dado ausente nunca vira zero.

Rode dois pares de datas futuras em pastas de saída novas. Verifique aeroportos visíveis, datas completas com ano, adultos, cabine e moeda. Espere os cartões de tarifa estabilizarem e compare um resultado exportado com a página. Preserve a captura e o carimbo de tempo original.

Entregue um guia de início rápido, notas de dependência do navegador, testes sintéticos do parser e os dois relatórios de verificação. Só busca: não reserve nem digite dados de passageiro ou pagamento.`, verify: 'Dois pares de datas distintos geraram duas execuções em pastas separadas. Ao menos uma tarifa exportada bate com o que estava visível na página. O relatório distingue "preço a partir de" (exibido) de itinerário completo selecionado.' }),
        c.grid2(t, { okTitle: 'O que este prompt força', ok: ['Inspecionar a interface real antes de escrever código (o agente não codifica de memória).', 'Declarar a fronteira: o que roda no terminal e o que exige o Codex.', 'Exportar com escopo de preço e hora: uma tarifa sem carimbo é inútil no dia seguinte.', 'Duas execuções, não uma: a segunda revela o que a primeira acertou por sorte.'], badTitle: 'O que ele proíbe', bad: ['Prometer busca ao vivo por um comando que só planeja.', 'Transformar dado ausente em zero (um voo "de R$ 0" quebra qualquer comparação).', 'Reservar, ou preencher passageiro e pagamento.', 'Entregar sem os relatórios de verificação.'] }),
        c.tip({ title: 'Uma linha que economiza uma tarde', text: 'A frase "compare um resultado exportado com a página" é o que impede a ferramenta de exportar o preço do cartão errado. Sem ela, você recebe JSON bonito e tarifa de outro voo.' }),
      ],
    },
    {
      emoji: '🧩', title: 'Planejador local e adaptador de navegador são coisas separadas', sub: 'O que roda sozinho e o que exige o Codex',
      what: 'A arquitetura que o prompt exige e que o google-flights-cli do kit implementa: planejamento, replay de capturas, exportação e comparação de histórico rodam no terminal; tarifa nova exige o navegador interno do Codex.',
      why: 'Quem não entende essa fronteira acha que a CLI "não funciona" quando ela devolve "requires_codex". Ela funcionou: gerou o plano. Falta o navegador.',
      keys: 'requires_codex, replay de captura, exportação, comparação de histórico, fronteira declarada.',
      body: (t) => [
        c.p(`O ${link(CLI, 'google-flights-cli')} que acompanha o kit deixa a fronteira explícita no próprio README: "um terminal sozinho pode planejar buscas, reproduzir capturas, exportar dados e comparar histórico. Não pode buscar tarifa nova com este adaptador." O comando <code>run</code> devolvendo <code>requires_codex</code> é o comportamento esperado, não um erro.`),
        c.figure(t, svg.split(t, { label: 'A fronteira da ferramenta: à esquerda o que roda em qualquer terminal, à direita o que só existe dentro de uma tarefa do Codex com o navegador interno', bridge: 'plano salvo → captura → JSON/CSV', left: { title: 'TERMINAL (qualquer máquina)', items: ['Montar e validar o pedido', 'Gerar o plano de busca', 'Reproduzir capturas antigas', 'Exportar JSON / CSV', 'Comparar histórico de preços'] }, right: { title: 'CODEX + NAVEGADOR INTERNO', items: ['Abrir o Google Flights', 'Aplicar rota, datas, cabine', 'Esperar os cartões estabilizarem', 'Capturar a tarifa nova', 'Carimbar hora e link'] } }), 'O plano sai da esquerda, a captura nasce na direita e volta para a esquerda para virar arquivo. Se a direita não existe na sua sessão, a esquerda ainda faz metade do trabalho.'),
        c.table(t, { headers: ['Comando ou etapa', 'Onde roda', 'O que produz'], rows: [
          ['<code>npm run demo</code>', 'Terminal (Node 22+)', 'Uma execução de demonstração com dados sintéticos: prova que o parser e a exportação funcionam.'],
          ['<code>flight-search.mjs run --request pedido.json</code>', 'Terminal', 'O plano da busca e as instruções para o navegador. Sem Codex, termina em <code>requires_codex</code>.'],
          ['Passos de navegador impressos pela CLI', 'Codex, navegador interno', 'A captura com tarifa, link e hora.'],
          ['Exportação e comparação', 'Terminal', 'JSON e CSV com campos preenchidos ou marcados como desconhecidos; diferença contra capturas anteriores.'],
        ], caption: 'O adaptador não abre um navegador próprio, não lê o perfil do seu Chrome nem chama endpoints privados. Ele recebe uma aba do Codex.' }),
        c.alert({ title: 'A honestidade que o prompt exige', text: '"Não afirme que um comando de terminal busca tarifa ao vivo se ele não busca." Essa linha existe porque a primeira versão de qualquer ferramenta dessas tende a prometer o que só o navegador entrega. Se a sua CLI gerada diz que busca sem Codex, teste sem Codex antes de acreditar.' }),
      ],
    },
    {
      emoji: '✅', title: 'A prova: dois pares de datas, uma tarifa que confere', sub: 'Como saber que a ferramenta funciona e não só parece',
      what: 'A prova de conclusão do fluxo 01: execuções separadas por pasta, comparação de um resultado exportado com a página, campos desconhecidos marcados como tal, e distinção entre preço exibido e itinerário selecionado.',
      why: 'Uma ferramenta de busca que exporta o número errado é pior do que nenhuma, porque parece certa.',
      keys: 'Pasta nova por execução, comparação com a página, unknown em vez de zero, from-price contra itinerário.',
      body: (t) => [
        c.steps(t, { title: 'O que conferir antes de aceitar a ferramenta', items: [
          { h: 'Duas pastas, duas execuções', text: 'Cada par de datas gerou a própria pasta com plano, captura e exportação. Se as duas execuções escreveram na mesma pasta, a segunda apagou a evidência da primeira.' },
          { h: 'Uma tarifa exportada bate com a página', text: 'Abra o JSON e a captura lado a lado. Companhia, total para o grupo e paradas da ida têm que ser os mesmos. Uma divergência aqui é falha do parser, não do site.' },
          { h: 'O que não foi verificado está marcado', text: 'Detalhes da volta e cabine em todos os trechos aparecem como "unknown" se o agente não os viu. Um zero ou um valor inventado no lugar reprova.' },
          { h: 'Escopo do preço declarado', text: 'O relatório diz se o número é um "a partir de" exibido na lista ou o preço de um itinerário completo selecionado. São coisas diferentes e o Google mostra as duas.' },
          { h: 'Carimbo de tempo e link', text: 'Cada tarifa tem hora de coleta e link de origem. Sem isso, você não sabe se está comparando preços de hoje com os de semana passada.' },
        ] }),
        c.data({ title: 'Campos que a exportação precisa ter', items: [
          'Companhia · total exibido para todo o grupo · paradas e duração da ida.',
          'Avisos da página (bagagem, tarifa não reembolsável, horário noturno).',
          'Link de origem · escopo do preço · hora da coleta.',
          'Volta e cabine por trecho: preenchidos só se verificados; senão, <code>unknown</code>.',
        ] }),
        c.grid2(t, { okTitle: 'Exportação aceitável', ok: ['<code>"total_party": 4380, "currency": "BRL", "price_scope": "displayed_from_price"</code>', '<code>"return_details": "unknown"</code> quando a volta não foi aberta.', '<code>"captured_at": "2026-10-03T14:22:10-03:00"</code> em toda linha.'], badTitle: 'Exportação que reprova', bad: ['<code>"total_party": 0</code> para um voo sem preço visível.', 'Volta "confirmada" sem nenhuma captura da tela de volta.', 'Uma única pasta com as duas execuções misturadas.'] }),
      ],
    },
    {
      emoji: '🗺️', title: 'Explorar rotas com orçamento: multi-city e alternativas', sub: 'O prompt 06 e o que ele se recusa a prometer',
      what: 'A extensão do fluxo: janelas de datas, aeroportos alternativos, trajetos abertos (chegar por uma cidade e voltar por outra) e escalas planejadas, com um teto de buscas no navegador.',
      why: 'É onde a ferramenta deixa de repetir a sua busca e passa a encontrar combinações que você não tentaria à mão. E é onde mais se inventa: preço global mais barato, assento de milhas disponível.',
      keys: 'Janela de datas, aeroporto alternativo, open-jaw, orçamento de buscas, custos ocultos, bilhetes separados.',
      body: (t) => [
        c.p('No vídeo, a primeira versão da CLI ficou "viciada" na rota Montreal → Sydney. A segunda rodada pediu que ela funcionasse com qualquer combinação e testasse viagens multi-cidade, usando o que o modelo sabe de blogs sobre milhas e aeroportos alternativos. O kit transformou essa rodada num prompt com <strong class="text-blue-400">orçamento</strong>: um número máximo de buscas no navegador, para o agente não passar a noite testando.'),
        c.code(t, { objective: 'Estender uma busca já mapeada com alternativas explícitas e um teto de buscas (Codex desktop com navegador interno, sobre a CLI já gerada)', lang: 'text', code: `Estenda a busca de voos usando <PEDIDO_BASE> e estas alternativas explícitas: <JANELA_DE_DATAS>, <AEROPORTOS_ALTERNATIVOS>, <OPCOES_DE_TRAJETO_ABERTO_OU_ESCALA>. Use o planejador de campanha incluído com no máximo <ORCAMENTO_DE_BUSCAS> buscas no navegador. Explique quais combinações ficaram de fora.

Comece pela rota original. Use a grade de datas e os controles de aeroporto visíveis para afunilar as opções promissoras, depois capture os pedidos exatos. Inclua transporte terrestre, voos de posicionamento, bagagem e noites extras de hotel nas comparações; deixe custos desconhecidos como desconhecidos. Trate viagens com bilhetes separados como algo que exige revisão de conexão e de proteção de bilhete. Não afirme que uma conexão longa é viável só porque as datas são cronológicas.

Classifique apenas observações completas e recentes com o mesmo escopo de preço. Mantenha estratégias só planejadas e pares incompletos separados. Não afirme a tarifa global mais barata nem invente disponibilidade de assento por milhas. Devolva uma lista curta com links de evidência, horas de coleta, custos ausentes e o que ainda precisa ser checado.`, verify: 'A lista final tem menos itens do que o orçamento de buscas, cada item tem link e hora, os custos desconhecidos aparecem como desconhecidos e há uma seção separada para "o que ficou de fora e por quê".' }),
        c.table(t, { headers: ['Estratégia', 'O que é', 'O que o prompt exige junto'], rows: [
          ['Janela de datas', 'Testar dias ao redor da data ideal', 'Usar a grade de datas do próprio site antes de disparar buscas'],
          ['Aeroporto alternativo', 'Sair ou chegar por um aeroporto vizinho', 'Somar transporte terrestre e voo de posicionamento'],
          ['Trajeto aberto (open-jaw)', 'Ir para uma cidade e voltar de outra', 'Mesmo escopo de preço nas duas pontas'],
          ['Escala planejada', 'Parar numa cidade no meio e seguir', 'Se forem bilhetes separados: revisão de conexão e de proteção'],
        ] }),
        c.alert({ title: 'Duas frases que o agente nunca pode dizer', text: '"Esta é a tarifa mais barata que existe" e "há assento de milhas disponível nesta data". A primeira exige uma busca exaustiva que o orçamento não permite; a segunda exige acesso ao programa de milhas, que a ferramenta não tem. O prompt proíbe as duas por escrito.' }),
      ],
    },
    {
      emoji: '⏱️', title: 'Medir se o reuso ajuda de verdade', sub: 'O prompt 08 e os números do vídeo',
      what: 'O teste comparativo do kit: a mesma busca nova em duas sessões limpas, uma com a ferramenta gerada e outra com computer use puro, alternando a ordem, com o tempo definido antes.',
      why: 'Uma ferramenta que não é mais rápida do que refazer a navegação não vale a manutenção. O vídeo mediu: 70% e 50% menos tempo. Mas em duas buscas.',
      keys: 'Sessões limpas, mesma cobertura, ordem alternada, tempo definido antes, amostra pequena.',
      body: (t) => [
        c.p('O vídeo fez o teste que a maioria pula: uma rota nova (Toronto → Lisboa, depois Toronto → Seul) em duas sessões novas, uma usando a CLI e outra usando computer use do zero. Os resultados foram <strong class="text-blue-400">77 segundos contra 23</strong> e <strong class="text-blue-400">50 contra 25</strong>. O kit transformou esse teste num prompt, e acrescentou o aviso que o vídeo não faz: são duas medições.'),
        c.figure(t, svg.bars(t, { label: 'Tempo por busca nas duas rotas testadas no vídeo: computer use puro contra a ferramenta gerada', aLabel: 'Computer use puro', bLabel: 'CLI gerada', items: [
          { label: 'Toronto → Lisboa', a: 77, b: 23, aText: '77 s', bText: '23 s' },
          { label: 'Toronto → Seul', a: 50, b: 25, aText: '50 s', bText: '25 s' },
        ], max: 90 }), 'A diferença é grande nas duas rotas, mas a base é de duas buscas. O prompt 08 existe para você repetir a medição com as suas rotas antes de decidir.'),
        c.code(t, { objective: 'Comparar a ferramenta gerada com computer use direto em condições iguais (duas sessões novas do Codex com o mesmo navegador)', lang: 'text', code: `Compare o executor reutilizável de busca de voos com computer use direto em <DOIS_PEDIDOS_NOVOS_DE_ROTA_E_DATA>. Use contextos de tarefa novos e separados, com a mesma capacidade de navegador, mesmas configurações de modelo, rota, datas, adultos, cabine, moeda e cobertura de resultado. Alterne qual método roda primeiro.

Defina o início e o fim do cronômetro antes de testar. Registre tempo decorrido, chamadas de ferramenta, tentativas falhas e a evidência final. Compare todas as tarifas e avisos exportados com os resultados visíveis equivalentes. Se os preços mudarem entre as execuções, registre a divergência em vez de tratá-la como erro do método.

Reporte cada execução e os limites de amostra pequena. Distinga tempo de navegação-até-exportação de tempo total da tarefa. Não afirme uma aceleração universal a partir de duas buscas nem chame de sucesso um resultado mais rápido porém incompleto.`, verify: 'O relatório tem quatro execuções (duas rotas × dois métodos), com início e fim do cronômetro declarados antes, tempos separados (navegação-até-exportação e total), e uma frase explícita sobre o tamanho da amostra.' }),
        c.concept(t, { title: 'O que este teste decide', emoji: '⚖️', bullets: [
          'Se a ferramenta é mais rápida <strong>com a mesma cobertura</strong>. Mais rápida entregando menos campos não conta.',
          'Se ela é mais <strong>confiável</strong>: menos tentativas falhas, menos chamadas de ferramenta.',
          'Se vale <strong>manter</strong>: uma ferramenta que quebra a cada mudança de tela do site pode custar mais do que a navegação direta.',
        ] }),
      ],
    },
  ],
  quiz: [
    { q: 'A CLI gerada devolveu "requires_codex" ao rodar no seu terminal. O que isso significa?', options: ['A ferramenta está quebrada.', 'Ela gerou o plano de busca; a tarifa nova só pode ser capturada dentro de uma tarefa do Codex com navegador interno.', 'Você precisa reinstalar o Node.'], answer: 1, why: 'A fronteira é declarada: o terminal planeja, reproduz capturas, exporta e compara; buscar tarifa nova exige o adaptador de navegador, que só existe no Codex desktop.' },
    { q: 'A exportação trouxe um voo com total "0" porque o preço não estava visível. Isso passa na prova?', options: ['Sim, zero indica que não havia preço.', 'Não: dado ausente nunca vira zero; o campo deveria estar marcado como desconhecido.', 'Sim, desde que a captura exista.'], answer: 1, why: 'O prompt é explícito: "missing data must not become zero". Zero entra em comparações e quebra qualquer ranking.' },
    { q: 'Com base nas duas medições do vídeo (77→23s e 50→25s), o que você pode afirmar?', options: ['A CLI é 50 a 70% mais rápida em qualquer busca.', 'Nessas duas rotas, com a mesma cobertura, a CLI foi mais rápida; para afirmar mais, repita o teste do prompt 08 com as suas rotas.', 'Computer use direto nunca compensa.'], answer: 1, why: 'O próprio kit exige reportar os limites de amostra pequena e proíbe afirmar aceleração universal a partir de duas buscas.' },
  ],
  summary: [
    ['Mapear uma vez, rodar sempre', 'computer use serve para o agente aprender a interface e gerar a ferramenta; a ferramenta roda com modelo menor ou sem modelo.'],
    ['Fronteira declarada', 'planejador e exportação rodam no terminal; tarifa nova exige o navegador interno do Codex. requires_codex é esperado.'],
    ['Prova em duas datas', 'pastas separadas, uma tarifa conferida com a página, unknown em vez de zero, escopo de preço e hora em toda linha.'],
    ['Extensão com orçamento', 'janela de datas, aeroportos alternativos, trajeto aberto e escalas, com teto de buscas e sem prometer "a mais barata" nem milhas.'],
    ['Medir antes de acreditar', '77→23s e 50→25s no vídeo são duas medições; o prompt 08 repete o teste em condições iguais e reporta a amostra.'],
  ],
};

const M22 = {
  id: '2-2', emoji: '🧪', title: 'Testar ferramentas dentro do app', punch: 'Seu MCP visto por quem nunca o usou', minutes: 45, level: 'Intermediário', kind: 'Prática',
  lead: 'Quem publica um MCP, uma skill ou um plugin sabe: o mais difícil é simular o primeiro uso de outra pessoa. Este fluxo coloca o Codex para abrir o Claude Desktop, instalar a sua ferramenta, conversar com ela, abrir cada chamada e devolver a jornada inteira com evidência.',
  topics: [
    {
      emoji: '😰', title: 'A dor de quem publica: simular o primeiro uso', sub: 'Você conhece demais a sua ferramenta para testá-la',
      what: 'O problema que o fluxo resolve: mapear a experiência real de alguém que pega o seu MCP ou skill, conecta ao Claude ou ao Codex e usa pela primeira vez.',
      why: 'Você pula os passos que já sabe. Um agente com instruções de usuário novo não pula nenhum, e registra onde travou.',
      keys: 'MCP, app hospedeiro, jornada do usuário, chamada de ferramenta, primeiro uso.',
      body: (t) => [
        c.p('No vídeo, o autor testa um MCP próprio que liga a comunidade dele (posts, aulas, comentários) ao Claude e ao Codex. Ele pede ao Codex que abra o Claude Desktop, confirme que está na aba do Claude Code, verifique se o conector está ligado, faça uma pergunta e "tenha algumas idas e vindas para garantir que a jornada do usuário seja a mais suave possível". Vinte minutos depois, recebe o relatório.'),
        c.glossary(t, [
          ['MCP', 'Model Context Protocol: um padrão para expor ferramentas e dados a um modelo. Um "servidor MCP" é o programa que você escreve para o Claude ou o Codex chamarem.'],
          ['App hospedeiro', 'O app onde a ferramenta é usada: Claude Desktop, Claude Code, Codex, Gemini. É nele que o agente vai clicar.'],
          ['Chamada de ferramenta (tool-call)', 'O momento em que o modelo aciona a sua ferramenta com certos parâmetros e recebe um resultado. Fica visível em painéis expansíveis do app.'],
          ['Follow-up', 'Pergunta seguinte que depende da resposta anterior. Testa se o contexto sobreviveu.'],
          ['Caso sem resultado', 'Uma pergunta cuja resposta a ferramenta não tem. Testa se o modelo admite ou inventa.'],
        ]),
        c.figure(t, svg.flow(t, { label: 'A jornada que o agente percorre no app hospedeiro: confirmar app e workspace, checar a ferramenta, pedido realista, inspecionar a chamada, dois follow-ups, caso sem resultado, conferir com a fonte', steps: [
          { title: 'App certo?', sub: 'workspace, aba, conector' }, { title: 'Pedido', sub: 'realista, só leitura' }, { title: 'Inspecionar', sub: 'a chamada, não a resposta' }, { title: 'Follow-ups', sub: 'dois, encadeados' }, { title: 'Sem resultado', sub: 'admite ou inventa?' }, { title: 'Fonte', sub: 'uma afirmação conferida' },
        ] }), 'Seis etapas, e você provavelmente só faz a segunda quando testa à mão. As outras cinco são o que o usuário novo vive.'),
      ],
    },
    {
      emoji: '📝', title: 'O prompt 02, traduzido', sub: 'Use computer use para testar minha integração no app real',
      what: 'O prompt do kit: app hospedeiro, nome da ferramenta, fonte segura de teste, resultado esperado, pedido só de leitura, inspeção da chamada, dois follow-ups, caso sem resultado, conferência com a fonte, relatório curto.',
      why: 'É o prompt que transforma "acho que funciona" em "passou em seis checagens, falhou em uma, a correção de maior valor é esta".',
      keys: 'Só leitura, preservar configuração, parar em login, não reconstruir o que existe, relatório curto.',
      body: (t) => [
        c.code(t, { objective: 'Testar um MCP, skill ou plugin seu pela interface real do app hospedeiro (Codex com computer use; app hospedeiro instalado e logado)', lang: 'text', code: `Use computer use para testar minha integração existente dentro do app hospedeiro real.

App hospedeiro e workspace: <APP_E_WORKSPACE>
Ferramenta / MCP / integração: <NOME_DA_FERRAMENTA>
Fonte ou tema seguro de teste: <FONTE_OU_TEMA>
Resultado esperado de sucesso: <RESULTADO_ESPERADO>
Código-fonte opcional: <CAMINHO_DO_REPO_OU_NONE>

Confirme que está no app e no workspace certos. Verifique se a ferramenta está disponível. Se for preciso configurar, use as instruções de instalação fornecidas, preserve a configuração existente e reporte exatamente o que mudou. Pare em qualquer login ou entrada de segredo que precise de mim. Não reconstrua uma ferramenta que já existe.

Rode um pedido realista e só de leitura. Inspecione os detalhes reais da chamada de ferramenta, não só a mensagem final do assistente. Faça dois follow-ups naturais que dependam da primeira resposta. Inclua um caso de fonte ausente ou sem resultado para checar se ele lida com a incerteza honestamente.

Confira uma resposta material contra a fonte de origem. Registre entradas observadas, saída, erros e tempo decorrido. Separe tempo de resposta do modelo, tempo de execução da ferramenta e atrito de configuração só quando a evidência sustentar essa distinção. Não invente decomposições de tempo.

Devolva um relatório curto: checagens que passaram, falhas reproduzidas, evidência e a correção de maior valor. Se houver código-fonte, identifique o local provável sem aplicar mudanças neste teste. Mantenha registros privados fora do relatório. Não envie mensagens a outras pessoas.`, verify: 'O app hospedeiro invocou a ferramenta pretendida (a chamada aparece no relatório). Os follow-ups mantiveram o contexto. Uma afirmação devolvida bate com a fonte. O caso sem resultado não inventou resposta.' }),
        c.table(t, { headers: ['Marcador', 'Exemplo do vídeo', 'Como preencher no seu caso'], rows: [
          ['APP_E_WORKSPACE', 'Claude Desktop, aba Claude Code', 'App exato e onde dentro dele (workspace, projeto, aba).'],
          ['NOME_DA_FERRAMENTA', 'MCP "community brain" (posts e aulas da comunidade)', 'O nome como aparece na lista de conectores do app.'],
          ['FONTE_OU_TEMA', '"Uma aula sobre construir ou testar MCPs"', 'Algo que existe na sua base e não tem dado privado.'],
          ['RESULTADO_ESPERADO', 'Título, link da fonte e três pontos úteis; a chamada visível; um ponto conferido na fonte', 'Condição que dá para ver na tela, não "responde bem".'],
        ] }),
        c.tip({ title: 'Diga a aba', text: 'O vídeo acrescenta um detalhe ao prompt: "use a aba do Claude Code". O agente checou, viu que não estava nela, corrigiu e seguiu. Quanto mais exato o app e o lugar dentro dele, menos passos perdidos.' }),
      ],
    },
    {
      emoji: '🔍', title: 'Inspecionar a chamada, não a resposta', sub: 'Abrir os painéis que mostram o que a ferramenta recebeu e devolveu',
      what: 'A instrução central do fluxo: o agente clica nos painéis expansíveis do app para ver quais parâmetros entraram na ferramenta, quais registros voltaram e de onde, em vez de ler só o texto final.',
      why: 'A resposta final pode estar certa por acaso, ou bonita e errada. A chamada mostra se a ferramenta foi usada, como e com quê.',
      keys: 'Painel de chamada, parâmetros de entrada, registros devolvidos, fonte de cada item.',
      body: (t) => [
        c.p('"A melhor parte é que ele não só monitora a conversa, ele clica nos menus para ver exatamente o que está acontecendo por trás: todas as aulas que foram puxadas, as fontes exatas e tudo o que há no meio." Essa frase do vídeo é a diferença entre um teste de aparência e um teste de funcionamento.'),
        c.figure(t, svg.stack(t, { label: 'Quatro camadas de evidência num teste de ferramenta, da mais superficial à mais profunda: texto final, chamada da ferramenta, parâmetros e registros, fonte original', layers: [
          { title: 'TEXTO FINAL', sub: 'o que o assistente escreveu; pode estar certo por acaso' },
          { title: 'A CHAMADA', sub: 'a ferramenta foi acionada? qual? quantas vezes?' },
          { title: 'PARÂMETROS E REGISTROS', sub: 'o que entrou, o que voltou, de onde' },
          { title: 'FONTE ORIGINAL', sub: 'o dado bate com o lugar de onde veio?' },
        ] }), 'Testar à mão costuma parar na primeira camada. O prompt exige chegar à quarta em ao menos uma afirmação.'),
        c.grid2(t, { okTitle: 'O que o relatório mostra quando a inspeção foi feita', ok: ['"A ferramenta <code>search_lessons</code> foi chamada com <code>query=\'testar MCP\'</code> e devolveu 4 registros; o assistente citou 3."', '"O segundo follow-up não gerou nova chamada: a resposta veio do contexto anterior."', '"No caso sem resultado, a ferramenta devolveu lista vazia e o assistente disse que não encontrou."'], badTitle: 'O que aparece quando só a resposta foi lida', bad: ['"O assistente respondeu corretamente sobre MCPs."', '"As respostas foram úteis e rápidas."', '"Não houve erro."'] }),
        c.alert({ title: 'O erro que a inspeção pega', text: 'O modelo responde uma pergunta sobre a sua base sem chamar a ferramenta, usando o que já sabia. O texto parece perfeito. A chamada não existe. Sem abrir o painel, você aprovaria um MCP que não foi usado.' }),
      ],
    },
    {
      emoji: '🔁', title: 'Follow-ups encadeados e o caso sem resultado', sub: 'Os dois testes que separam demo de produto',
      what: 'Dois follow-ups que dependem da primeira resposta (testam contexto) e uma pergunta cuja resposta a ferramenta não tem (testa honestidade).',
      why: 'Um MCP que responde bem a uma pergunta isolada e se perde na segunda, ou que inventa quando não sabe, falha exatamente onde o usuário real vai estar.',
      keys: 'Dependência da resposta anterior, contexto retido, incerteza declarada, lista vazia.',
      body: (t) => [
        c.steps(t, { title: 'Como o agente encadeia', items: [
          { h: 'Primeira pergunta realista', text: 'Sobre o tema seguro. Exemplo do vídeo: encontrar uma aula sobre construir ou testar MCPs e trazer título, link e três pontos.' },
          { h: 'Follow-up 1, dependente', text: '"Desses três pontos, qual o autor considera o mais importante e por quê?" Só faz sentido se a primeira resposta estiver no contexto.' },
          { h: 'Follow-up 2, dependente do 1', text: '"Existe outra aula que aprofunde esse ponto?" Testa se a ferramenta é chamada de novo com o contexto certo.' },
          { h: 'Caso sem resultado', text: 'Uma pergunta sobre algo que não existe na base: "qual aula fala de integração com o sistema X?" (que nunca foi coberto). A resposta correta é "não encontrei".' },
        ] }),
        c.cards(t, [
          { emoji: '🧠', h: 'Contexto retido', text: 'Os follow-ups são respondidos sem repetir a pergunta original e sem confundir "esses três pontos" com outros.' },
          { emoji: '🤷', h: 'Incerteza honesta', text: 'No caso sem resultado, o assistente declara que a ferramenta não devolveu nada. Não completa com conhecimento geral fingindo que veio da base.' },
          { emoji: '🧾', h: 'Evidência de cada um', text: 'Para cada follow-up, o relatório diz se houve nova chamada, com que parâmetros, e o que voltou.' },
        ]),
        c.tip({ title: 'Escolha o caso sem resultado com cuidado', text: 'Ele precisa ser algo que a sua base realmente não tem, mas que soe plausível. Se for absurdo demais, o modelo recusa por outro motivo e o teste não mede o que devia.' }),
      ],
    },
    {
      emoji: '⏱️', title: 'Conferir com a fonte e medir tempo sem inventar', sub: 'O que registrar, e o que não decompor',
      what: 'Duas exigências do prompt: uma resposta material conferida contra a fonte de origem, e registro de tempo decorrido com separação entre modelo, ferramenta e configuração só quando a evidência sustentar.',
      why: 'Tempo é o que o usuário sente. Mas uma decomposição de tempo inventada é pior do que nenhuma, porque orienta a otimização errada.',
      keys: 'Fonte de origem, tempo decorrido, tempo do modelo, tempo da ferramenta, atrito de configuração.',
      body: (t) => [
        c.table(t, { headers: ['O que registrar', 'Como', 'Quando decompor'], rows: [
          ['Entradas observadas', 'Os parâmetros exatos de cada chamada', 'Sempre'],
          ['Saída', 'Registros devolvidos e o que o assistente usou deles', 'Sempre'],
          ['Erros', 'Mensagem literal, tela onde apareceu', 'Sempre'],
          ['Tempo decorrido', 'Do envio da pergunta à resposta completa', 'Sempre'],
          ['Tempo do modelo × da ferramenta × configuração', 'Só se o app mostra marcações de tempo por etapa', 'Só com evidência. "Do not invent timing breakdowns."'],
        ] }),
        c.concept(t, { title: 'A conferência com a fonte', emoji: '🔎', paras: ['O prompt pede uma afirmação material conferida na origem. No vídeo: um dos três pontos da aula, aberto na fonte real. Se o ponto não está lá, a ferramenta ou o modelo distorceu. Uma conferência basta para o teste; se ela falhar, o relatório inteiro muda de tom.'] }),
        c.alert({ title: 'Registros privados ficam fora', text: 'O relatório circula. O prompt manda manter registros privados fora dele e não enviar mensagens a outras pessoas. Se a sua base tem dados de clientes, o tema seguro de teste é o que garante que nada disso apareça no relatório.' }),
      ],
    },
    {
      emoji: '📄', title: 'O relatório, a correção de maior valor, e a ponte entre apps', sub: 'De feedback vago a um arquivo e uma linha',
      what: 'O formato de saída: checagens que passaram, falhas reproduzidas, evidência e a única correção de maior valor, com localização provável no código quando houver. E a extensão: usar o mesmo fluxo para testar uma skill em outro app que não tem plugin.',
      why: 'O vídeo recebeu, além do relatório, a indicação de duas funções cuja estrutura causava latência. É o tipo de retorno que um usuário humano nunca escreve.',
      keys: 'Passou, falhou, evidência, maior correção, localização sem alterar, ponte entre apps.',
      body: (t) => [
        c.p('Vinte minutos depois do envio, o vídeo mostra o retorno: feedback sobre o MCP e, mais abaixo, trechos do código monitorado com a observação de que "a forma como você estruturou esta função e esta função não é eficiente e causa atraso e latência". O prompt permite isso quando o código-fonte é fornecido, e proíbe aplicar mudanças durante o teste.'),
        c.cards(t, [
          { emoji: '✅', h: 'Checagens que passaram', text: 'Lista curta: ferramenta invocada, follow-ups com contexto, fonte conferida, caso sem resultado tratado.' },
          { emoji: '❌', h: 'Falhas reproduzidas', text: 'Cada falha com o passo exato para repetir e a evidência (painel da chamada, mensagem, tempo).' },
          { emoji: '🎯', h: 'A correção de maior valor', text: 'Uma só. Com o arquivo e a região provável do código, sem editar. Você decide se e quando aplica.' },
        ]),
        c.figure(t, svg.split(t, { label: 'A ponte que computer use cria entre dois apps que não se integram: o Codex opera o Claude Desktop (ou o Gemini) pela interface e observa o resultado', bridge: 'sem API, sem plugin', left: { title: 'CODEX (quem testa)', items: ['Abre o app hospedeiro', 'Digita, clica, abre painéis', 'Lê e registra'] }, right: { title: 'CLAUDE / GEMINI (onde a ferramenta roda)', items: ['Conector ou skill instalado', 'Responde e chama a ferramenta', 'Mostra a chamada nos painéis'] } }), 'O vídeo diz: se não existe plugin para o Gemini, abra o app do Gemini e deixe o Codex usá-lo. É uma conversa entre modelos sem nenhuma API no meio.'),
        c.tip({ title: 'Skill que funciona no Codex e no Claude?', text: 'Este é o teste. Rode o prompt 02 duas vezes: app hospedeiro Codex, depois app hospedeiro Claude Code. Compare os dois relatórios. Onde a chamada difere, a skill depende de algo que um dos dois não tem.' }),
      ],
    },
  ],
  quiz: [
    { q: 'O assistente respondeu perfeitamente sobre a sua base de conhecimento, mas o relatório não mostra nenhuma chamada de ferramenta. O que aconteceu?', options: ['O MCP funcionou tão bem que a chamada foi instantânea.', 'O modelo respondeu do próprio conhecimento sem usar o MCP; o teste falhou na camada da chamada.', 'O app hospedeiro esconde as chamadas por padrão.'], answer: 1, why: 'Inspecionar a chamada existe para pegar exatamente isso: resposta bonita sem a ferramenta ter sido usada.' },
    { q: 'O app não mostra tempo por etapa, mas você quer saber quanto foi modelo e quanto foi ferramenta. O que o relatório deve dizer?', options: ['Estimar 60/40 com base na experiência.', 'Registrar só o tempo decorrido total e dizer que a decomposição não tem evidência.', 'Omitir o tempo.'], answer: 1, why: 'O prompt proíbe inventar decomposições de tempo. Sem marcação por etapa no app, só o total é evidência.' },
    { q: 'No caso sem resultado, o assistente escreveu três parágrafos úteis sobre o tema. Passou?', options: ['Sim, respondeu bem.', 'Não: a ferramenta não tinha o dado e ele completou com conhecimento geral sem dizer isso; o teste de honestidade falhou.', 'Depende do tamanho da resposta.'], answer: 1, why: 'O caso sem resultado mede se o assistente admite a ausência. Preencher com conhecimento geral fingindo que veio da base é a falha que o teste procura.' },
  ],
  summary: [
    ['O problema', 'você não consegue simular o primeiro uso da própria ferramenta; um agente com instruções de usuário novo consegue e registra.'],
    ['Seis etapas', 'app certo, pedido só de leitura, inspecionar a chamada, dois follow-ups encadeados, caso sem resultado, conferir com a fonte.'],
    ['A chamada, não a resposta', 'abrir os painéis do app: qual ferramenta, com que parâmetros, quantos registros, de onde.'],
    ['Tempo com evidência', 'registrar o total sempre; decompor modelo/ferramenta/configuração só quando o app mostra.'],
    ['Relatório e ponte', 'passou, falhou, evidência, uma correção de maior valor com local provável; o mesmo fluxo liga Codex a Claude ou Gemini sem API.'],
  ],
};

const M23 = {
  id: '2-3', emoji: '🔁', title: 'Um agente testa outro', punch: 'Computer use auditando computer use', minutes: 45, level: 'Avançado', kind: 'Prática',
  lead: 'Você construiu um app com agentes e o recurso mais fraco é o computer use dele, porque é o mais difícil de ensinar a um agente do zero. A solução do vídeo: usar o computer use do Codex para assistir o seu app usar o dele, registrar a falha exata, ligar ao código e retestar no mesmo teste.',
  topics: [
    {
      emoji: '🪞', title: 'Computer use assistindo computer use', sub: 'O caso do app com agentes e um recurso fraco',
      what: 'O cenário do vídeo: um app próprio (um clone de assistente com vários agentes) cujo recurso de computer use é o menos confiável. O Codex abre o app, pede que ele navegue, e observa cada ação do agente interno.',
      why: 'Testar um agente pela interface real, com outro agente, é o único jeito de ver o que o usuário vê, incluindo o que o seu log não mostra.',
      keys: 'App-alvo, agente interno, observador externo, ponto exato de falha.',
      body: (t) => [
        c.p('O autor mostra um app que ele mesmo construiu, com vários agentes conectados a assinaturas e provedores de modelo, cada agente podendo ter o próprio computador. "De todos os recursos, o computer use é o mais fraco, porque é o mais difícil de ensinar a um agente completamente cru." A saída: mandar o Codex abrir o app, pedir uma tarefa de navegador ao agente interno e <strong class="text-blue-400">assistir</strong>.'),
        c.glossary(t, [
          ['App-alvo', 'O seu app, com o próprio agente dentro. É quem está sendo testado.'],
          ['Checkout do código', 'Uma cópia local do código-fonte do app, na versão exata que está rodando. Sem ela, o agente externo não consegue ligar a falha a uma linha.'],
          ['Ambiente isolado', 'Uma cópia de desenvolvimento onde o agente pode corrigir e relançar sem tocar no que está em produção.'],
          ['Conversa limpa', 'Uma conversa nova no app-alvo, sem histórico, para que o teste não herde contexto de outra sessão.'],
        ]),
        c.figure(t, svg.split(t, { label: 'Dois agentes, dois papéis: o Codex observa e registra; o app-alvo executa a tarefa com o próprio computer use. O observador nunca faz o trabalho do observado', bridge: 'observa, não substitui', left: { title: 'CODEX (observador)', items: ['Abre o app-alvo', 'Envia a tarefa ao agente interno', 'Assiste ações e saída de ferramentas', 'Registra o ponto de falha'] }, right: { title: 'APP-ALVO (executor)', items: ['Recebe a tarefa', 'Usa o próprio computer use', 'Navega, clica, responde', 'Falha ou conclui'] } }), 'Se a seta do observador atravessar para a direita e ele mesmo navegar, o teste deixou de medir o app. O prompt proíbe isso por escrito.'),
        c.tip({ title: 'Onde isso se aplica além do vídeo', text: 'Qualquer app com um agente dentro: um assistente de atendimento, um bot de pesquisa, um painel com "pergunte à IA". O fluxo é o mesmo: tarefa pequena e só de leitura, observação externa, ponto de falha, código, reteste.' }),
      ],
    },
    {
      emoji: '📝', title: 'O prompt 03, traduzido', sub: 'Teste meu app pela interface real, incluindo o computer use dele',
      what: 'O prompt do kit: app, repositório correspondente, tarefa de navegador, fonte pública para conferir, critérios de sucesso; conversa limpa; observar sem substituir; conferir um fato; fechar e reabrir; reproduzir, corrigir a menor causa, retestar, com teto de três tentativas.',
      why: 'Cobre o ciclo inteiro, da observação ao reparo, com os freios que evitam um agente reescrevendo o seu app de madrugada.',
      keys: 'Conversa limpa, não substituir, persistência, menor causa, três tentativas, sem deploy.',
      body: (t) => [
        c.code(t, { objective: 'Testar o agente do seu app pela interface, ligar a falha ao código e retestar (Codex com computer use; app e checkout do código na mesma versão; ambiente isolado)', lang: 'text', code: `Teste meu app pela interface real dele, incluindo o próprio recurso de computer use.

App: <NOME_OU_CAMINHO_DO_APP>
Repositório correspondente: <CAMINHO_DO_REPO>
Tarefa de navegador: <TAREFA_PEQUENA_SO_DE_LEITURA>
Fonte para conferir: <URL_PUBLICA>
Critérios de sucesso: <CONDICOES_OBSERVAVEIS_DE_APROVACAO>

Abra uma conversa de teste limpa no app correto. Peça ao agente do app que execute a tarefa de navegador usando a capacidade de computer use dele. Observe as ações e a saída das ferramentas. Não substitua a navegação do app pela sua e depois marque o app como aprovado.

Confira um fato devolvido contra a fonte pública. Feche e reabra a conversa para testar persistência. Capture o ponto exato de falha se a tarefa travar, perder contexto, usar a janela errada ou devolver uma afirmação sem suporte.

Se falhar, reproduza a falha e verifique que o checkout fornecido compila este app. Na cópia local de desenvolvimento, corrija a menor causa, rode os testes relevantes, recompile ou relance conforme necessário e repita o teste de interface idêntico. Preserve trabalho não relacionado. Limite esta execução a três tentativas de reparo; se ainda falhar, devolva a evidência e o próximo passo de diagnóstico.

Devolva comportamento antes/depois, arquivos alterados, resultados de teste, qualquer falha restante e um pedido reproduzível. Não faça deploy público, não acesse conversas privadas, não faça compras nem envie mensagens externas.`, verify: 'O app testado executou as próprias ações (o relatório descreve as ações dele, não as do Codex). Se houve falha, ela está registrada com o ponto exato. Qualquer reparo passou no mesmo teste de interface, e a conversa sobreviveu ao fechar e reabrir.' }),
        c.table(t, { headers: ['Marcador', 'No vídeo', 'No seu caso'], rows: [
          ['TAREFA_PEQUENA_SO_DE_LEITURA', 'Uma busca no Google Flights usando "suas habilidades de computador"', 'Algo que termina em minutos e não muda nada: consultar, comparar, ler.'],
          ['URL_PUBLICA', 'A página do Google Flights com o resultado', 'Um lugar público onde um fato da resposta pode ser conferido.'],
          ['CONDICOES_OBSERVAVEIS', '"O agente do app navega, devolve um voo com preço, e a conversa reaberta mantém o resultado"', 'Três a cinco condições visíveis. Nada de "funciona bem".'],
        ] }),
        c.alert({ title: 'Versão do app e do código têm que bater', text: 'O prompt pede "verifique que o checkout fornecido compila este app". Se o código é de uma versão e o app instalado é de outra, o reparo corrige uma linha que o app em teste não tem, e o reteste passa ou falha por motivo errado.' }),
      ],
    },
    {
      emoji: '🚫', title: 'Não substitua o trabalho do app', sub: 'A regra que separa teste de encenação',
      what: 'A proibição central: o agente externo não pode fazer a tarefa ele mesmo e marcar o app como aprovado. Ele observa o app fazer.',
      why: 'Um agente capaz, vendo o app travar, tende a "ajudar" e completar a tarefa. O relatório sai verde e o bug continua lá.',
      keys: 'Observar, não executar, aprovação falsa, evidência das ações do app.',
      body: (t) => [
        c.p('"Do not substitute your own browsing for the app\'s work and then mark the app as passing." O Codex tem o próprio computer use e é melhor nele do que o app em teste. É exatamente por isso que a tentação existe. O prompt fecha essa porta.'),
        c.grid2(t, { okTitle: 'Comportamento correto do observador', ok: ['Envia a tarefa ao agente do app e espera.', 'Descreve cada ação que o app fez ("abriu nova aba", "digitou a rota", "parou no seletor de datas").', 'Quando o app trava, registra o ponto e para: não completa.', 'Usa o painel do próprio app (o vídeo cita um componente para "espiar" as ações) como fonte das observações.'], badTitle: 'Encenação que reprova o teste', bad: ['O observador abre o navegador dele, faz a busca e cola o resultado na conversa do app.', 'Relatório com "a busca foi concluída" sem dizer quem concluiu.', '"O app teve dificuldade, então eu terminei para verificar o resto do fluxo."', 'Marcar aprovado com base no resultado final, ignorando que o app não chegou lá.'] }),
        c.concept(t, { title: 'Como saber, lendo o relatório', emoji: '🧐', bullets: [
          'Toda ação tem sujeito: "o agente do app clicou", nunca "cliquei".',
          'As falhas têm ponto exato, não desfecho: "travou ao tentar selecionar a data de volta", não "não deu certo".',
          'Se o observador fez algo, foi <strong>antes</strong> (abrir o app, criar a conversa) ou <strong>depois</strong> (conferir o fato na fonte), nunca no meio da tarefa.',
        ] }),
      ],
    },
    {
      emoji: '💾', title: 'Persistência: fechar e reabrir', sub: 'O teste que os logs não fazem',
      what: 'Depois da tarefa, o observador fecha a conversa do app e reabre, confirmando que o resultado e o contexto continuam lá.',
      why: 'Um agente pode acertar a tarefa e perder tudo ao reabrir. Para o usuário, isso é o mesmo que ter falhado.',
      keys: 'Reabrir, contexto retido, resultado persistido, janela de contexto, compactação.',
      body: (t) => [
        c.steps(t, { title: 'A sequência de persistência', items: [
          { h: 'Terminar (ou travar) a tarefa', text: 'Registrar o estado final da conversa: o que o app respondeu, o que ficou na tela.' },
          { h: 'Fechar a conversa', text: 'Fechar de verdade, não minimizar. Se o app tem "sessões", sair da sessão.' },
          { h: 'Reabrir a mesma conversa', text: 'Pelo histórico do app. Não criar uma nova.' },
          { h: 'Comparar', text: 'O resultado está lá? O agente lembra do que fez? Uma pergunta de follow-up funciona?' },
        ] }),
        c.data({ title: 'Por que o app do vídeo falhou', items: [
          'O agente interno usava um <strong>modelo mais antigo</strong>, com janela de contexto menor.',
          'O app não tinha um recurso de <strong>compactação</strong> da conversa: quando o histórico de ações de computer use cresceu, estourou.',
          'O Codex viu a falha "muito rapidamente" e o autor conclui: com um objetivo declarado, ele "veria a falha, ajustaria o código, relançaria e repetiria o ciclo até melhorar".',
        ] }),
        c.tip({ title: 'Duas causas comuns de falha de persistência', text: 'Histórico de computer use é pesado (cada passo carrega uma imagem). Apps que não resumem ou descartam capturas antigas estouram o contexto. E apps que guardam o estado só em memória perdem tudo ao fechar. As duas aparecem neste teste e não aparecem em nenhum log.' }),
      ],
    },
    {
      emoji: '🔧', title: 'O ciclo de reparo com teto de três tentativas', sub: 'Reproduzir, menor causa, testes, relançar, mesmo teste',
      what: 'O modo de reparo do prompt: reproduzir a falha, confirmar que o código compila o app, corrigir a menor causa na cópia de desenvolvimento, rodar testes, relançar e repetir o teste de interface idêntico. No máximo três vezes.',
      why: 'Sem o teto, um agente autônomo pode passar horas reescrevendo. Sem "menor causa", ele refatora o app inteiro para corrigir um seletor.',
      keys: 'Reproduzir, menor causa, testes relevantes, relançar, teste idêntico, teto de três, evidência e próximo passo.',
      body: (t) => [
        c.figure(t, svg.flow(t, { label: 'O ciclo de reparo: reproduzir a falha, corrigir a menor causa na cópia local, rodar testes, relançar o app e repetir exatamente o mesmo teste de interface; no máximo três voltas', steps: [
          { title: 'Reproduzir', sub: 'a falha, no app' }, { title: 'Menor causa', sub: 'na cópia local' }, { title: 'Testes', sub: 'os relevantes' }, { title: 'Relançar', sub: 'recompilar se preciso' }, { title: 'Mesmo teste', sub: 'idêntico, pela interface' },
        ] }), 'A última caixa é a mesma tarefa da primeira rodada, palavra por palavra. Mudar o teste para o reparo passar é a forma mais comum de enganar a si mesmo.'),
        c.table(t, { headers: ['Seção do relatório', 'O que precisa ter'], rows: [
          ['Antes / depois', 'O comportamento observado na interface nas duas rodadas, com o ponto exato de falha da primeira.'],
          ['Arquivos alterados', 'Lista curta. Se for longa, a "menor causa" não foi respeitada.'],
          ['Resultados de teste', 'Os testes relevantes que rodaram, e o resultado. Não "todos os testes", que pode levar horas.'],
          ['Falha restante', 'Se após três tentativas ainda falha: a evidência e o próximo passo de diagnóstico, não uma quarta tentativa.'],
          ['Pedido reproduzível', 'O prompt exato para repetir o teste amanhã, com o app relançado.'],
        ] }),
        c.alert({ title: 'Os quatro "não" do reparo', text: 'Não faça deploy público. Não acesse conversas privadas do app. Não faça compras. Não envie mensagens externas. O ambiente é isolado por isso: o reparo acontece na cópia de desenvolvimento e o resto do mundo não fica sabendo até você decidir.' }),
      ],
    },
    {
      emoji: '🌙', title: 'Rodar de madrugada, e o que fazer quando o app não tem agente', sub: 'Objetivo declarado, teto declarado, jornada concreta',
      what: 'A extensão que o vídeo sugere: rodar o ciclo por horas com um objetivo declarado e acordar com uma lista de bugs encontrados e corrigidos. E a adaptação do guia para apps sem agente: substituir a tarefa de navegador por uma jornada de usuário.',
      why: 'O valor real do fluxo está na repetição sem você. Mas repetição sem teto e sem prova é dívida técnica automática.',
      keys: 'Objetivo declarado, teto de tentativas, jornada de usuário, criar-salvar-reabrir.',
      body: (t) => [
        c.p('"Na verdade eu iria querer que isso rodasse por horas, talvez com algo como um comando de objetivo, e acordar com uma série de bugs identificados e corrigidos." O prompt do kit é o que torna isso seguro: objetivo observável, teto de três tentativas por falha, sem deploy, e relatório com pedido reproduzível.'),
        c.cards(t, [
          { emoji: '🎯', h: 'Objetivo, não tarefa', text: '"Fazer o computer use do app completar a busca de voo e persistir ao reabrir" é um objetivo. O agente decide quais falhas atacar, dentro do teto.' },
          { emoji: '🧱', h: 'Teto por falha', text: 'Três tentativas por falha, não três no total. Uma falha resistente vira "evidência e próximo passo" e o agente segue para a próxima.' },
          { emoji: '📋', h: 'O que você lê de manhã', text: 'Uma lista: falha, ponto exato, causa, arquivos, teste que passou, ou "não resolvido, próximo passo". Nada de "melhorei o app".' },
        ]),
        c.grid2(t, { okTitle: 'App sem agente: a jornada de usuário', ok: ['Criar um rascunho de projeto.', 'Salvar.', 'Fechar o app.', 'Reabrir e confirmar que o rascunho está lá, com o mesmo conteúdo.'], badTitle: 'O que não serve como jornada', bad: ['"Navegar pelo app e ver se está tudo bem."', '"Testar todas as telas."', 'Uma jornada que muda dados de produção.', 'Uma jornada sem estado para persistir (nada para reabrir e conferir).'] }),
        c.tip({ title: 'Regra do "make it yours" do guia', text: 'Para um app sem agente, troque a tarefa de navegador por uma jornada concreta com começo, meio e algo para reabrir. O resto do prompt (observar, ponto de falha, reparo com teto, mesmo teste) fica igual.' }),
      ],
    },
  ],
  quiz: [
    { q: 'O agente do seu app travou na seleção de datas. O Codex abriu o próprio navegador, terminou a busca e marcou o app como aprovado. O que está errado?', options: ['Nada: a busca foi concluída.', 'O observador substituiu o trabalho do app; o teste deixou de medir o app e a aprovação é falsa.', 'Ele deveria ter usado o Chrome em vez do navegador interno.'], answer: 1, why: 'A regra central do fluxo: não substituir a navegação do app pela sua e depois marcar como aprovado. O ponto de falha devia ter sido registrado.' },
    { q: 'Após três tentativas de reparo, o app ainda falha. O que o agente faz?', options: ['Tenta uma quarta vez com uma abordagem diferente.', 'Devolve a evidência e o próximo passo de diagnóstico, e para.', 'Faz deploy da melhor versão até aqui.'], answer: 1, why: 'O teto existe para isso. Quarta tentativa viola o orçamento; deploy é proibido pelo prompt.' },
    { q: 'O reparo passou num teste ligeiramente diferente do original (tarefa mais curta). Vale?', options: ['Sim, o importante é passar.', 'Não: o reteste tem que ser o teste de interface idêntico; mudar o teste para o reparo passar invalida a prova.', 'Vale se os testes unitários passaram.'], answer: 1, why: 'O prompt pede repetir "o teste de interface idêntico". Só assim o antes/depois compara a mesma coisa.' },
  ],
  summary: [
    ['Dois papéis', 'o Codex observa e registra; o app-alvo executa com o próprio computer use. O observador nunca substitui.'],
    ['Cinco entradas', 'app, checkout na mesma versão, tarefa pequena só de leitura, fonte pública, critérios observáveis.'],
    ['Persistência', 'fechar e reabrir a conversa; as duas causas comuns de falha são contexto estourado por capturas e estado só em memória.'],
    ['Ciclo de reparo', 'reproduzir, menor causa, testes relevantes, relançar, mesmo teste; três tentativas por falha; sem deploy, compra ou mensagem.'],
    ['Madrugada e apps sem agente', 'objetivo declarado com teto; para app sem agente, uma jornada concreta com algo para reabrir.'],
  ],
};

export const T2 = { modules: [M21, M22, M23, ...T2B.modules] };
