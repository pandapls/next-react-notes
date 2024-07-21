import React, { Suspense } from 'react'
import Link from 'next/link'
import SidebarNoteList from '@/components/SideBar/SidebarNoteList'
import EditButton from '@/components/Button/EditButton';
import NoteListSkeleton from '@/components/Note/NoteListSkeleton';
import SidebarSearchField from '@/components/SideBar/SidebarSearchField';
import SidebarImport from '@/components/SideBar/SidebarImport';
import Image from 'next/image';

export default async function Sidebar(props: { lng: string }) {
  const { lng } = props
  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <Image className="logo" src="/logo.svg" width={22} height={20} alt="" role='presentation' />

            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          {/* SideSearchField */}
          <SidebarSearchField lng={lng} />
          <EditButton noteId={''}>+</EditButton>
        </section>
        <nav>
          {/* SidebarNoteList */}
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
        <SidebarImport />
      </section>
    </>
  )
}
