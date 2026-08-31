// Conteúdo estático do site. Substitui o que antes vinha do Firestore.
// Os dados de contato foram extraídos do Linktree da médica e ainda precisam
// de confirmação dela. Ver TODO-DADOS-REAIS.md.

export interface NavLink {
  href: string
  label: string
}

/**
 * Navegação do header. Aponta para as seções da home, e o sublinhado acompanha
 * a rolagem. O prefixo "/" faz o link funcionar também a partir das páginas
 * internas, voltando para a home antes de rolar.
 */
export interface SectionLink extends NavLink {
  /** id da seção correspondente na home, usado pelo destaque de rolagem */
  sectionId: string
}

// A ordem precisa acompanhar a ordem das seções na home, senão o sublinhado
// que segue a rolagem pula de um lado para o outro do menu.
export const sectionLinks: SectionLink[] = [
  { href: '/#mohs', sectionId: 'mohs', label: 'Cirurgia de Mohs' },
  { href: '/#atuacao', sectionId: 'atuacao', label: 'Áreas de atuação' },
  { href: '/#sobre', sectionId: 'sobre', label: 'Sobre' },
  { href: '/#onde-atendo', sectionId: 'onde-atendo', label: 'Onde atendo' }
]

/**
 * Rodapé. As páginas internas foram absorvidas pelas seções da home, então
 * aqui também são âncoras. Os endereços antigos seguem funcionando por
 * redirecionamento declarado no next.config.mjs.
 */
export const pageLinks: NavLink[] = [
  { href: '/#mohs', label: 'Cirurgia de Mohs' },
  { href: '/#atuacao', label: 'Áreas de atuação' },
  { href: '/#sobre', label: 'Quem sou' },
  { href: '/#onde-atendo', label: 'Onde atendo' }
]

/** Busca no Google Maps pelo endereço, que resolve melhor no celular do que um mapa embutido. */
export const mapsUrl = (address: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

export interface Clinic {
  name: string
  address: string
  /** Somente dígitos, com DDD. O código do país é adicionado em whatsappUrl. */
  phone: string
  phoneLabel: string
  /** Central de marcação própria da unidade, quando existe. */
  bookingUrl?: string
  /** O consultório dela. Os demais são locais onde ela também atende. */
  isOwnPractice?: boolean
}

export const clinics: Clinic[] = [
  {
    name: 'Clínica Curantis',
    address: 'Av. Sete de Setembro, 4698, sala 1305, Batel, Curitiba, PR, 80240-000',
    phone: '41984552223',
    phoneLabel: '(41) 98455-2223',
    isOwnPractice: true
  },
  {
    // Endereço e central de marcação vêm do site antigo, onde o INC já
    // constava. É a única unidade que aparece nas duas fontes.
    name: 'INC, Shopping Pátio Batel',
    address: 'Av. do Batel, 1868, Batel, Curitiba, PR, 80420-090',
    phone: '4130288545',
    phoneLabel: '(41) 3028-8545',
    bookingUrl: 'https://inc.centraldemarcacao.com.br/'
  },
  {
    // Endereço do hospital confirmado em duas fontes públicas independentes.
    // O que falta é o dado que só ela tem: em qual consultório ou andar atende.
    name: 'Hospital Marcelino Champagnat',
    address: 'Av. Presidente Affonso Camargo, 1399, Cristo Rei, Curitiba, PR, 80050-370',
    phone: '41984442402',
    phoneLabel: '(41) 98444-2402'
  }
]

export const ownPractice = clinics.find((clinic) => clinic.isOwnPractice) ?? clinics[0]
export const otherPlaces = clinics.filter((clinic) => clinic !== ownPractice)

export const secretary = {
  label: 'Secretária pessoal',
  phone: '41991887594',
  phoneLabel: '(41) 99188-7594'
}

export const site = {
  /** Nome de marca, como aparece no logo e na navegação. */
  doctor: 'Priscila Francisco',
  /** Nome completo de registro, usado junto do CRM. Vem do site no ar. */
  doctorFullName: 'Dra. Priscila de Cássia Francisco',
  city: 'Curitiba, PR',
  url: 'https://drapriscilafrancisco.com.br',
  // Linktree, e não Instagram: é a página de links dela, e o próprio Linktree
  // não publica o endereço do perfil. Rotular como "Instagram" seria impreciso.
  // TODO: se ela passar o @ do Instagram, vale trocar por um link direto.
  links: 'https://linktr.ee/priscila.francisco',
  // Lidos do site em produção, que busca esses valores no Firestore.
  crm: 'CRM-PR 42453',
  rqe: 'RQE 32324'
}

/**
 * Destino de todo botão de agendamento. Aponta para a seção de unidades da
 * home, onde cada endereço tem WhatsApp direto, em vez da página antiga
 * /marque-sua-consulta, que ainda lê clínicas do Firestore e lista uma unidade
 * onde ela não atende mais. O prefixo "/" faz funcionar a partir de qualquer
 * página interna.
 */
export const bookingHref = '/#onde-atendo'

/** Monta o link do WhatsApp com código do país e mensagem inicial. */
export const whatsappUrl = (phone: string, message = 'Olá, gostaria de marcar uma consulta.'): string =>
  `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`
