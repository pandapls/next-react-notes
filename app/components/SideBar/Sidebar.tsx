import React, { Suspense } from 'react'
import Link from 'next/link'
import SidebarNoteList from './SidebarNoteList'
import { getAllNotes } from '@/lib/redis';
import EditButton from '@/components/Button/EditButton';
import NoteListSkeleton from '@/components/Note/NoteListSkeleton';
import SidebarSearchField from './SidebarSearchField';

export default async function Sidebar() {
  const notes = await getAllNotes()

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
          <SidebarSearchField />
          <EditButton noteId={''}>New</EditButton>

        </section>
        <nav>
          {/* SidebarNoteList */}
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
}
