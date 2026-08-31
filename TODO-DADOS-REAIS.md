# Dados reais pendentes

Checklist do que ainda depende de confirmação da cliente antes de publicar.

## Locais de atendimento

A **Clínica Curantis é o consultório próprio dela**. Os outros dois são locais onde ela
também atende, e o site trata os três nessa hierarquia.

| Local | Endereço | WhatsApp |
| --- | --- | --- |
| Clínica Curantis (consultório próprio) | Av. Sete de Setembro, 4698, Sala 1305, Batel, 80240-000 | (41) 98455-2223 |
| INC, Shopping Pátio Batel | Av. do Batel, 1868, Batel, 80420-090 | (41) 3028-8545 |
| Hospital Marcelino Champagnat | Av. Presidente Affonso Camargo, 1399, Cristo Rei, 80050-370 | (41) 98444-2402 |
| Secretária pessoal | (não se aplica) | (41) 99188-7594 |

Os telefones e os dois últimos endereços foram lidos de fontes públicas, não de fonte
oficial, então precisam de conferência com ela antes de publicar.

O INC mantém a central de marcação própria (`inc.centraldemarcacao.com.br`).

- [x] CEP da Clínica Curantis: 80240-000. As três unidades têm endereço completo.
- [ ] Conferir os três telefones e definir qual é o canal preferido de agendamento
- [ ] Sala ou andar onde ela atende dentro do Hospital Marcelino Champagnat. Hospital
      grande sem indicação de consultório faz o paciente se perder na chegada
- [ ] Dias e horários de atendimento em cada unidade. Nada foi publicado, porque horário
      errado leva paciente a porta fechada
- [ ] Convênios aceitos, ou se o atendimento é particular
- [ ] Confirmar que ela realmente não atende mais na Clínica Pró-saúde, que constava no
      site antigo e não aparece mais nos canais atuais

## Documentos profissionais

- [x] CRM-PR 42453 e RQE 32324
- [x] Nome completo de registro: Dra. Priscila de Cássia Francisco

## Conteúdo médico

- [ ] Ela precisa revisar e aprovar o texto que explica a cirurgia de Mohs, por ser
      conteúdo médico assinado por ela

## Imagens

- [x] `cirurgia-mohs.webp` (1440x1440), ela operando com lupa cirúrgica
- [ ] Autorização de uso das fotos vindas do Instagram dela
- [ ] Foto do consultório real. A `about-me-2.jpeg` é o Hospital Caridade, onde ela se
      formou, e não onde atende. Usar como "consultório" seria enganoso
- [ ] Imagem de compartilhamento (Open Graph). Hoje usa `/my-image.jpeg` como provisório

### Imagens a remover do projeto

- `about-me-1.png`: banco de imagens, é outra mulher de jaleco, não ela
- `o_que_e_dermatologia_realista.png` e `tratamentos_dermatologicos_modernos.png`: geradas
  por IA, com texto ilegível e anatomia incorreta
- [ ] Verificar licença de `clinical-dermatology.png`, `skin-surgery.png` e
      `cancer-dermatology.png`, que são banco de imagens de origem desconhecida

## Contato

- [x] Formulário de contato removido. O WhatsApp é o canal, e com ele saíram o envio por
      e-mail, o nodemailer e os três segredos de SMTP. O site não usa mais nenhuma
      variável de ambiente
- [x] Contato da política de privacidade aponta para o WhatsApp da secretária, que atende
      a exigência da LGPD de oferecer um canal
- [ ] Se ela tiver um e-mail profissional, vale colocar na política: pedido de privacidade
      por escrito deixa rastro melhor que conversa de WhatsApp
- [x] Instagram: @priscila.c.francisco. O @ não acompanha o slug do Linktree, que é
      priscila.francisco. Está no header, no rodapé e no sameAs dos dados estruturados

## Decisões de estrutura

As páginas internas foram absorvidas pelas seções da home, porque repetiam o mesmo
conteúdo: o `/quem-sou` trazia a mesma biografia e as mesmas titulações, e o
`/areas-de-atuacao` as mesmas três áreas com os mesmos itens. Os endereços antigos
continuam funcionando por redirecionamento permanente para a âncora correspondente,
declarado no `next.config.mjs`.

O blog foi removido. Os três posts apontavam para `/blog/...`, rota que nunca existiu,
então eram 404, e ilustravam com imagens geradas por IA. Se ela quiser publicar conteúdo
no futuro, vale construir de verdade.

O mapa embutido saiu junto. Cada endereço agora é um link para o Google Maps, que abre o
aplicativo no celular e não custa JavaScript.
