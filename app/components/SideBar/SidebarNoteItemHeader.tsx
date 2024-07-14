import { Note } from "@/lib/redis"
import dayjs from "dayjs"

const SidebarNoteItemHeader = (props: Pick<Note, 'title' | 'updateTime'>) => {
  const { title, updateTime } = props;
  return (
    <header className='sidebar-note-header'>
      <strong>{title}</strong>
      <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
    </header>
  )
}

export default SidebarNoteItemHeader