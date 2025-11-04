'use client'

import React from 'react'
import { IconProps } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface IAdminSidebarMenuProps {
  title: string
  link: string
  Icon: React.ComponentType<IconProps>
}

const AdminSidebarMenu = ({ title, link, Icon }: IAdminSidebarMenuProps): React.JSX.Element => {
  const pathname = usePathname()
  const active = pathname === link
  return (
    <Link
      href={link}
      aria-current={active ? 'page' : undefined}
      className={`flex items-center p-2 rounded transition-colors ${
        active ? 'bg-base-pink text-base-blue font-semibold' : 'text-base-blue hover:bg-base-pink'
      }`}
    >
      <Icon size={24} className="mr-2" />
      {title}
    </Link>
  )
}

export default AdminSidebarMenu
