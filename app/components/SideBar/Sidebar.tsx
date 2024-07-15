import React, { Suspense } from 'react'
import Link from 'next/link'
import SidebarNoteList from '@/components/SideBar/SidebarNoteList'
import EditButton from '@/components/Button/EditButton';
import NoteListSkeleton from '@/components/Note/NoteListSkeleton';
import SidebarSearchField from '@/components/SideBar/SidebarSearchField';
import SidebarImport from '@/components/SideBar/SidebarImport';

export default async function Sidebar(props: { lng: string }) {
  const { lng } = props
  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src="/logo.svg"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
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
