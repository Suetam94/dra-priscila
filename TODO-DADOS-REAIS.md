# Dados reais pendentes

Checklist do que ainda depende de confirmação da cliente antes de publicar.

## Locais de atendimento

Extraídos do Linktree dela em 28/08/2026. **Todos precisam ser confirmados com ela**, principalmente
os telefones, porque foram lidos de página pública e não de fonte oficial.

A **Clínica Curantis é o consultório próprio dela**. Os outros dois são locais onde ela
também atende, e o site trata os três nessa hierarquia. O telefone da Curantis é o que
aparece no topo e no rodapé de todas as páginas.

| Local | Endereço | WhatsApp |
| --- | --- | --- |
| Clínica Curantis (consultório próprio) | Av. Sete de Setembro, 4698, Sala 1305, Batel | (41) 98455-2223 |
| INC, Shopping Pátio Batel | Av. do Batel, 1868, Batel, 80420-090 (do site antigo) | (41) 3028-8545 (confirmar DDD) |
| Hospital Marcelino Champagnat | Av. Presidente Affonso Camargo, 1399, Cristo Rei, 80050-370 (fonte pública) | (41) 98444-2402 |
| Secretária pessoal | (não se aplica) | (41) 99188-7594 |

O site antigo listava também a **Clínica Pró-saúde** (Rua São Vicente, 55, Juvevê), que não
aparece mais no Linktree. Provavelmente ela deixou de atender lá, então não foi incluída.
Vale confirmar.

O INC é a única unidade presente nas duas fontes, então o endereço e a central de marcação
(`inc.centraldemarcacao.com.br`) foram reaproveitados do site antigo.

- [ ] **CEP da Clínica Curantis.** É a única unidade sem CEP, e ela é o consultório
      próprio dela. O CEP entra nos dados estruturados que o Google usa para busca
      local, então a unidade principal é justamente a que está incompleta. As outras
      duas já têm.
- [ ] Sala ou andar onde ela atende dentro do Hospital Marcelino Champagnat. O endereço do
      prédio veio de fonte pública, mas hospital grande sem indicação de consultório faz o
      paciente se perder na chegada
- [ ] Confirmar os telefones e qual deles é o canal preferido de agendamento
- [ ] Confirmar dias e horários de atendimento em cada local
- [ ] Convênios aceitos, ou se é particular
- [ ] Definir qual local aparece primeiro no site

Observação: no Linktree, o link do INC está como `wa.me/30288545`, sem código de país e DDD,
então provavelmente não abre a conversa. No site vamos escrever `5541` na frente. Vale avisar ela
para corrigir lá também.

## Documentos profissionais

- [x] CRM-PR 42453 e RQE 32324, lidos do site em produção, que busca esses valores no Firestore
- [x] Nome completo de registro: Dra. Priscila de Cássia Francisco

## Achados no site em produção

Ao buscar o CRM no site no ar, apareceram duas coisas que valem aviso:

1. **Convênios estão como "Plano A, Plano B, Plano C" e "Plano D, Plano E".** São valores de
   exemplo que nunca foram substituídos e estão públicos hoje na página de onde encontrar.
2. **Os horários aparecem como "09:00hh - 17:00hh"**, com "h" duplicado, por causa de como o
   componente antigo monta a string.

Nenhum dos dois afeta o site novo, que não herda esse código, mas a cliente provavelmente não
sabe que estão assim.

## Endereços: o Linktree é a fonte

O site em produção lista **Clínica Pró-saúde** (Rua São Vicente, 55, Juvevê) e **INC**.
O Linktree lista **Curantis**, **INC** e **Marcelino Champagnat**.

**Decidido:** vale o Linktree. Ele é mantido junto ao Instagram, enquanto o site está parado há
cerca de dois anos, e o que saiu de lá foi porque ela deixou de atender. A Pró-saúde fica fora.

- [ ] Horários por unidade. Os únicos números conhecidos vêm do site em produção e têm cerca de
      dois anos: Pró-saúde de segunda a sexta das 08:00 às 18:00, e INC de segunda a sexta das
      09:00 às 17:00. Não foram publicados no site novo, porque horário errado leva paciente a
      porta fechada.

## Conteúdo médico

- [ ] Ela precisa revisar e aprovar o texto que explica a cirurgia de Mohs, por ser conteúdo
      médico assinado por ela

## Imagens

- [x] `cirurgia-mohs.webp` (1440x1440), ela operando com lupa cirúrgica. Vinda do Instagram dela.
- [ ] Confirmar com ela a autorização de uso das fotos do Instagram no site
- [ ] Foto do consultório real. A `about-me-2.jpeg` que está no site é o Hospital Caridade,
      onde ela se formou, e não onde atende. Usar como "consultório" seria enganoso.
- [ ] Imagem de compartilhamento (Open Graph). Hoje usa `/my-image.jpeg` como provisório.

### Imagens a remover do projeto

- `about-me-1.png`: banco de imagens, é outra mulher de jaleco, não ela. Está no site hoje
  como imagem padrão da seção "Quem sou".
- `o_que_e_dermatologia_realista.png` e `tratamentos_dermatologicos_modernos.png`: geradas por IA,
  com texto ilegível e anatomia incorreta.
- [ ] Verificar licença de `clinical-dermatology.png`, `skin-surgery.png` e `cancer-dermatology.png`,
      que são banco de imagens de origem desconhecida.

## Decisões de estrutura

As páginas internas foram absorvidas pelas seções da home, porque repetiam o
mesmo conteúdo: o `/quem-sou` trazia a mesma biografia e as mesmas titulações,
e o `/areas-de-atuacao` as mesmas três áreas com os mesmos itens. Os endereços
antigos continuam funcionando por redirecionamento permanente para a âncora
correspondente, declarado no `next.config.mjs`.

O blog foi removido. Os três posts apontavam para `/blog/...`, rota que nunca
existiu, então eram 404 no site no ar, e ilustravam com imagens geradas por IA.
Se ela quiser publicar conteúdo no futuro, vale construir de verdade.

O mapa embutido saiu junto. Cada endereço agora é um link para o Google Maps,
que abre o aplicativo no celular e não custa JavaScript.

## Pendências abertas por essa limpeza

- [x] **Formulário de contato removido.** Decidido que o WhatsApp basta. Saíram junto o
      `utils/email.ts`, o nodemailer e os três segredos de SMTP. O site não usa mais
      nenhuma variável de ambiente.
- [x] **Contato da política de privacidade.** O site antigo publicava `contato@seusite.com`,
      endereço de exemplo. Não existe e-mail dela em nenhum dado nosso, nem no repositório,
      nem no histórico do git, nem no site em produção. A política agora aponta para o
      WhatsApp da secretária, que é canal real e atende a exigência da LGPD.
- [ ] Se ela tiver um e-mail profissional, vale colocar na política, porque pedido de
      privacidade por escrito deixa rastro melhor que conversa de WhatsApp.
