# Dados reais

De onde veio cada dado do site e o que ela decidiu não publicar. Não há mais nada
pendente de confirmação dela.

## Locais de atendimento

A **Clínica Curantis é o consultório próprio dela**. Os outros dois são locais onde ela
também atende, e o site trata os três nessa hierarquia.

| Local | Endereço | WhatsApp |
| --- | --- | --- |
| Clínica Curantis (consultório próprio) | Av. Sete de Setembro, 4698, Sala 1305, Batel, 80240-000 | (41) 98455-2223 |
| INC, Shopping Pátio Batel | Av. do Batel, 1868, Batel, 80420-090 | (41) 3028-8545 |
| Hospital Marcelino Champagnat | Av. Presidente Affonso Camargo, 1399, Cristo Rei, 80050-370 | (41) 98444-2402 |

Os três telefones vêm do Linktree dela, que é fonte dela mesma. O endereço do INC já
constava no site antigo e o do Marcelino Champagnat foi confirmado em duas fontes
públicas independentes.

O INC mantém a central de marcação própria (`inc.centraldemarcacao.com.br`).

Os botões gerais de agendamento abrem o Linktree dela, que é onde ela mesma mantém os
canais atualizados. Os cards de cada unidade continuam com o WhatsApp direto.

- [x] CEP da Clínica Curantis: 80240-000. As três unidades têm endereço completo.
- [x] Telefones conferidos: os três são os do Linktree dela
- [x] Ela não atende mais na Clínica Pró-saúde, que constava no site antigo. Confirmado
- [x] Sala dentro do Hospital Marcelino Champagnat: ela dispensou
- [x] Dias e horários de atendimento: fica sem, por decisão dela. Quem agenda passa pelo
      Linktree ou pelo WhatsApp da unidade, onde o horário é informado na hora
- [x] Convênios: fica sem, por decisão dela

## Documentos profissionais

- [x] CRM-PR 42453 e RQE 32324
- [x] Nome completo de registro: Dra. Priscila de Cássia Francisco

## Conteúdo médico

- [x] Ela leu e aprovou o texto que explica a cirurgia de Mohs

## Imagens

- [x] `cirurgia-mohs.webp` (1440x1440), ela operando com lupa cirúrgica
- [x] Imagem de compartilhamento: `og-image.jpg`, 1200x630, montada com o retrato sobre a
      paleta da marca. Não dependeu de arquivo novo
- [x] Fotos: ela não vai fornecer mais nenhuma, e aprovou o site com as que temos

Todas as imagens de origem duvidosa saíram do projeto: a foto de banco que mostrava outra
mulher, as três ilustrações geradas por IA e os stocks de licença desconhecida. `public/`
tem hoje 300KB e só contém o que o site serve.

## Contato

- [x] Formulário de contato removido. O WhatsApp é o canal, e com ele saíram o envio por
      e-mail, o nodemailer e os três segredos de SMTP. O site não usa mais nenhuma
      variável de ambiente
- [x] Contato da política de privacidade aponta para o WhatsApp da Clínica Curantis, que
      atende a exigência da LGPD de oferecer um canal. O número pessoal da secretária saiu
      do site
- [x] E-mail na política: fica o número, por decisão dela. O WhatsApp da Curantis é o
      canal único de contato do site
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
