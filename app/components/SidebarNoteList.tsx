import { NotesHash } from '@/lib/redis'
import dayjs from 'dayjs';

type props = {
  notes: NotesHash
}
export default function SidebarNoteList(props: props) {
  const { notes } = props;
  console.log(notes, 'notes');

  const nodeList = Object.entries(notes);
  console.log(nodeList, 'nodeList');

  if (nodeList.length === 0) {
    return <div className="notes-empty">
      {'No notes created yet!'}
    </div>
  }
  return <ul className='notes-list'>
    {nodeList.map(([noteId, note]) => {
      const { title, updateTime } = note;
      return <li key={noteId}>
        <header className='sidebar-note-header'>
          <strong>{title}</strong>
          <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
        </header>
      </li>
    })}
  </ul>
}