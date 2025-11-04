import React from 'react'
import AdminOptions from '@/app/ui/admin/admin-options'

const cards = [
  {
    title: 'Página inicial',
    description: 'Configure e administre o conteúdo da sua página inicial.',
    link: '/admin/main-page'
  },
  {
    title: 'Quem sou',
    description: 'Configure e administre o conteúdo da página Quem Sou.',
    link: '/admin/who-i-am'
  },
  {
    title: 'Áreas de atuação',
    description: 'Configure e administre o conteúdo da página Áreas de Atuação.',
    link: '/admin/fields-of-expertise'
  },
  {
    title: 'Onde pode me encontrar',
    description: 'Configure e administre o conteúdo da página Onde Pode Me Encontrar.',
    link: '/admin/where-find-me'
  },
  {
    title: 'Mais sobre a dermatologia',
    description: 'Configure e administre o conteúdo da página Saiba Mais Sobre a Dermatologia.',
    link: '/admin/more-about-dermatology'
  },
  {
    title: 'Marque sua consulta',
    description: 'Configure e administre o conteúdo da página Marque Sua Consulta.',
    link: '/admin/book-your-appointment'
  },
  {
    title: 'Dados do médico',
    description: 'Configure e administre seus dados, como telefone, e-mail, etc.',
    link: '/admin/my-info'
  }
]

const AdminMainContent = (): React.JSX.Element => (
  <main className="flex-1 p-6 bg-white shadow-md">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <AdminOptions key={card.title} {...card} />
      ))}
    </div>
  </main>
)

export default AdminMainContent

