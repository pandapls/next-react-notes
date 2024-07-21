// import { getAllNotes } from '@/lib/redis'
import { getAllNotes } from '@/lib/strapi'
import { sleep } from '@/lib/utils';
import SidebarNoteListFilter from '@/components/SideBar/SidebarNoteListFilter';
import SidebarNoteItemHeader from '@/components/SideBar/SidebarNoteItemHeader';

export default async function SidebarNoteList() {
  await sleep(1000);
  const notes = await getAllNotes();

  if (Object.entries(notes).length === 0) {
    return <div className="notes-empty">
      {'No notes created yet!'}
    </div>
  }

  return (
    <SidebarNoteListFilter
      notes={
        Object.entries(notes).map(([noteId, note]) => {
          const noteData = note;
          return {
            noteId,
            note: noteData,
            header: <SidebarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime} />
          }
        })
      }
    />
  )
}