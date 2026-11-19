// Trilha 2 — Os cinco fluxos (blue) — módulos 2.4 e 2.5
import { c, svg } from './lib.mjs';

const M24 = {
  id: '2-4', emoji: '🎬', title: 'A entrega da edição', punch: 'Do render ao link, sem esperar acordado', minutes: 45, level: 'Intermediário', kind: 'Prática',
  lead: 'Renderizar em 4K leva de 40 minutos a 4 horas. Depois vem subir no editor, aplicar a limpeza, revisar cada corte, exportar, mandar para a equipe. O agente espera o render, faz a parte de interface que nenhuma linha de comando alcança, e só entrega quando o arquivo exportado abre, tem imagem e som e o conteúdo único sobreviveu.',
  topics: [
    {
      emoji: '⏳', title: 'O gargalo: render longo e um editor que só existe na interface', sub: 'Onde a linha de comando chega a 80% e para',
      what: 'O fluxo completo do vídeo: clicar em renderizar, o agente verificar o progresso a cada 30 minutos, abrir o Descript, importar, enviar o prompt de limpeza, revisar os cortes, exportar, subir no Drive e mandar o link.',
      why: 'Ferramentas como o Descript têm linha de comando própria que cobre parte do trabalho. A parte que falta é exatamente a que exige olhos: o chat do editor, os frames, a confirmação visual do export.',
      keys: 'Render, polling, importação, transcrição, limpeza conservadora, export, verificação de mídia.',
      body: (t) => [
        c.p('O autor grava de madrugada e não quer esperar até as três ou quatro da manhã pelo render para fazer ajustes antes de mandar para a equipe de edição. Com computer use, o fluxo vira: <strong class="text-blue-400">clicar em renderizar e ir dormir</strong>. O agente verifica a cada 30 minutos, e quando o arquivo está pronto, faz o resto.'),
        c.glossary(t, [
          ['Render', 'O processo de gerar o arquivo de vídeo final a partir do projeto de edição. Em 4K, dura de dezenas de minutos a horas.'],
          ['Polling', 'Verificar periodicamente se algo terminou. Aqui: olhar a barra de progresso ou o arquivo a cada 30 minutos.'],
          ['Transcrição', 'O texto do que foi falado, gerado pelo editor. É sobre ela que a limpeza de retakes e vícios de fala é feita.'],
          ['Decodificar', 'Abrir e ler o arquivo de vídeo sem erro. Um arquivo que existe mas não decodifica é um arquivo quebrado.'],
          ['Retake', 'Uma repetição de fala: a pessoa erra, para e diz de novo. A limpeza corta as tentativas falhas e mantém a última.'],
        ]),
        c.figure(t, svg.flow(t, { label: 'O fluxo de entrega: render, espera com verificação a cada 30 minutos, importação no editor, prompt de limpeza, revisão dos cortes, export verificado, upload e link', steps: [
          { title: 'Render', sub: 'você clica e sai' }, { title: 'Esperar', sub: 'verificar a cada 30 min' }, { title: 'Importar', sub: 'projeto novo no Descript' }, { title: 'Limpar', sub: 'prompt conservador' }, { title: 'Revisar', sub: 'cortes, início e fim' }, { title: 'Exportar', sub: 'e verificar a mídia' },
        ] }), 'As três primeiras caixas a linha de comando faz. As três últimas exigem a interface do editor. Computer use cobre as seis com a mesma sessão.'),
        c.concept(t, { title: 'De 80% a 100%', emoji: '📈', paras: ['"Ferramentas como o Descript têm linha de comando própria e até agora ela me levava a 80%. Com computer use, você pega processos que eram 80% possíveis e leva a 100%, com as poucas partes que precisavam de um humano." A frase resume o critério de uso: computer use entra onde a automação convencional para.'] }),
      ],
    },
    {
      emoji: '📝', title: 'O prompt 04, traduzido', sub: 'Rode meu fluxo de edição pós-render',
      what: 'O prompt do kit: vídeo de origem, pasta e nome de saída, pasta opcional do Drive, arquivo do prompt de limpeza; verificar estabilidade e propriedades do original; projeto novo; limpeza; comparação de transcrições; revisão dos cortes; export na resolução da fonte; verificação da mídia; upload opcional.',
      why: 'É o prompt com mais verificações de mídia do kit, porque vídeo é onde "pronto" mais engana: o arquivo existe, tem o nome certo, e está corrompido.',
      keys: 'Original preservado, projeto novo, prompt completo enviado, comparação de transcrições, export verificado, sem publicar.',
      body: (t) => [
        c.code(t, { objective: 'Levar um vídeo já renderizado até o export limpo e verificado, e opcionalmente ao Drive (Codex com computer use; Descript instalado e logado; comece com um vídeo curto de teste)', lang: 'text', code: `Rode meu fluxo de edição pós-render usando a amostra concluída abaixo.

Vídeo de origem: <CAMINHO_DO_VIDEO>
Pasta de saída: <PASTA_DE_SAIDA>
Nome do arquivo de saída: <NOVO_NOME>
Pasta do Drive (opcional): <URL_DA_PASTA_OU_NONE>
Arquivo do prompt de limpeza: <CAMINHO_DO_07_DESCRIPT_CLEANUP_TXT>

Verifique que o arquivo de origem está estável e decodifica; registre duração, resolução e propriedades de áudio. Preserve o original. Crie um projeto novo no Descript e importe o vídeo. Use a linha de comando ou API do app para as etapas suportadas e computer use para as etapas de interface que exigirem. Espere a importação e a transcrição terminarem.

Envie o prompt completo de limpeza conservadora fornecido. Espere a edição terminar e compare as transcrições original e editada. Mantenha o último take e todo ponto único. Assista e ouça ao redor dos cortes alterados, do início e do fim. Repare palavras cortadas, conteúdo único ausente ou junções estranhas antes de exportar.

Exporte com o novo nome, na resolução da origem. Verifique que o arquivo exportado decodifica, contém imagem e som, e corresponde à edição e à resolução pretendidas. Reporte duração da origem e do export sem tratar uma edição mais curta como prova de qualidade.

Se eu forneci uma pasta do Drive, envie o export verificado e confira nome, tamanho e destino. Senão, salve localmente. Devolva o caminho local, o link opcional do Drive e o resumo de verificação. Não envie a ninguém nem publique. Pare com o bloqueio exato se autenticação ou um controle necessário não estiver disponível.`, verify: 'O original está intocado (mesmo tamanho e data). O prompt de limpeza completo foi enviado (não um resumo dele). A transcrição editada mantém todos os pontos únicos. Os cortes soam naturais no início, no fim e nas junções. O arquivo exportado decodifica, tem imagem e som e está na resolução da origem.' }),
        c.table(t, { headers: ['Etapa', 'Quem faz', 'Por quê'], rows: [
          ['Verificar origem, registrar propriedades', 'Linha de comando (ffprobe ou equivalente)', 'Mais confiável que olhar a tela; produz números.'],
          ['Criar projeto, importar', 'API/CLI do app se existir; senão, interface', 'O prompt manda usar o caminho suportado primeiro.'],
          ['Enviar o prompt de limpeza no chat do editor', 'Interface (computer use)', 'Não existe caminho programático "fácil" para o chat, segundo o vídeo.'],
          ['Revisar cortes frame a frame', 'Interface', 'Exige olhos e ouvidos: tosse, palavra cortada, junção estranha.'],
          ['Exportar e verificar a mídia', 'Interface para exportar; linha de comando para verificar', 'A verificação por número (decodifica, duração, resolução) não depende da tela.'],
        ] }),
        c.tip({ title: 'Comece com um vídeo curto', text: 'O guia diz: forneça um vídeo curto de teste primeiro. O fluxo tem muitas etapas de interface; descobrir que o botão de exportar mudou de lugar num vídeo de 3 minutos custa menos do que num de 40.' }),
      ],
    },
    {
      emoji: '🕒', title: 'Esperar o render: verificar a cada 30 minutos e testar estabilidade', sub: 'Um arquivo que aparece na pasta ainda não está pronto',
      what: 'O comportamento de espera: verificar periodicamente, e só considerar o render terminado quando o arquivo para de crescer e decodifica.',
      why: 'Um render em andamento já tem nome e já está na pasta. Importar nesse momento produz um vídeo cortado no meio.',
      keys: 'Estabilidade do arquivo, tamanho constante, decodificação, acompanhamento agendado.',
      body: (t) => [
        c.steps(t, { title: 'Como o agente decide que o render acabou', items: [
          { h: 'Verificar em intervalo', text: 'A cada 30 minutos no vídeo. Para renders curtos, 5 a 10. O intervalo é seu; o prompt pede um acompanhamento agendado que o seu ambiente suporte.' },
          { h: 'Tamanho parou de crescer', text: 'Duas verificações seguidas com o mesmo tamanho de arquivo. Um render em curso cresce entre elas.' },
          { h: 'O arquivo decodifica', text: 'Abrir com a ferramenta de linha de comando e ler duração, resolução e áudio sem erro. Arquivo incompleto costuma falhar aqui.' },
          { h: 'Só então importar', text: 'E preservar o original: o Descript trabalha numa cópia importada; a origem não muda.' },
        ] }),
        c.alert({ title: 'A frase do guia sobre prova', text: '"Observe estabilidade e decodificação do arquivo; uma captura de tela ou um nome de arquivo sozinho não prova conclusão." Vale para o render e vale para o export no fim. Nas duas pontas, o número (tamanho, duração, resolução) é a prova; a tela é o indício.' }),
        c.grid2(t, { okTitle: 'Sinais de render concluído', ok: ['Tamanho igual em duas verificações consecutivas.', 'ffprobe (ou equivalente) devolve duração e resolução sem erro.', 'O programa de render mostra 100% e liberou o arquivo.'], badTitle: 'Falsos positivos', bad: ['O arquivo apareceu na pasta.', 'A barra de progresso sumiu.', 'O nome está certo e a extensão é .mp4.'] }),
      ],
    },
    {
      emoji: '✂️', title: 'A limpeza conservadora: as regras que protegem o conteúdo', sub: 'Cortar retakes e vícios, nunca o que é único',
      what: 'O prompt de limpeza que acompanha o kit (prompt 07), resumido nas regras que importam: manter o último take, nunca cortar conteúdo único, deixar respiro ao redor de cada corte, separar retake de frase nova, checar coerência, ajustar o ritmo por trecho.',
      why: 'Uma limpeza agressiva parece eficiente e destrói o vídeo. O prompt é longo justamente para forçar o editor a errar para o lado de deixar.',
      keys: 'Último take, conteúdo único, respiro no corte, coerência, ritmo por trecho, na dúvida deixa.',
      body: (t) => [
        c.p('O prompt de limpeza é o mais longo do kit e vem em arquivo separado porque deve ser enviado <strong class="text-blue-400">completo</strong> ao chat do editor. Ele define o que é retake, o que é conteúdo único, e como cortar. Abaixo, uma versão em português das regras, para você adaptar ao seu jeito de falar.'),
        c.code(t, { objective: 'Prompt de limpeza conservadora para colar no chat do editor de vídeo (Descript ou equivalente com edição por transcrição)', lang: 'text', code: `Limpe este trecho de vídeo. Trate-o como um segmento independente e aplique as regras abaixo.

OBJETIVO
Remover retakes e vícios de fala e encurtar pausas longas, mantendo a fala natural. Edição conservadora: na dúvida, deixe.

REGRAS INEGOCIÁVEIS (aplique primeiro)
1. Sempre mantenha a ÚLTIMA versão de qualquer retake. Corte as tentativas anteriores, nunca a final.
2. Nunca corte conteúdo único. Só corte retakes claros e tentativas abandonadas. Se uma frase diz algo novo, ela fica.
3. Deixe respiro ao redor de todo corte. Não emende tão junto que a última palavra do trecho mantido seja cortada ou o próximo trecho comece antes da palavra anterior terminar.

O QUE CONTA COMO RETAKE
Aberturas repetidas (a mesma frase começada duas ou mais vezes); reinícios e autocorreções no meio da frase; gagueiras de preenchimento; frase que morre e é seguida por uma versão reformulada da mesma ideia. Em todos os casos: corte as tentativas falhas, mantenha a versão limpa final.

SEPARE RETAKE DE CONTEÚDO ÚNICO
Um bloco bagunçado mistura tentativas falhas e frases únicas. Não apague o bloco inteiro. Se há três começos falhos e depois uma frase única limpa, corte só os três começos.

CHECAGEM DE COERÊNCIA (depois de cortar)
O resultado tem que fluir: sem palavra de transição órfã, sem salto brusco, sem palavra pela metade invadindo o próximo trecho. Reouça cada ponto de corte; se soar abrupto, devolva um pouco de respiro.

RITMO
Se este trecho é a abertura do vídeo, mantenha apertado. Nos demais, ritmo natural, sem comprimir demais. Encurte pausas longas em todo lugar, mas deixe respiro suficiente para soar humano.`, verify: 'Compare as duas transcrições: nenhuma frase que dizia algo novo sumiu; em cada bloco de retakes, a versão mantida é a última; ao ouvir os cortes, nenhuma palavra está cortada pela metade.' }),
        c.grid2(t, { okTitle: 'É retake: pode cortar', ok: ['"Então o que a gente... então o que a gente faz aqui é..." (abertura repetida)', '"Isso é, tipo, é como se..." seguido de "É como se fosse um molde." (gagueira + versão limpa)', 'Uma frase que para no meio e é dita de novo com outras palavras'], badTitle: 'É conteúdo único: fica', bad: ['Uma frase no meio de retakes que traz uma informação nova', 'Um exemplo dito uma vez só, mesmo com hesitação', 'Uma pausa expressiva antes de um ponto importante'] }),
        c.alert({ title: 'Por que "na dúvida, deixe"', text: 'O custo de deixar um retake a mais é um vídeo três segundos mais longo. O custo de cortar uma frase única é perder a informação para sempre, ou ter que regravar. A assimetria é o motivo de todo o prompt pender para o conservador.' }),
      ],
    },
    {
      emoji: '🔎', title: 'Verificar o export de verdade', sub: 'Decodifica, tem imagem e som, está na resolução certa',
      what: 'A prova de conclusão do fluxo: o original intacto, o prompt completo enviado, o conteúdo único preservado, os cortes naturais, e o arquivo exportado verificado por número, não por aparência.',
      why: 'Export é onde o "pronto" mais engana: arquivo com nome certo, tamanho plausível, e sem áudio.',
      keys: 'Decodificação, faixa de vídeo e de áudio, resolução da origem, duração reportada sem julgamento.',
      body: (t) => [
        c.data({ title: 'A lista de verificação do export', items: [
          'O arquivo <strong>decodifica</strong> do início ao fim (leitura completa sem erro, não só o cabeçalho).',
          'Tem <strong>faixa de vídeo e faixa de áudio</strong>. Export sem áudio é a falha silenciosa mais comum.',
          'A <strong>resolução</strong> é a da origem. Muitos editores exportam em 1080p por padrão mesmo com origem 4K.',
          'A <strong>duração</strong> é reportada ao lado da original, sem a frase "ficou mais curto, logo melhor".',
          'O <strong>original</strong> continua com o mesmo tamanho e a mesma data de modificação.',
        ] }),
        c.table(t, { headers: ['Verificação', 'Como fazer por número', 'O que reprova'], rows: [
          ['Decodifica', 'Ler o arquivo inteiro com a ferramenta de linha de comando de vídeo', 'Erro em qualquer ponto; arquivo truncado'],
          ['Imagem e som', 'Listar as faixas do arquivo', 'Só uma faixa; áudio mudo (nível zero) por todo o arquivo'],
          ['Resolução', 'Comparar largura × altura com a origem', 'Qualquer diferença, a menos que você tenha pedido'],
          ['Duração', 'Origem × export, em segundos', 'Nada reprova por si; diferença grande pede escuta dos cortes'],
        ] }),
        c.alert({ title: 'Mais curto não é melhor', text: 'O prompt manda reportar a duração "sem tratar uma edição mais curta como prova de qualidade". Uma limpeza que cortou dois minutos pode ter cortado um minuto de retakes e um minuto de conteúdo. A prova é a comparação de transcrições e a escuta dos cortes, não a diferença de tempo.' }),
      ],
    },
    {
      emoji: '☁️', title: 'Entrega: Drive, link e a mensagem que você envia', sub: 'O agente prepara; quem publica é você',
      what: 'O fim do fluxo: upload opcional do export verificado, conferência de nome, tamanho e destino, e o link devolvido. No vídeo, o agente vai até o WhatsApp mandar o link para a equipe; o prompt do kit para antes disso.',
      why: 'Enviar é irreversível. O kit deixa a decisão de publicar e de avisar pessoas fora do escopo do agente por padrão.',
      keys: 'Upload verificado, nome e tamanho conferidos, link devolvido, não publicar, não enviar.',
      body: (t) => [
        c.p('No vídeo, depois do export, o agente cria o link no Drive pelo conector e "abre o WhatsApp no computador e manda uma mensagem com o link". O prompt do kit é mais conservador: envia ao Drive se você deu a pasta, confere nome, tamanho e destino, devolve o link e <strong class="text-blue-400">não envia a ninguém nem publica</strong>. Se você quer a mensagem, adiciona explicitamente e assume o risco.'),
        c.cards(t, [
          { emoji: '📁', h: 'Upload conferido', text: 'Depois de enviar, o agente confere no destino: o arquivo está lá, com o nome pedido e o tamanho igual ao local. Um upload interrompido produz um arquivo menor.' },
          { emoji: '🔗', h: 'O que volta para você', text: 'Caminho local, link do Drive (se houver) e o resumo de verificação: durações, resolução, faixas, o que foi cortado em linhas gerais.' },
          { emoji: '🛑', h: 'Onde o agente para', text: 'Antes de mandar mensagem, publicar ou compartilhar com alguém. Se você quiser que ele avise a equipe, escreva isso e nomeie o destinatário e o canal.' },
        ]),
        c.figure(t, svg.split(t, { label: 'O fluxo dividido entre o que a automação por linha de comando cobre e o que só computer use alcança: o editor, a revisão visual e a confirmação do export', bridge: '80% + 20% = entrega', left: { title: 'LINHA DE COMANDO (80%)', items: ['Verificar o arquivo de origem', 'Esperar o render por tamanho', 'Criar projeto e importar (se a API existe)', 'Verificar o export por número', 'Subir no Drive'] }, right: { title: 'COMPUTER USE (20%)', items: ['Enviar o prompt no chat do editor', 'Esperar a edição na interface', 'Revisar cortes frame a frame', 'Clicar em exportar e acompanhar', 'Confirmar visualmente o resultado'] } }), 'A coluna da direita é pequena e é a que impedia o fluxo de rodar sozinho. Computer use não substitui a esquerda; completa.'),
        c.tip({ title: 'Render que ainda não terminou', text: 'O guia prevê: "para um render inacabado, peça explicitamente um acompanhamento agendado que o seu ambiente suporte". Ou seja, diga ao agente para verificar de tanto em tanto e só começar quando o arquivo estiver estável e decodificável. Sem isso, ele tenta importar um arquivo pela metade.' }),
      ],
    },
  ],
  quiz: [
    { q: 'O agente reportou: "export concluído, 3 minutos mais curto que a origem, arquivo na pasta". O que falta para aceitar?', options: ['Nada, o objetivo era encurtar.', 'A verificação por número (decodifica, imagem e som, resolução) e a comparação de transcrições; duração menor não prova qualidade.', 'Uma captura de tela do Descript.'], answer: 1, why: 'O prompt exige verificar a mídia e comparar transcrições, e proíbe tratar edição mais curta como prova.' },
    { q: 'O arquivo de render apareceu na pasta com o nome certo. O agente pode importar?', options: ['Sim, o nome está certo.', 'Só quando o tamanho parar de crescer entre duas verificações e o arquivo decodificar.', 'Sim, se a barra de progresso sumiu.'], answer: 1, why: 'Estabilidade e decodificação são a prova de render concluído. Nome e presença na pasta não são.' },
    { q: 'Na transcrição, um bloco tem três começos falhos e depois uma frase única. O que a limpeza conservadora faz?', options: ['Corta o bloco inteiro, está bagunçado.', 'Corta só os três começos falhos e mantém a frase única.', 'Mantém tudo, na dúvida deixa.'], answer: 1, why: 'A regra "separe retake de conteúdo único": as tentativas falhas saem, a frase que diz algo novo fica.' },
  ],
  summary: [
    ['O gargalo', 'render longo mais um editor que só existe na interface; a linha de comando chega a 80%, computer use completa.'],
    ['Esperar direito', 'verificar em intervalo, tamanho estável em duas checagens, arquivo decodifica; só então importar, preservando o original.'],
    ['Limpeza conservadora', 'último take fica, conteúdo único nunca sai, respiro em todo corte, coerência checada, ritmo por trecho.'],
    ['Export verificado por número', 'decodifica inteiro, tem imagem e som, resolução da origem, duração reportada sem julgamento.'],
    ['Entrega', 'upload conferido por nome e tamanho, link devolvido; publicar e avisar pessoas fica fora do escopo até você pedir.'],
  ],
};

const M25 = {
  id: '2-5', emoji: '📱', title: 'O celular pelo computador', punch: 'Espelhar, configurar, provar que persistiu', minutes: 40, level: 'Intermediário', kind: 'Prática',
  lead: 'Há apps que só existem no celular. Com o espelhamento do iPhone aberto no Mac, o agente assume a janela, entra no app, confirma a conta, aplica a configuração pedida e prova que ela persistiu. O caso do vídeo é um Instagram recém-criado; o padrão vale para qualquer app móvel.',
  topics: [
    {
      emoji: '🪟', title: 'O espelhamento como superfície', sub: 'Uma janela no computador que é o seu celular',
      what: 'O iPhone Mirroring do macOS mostra e controla o iPhone numa janela do Mac. Para o agente, é uma janela como qualquer outra: ele vê, clica e digita nela.',
      why: 'É a única forma de computer use alcançar apps sem versão de desktop. E é a superfície com mais coisa sua exposta, o que muda as regras.',
      keys: 'iPhone Mirroring, janela alvo, autenticação sua, rótulos reais do app.',
      body: (t) => [
        c.p('"Você pode pedir ao Codex que use o app de espelhamento do iPhone que eu abri para configurar o Instagram no meu telefone de verdade." O autor descreve a surpresa: o agente abre o espelhamento, acha o app, entra em configurações, confirma a conta e começa a mexer. O que torna isso seguro é o que vem antes e depois.'),
        c.glossary(t, [
          ['iPhone Mirroring', 'Recurso do macOS que exibe e controla o iPhone numa janela do Mac. Você abre e autentica; o agente só usa a janela.'],
          ['Conta visível', 'O identificador da conta mostrado na tela do app (o @ no Instagram). O agente confirma que é o certo antes de qualquer toque.'],
          ['Rótulo real', 'O nome do menu ou opção como aparece nesta versão do app, não como o modelo lembra de outra versão.'],
          ['Persistência', 'Sair da tela de configurações, reabrir e ver o mesmo valor. É a prova de que a mudança pegou.'],
        ]),
        c.figure(t, svg.flow(t, { label: 'O fluxo no celular espelhado: você abre e autentica o espelhamento; o agente confirma a conta, inspeciona as configurações atuais, aplica só o pedido, sai e reabre para verificar, e entrega a tabela antes/depois', steps: [
          { title: 'Você abre', sub: 'espelhamento autenticado' }, { title: 'Conta certa?', sub: 'confirmar antes de tocar' }, { title: 'Inspecionar', sub: 'rótulos reais desta versão' }, { title: 'Aplicar', sub: 'só o que foi pedido' }, { title: 'Sair e reabrir', sub: 'persistiu?' }, { title: 'Tabela', sub: 'antes / depois / verificado' },
        ] }), 'A primeira caixa é sua. As demais são do agente, mas a segunda e a quinta são as que o vídeo mostra ele fazendo por conta própria: checar a conta, checar que pegou.'),
      ],
    },
    {
      emoji: '📝', title: 'O prompt 05, traduzido', sub: 'Use a janela de espelhamento que eu abri para configurar o app no meu celular',
      what: 'O prompt do kit: conta a confirmar, mudança pedida (no exemplo, ativar upload na qualidade mais alta), outras mudanças aprovadas; inspecionar antes, usar rótulos reais, aplicar só o pedido, verificar persistência, tabela antes/depois, sugestões separadas, proibições de privacidade e pagamento.',
      why: 'É o prompt mais defensivo do kit, porque a superfície é a mais sensível: é a sua conta, no seu celular, com as suas fotos ao lado.',
      keys: 'Confirmar conta, mudança específica, já-correto, persistência, sugestões separadas, não tocar em privacidade ou pagamento.',
      body: (t) => [
        c.code(t, { objective: 'Aplicar uma configuração específica num app do celular pelo espelhamento e provar que persistiu (Codex com computer use; iPhone Mirroring aberto e autenticado por você)', lang: 'text', code: `Use a janela do iPhone Mirroring que eu abri para configurar o Instagram no meu celular de verdade.

Conta a confirmar: <ARROBA_DA_CONTA>
Mudança pedida: ativar "Enviar na qualidade mais alta", se esse controle existir
Outras mudanças aprovadas: <CONFIGURACAO_E_VALOR_ALVO_OU_NONE>

Confirme a conta visível antes de mudar qualquer coisa. Inspecione as configurações atuais e explique o efeito de cada mudança pedida. Use os rótulos realmente presentes nesta versão do app; não presuma que um caminho de menu lembrado ainda está correto.

Aplique apenas as mudanças pedidas. Se um valor pedido já estiver definido, registre como já correto. Saia da tela de configurações, reabra e verifique que cada valor persistiu. Mantenha uma tabela antes/depois com o rótulo visível, valor antigo, valor novo e resultado da verificação.

Se encontrar outras configurações potencialmente úteis para criadores, liste-as separadamente como sugestões. Distinga qualidade de envio de afirmações sobre distribuição ou alcance. Verifique qualquer afirmação de política ou desempenho da plataforma na documentação oficial atual antes de recomendar.

Não altere privacidade, segurança, dados de recuperação, identidade do perfil nem recursos pagos. Não publique, não envie mensagens diretas nem navegue por fotos não relacionadas. Se o espelhamento, o login ou uma configuração indisponível bloquear a tarefa, pare naquela tela e me diga a ação exata necessária. Devolva itens concluídos, já corretos e bloqueados separadamente.`, verify: 'A conta correta aparece na tela (registrada na tabela). A configuração nomeada chegou ao valor alvo. O valor continua igual depois de sair e reabrir a tela. Itens concluídos, já corretos e bloqueados vêm em listas separadas.' }),
        c.table(t, { headers: ['Parte do prompt', 'O que protege'], rows: [
          ['Confirmar a conta visível', 'Você ter mais de uma conta no app, e o agente mexer na errada.'],
          ['Rótulos realmente presentes', 'O modelo "lembrar" de um menu que mudou de nome ou de lugar.'],
          ['Já correto', 'O agente "aplicar" algo que já estava, e reportar como mudança.'],
          ['Sair e reabrir', 'Configuração que mostra o valor novo mas não salvou.'],
          ['Sugestões separadas', 'Misturar o que você pediu com o que o agente achou interessante.'],
          ['Lista de proibições', 'Privacidade, segurança, recuperação, identidade, pagamento: o que não se toca sem você.'],
        ] }),
      ],
    },
    {
      emoji: '👤', title: 'Confirmar a conta antes de qualquer toque', sub: 'O passo que o agente do vídeo fez sozinho',
      what: 'A primeira ação dentro do app: ir até onde a conta ativa aparece, ler o identificador, comparar com o que você escreveu, e só então prosseguir.',
      why: 'Apps de rede social permitem várias contas na mesma instalação. Uma configuração aplicada na conta errada é invisível até dar problema.',
      keys: 'Identificador visível, comparação literal, parar se divergir.',
      body: (t) => [
        c.p('No vídeo, sem que o prompt original pedisse com tanta ênfase, o agente entrou em "configurações e atividade" e "conferiu que estava na conta nova certa" antes de continuar. O kit transformou esse comportamento em regra: <strong class="text-blue-400">confirme a conta visível antes de mudar qualquer coisa</strong>.'),
        c.steps(t, { title: 'Como o agente confirma', items: [
          { h: 'Abrir o perfil ou a tela de conta', text: 'Onde o identificador (o @) aparece por extenso. Não confiar na foto de perfil.' },
          { h: 'Comparar literalmente', text: 'O texto na tela contra o valor de <code>&lt;ARROBA_DA_CONTA&gt;</code>. Uma letra diferente é conta diferente.' },
          { h: 'Registrar na tabela', text: 'A primeira linha do relatório é "conta confirmada: @tal". Se a confirmação não está no relatório, o agente não a fez.' },
          { h: 'Se divergir, parar', text: 'Não trocar de conta por conta própria. Reportar qual conta está ativa e esperar você.' },
        ] }),
        c.alert({ title: 'Por que não deixar o agente trocar de conta', text: 'Trocar de conta pode exigir senha, código de verificação ou tocar em dados de recuperação. Tudo isso está na lista do que o agente não faz. Se a conta ativa não é a certa, a ação é sua.' }),
      ],
    },
    {
      emoji: '📋', title: 'A tabela antes/depois e a prova de persistência', sub: 'Rótulo, valor antigo, valor novo, verificado',
      what: 'O formato de saída: uma linha por configuração, com o rótulo exato como aparece no app, o valor que estava, o valor que ficou e o resultado da verificação depois de reabrir a tela.',
      why: 'É a prova de conclusão do fluxo. Sem a coluna "verificado", a tabela só diz o que o agente tentou.',
      keys: 'Rótulo exato, valor antigo, valor novo, verificado ao reabrir, três status.',
      body: (t) => [
        c.table(t, { headers: ['Rótulo visível', 'Antes', 'Depois', 'Verificado ao reabrir', 'Status'], rows: [
          ['Enviar na qualidade mais alta', 'Desativado', 'Ativado', 'Ativado', 'Concluído'],
          ['Economia de dados', 'Desativado', 'Desativado', 'Desativado', 'Já correto'],
          ['<em>(configuração que não existe nesta versão)</em>', '—', '—', '—', 'Bloqueado: controle ausente, captura anexa'],
        ], caption: 'Exemplo ilustrativo do formato. Os rótulos reais dependem da versão do app no seu celular.' }),
        c.figure(t, svg.split(t, { label: 'A diferença entre aplicado e persistido: à esquerda o valor mostrado logo após o toque, à direita o valor lido depois de sair e reabrir a tela. Só a direita conta como prova', bridge: 'sair → reabrir', left: { title: 'APLICADO', items: ['Toque no controle', 'A tela mostra o valor novo', 'Ainda pode não ter salvado'] }, right: { title: 'PERSISTIDO', items: ['Saiu das configurações', 'Reabriu a mesma tela', 'O valor novo continua lá'] } }), 'Apps móveis às vezes exigem confirmação, conexão ou um "salvar" escondido. A coluna "verificado" existe porque a esquerda engana.'),
        c.cards(t, [
          { emoji: '✅', h: 'Concluído', text: 'Valor mudou e persistiu. Linha completa na tabela.' },
          { emoji: '➖', h: 'Já correto', text: 'O valor pedido já estava. Nada foi tocado. Registrado, não "aplicado".' },
          { emoji: '🛑', h: 'Bloqueado', text: 'Controle ausente, login exigido, espelhamento caiu. Tela exata e ação sua necessária.' },
        ]),
      ],
    },
    {
      emoji: '📣', title: 'Qualidade de envio não é alcance', sub: 'O que o agente pode afirmar e o que precisa de fonte',
      what: 'A separação que o prompt exige: uma configuração de qualidade de upload é um fato verificável; "isso melhora o alcance" é uma afirmação sobre distribuição que precisa de documentação oficial atual.',
      why: 'O vídeo parte de "vi em vídeos que existem configurações escondidas que ajudam". O kit corta o hype: verifique na fonte antes de recomendar.',
      keys: 'Fato verificável, afirmação de desempenho, documentação oficial, sugestão separada.',
      body: (t) => [
        c.grid2(t, { okTitle: 'O agente pode afirmar', ok: ['"O controle Enviar na qualidade mais alta está ativado e persistiu."', '"Esta configuração faz o app enviar o arquivo com menos compressão." (efeito descrito pelo próprio app)', '"Encontrei estas outras configurações; listo como sugestões, sem aplicar."'], badTitle: 'O agente não pode afirmar sem fonte', bad: ['"Isso vai fazer seus vídeos alcançarem mais gente."', '"Criadores novos devem ativar X para o algoritmo favorecer."', '"A plataforma penaliza quem deixa Y desativado."'] }),
        c.alert({ title: 'A linha do prompt', text: '"Distinga qualidade de envio de afirmações sobre distribuição ou alcance. Verifique qualquer afirmação de política ou desempenho da plataforma na documentação oficial atual antes de recomendar." Se a documentação não diz, a recomendação vira sugestão com a etiqueta "não verificado".' }),
        c.concept(t, { title: 'Por que isso importa fora do Instagram', emoji: '🎯', paras: ['Todo app tem folclore de configuração: "ative isso que melhora". Um agente que repete o folclore com voz confiante é pior do que um amigo que repete, porque você tende a acreditar mais. A regra de separar fato de alegação vale para qualquer app que você configurar por este fluxo.'] }),
      ],
    },
    {
      emoji: '🧭', title: 'Generalizar: pesquisar, depois aplicar em qualquer app móvel', sub: 'O padrão do vídeo e o "make it yours" do guia',
      what: 'A extensão sugerida no vídeo: usar sub-agentes para pesquisar como otimizar um perfil (Facebook, X, outro app) e depois aplicar as mudanças pelo espelhamento. E a regra do guia para adaptar: nomear conta, configuração e valor alvo exatos, manter antes/depois e persistência.',
      why: 'O fluxo separa pesquisa (o que mudar) de execução (mudar e provar). Misturar as duas é como o folclore entra.',
      keys: 'Pesquisa separada, lista aprovada por você, execução com prova, qualquer app móvel.',
      body: (t) => [
        c.p('"Você poderia teoricamente disparar sub-agentes para fazer uma pesquisa profunda sobre como otimizar seu perfil do Facebook ou do X, e depois fazê-lo aplicar as mudanças que a pesquisa encontrou." O kit adiciona o passo que falta entre a pesquisa e a aplicação: <strong class="text-blue-400">você aprova a lista</strong>. Cada item aprovado vira uma linha de "outras mudanças aprovadas" no prompt.'),
        c.cards(t, [
          { emoji: '🔎', h: '1. Pesquisar', text: 'Um pedido separado, sem computer use: "liste as configurações do app X relevantes para Y, com a fonte oficial de cada uma". Sai uma lista com links.' },
          { emoji: '✅', h: '2. Aprovar', text: 'Você lê a lista, corta o folclore, mantém o que tem fonte e faz sentido. Cada item vira "rótulo + valor alvo".' },
          { emoji: '📱', h: '3. Aplicar com prova', text: 'O prompt 05 com a lista aprovada em "outras mudanças aprovadas". Tabela antes/depois, persistência, três status.' },
        ]),
        c.code(t, { objective: 'Adaptar o fluxo 05 para outro app móvel, mantendo conta, valor alvo e prova de persistência (Codex com computer use; espelhamento aberto e autenticado)', lang: 'text', code: `Use a janela do iPhone Mirroring que eu abri para configurar o <NOME_DO_APP> no meu celular.

Conta a confirmar: <IDENTIFICADOR_VISIVEL_DA_CONTA>
Mudanças aprovadas (rótulo → valor alvo):
- <ROTULO_1> → <VALOR_1>
- <ROTULO_2> → <VALOR_2>

Confirme a conta visível antes de qualquer mudança. Inspecione as configurações atuais usando os rótulos presentes nesta versão do app. Aplique só as mudanças listadas; se um valor já estiver correto, registre como já correto. Saia da tela e reabra para verificar que cada valor persistiu. Devolva a tabela antes/depois com rótulo, valor antigo, valor novo e verificação.

Não altere privacidade, segurança, recuperação, identidade nem recursos pagos. Não publique, não envie mensagens, não abra conteúdo não relacionado. Se algo bloquear, pare naquela tela e me diga a ação exata. Separe concluído, já correto e bloqueado.`, verify: 'A tabela tem uma linha por item aprovado, todas com a coluna de verificação preenchida após reabrir a tela; nada fora da lista foi tocado; a conta confirmada aparece na primeira linha.' }),
        c.tip({ title: 'Mantenha o formato, troque o conteúdo', text: 'O guia resume: "use para outro app exclusivo de celular nomeando a conta, a configuração e o valor alvo exatos; mantenha a checagem antes/depois/persistência". As três coisas que você troca estão nos marcadores. Tudo o que protege você está fora deles.' }),
      ],
    },
  ],
  quiz: [
    { q: 'O agente ativou a configuração e a tela mostrou "ativado". Isso prova conclusão?', options: ['Sim, a tela mostra o valor novo.', 'Não: só depois de sair da tela, reabrir e ver o mesmo valor. Aplicado não é persistido.', 'Sim, se houver captura de tela.'], answer: 1, why: 'A prova do fluxo é a persistência. Apps móveis podem exibir o valor novo sem ter salvado.' },
    { q: 'Ao abrir o perfil, o agente vê um @ diferente do que você escreveu. O que ele faz?', options: ['Troca para a conta certa e continua.', 'Para, reporta qual conta está ativa e espera você.', 'Aplica a configuração nas duas contas por segurança.'], answer: 1, why: 'Trocar de conta pode exigir senha, verificação ou dados de recuperação, que estão fora do escopo do agente. A ação é sua.' },
    { q: 'O agente sugeriu "ative X, isso aumenta seu alcance com criadores novos". Como tratar?', options: ['Aplicar, ele pesquisou.', 'Separar como sugestão não verificada até haver documentação oficial que sustente a afirmação sobre alcance.', 'Ignorar todas as sugestões.'], answer: 1, why: 'O prompt distingue qualidade de envio (fato) de alcance (alegação) e exige verificar política e desempenho na documentação oficial antes de recomendar.' },
  ],
  summary: [
    ['A superfície', 'o espelhamento é uma janela do Mac que é o seu celular; você abre e autentica, o agente usa.'],
    ['Antes de tocar', 'confirmar a conta visível, inspecionar as configurações com os rótulos desta versão do app.'],
    ['Aplicar só o pedido', 'valor já correto é registrado, não "aplicado"; sugestões ficam em lista separada.'],
    ['Prova', 'sair e reabrir; a tabela antes/depois com a coluna verificado; concluído, já correto e bloqueado separados.'],
    ['Fato contra alegação', 'qualidade de envio é verificável; alcance precisa de documentação oficial. Pesquisar, você aprovar, depois aplicar.'],
  ],
};

export const T2B = { modules: [M24, M25] };
