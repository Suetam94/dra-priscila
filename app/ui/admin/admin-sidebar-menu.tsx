import React from 'react'
import { IconProps } from '@phosphor-icons/react'
import Link from 'next/link'

export interface IAdminSidebarMenuProps {
  title: string
  link: string
  Icon: React.ComponentType<IconProps>,
}

const AdminSidebarMenu = ({ title, link, Icon }: IAdminSidebarMenuProps): React.JSX.Element => {
  return (
    <Link href={link} className="flex items-center p-2 text-base-blue hover:bg-base-pink rounded">
      <Icon size={24} className="mr-2" />
      {title}
    </Link>
  )
}

export default AdminSidebarMenu
