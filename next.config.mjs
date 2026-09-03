/** @type {import('next').NextConfig} */
const nextConfig = {
  // Todas as imagens são locais desde a saída do Firebase Storage e das fotos
  // hospedadas pelas clínicas.
  images: {},

  // As páginas internas foram absorvidas pelas seções da home. Estes endereços
  // estão indexados há cerca de dois anos, então apontam para a seção
  // correspondente em vez de virarem 404. Permanente para o Google transferir
  // o histórico de cada URL para o destino.
  async redirects () {
    return [
      { source: '/quem-sou', destination: '/#sobre', permanent: true },
      { source: '/areas-de-atuacao', destination: '/#atuacao', permanent: true },
      { source: '/onde-pode-me-encontrar', destination: '/#onde-atendo', permanent: true },
      { source: '/marque-sua-consulta', destination: '/#onde-atendo', permanent: true },
      { source: '/mais-sobre-a-dermatologia', destination: '/#atuacao', permanent: true }
    ]
  }
}

export default nextConfig
