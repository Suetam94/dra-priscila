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

export const sectionLinks: SectionLink[] = [
  { href: '/#atuacao', sectionId: 'atuacao', label: 'Áreas de atuação' },
  { href: '/#mohs', sectionId: 'mohs', label: 'Cirurgia de Mohs' },
  { href: '/#sobre', sectionId: 'sobre', label: 'Sobre' },
  { href: '/#onde-atendo', sectionId: 'onde-atendo', label: 'Onde atendo' }
]

/** Páginas completas. Ficam no rodapé e nos links "ver mais" de cada seção. */
export const pageLinks: NavLink[] = [
  { href: '/quem-sou', label: 'Quem sou' },
  { href: '/areas-de-atuacao', label: 'Áreas de atuação' },
  { href: '/onde-pode-me-encontrar', label: 'Onde me encontrar' },
  { href: '/mais-sobre-a-dermatologia', label: 'Sobre a dermatologia' }
]

export interface Clinic {
  name: string
  address: string
  /** Somente dígitos, com DDD. O código do país é adicionado em whatsappUrl. */
  phone: string
  phoneLabel: string
  /** Central de marcação própria da unidade, quando existe. */
  bookingUrl?: string
}

export const clinics: Clinic[] = [
  {
    name: 'Clínica Curantis',
    address: 'Av. Sete de Setembro, 4698, sala 1305, Batel, Curitiba, PR',
    phone: '41984552223',
    phoneLabel: '(41) 98455-2223'
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
    name: 'Hospital Marcelino Champagnat',
    address: '[Endereço completo a confirmar], Curitiba, PR',
    phone: '41984442402',
    phoneLabel: '(41) 98444-2402'
  }
]

export const secretary = {
  label: 'Secretária pessoal',
  phone: '41991887594',
  phoneLabel: '(41) 99188-7594'
}

export const site = {
  doctor: 'Priscila Francisco',
  city: 'Curitiba, PR',
  url: 'https://drapriscilafrancisco.com.br',
  // TODO: confirmar o perfil exato. O Linktree é o único link verificado.
  instagram: 'https://linktr.ee/priscila.francisco',
  crm: '[CRM-PR xxxxx]',
  rqe: '[RQE xxxxx]'
}

/** Monta o link do WhatsApp com código do país e mensagem inicial. */
export const whatsappUrl = (phone: string, message = 'Olá, gostaria de marcar uma consulta.'): string =>
  `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`
