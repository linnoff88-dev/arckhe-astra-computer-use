# FALHAS

| data | o que quebrou | menor correção | prompt \| infra |
|---|---|---|---|
| 2026-09-06 | legenda-ponte do SVG `split` (entre as duas colunas) transbordava pra coluna da direita quando o texto passava de ~12 caracteres | mover o `<text>` da ponte pra baixo das colunas (`y = H-10`), largura total | prompt |
