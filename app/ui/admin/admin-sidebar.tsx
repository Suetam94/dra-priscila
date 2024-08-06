'use client'

import React from 'react'
import {
  House,
  UserSquare,
  Stethoscope,
  MapPin,
  Textbox,
  CalendarPlus, Database
} from '@phosphor-icons/react'
import AdminSidebarMenu, { IAdminSidebarMenuProps } from '@/app/ui/admin/admin-sidebar-menu'

const menu: IAdminSidebarMenuProps[] = [
  {
    title: 'Página inicial',
    Icon: House,
    link: '/admin/main-page'
  },
  {
    title: 'Quem sou',
    Icon: UserSquare,
    link: '/admin/who-i-am'
  },
  {
    title: 'Áreas de atuação',
    Icon: Stethoscope,
    link: '/admin/fields-of-expertise'
  },
  {
    title: 'Onde pode me encontrar',
    Icon: MapPin,
    link: '/admin/where-find-me'
  },
  {
    title: 'Mais sobre a dermatologia',
    Icon: Textbox,
    link: '/admin/more-about-dermatology'
  },
  {
    title: 'Marque sua consulta',
    Icon: CalendarPlus,
    link: '/admin/appointment'
  },
  {
    title: 'Dados do médico',
    Icon: Database,
    link: '/admin/doctor'
  }
]

const AdminSidebar = (): React.JSX.Element => {
  return (
    <aside className="w-72 bg-base-gray h-screen shadow-lg">
      <nav className="flex flex-col p-4 space-y-4">
        {
          menu.map((item) => <AdminSidebarMenu key={item.title} {...item} />)
        }
      </nav>
    </aside>
  )
}

export default AdminSidebar
