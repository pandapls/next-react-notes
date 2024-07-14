'use client'
'use client'
import { Note } from "@/lib/redis";
import React, { ReactElement } from "react";
import { useSearchParams } from 'next/navigation'
import SidebarNoteItemContent from "@/components/SideBar/SidebarNoteItemContent";
type SidebarNoteListFilterProps = {
  notes: {
    noteId: string;
    note: Note;
    header: ReactElement
  }[]
}

const SidebarNoteListFilter: React.FC<SidebarNoteListFilterProps> = (props) => {
  const { notes } = props;
  const searchParams = useSearchParams()
  const searchText = searchParams.get('q')
  return (
    <ul className='notes-list'>
      {notes.map((noteItem) => {
        const { noteId, note, header } = noteItem
        const notesHasCurSearchTest = !searchText || (searchText && note.title.toLowerCase().includes(searchText.toLowerCase()))

        return notesHasCurSearchTest && <li key={noteId}>
          <SidebarNoteItemContent
            id={noteId}
            title={note.title}
            expandedChildren={
              <p className="sidebar-note-excerpt">
                {(note.content && note.content.substring(0, 20)) || <i>(No content)</i>}
              </p>
            }
          >
            {header}
          </SidebarNoteItemContent>
        </li>
      })}
    </ul>
  )
}

export default SidebarNoteListFilter;